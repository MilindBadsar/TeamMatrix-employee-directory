import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
// import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  // const user = await currentUser();
  // if (!user) {
  //   redirect("/sign-in");
  // }

  // if (user) {
  //   redirect("/dashboard");
  // }

  // best -->
  // const { userId, redirectToSignIn } = await auth();
  // if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold text-black">TeamMatrix</span>
          </div>
          <div className="space-x-6">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-primary">Log In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <button className="btn btn-primary">Dashboard</button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-4">Employee Directory System</h1>
          <p className="text-xl text-gray-400 mb-8">
            A comprehensive solution for managing your organization&apos;s
            employee information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-gray-900">
                Easy Management
              </h2>
              <p className="text-gray-600">
                Add, edit, and remove employee records with a user-friendly
                interface.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-gray-900">
                Powerful Search
              </h2>
              <p className="text-gray-600">
                Find employees quickly with advanced search and filtering
                options.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-gray-900">
                Data Export
              </h2>
              <p className="text-gray-600">
                Export employee data in CSV or JSON formats for reporting needs.
              </p>
            </div>
          </div>

          <SignUpButton mode="modal">
            <button className="btn btn-primary btn-lg">Get Started</button>
          </SignUpButton>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} TeamMatrix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
