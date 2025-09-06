import { motion } from "framer-motion";
import { ChefHat, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Menu",
      link: "/menu",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
    {
      name: "Support",
      link: "/support",
    },
  ];
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">TasteHub</span>
              </div>
              <p className="text-slate-300 text-lg mb-6 max-w-md">
                Bringing delicious, high-quality food to your doorstep.
                Experience the perfect blend of taste, quality, and convenience.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map(
                  (social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-sm font-medium">{social[0]}</span>
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link to={item.link} reloadDocument={true}>
                      <motion.div
                        className="text-slate-300 hover:text-white transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div> */}

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Truck className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-slate-300">123 Food Street</p>
                    <p className="text-slate-300">Delhi, India 110001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400 text-xs">📞</span>
                  </div>
                  <p className="text-slate-300">+91 98765 43210</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400 text-xs">✉️</span>
                  </div>
                  <p className="text-slate-300">hello@tastehub.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 mb-4 md:mb-0">
            © 2025 TasteHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  whileHover={{ y: -1 }}
                >
                  {link}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
