import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#1F1F1F] text-white py-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-wrap justify-between">
                    {/* Logo & About Section */}
                    <div className="w-full md:w-2/5 mb-6 md:mb-0">
                        <h1 className="text-white text-2xl font-bold">IREAD</h1>
                        <p className="text-gray-300 mt-4 text-xl md:text-sm">
                            IREAD Online Learning Platform.
                            Unlock the power of artificial intelligence with cutting-edge tools and resources.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="w-full md:w-1/5 mb-6 md:mb-0">
                        <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
                        <ul className="text-gray-300 text-xl md:text-sm space-y-2">
                            <li>
                                <Link href="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/forum" className="hover:underline">
                                    Forum
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="w-full md:w-1/5 mb-6 md:mb-0">
                        <h2 className="text-white text-xl font-semibold mb-4">Legal</h2>
                        <ul className="text-gray-300 text-xl md:text-sm space-y-2">
                            <li>
                                <Link href="/privacy" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:underline">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:underline">
                                    FAQ
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full md:w-1/5">
                        <h2 className="text-white text-xl font-semibold mb-4">Contact Us</h2>
                        <p className="text-gray-300 text-xl md:text-sm">
                            Email: <Link href="mailto:support@aiuniverse.com" className="hover:underline">support@iread.com</Link>
                        </p>
                        <p className="text-gray-300 text-xl md:text-sm">
                            Phone: <Link href="tel:+1234567890" className="hover:underline">+123 456 7890</Link>
                        </p>
                        <div className="mt-4 flex space-x-4">

                            <Link href="#">
                                <i className="fa fa-facebook text-white" />
                            </Link>

                            <Link
                                href="#"

                            >
                                <i className="fa fa-twitter text-white" />
                            </Link>
                            <Link
                                href="#"
                            >
                                <i className="fa fa-linkedin text-white" />
                            </Link>
                            <Link
                                href="#"
                            >
                                <i className="fa fa-google-plus text-white" />
                            </Link>
                            <Link
                                href="#"
                            >
                                <i className="fa fa-instagram text-white" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 text-center text-xl md:text-sm text-gray-400 border-t border-gray-600 pt-6">
                    © {new Date().getFullYear()} IREAD. All rights reserved.
                    Developed by Tech Park IT
                </div>
            </div>
        </footer>
    );
};

export default Footer;
