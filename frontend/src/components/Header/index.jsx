'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MdMenu, MdClose, MdLogout } from "react-icons/md";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="bg-white shadow">
      {/* Container para alinhar o conteúdo */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav aria-label="Global" className="flex items-center justify-between py-4">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                <span className="sr-only">Home</span>
                Aluga<span className="text-blue-600">Car</span>
              </h1>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <MdMenu className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">Home</Link>
            <Link href="/cars" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">Cars</Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">About</Link>
            {session && <Link href="/perfil" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">My Account</Link>}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {session ? (
              <button
                onClick={handleSignOut}
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center hover:text-gray-700"
              >
                <MdLogout className="mr-2" />
                Sign out
              </button>
            ) : (
              <div className="flex gap-4 items-center">
                <Link href="/auth/register" className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700">
                  Register
                </Link>
                <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10">
          <div className="fixed inset-0 bg-gray-500/75" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <h1 className="text-4xl font-bold text-gray-900">
                  Aluga<span className="text-blue-600">Car</span>
                </h1>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <MdClose className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-4 py-6 flex flex-col items-center">
                  <Link
                    href="/"
                    className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Home
                  </Link>
                  <Link
                    href="/cars"
                    className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cars
                  </Link>
                  <Link
                    href="/about"
                    className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    About
                  </Link>
                  {session && (
                    <Link
                      href="/perfil"
                      className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      My Account
                    </Link>
                  )}
                </div>
                <div className="py-6 flex flex-col items-center">
                  {session ? (
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Sign out
                    </button>
                  ) : (
                    <div className=" flex flex-col items-center gap-4 w-full">
                      <Link
                        href="/auth/register"
                        className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Register
                      </Link>

                      <Link
                        href="/auth/login"
                        className="block w-full text-center text-lg font-semibold text-gray-900 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Log in
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
