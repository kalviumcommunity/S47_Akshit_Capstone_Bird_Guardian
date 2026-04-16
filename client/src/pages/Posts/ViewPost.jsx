import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Tag, 
  Palette, 
  Calendar, 
  ArrowLeft, 
  Share2,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import Skeleton from '../../components/ui/Skeleton';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_URL}/posts/${id}`;
      const response = await axios.get(url);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error("Could not find this bird sighting");
      navigate('/posts');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = post ? (() => {
    const date = post.createdAt ? new Date(post.createdAt) : new Date(parseInt(post._id.substring(0, 8), 16) * 1000);
    return isNaN(date.getTime()) ? null : date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  })() : null;

  if (isLoading) {
    return (
      <Layout title="Loading Sighting...">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 rounded-xl" />
              <Skeleton className="h-6 w-1/4 rounded-lg" />
              <div className="space-y-4 pt-10">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) return null;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors font-medium border border-neutral-800 hover:border-neutral-700 px-4 py-2 rounded-xl bg-neutral-900/50 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Feed
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-3xl blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl shadow-black/50 bg-neutral-900 flex items-center justify-center min-h-[400px]">
              {!imgError ? (
                  <img 
                    src={`${import.meta.env.VITE_APP_URL}/posts/photo/${post._id}`} 
                    alt={post.name}
                    className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto max-h-[700px]"
                    onError={() => setImgError(true)}
                  />
              ) : (
                  <div className="flex flex-col items-center gap-4 text-neutral-600 p-20 py-40">
                      <ImageIcon className="w-20 h-20 opacity-20" />
                      <div className="text-center">
                          <h3 className="text-white font-bold text-lg">No Image</h3>
                          <p className="text-neutral-500 text-sm">A photo was not attached to this sighting report.</p>
                      </div>
                  </div>
              )}
            </div>
            {/* Dynamic Badge */}
            <div className="absolute top-6 left-6">
                <span className="bg-neutral-950/80 backdrop-blur-xl border border-neutral-700 text-orange-400 font-bold px-4 py-2 rounded-2xl shadow-lg uppercase tracking-widest text-xs">
                    {post.birdType}
                </span>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="space-y-8"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                {post.name}
              </h1>
              <div className="flex flex-wrap gap-4 items-center text-neutral-400 text-sm">
                 {formattedDate && (
                   <>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>Reported on {formattedDate}</span>
                    </div>
                    <span className="w-1 h-1 bg-neutral-700 rounded-full hidden sm:block" />
                   </>
                 )}
                 <div className="flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-orange-500" />
                    <span>ID: {post._id.substring(post._id.length - 8)}</span>
                 </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-2xl flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Dominant Color</span>
                  <div className="flex items-center gap-2">
                     <Palette className="w-5 h-5 text-orange-500" />
                     <span className="text-white font-bold">{post.birdColor}</span>
                  </div>
               </div>
               <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-2xl flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Species Group</span>
                  <div className="flex items-center gap-2">
                     <Tag className="w-5 h-5 text-orange-500" />
                     <span className="text-white font-bold">{post.birdType}</span>
                  </div>
               </div>
            </div>

            {/* Location & Contact */}
            <div className="space-y-4">
               <div className="flex items-start gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800/50">
                  <div className="p-3 bg-orange-500/10 rounded-xl">
                     <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Sighting Location</h4>
                    <p className="text-white font-medium">{post.address}</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800/50">
                  <div className="p-3 bg-orange-500/10 rounded-xl">
                     <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Reporter Contact</h4>
                    <p className="text-white font-medium">{post.email}</p>
                  </div>
               </div>
            </div>

            {/* Description Section */}
            <div className="pt-6 border-t border-neutral-800">
               <h3 className="text-xl font-bold text-white mb-4">Detailed Observation</h3>
               <div className="prose prose-invert max-w-none">
                 <p className="text-neutral-300 leading-relaxed text-lg whitespace-pre-wrap">
                   {post.description}
                 </p>
               </div>
            </div>

            {/* Share / Actions Area */}
            <div className="pt-8 flex flex-wrap gap-4">
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                    }}
                    className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-xl border border-neutral-800 transition-all font-bold active:scale-95"
                >
                    <Share2 className="w-5 h-5 text-orange-500" />
                    Share Sighting
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPost;
