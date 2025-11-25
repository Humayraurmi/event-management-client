import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Events', href: '/events' }, 
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Dashboard',
    links: [
      { name: 'Add Event', href: '/add-event' }, 
      { name: 'Manage Events', href: 'manage-events' }, 
    ],
  },
];

const socialIcons = [
    { icon: FaFacebook, href: 'https://facebook.com', name: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com', name: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com', name: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
          
          <div className="col-span-2 lg:col-span-2 pr-4">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-blue-400">Event<span className="text-gray-100">Pro</span></span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              Your comprehensive platform for managing and discovering amazing events worldwide.
            </p>
          </div>
          
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3 border-b border-blue-400/50 pb-1">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-6 md:space-y-0">
          
          <p className="text-sm text-gray-400 order-2 md:order-1">
            &copy; {currentYear} **EventPro**. All rights reserved.
          </p>
          
          <div className="flex space-x-6 order-1 md:order-2">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          
        </div>
      </div>
    </footer>
  );
}