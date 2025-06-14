import React, { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Book,
    Code,
    Linkedin,
    Github,
    Calendar,
    GraduationCap,
    User,
    MessageCircle,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";

export default function ContactMe() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        purpose: "project",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
                purpose: "project",
            });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            details: "2022.ganesh.gupta@ves.ac.in",
            subtitle: "Best way to reach me",
        },
        {
            icon: Phone,
            title: "Phone",
            details: "+91 87797 06761",
            subtitle: "Available 9 AM - 9 PM",
        },
        {
            icon: MapPin,
            title: "Location",
            details: "VESIT College, Chembur, Mumbai",
            subtitle: "Maharashtra, India",
        },
    ];

    const purposeOptions = [
        "Academic Project",
        "Internship Opportunity",
        "Collaboration",
        "Freelance Work",
        "Study Group",
        "General Inquiry",
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/ganesh-gupta-b88bb2286/",
            color: "text-blue-400",
        },
        {
            icon: Github,
            name: "GitHub",
            url: "https://github.com/GaneshGupta3/",
            color: "text-gray-300",
        },
    ];

    return (
        <div className="min-h-screen pt-[80px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        Ganesh
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-xl text-gray-300 mb-2">
                        <GraduationCap className="w-6 h-6" />
                        <span>Final Year B.Tech IT Student</span>
                    </div>
                    <a href="http://vesit.ves.ac.in/" className="text-lg text-blue-300 font-medium">
                        Vivekanand Education Society's Institute of Technology
                        (VESIT)
                    </a>
                    <p className="text-gray-400 mt-2">
                        Passionate about technology, coding, and innovation
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Get in Touch
                            </h2>
                            <p className="text-gray-300">
                                Let's connect and discuss opportunities!
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <MessageCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-gray-300">
                                    Thanks for reaching out! I'll get back to
                                    you soon.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Purpose
                                    </label>
                                    <select
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    >
                                        {purposeOptions.map(
                                            (purpose, index) => (
                                                <option
                                                    key={index}
                                                    value={purpose
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-")}
                                                    className="bg-slate-800"
                                                >
                                                    {purpose}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Tell me about your project or opportunity..."
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Contact Information & Details */}
                    <div className="space-y-8 flex flex-col justify-between">
                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                                            <info.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-200">
                                                {info.details}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {info.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Academic Info */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Book className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">
                                    Academic Details
                                </h3>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex justify-between">
                                    <span className="font-medium">Course:</span>
                                    <span>B.Tech Information Technology</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Year:</span>
                                    <span>Final Year (4th Year)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        College:
                                    </span>
                                    <span>VESIT</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Status:</span>
                                    <span className="text-green-400">
                                        Available for Opportunities
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Platform links
                            </h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                                    >
                                        <social.icon
                                            className={`w-6 h-6 ${social.color}`}
                                        />
                                    </a>
                                ))}
                                <a
                                    href={"https://leetcode.com/ganesh310104/"}
                                    className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                                >
                                    <SiLeetcode className={`w-6 h-6`} />
                                </a>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="w-6 h-6 text-green-400" />
                                <h3 className="text-xl font-semibold text-white">
                                    Availability
                                </h3>
                            </div>
                            <div className="space-y-2 text-gray-300">
                                
                                <div className="text-sm text-green-400 mt-3">
                                    ✓ Open to internships and project
                                    collaborations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-16 text-gray-400">
                    <p>
                        Looking forward to connecting with fellow students,
                        professionals, and potential collaborators!
                    </p>
                </div>
            </div>
        </div>
    );
}
