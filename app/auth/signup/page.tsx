import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            🤖 AI Agent Dashboard
          </h1>
          <h2 className="text-2xl font-semibold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-xl">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
