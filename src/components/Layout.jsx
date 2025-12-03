import Sidebar from "./Sidebar";   // ← Add this!

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Sidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
