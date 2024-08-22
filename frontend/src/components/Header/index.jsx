'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-4xl lg:text-6xl font-bold text-gray-800">AlugaCar</span>
                </Link>

                <button 
                    className="md:hidden flex items-center" 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className="hidden md:flex space-x-4">
                    <Link href="/login" className="hover:text-gray-600 transition-colors duration-200">Login</Link>
                    <Link href="/register" className="hover:text-gray-600 transition-colors duration-200">Registro</Link>
                </div>
            </nav>

            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700`}>
                <Link href="/login" className="block px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-200">Login</Link>
                <Link href="/register" className="block px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-200">Registro</Link>
            </div>
        </header>
    );
};

export default Header;
