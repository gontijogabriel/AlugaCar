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
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AlugaCar</span>
            <img alt="AlugaCar logo" src='logo.svg' className="h-16 w-auto" />
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
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900">Home</a>
          <a href="/cars" className="text-sm font-semibold leading-6 text-gray-900">Cars</a>
          <a href="/about" className="text-sm font-semibold leading-6 text-gray-900">About</a>
          {session ? (
            <a href="/perfil" className="text-sm font-semibold leading-6 text-gray-900">My Account</a>
          ) : ''}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session ? (
            <button
                onClick={handleSignOut}
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center"
                >
                <MdLogout className="mr-2" />
                Sign out
            </button>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10">
          <div className="fixed inset-0 bg-gray-500/75" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">AlugaCar</span>
                <img alt="AlugaCar logo" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
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
                <div className="space-y-2 py-6">
                  <a href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Home
                  </a>
                  <a href="/cars" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Cars
                  </a>
                  <a href="/about" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    About
                  </a>
                  {session ? (
                    <a href="/perfil" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        My Account
                    </a>
                  ) : ''}
                </div>
                <div className="py-6">
                  {session ? (
                    <button
                      onClick={handleSignOut}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  ) : (
                    <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Log in
                    </a>
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
