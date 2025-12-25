import { Code, Github, Heart, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <Code className="text-white w-6 h-6" />
                            </div>
                            <span className="ml-3 text-xl font-bold text-white">
                                Synergy Solver
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                            Empowering students with real-world development challenges and collaborative learning experiences.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/GaneshGupta3/synergysolver.git" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Github className="w-5 h-5 text-gray-300" />
                            </a>
                            
                            <a href="https://www.linkedin.com/in/ganesh-gupta-b88bb2286/" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Linkedin className="w-5 h-5 text-gray-300" />
                            </a>
                        </div>
                    </div>

                    {/* Community Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-lg">
                            Community
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://discord.gg/6qejywM2"
                                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></span>
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-lg">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/contactus"
                                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></span>
                                    Contact Us
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; 2025 Synergy Solver. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for students
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;