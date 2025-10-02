# 🤖 Resonance1 - Autonomous AI Agent Dashboard

A modern Next.js application for autonomous AI-powered workflows with real-time task processing, user authentication, and intelligent automation.

## ✨ Features

- **🔐 User Authentication**: Secure Firebase authentication with email/password
- **🤖 AI Task Processing**: OpenAI API integration for autonomous task processing
- **📋 Task Queue**: Real-time task management with priority levels
- **📊 Activity Log**: Comprehensive logging of all system activities
- **🔔 Notification System**: Real-time notifications for task updates
- **⚡ Real-time Updates**: Firebase Firestore for live data synchronization
- **🎨 Modern UI**: Tailwind CSS with dark theme design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/helzkelz/resonance1.git
cd resonance1
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory and add your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database with the following collections:
   - `tasks` - Stores user tasks
   - `activityLogs` - Stores activity history
   - `notifications` - Stores user notifications

4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /activityLogs/{logId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow write: if request.auth != null;
    }
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## �� Project Structure

```
resonance1/
├── app/                        # Next.js App Router
│   ├── api/                   # API routes
│   │   └── tasks/            # Task management APIs
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/            # Main dashboard
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── auth/                # Authentication components
│   ├── dashboard/           # Dashboard components
│   ├── tasks/               # Task-related components
│   └── notifications/       # Notification components
├── lib/                     # Utility libraries
│   ├── firebase/           # Firebase configuration
│   ├── openai/            # OpenAI integration
│   ├── bot/               # Bot logic
│   └── contexts/          # React contexts
├── types/                  # TypeScript type definitions
└── public/                # Static assets
```

## 🤖 Bot Logic

The autonomous agent (`lib/bot/agent.ts`) provides:

- **Task Processing**: Automatically processes tasks using OpenAI GPT models
- **Task Analysis**: Estimates complexity and processing time
- **Customizable Prompts**: Tailored prompts based on task priority and description
- **Error Handling**: Robust error handling and logging

### Example Usage:

```typescript
import { AutonomousAgent } from '@/lib/bot/agent';

const agent = new AutonomousAgent('gpt-3.5-turbo');
const result = await agent.processTask(task);
```

## 🎨 UI Components

### Key Components:

- **LoginForm / SignupForm**: User authentication forms
- **DashboardHeader**: Navigation and user menu
- **CreateTaskForm**: Form for creating new tasks
- **TaskQueue**: Real-time task list with status indicators
- **TaskItem**: Individual task display with priority and status
- **ActivityLog**: System activity timeline
- **NotificationCenter**: Real-time notification dropdown

## 🔒 Security

- Environment variables for sensitive configuration
- Firebase Authentication for user management
- Firestore security rules for data access control
- Server-side API routes for OpenAI integration

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI**: OpenAI API
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## 📝 API Routes

### POST `/api/tasks`
Create a new task

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "medium",
  "userId": "user_id"
}
```

### POST `/api/tasks/process`
Process a task with AI

**Request Body:**
```json
{
  "taskId": "task_id"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- OpenAI for AI capabilities
- Tailwind CSS for styling utilities
