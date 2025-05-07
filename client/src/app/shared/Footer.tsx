import Link from "next/link";
import React from "react";
import { getSettingValue } from "../../api/settingValuesApi";
import Image from "next/image";

interface SettingValue {
  value: string;
}

const Footer = async () => {
    const footerLogo = await getSettingValue('Footer Logo') || "/client/public/frontend/images/logo-white-footer.png";
    const siteShortDes = await getSettingValue('Site short description (Max 100 characters)') || "IREAD Online Learning Platform. Unlock the power of artificial intelligence with cutting-edge tools and resources.";
    const contactPhone1 = await getSettingValue('Contact phone1') || '';
    const contactPhone2 = await getSettingValue('Contact phone2') || '';
    const contactPhone3 = await getSettingValue('Contact phone3') || '';
    const contactEmail1 = await getSettingValue('Contact email1') || '';
    const contactEmail2 = await getSettingValue('Contact email2') || '';
    const contactEmail3 = await getSettingValue('Contact email3') || '';
    const facebook = await getSettingValue('Facebook') || '#';
    const twitter = await getSettingValue('Twitter') || '#';
    const instagram = await getSettingValue('Instagram') || '#';
    const linkedin = await getSettingValue('LinkedIn') || '#';
    const youtube = await getSettingValue('YouTube') || '#';
    const pinterest = await getSettingValue('Pinterest') || '#';

    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <footer className="bg-[#1F1F1F] text-white py-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-wrap justify-between">
                    {/* Logo & About Section */}
                    <div className="w-full md:w-2/5 mb-6 md:mb-0">
                        {
                            footerLogo && typeof footerLogo !== 'string' && footerLogo.value ? (
                                <Image
                                    src={`${BASE_URL}/${footerLogo.value}`}
                                    width={100}
                                    height={100}
                                    alt="Footer Logo"
                                />
                            ) : (
                                <span>IRED</span>
                            )
                        }
                        <p className="text-gray-300 mt-4 text-xl md:text-sm">
                            {typeof siteShortDes === 'string' ? siteShortDes : siteShortDes?.value}
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
                            <strong>Email: </strong>
                            <Link href={`mailto:${typeof contactEmail1 === 'string' ? contactEmail1 : contactEmail1?.value}`} className="hover:underline">
                                {typeof contactEmail1 === 'string' ? contactEmail1 : contactEmail1?.value}
                            </Link>,{' '}
                            <Link href={`mailto:${typeof contactEmail2 === 'string' ? contactEmail2 : contactEmail2?.value}`} className="hover:underline">
                                {typeof contactEmail2 === 'string' ? contactEmail2 : contactEmail2?.value}
                            </Link>,{' '}
                            <Link href={`mailto:${typeof contactEmail3 === 'string' ? contactEmail3 : contactEmail3?.value}`} className="hover:underline">
                                {typeof contactEmail3 === 'string' ? contactEmail3 : contactEmail3?.value}
                            </Link>
                        </p>
                        <p className="text-gray-300 text-xl md:text-sm">
                            <strong>Phone: </strong>
                            <Link href={`tel:${typeof contactPhone1 === 'string' ? contactPhone1 : contactPhone1?.value}`} className="hover:underline">
                                {typeof contactPhone1 === 'string' ? contactPhone1 : contactPhone1?.value}
                            </Link>,{' '}
                            <Link href={`tel:${typeof contactPhone2 === 'string' ? contactPhone2 : contactPhone2?.value}`} className="hover:underline">
                                {typeof contactPhone2 === 'string' ? contactPhone2 : contactPhone2?.value}
                            </Link>,{' '}
                            <Link href={`tel:${typeof contactPhone3 === 'string' ? contactPhone3 : contactPhone3?.value}`} className="hover:underline">
                                {typeof contactPhone3 === 'string' ? contactPhone3 : contactPhone3?.value}
                            </Link>
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <Link href={`${typeof facebook === 'string' ? facebook : facebook?.value}`}>
                                <i className="fa fa-facebook text-white" />
                            </Link>
                            <Link href={`${typeof twitter === 'string' ? twitter : twitter?.value}`}>
                                <i className="fa fa-twitter text-white" />
                            </Link>
                            <Link href={`${typeof linkedin === 'string' ? linkedin : linkedin?.value}`}>
                                <i className="fa fa-linkedin text-white" />
                            </Link>
                            <Link href={`${typeof youtube === 'string' ? youtube : youtube?.value}`}>
                                <i className="fa fa-youtube text-white" />
                            </Link>
                            <Link href={`${typeof instagram === 'string' ? instagram : instagram?.value}`}>
                                <i className="fa fa-instagram text-white" />
                            </Link>
                            <Link href={`${typeof pinterest === 'string' ? pinterest : pinterest?.value}`}>
                                <i className="fa fa-pinterest text-white" />
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
