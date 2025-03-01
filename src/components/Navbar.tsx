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
            <div className="ml-10 hidden space-x-8 lg:block">
              <a href="#" className="text-base font-medium text-gray-900 hover:text-blue-600 flex items-center">
                <Home className="mr-1 h-4 w-4" />
                Home
              </a>
              <a href="#features" className="text-base font-medium text-gray-900 hover:text-blue-600 flex items-center">
                <Database className="mr-1 h-4 w-4" />
                Features
              </a>
              <a href="#architecture" className="text-base font-medium text-gray-900 hover:text-blue-600 flex items-center">
                <Layers3 className="mr-1 h-4 w-4" />
                Architecture
              </a>
              <a href="#workflow" className="text-base font-medium text-gray-900 hover:text-blue-600 flex items-center">
                <Upload className="mr-1 h-4 w-4" />
                Workflow
              </a>
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-blue-600 hover:bg-gray-50"
            >
              Sign in
            </a>
            <a
              href="#"
              className="ml-4 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700"
            >
              Get started
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BoneUltrasound</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Home
                    </div>
                  </a>
                  <a
                    href="#features"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Database className="mr-2 h-5 w-5" />
                      Features
                    </div>
                  </a>
                  <a
                    href="#architecture"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Layers3 className="mr-2 h-5 w-5" />
                      Architecture
                    </div>
                  </a>
                  <a
                    href="#workflow"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Workflow
                    </div>
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg bg-blue-600 px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-blue-700 mt-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;