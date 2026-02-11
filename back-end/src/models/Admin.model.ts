// back-end/src/models/Admin.model.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: { type: Date },
}, { timestamps: true });


AdminSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

AdminSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);