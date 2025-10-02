import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          🤖 Autonomous AI Agent Dashboard
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Empower your workflows with AI-driven task processing, real-time updates, and intelligent automation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure Authentication</h3>
            <p className="text-gray-400">Firebase-powered user authentication and authorization</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Task Processing</h3>
            <p className="text-gray-400">OpenAI integration for intelligent task automation</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Updates</h3>
            <p className="text-gray-400">Live task queue and activity monitoring</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="text-lg font-semibold text-white mb-2">Notifications</h3>
            <p className="text-gray-400">Stay informed with instant task status updates</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
