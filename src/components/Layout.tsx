import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 text-black p-5">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h3 className="text-xl font-bold">Task Manager</h3>
          <nav className="space-x-4">
            <a href="/home" className="hover:text-gray-300">
              Home
            </a>
            <a href="/filter" className="hover:text-gray-300">
              Filters
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-black p-4 mt-auto">
        <p className="text-center text-sm">© 2025 Task Manager</p>
      </footer>
    </div>
  );
}
