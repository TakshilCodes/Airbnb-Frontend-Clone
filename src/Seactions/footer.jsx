import React, { useState } from "react";
import footerData from "../Constants/footer.json";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import glob from '../assets/Icons/web.png';

const Footer = () => {
    const [activeTab, setActiveTab] = useState("Popular");

    return (
        <footer className="bg-gray-50 text-black text-sm border-t border-gray-300 py-10 px-20 mt-85">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl font-medium mb-4">Inspiration for future getaways</h2>

                <div className="flex flex-wrap gap-6 border-b border-gray-300 pb-3 text-gray-500">
                    {Object.keys(footerData.tabs).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-medium transition-all hover:text-black ${activeTab === tab ? "text-black border-b-2 border-black" : ""
                                }`}
                        >
                            {tab}
                        </button>
                    ))}

                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6">
                    {footerData.tabs[activeTab]?.map((place, index) => (
                        <div key={index}>
                            <p className="font-medium text-sm">{place.name}</p>
                            <p className="text-gray-500 text-xs">{place.type}</p>
                        </div>
                    ))}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 border-t border-gray-300 pt-6">
                    <div>
                        <h3 className="font-medium">Support</h3>
                        <ul className="text-gray-500 text-sm mt-2 space-y-2">
                            {footerData.footerLinks.Support.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block hover:underline"
                                >
                                    {item}
                                </a>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium">Hosting</h3>
                        <ul className="text-gray-500 text-sm mt-2 space-y-2">
                            {footerData.footerLinks.Hosting.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block hover:underline"
                                >
                                    {item}
                                </a>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium">Airbnb</h3>
                        <ul className="text-gray-500 text-sm mt-2 space-y-2">
                            {footerData.footerLinks.Airbnb.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block hover:underline"
                                >
                                    {item}
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className="flex justify-between items-center border-t border-gray-300 mt-6 pt-4 text-gray-500 text-sm">
                    <p>&copy; 2025 Airbnb, Inc. &bull; Privacy &bull; Terms &bull; Sitemap &bull; Company details</p>
                    <div className="flex gap-4 items-center">
                        <p className="flex items-center gap-2 hover:bg-gray-200 p-3 cursor-pointer font-bold"><img src={glob} alt="glob" className="w-5 h-5" /> English (IN)</p>
                        <p className="hover:bg-gray-200 p-3 cursor-pointer font-bold">₹ INR</p>
                        <div className="flex gap-2">
                            <FaFacebook className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
                            <FaTwitter className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
                            <FaInstagram className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;