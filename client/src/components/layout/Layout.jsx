import React from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children, title, subtitle, extraActions }) => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500 rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Header */}
        {(title || subtitle || extraActions) && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title && (
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-3">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-neutral-400 text-lg max-w-xl">
                  {subtitle}
                </p>
              )}
            </motion.div>
            
            {extraActions && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4 w-full md:w-auto"
              >
                {extraActions}
              </motion.div>
            )}
          </div>
        )}

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
