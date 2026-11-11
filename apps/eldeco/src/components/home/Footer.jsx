import React from 'react';
import logo from "../../assets/logo.png"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Partners', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'API Status', href: '#' },
      { name: 'Community', href: '#' }
    ],
    contact: [
      { icon: <Mail className="w-4 h-4" />, text: 'hello@fintech.com', href: 'mailto:hello@fintech.com' },
      { icon: <Phone className="w-4 h-4" />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
      { icon: <MapPin className="w-4 h-4" />, text: '123 Tech Street, San Francisco, CA 94107', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="relative bg-[#0F172A] text-[#64748B] py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1E40AF] rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-14 mb-16">
          
          {/* LOGO + DESCRIPTION */}
          <div className="lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <img src={logo} alt="FinSight Logo" width={40} height={40}/>
              </div>
              <span className="text-2xl font-bold text-white">FINSIGHT</span>
            </div>

            <p className="text-[#64748B] mb-8 max-w-md leading-relaxed text-[15px]">
              Transform your financial documents into actionable insights with our AI-powered platform.
              Secure, accurate, and lightning-fast processing for modern businesses.
            </p>

            {/* NEWSLETTER */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-lg">Stay Updated</h3>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-xl bg-[#1E293B]/50 backdrop-blur-sm border border-[#334155] text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF]/50 transition-all"
                />
                <button className="bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white px-6 py-3 rounded-r-xl font-semibold shadow-[0_4px_16px_rgba(30,64,175,0.35)] hover:shadow-[0_6px_20px_rgba(30,64,175,0.45)] transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* COMPANY + SUPPORT + CONTACT IN SAME LINE */}
          <div className="flex flex-col sm:flex-row justify-between lg:w-1/2 gap-8 lg:gap-12">
            
            {/* COMPANY */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="flex items-center text-[#64748B] hover:text-[#22D3EE] transition-colors duration-200 group">
                      <ChevronRight className="w-4 h-4 mr-2 text-[#64748B] group-hover:text-[#22D3EE] transition-colors" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="flex items-center text-[#64748B] hover:text-[#22D3EE] transition-colors duration-200 group">
                      <ChevronRight className="w-4 h-4 mr-2 text-[#64748B] group-hover:text-[#22D3EE] transition-colors" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-4">
                {footerLinks.contact.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="mr-3 mt-0.5 text-[#64748B] group-hover:text-[#22D3EE] transition-colors">{item.icon}</span>
                    <a href={item.href} className="text-[#64748B] hover:text-[#22D3EE] transition-colors text-[15px] leading-relaxed">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 pt-8 border-t border-[#334155] flex flex-col md:flex-row justify-between items-center">
          
          {/* SOCIAL ICONS */}
          <div className="flex space-x-3 mb-6 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-11 h-11 rounded-xl bg-[#1E293B]/60 backdrop-blur-sm border border-[#334155] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#8B5CF6] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_16px_rgba(30,64,175,0.35)]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <div className="text-[#64748B] text-sm font-medium">
            © {new Date().getFullYear()} Finsight. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
