import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Pill, FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen flex">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-primary text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-10',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:w-64'
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-heading font-bold text-primary">MediManager</h1>
        </div>
        <nav className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                'flex items-center px-6 py-3 text-neutral-600 hover:bg-neutral-100',
                isActive && 'bg-neutral-100 text-primary'
              )
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home size={20} className="mr-2" />
            Medicines
          </NavLink>
          <NavLink
            to="/billing"
            className={({ isActive }) =>
              clsx(
                'flex items-center px-6 py-3 text-neutral-600 hover:bg-neutral-100',
                isActive && 'bg-neutral-100 text-primary'
              )
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <Pill size={20} className="mr-2" />
            Billing
          </NavLink>
          <NavLink
            to="/bills"
            className={({ isActive }) =>
              clsx(
                'flex items-center px-6 py-3 text-neutral-600 hover:bg-neutral-100',
                isActive && 'bg-neutral-100 text-primary'
              )
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FileText size={20} className="mr-2" />
            Bills
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-0"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64">
        <div className="container">{children}</div>
      </main>
    </div>
  )
}