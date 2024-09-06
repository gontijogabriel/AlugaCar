import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-4 xl:px-12 2xl:px-4">
                <div className="lg:flex justify-between">
                    <div className="mb-6 lg:mb-0 lg:w-1/3">
                        <Link href="/" className="flex items-center text-gray-900 dark:text-gray-50">
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                Aluga<span className="text-blue-600">Car</span>
                            </h1>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                            A melhor plataforma para alugar o carro dos seus sonhos. Encontre diversas opções e escolha o carro perfeito para sua viagem.
                        </p>
                    </div>
                    <div className="lg:w-2/3 flex justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-gray-900 dark:text-gray-50 font-semibold mb-4">Recursos</h2>
                            <Link href="/components" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                Components
                            </Link>
                            <Link href="/templates" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2">
                                Templates
                            </Link>
                            <Link href="/pricing" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2">
                                Pricing
                            </Link>
                            <Link href="/faq" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2">
                                FAQ
                            </Link>
                            <Link href="/documentation" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2">
                                Documentation
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-gray-900 dark:text-gray-50 font-semibold mb-4">Legal</h2>
                            <Link href="/privacy-policy" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className="text-sm text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2">
                                Terms of Service
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-gray-900 dark:text-gray-50 font-semibold mb-4">Siga-nos</h2>
                            <div className="flex items-center space-x-4">
                                <a aria-label="Github" href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.167 6.84 9.489.5.091.682-.217.682-.481 0-.237-.008-.868-.013-1.704-2.782.604-3.369-1.34-3.369-1.34-.455-1.152-1.11-1.46-1.11-1.46-.907-.621.069-.609.069-.609 1.003.07 1.532 1.031 1.532 1.031.892 1.531 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.252-4.555-1.111-4.555-4.948 0-1.092.39-1.984 1.029-2.683-.103-.253-.446-1.268.098-2.64 0 0 .84-.27 2.75 1.024A9.557 9.557 0 0112 5.803a9.54 9.54 0 012.502.337c1.91-1.293 2.75-1.024 2.75-1.024.544 1.372.202 2.387.099 2.64.64.699 1.029 1.591 1.029 2.683 0 3.845-2.337 4.693-4.566 4.94.36.31.68.923.68 1.859 0 1.341-.012 2.423-.012 2.752 0 .267.18.578.688.48A10.001 10.001 0 0022 12c0-5.52-4.48-10-10-10z" />
                                    </svg>
                                </a>
                                <a aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 AlugaCar. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
