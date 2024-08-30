import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 ">
            <div
                className="focus:outline-none border-t border-b border-gray-200 dark:border-gray-700 py-16 shadow-inner"
            >
                <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
                    <div className="lg:flex">
                        <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                            <div className="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Components
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Templates
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            FAQ
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            href="javascript:void(0)"
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Free components
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Changelog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex">
                            <div className="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>
                                        <a
                                            href="javascript:void(0)"
                                            className="focus:underline focus:outline-none text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                        >
                                            Privacy policy
                                        </a>
                                    </li>
                                    <li className="mt-6">
                                        <a
                                            className="focus:underline focus:outline-none text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                                            href="javascript:void(0)"
                                        >
                                            Terms of service
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                                <div className="flex items-center mb-6">
                                    <a aria-label="Github" href="javascript:void(0)">
                                        <div className="text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand">
                                            <svg
                                                className="footer-icon feather feather-github"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </div>
                                    </a>
                                    <a aria-label="Twitter" href="javascript:void(0)" className="ml-4">
                                        <div className="">
                                            <svg
                                                className="footer-icon feather feather-twitter text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-4 flex flex-col justify-center items-center shadow-none">
                <Link href="/" className="-m-1.5 p-1.5">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                        <span className="sr-only">Home</span>
                        Aluga<span className="text-blue-600">Car</span>
                    </h1>
                </Link>
                <div className="flex items-center mt-6">
                    <p className="text-base leading-4 dark:text-gray-50 text-gray-800">
                        2024©
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
