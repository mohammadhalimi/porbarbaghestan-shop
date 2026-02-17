// back-end/src/models/Product.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// اینترفیس برای سایز محصول
export interface IProductSize {
    size: string; // '1kg' | '10kg' | '1L' | '5L' | '20L'
    stock: number;
}

// اینترفیس اصلی محصول
export interface IProduct extends Document {
    name: string;
    brand: 'izirtuland' | 'khakshimi';
    type: 'solid' | 'liquid';
    sizes: IProductSize[];
    description: string;
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'نام محصول الزامی است'],
            trim: true,
        },
        brand: {
            type: String,
            required: [true, 'برند محصول الزامی است'],
            enum: {
                values: ['izirtuland', 'khakshimi'],
                message: 'برند باید izirtuland یا khakshimi باشد',
            },
        },
        type: {
            type: String,
            required: [true, 'نوع محصول الزامی است'],
            enum: {
                values: ['solid', 'liquid'],
                message: 'نوع محصول باید solid یا liquid باشد',
            },
        },
        sizes: [
            {
                size: {
                    type: String,
                    required: true,
                    enum: {
                        values: ['1kg', '10kg', '1L', '5L', '20L'],
                        message: 'سایز معتبر نیست',
                    },
                },
                stock: {
                    type: Number,
                    required: true,
                    min: [0, 'موجودی نمی‌تواند منفی باشد'],
                    default: 0,
                },
            },
        ],
        description: {
            type: String,
            required: [true, 'توضیحات محصول الزامی است'],
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// اعتبارسنجی سایزها بر اساس نوع محصول
ProductSchema.pre('save', function () {
    const product = this as any;
    const validSizes = product.type === 'solid'
        ? ['1kg', '10kg']
        : ['1L', '5L', '20L'];

    for (const size of product.sizes) {
        if (!validSizes.includes(size.size)) {
            throw new Error(`سایز ${size.size} برای محصول ${product.type} معتبر نیست`);
        }
    }
});


// ایندکس برای جستجو
ProductSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);