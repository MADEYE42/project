import React from 'react';
import { Home, Upload, Database, User, LogIn, Menu, X, Activity, Layers3 } from 'lucide-react';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BoneUltrasound</span>
            </a>
            <div className="ml-10 hidden space-x-8 lg:flex">
              {[
                { href: '#', icon: <Home className="mr-1 h-4 w-4" />, label: 'Home' },
                { href: '#features', icon: <Database className="mr-1 h-4 w-4" />, label: 'Features' },
                { href: '#architecture', icon: <Layers3 className="mr-1 h-4 w-4" />, label: 'Architecture' },
                { href: '#workflow', icon: <Upload className="mr-1 h-4 w-4" />, label: 'Workflow' }
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-base font-medium text-gray-900 hover:text-blue-600 flex items-center">
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <a href="#" className="px-4 py-2 text-base font-medium text-blue-600 hover:bg-gray-50 rounded-md border border-transparent bg-white">Sign in</a>
            <a href="#" className="ml-4 px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent">Get started</a>
          </div>
          <div className="lg:hidden">
            <button type="button" className="p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-75 flex justify-end">
          <div className="w-full max-w-sm bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 relative">
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BoneUltrasound</span>
              </a>
              <button type="button" className="p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { href: '#', icon: <Home className="mr-2 h-5 w-5" />, label: 'Home' },
                { href: '#features', icon: <Database className="mr-2 h-5 w-5" />, label: 'Features' },
                { href: '#architecture', icon: <Layers3 className="mr-2 h-5 w-5" />, label: 'Architecture' },
                { href: '#workflow', icon: <Upload className="mr-2 h-5 w-5" />, label: 'Workflow' }
              ].map((item) => (
                <a key={item.label} href={item.href} className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  {item.icon}
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <a href="#" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Sign in</a>
                <a href="#" className="block px-3 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 mt-3 rounded-md text-center" onClick={() => setMobileMenuOpen(false)}>Get started</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
