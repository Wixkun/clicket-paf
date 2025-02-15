'use client';

import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className="flex bg-[#1e1f22] min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
