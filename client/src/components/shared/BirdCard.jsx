import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Mail, Tag, Edit, Trash2, ArrowRight, Image as ImageIcon } from 'lucide-react';

const BirdCard = ({ 
  post, 
  isOwner, 
  onDelete, 
  index = 0 
}) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = React.useState(false);
  const getImageUrl = (postId) => `${import.meta.env.VITE_APP_URL}/posts/photo/${postId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden shadow-lg shadow-black/20 hover:border-orange-500/50 hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Area - Link to Detail */}
      <div 
        className="relative h-56 bg-neutral-800 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => navigate(`/posts/${post._id}`)}
      >
        {!imgError ? (
          <img 
            src={getImageUrl(post._id)} 
            alt={post.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-neutral-600">
            <ImageIcon className="w-10 h-10 opacity-20" />
            <span className="text-[10px] uppercase tracking-widest font-bold">No Image</span>
          </div>
        )}
        
        {/* Badges overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-neutral-950/70 backdrop-blur-md border border-neutral-700/50 text-orange-400 text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            {post.birdType}
          </span>
        </div>

        {/* View Detail Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                Learn More <ArrowRight className="w-3 h-3" />
            </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h2 
            className="text-xl font-bold text-white line-clamp-1 group-hover:text-orange-400 transition-colors cursor-pointer" 
            title={post.name}
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            {post.name}
          </h2>
          <span className="bg-neutral-800 text-neutral-300 text-[10px] px-2 py-1 rounded-md shrink-0 border border-neutral-700 font-bold uppercase tracking-wider">
            {post.birdColor}
          </span>
        </div>

        {post.description && (
          <p className="text-neutral-400 text-sm line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>
        )}

        <div className="space-y-2.5 mb-6 pt-4 border-t border-neutral-800/50">
          <div className="flex items-start gap-2.5 text-sm text-neutral-300">
            <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <span className="line-clamp-1 text-neutral-400" title={post.address}>{post.address}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-neutral-300">
            <Mail className="w-4 h-4 text-orange-500 shrink-0" />
            <span className="truncate text-neutral-400" title={post.email}>{post.email}</span>
          </div>
        </div>

        {/* Actions */}
        {isOwner ? (
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Link 
              to={`/update-post/${post._id}`} 
              className="flex justify-center items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2.5 px-4 rounded-xl text-sm font-bold transition-all border border-neutral-700 active:scale-95"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
            <button 
              onClick={() => onDelete && onDelete(post._id)}  
              className="flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 py-2.5 px-4 rounded-xl text-sm font-bold transition-all border border-red-500/20 hover:border-red-500/50 active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ) : (
             <Link 
                to={`/posts/${post._id}`}
                className="w-full flex justify-center items-center gap-2 bg-neutral-800 hover:bg-orange-500 hover:text-white text-neutral-300 py-2.5 px-4 rounded-xl text-sm font-bold transition-all border border-neutral-700 hover:border-orange-500 mt-auto"
            >
                View Record
                <ArrowRight className="w-4 h-4" />
            </Link>
        )}
      </div>
    </motion.div>
  );
};


export default BirdCard;
