'use client';

import { AdminUser } from '@/app/services/auth.service';

interface ProfileHeaderProps {
    profile: AdminUser;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
                {/* اطلاعات */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {profile.username}
                    </h1>
                    <p className="text-gray-600 mt-1">{profile.email}</p>
                </div>
            </div>
        </div>
    );
}