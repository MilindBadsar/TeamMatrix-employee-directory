# Employee Directory System

A modern, full-stack employee management application built with Next.js, MongoDB, and Clerk Authentication.

## Features

- **Secure Authentication** - User management and authentication with Clerk
- **Employee Profiles** - Comprehensive employee information management
- **Search Functionality** - Quick search across employee records
- **Dark/Light Mode** - Customizable UI theme for better user experience
- **Responsive Design** - Mobile-friendly interface for access on any device
- **Role-Based Access** - Different permissions for admins and regular users

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **State Management**: React Context API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB account (local or Atlas)
- Clerk account for authentication

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/MilindBadsar/TeamMatrix-employee-directory.git
   cd employee-directory-system
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Application Structure

```
employee-directory-system/
│
├── app/ - Next.js App Router pages
│   ├── api/ - Backend API routes
│   ├── employees/ - Employee related pages
│   └── page.js - Home page
│
├── components/ - React components
│   ├── layouts/ - Layout components (Sidebar, etc.)
│   ├── ui/ - Reusable UI components
│   └── forms/ - Form components
│
├── context/ - React Context providers
│   └── ThemeContext.js - Dark/light mode context
│
├── lib/ - Utility functions and libraries
│   ├── db/ - Database connection and models
│   └── utils/ - Helper functions
│
└── public/ - Static files
```

## API Routes

- `GET /api/employees` - List all employees
- `POST /api/employees` - Create a new employee
- `GET /api/employees/:id` - Get employee details
- `PUT /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Delete an employee

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Clerk](https://clerk.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
