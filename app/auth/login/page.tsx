import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            🤖 AI Agent Dashboard
          </h1>
          <h2 className="text-2xl font-semibold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{' '}
            <Link href="/auth/signup" className="text-blue-500 hover:text-blue-400">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
