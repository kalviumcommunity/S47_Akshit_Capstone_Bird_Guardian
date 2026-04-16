import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Download } from 'lucide-react';

const Lightbox = ({ isOpen, onClose, imageUrl, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md"
        />

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full flex flex-col items-center gap-4"
        >
          <div className="relative group w-full flex justify-center">
            <img 
              src={imageUrl} 
              alt={title} 
              className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
                <a 
                    href={imageUrl} 
                    download 
                    className="p-3 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700/50 rounded-full text-white backdrop-blur-md transition-all"
                    title="Download Image"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Download className="w-5 h-5" />
                </a>
                <button 
                onClick={onClose}
                className="p-3 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700/50 rounded-full text-white backdrop-blur-md transition-all"
                title="Close"
                >
                <X className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="text-center px-4">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-neutral-400 text-sm">Bird Guardian Gallery</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Lightbox;
