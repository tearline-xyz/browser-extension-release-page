import { Database } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Database className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Tearline
              </span>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tearline. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
