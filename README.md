# Veterinary Management System - Frontend

A modern veterinary management system built with Next.js 15, Firebase Authentication, and TypeScript. This application provides a comprehensive solution for managing veterinary clinics, including patient and owner management.

## Tech Stack

- **Framework:** Next.js 15 with Turbopack (App Router)
- **Authentication:** Firebase 12.5
- **UI Framework:** Material-UI (MUI) v7
- **Components:** 
  - MUI X Data Grid
  - MUI X Date Pickers
  - MUI Tel Input
- **Data Validation:** Zod
- **Language:** TypeScript
- **Development Tools:** 
  - Toolpad Core
  - ESLint

## Features

- **Authentication** - IN PROGRESS
  - Firebase-based user authentication
  - Protected routes
  - Role-based access control - TODO

- **Patient Management**
  - Create, read, update, and delete patient records
  - Medical history tracking - TODO
  - Treatment plans - TODO
  - Appointment scheduling - TODO

- **Owner Management**
  - Owner profile creation and management - TODO
  - Multiple pets per owner
  - Contact information management - TODO

- **User Interface**
  - Responsive design
  - Intuitive navigation
  - Dashboard views
  - Form validation

## Project Structure

```
frontend/
├── actions/           # Server actions for data mutations
├── app/               # App router pages and layouts
├── components/        # Reusable UI components
├── data/             # Static data and types
├── firebase/         # Firebase configuration
├── providers/         # Toolpad providers
└── src/              # Core application code
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/MarcoJmz/vetsystem-nextjs.git
   cd vetsystem-nextjs/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run lint` - Run ESLint checks
