import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, Filter, SortAsc, PlusCircle, LayoutGrid, Ghost } from 'lucide-react';
import { useAuth } from '../../context/Auth';
import Layout from '../../components/layout/Layout';
import BirdCard from '../../components/shared/BirdCard';
import { CardSkeleton } from '../../components/ui/Skeleton';
import ConfirmModal from '../../components/ui/ConfirmModal';

const MyPosts = () => {
  const { isLoggedIn, token, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtering & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null, isDeleting: false });

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_URL}/posts/myposts`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      toast.error("Failed to fetch your sightings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (postId) => {
    setDeleteModal({ isOpen: true, postId, isDeleting: false });
  };

  const confirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      const url = `${import.meta.env.VITE_APP_URL}/posts/delete/${deleteModal.postId}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Sighting removed successfully");
      setPosts(posts.filter(p => p._id !== deleteModal.postId));
      setDeleteModal({ isOpen: false, postId: null, isDeleting: false });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Failed to delete sighting");
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  // Derive unique bird types
  const birdTypes = useMemo(() => {
    const types = new Set(posts.map(p => p.birdType));
    return ['All', ...Array.from(types).sort()];
  }, [posts]);

  // Filter Logic
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.address.toLowerCase().includes(query)
      );
    }

    if (selectedType !== 'All') {
      result = result.filter(p => p.birdType === selectedType);
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [posts, searchQuery, selectedType, sortBy]);



  const headerActions = (
    <div className="flex gap-4">
      <Link
        to="/posts"
        className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 py-3 px-6 rounded-xl hover:bg-neutral-800 transition-all font-bold"
      >
        All Feed
      </Link>
      <Link
        to="/create-post"
        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-3 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 font-bold"
      >
        <PlusCircle className="w-5 h-5" />
        New Record
      </Link>
    </div>
  );

  return (
    <Layout 
      title="My Sightings" 
      subtitle="History of your contributions to bird conservation. You can edit or remove your reports here."
      extraActions={headerActions}
    >
      {/* Filtering Section */}
      {posts.length > 0 && (
        <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                    type="text"
                    placeholder="Search your sightings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-48">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-orange-500/50 transition-colors cursor-pointer text-sm"
                    >
                        {birdTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="relative flex-1 md:w-48">
                    <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-orange-500/50 transition-colors cursor-pointer text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name">Bird Name</option>
                    </select>
                </div>
            </div>
        </div>
      )}

      {/* Content Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <CardSkeleton key={i} />)}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-neutral-800 border-dashed">
          <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ghost className="w-10 h-10 text-neutral-600" />
          </div>
          <h3 className="text-xl text-neutral-300 font-bold mb-2">
            {posts.length === 0 ? "You haven't reported any sightings yet" : "No matching sightings found"}
          </h3>
          <p className="text-neutral-500 mb-8 max-w-xs mx-auto">
            {posts.length === 0 
              ? "Your contributions help protect our local bird life and build a safer environment." 
              : "Try adjusting your search query or filters."}
          </p>
          {posts.length === 0 ? (
            <Link 
              to="/create-post"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
            >
                Start Reporting <PlusCircle className="w-5 h-5" />
            </Link>
          ) : (
            <button 
                onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
                className="text-orange-500 hover:text-orange-400 font-bold transition-colors"
            >
                Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post, index) => (
            <BirdCard 
              key={post._id} 
              post={post} 
              index={index}
              isOwner={true}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Overlays */}
      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        isLoading={deleteModal.isDeleting}
        onClose={() => setDeleteModal({ isOpen: false, postId: null, isDeleting: false })}
        onConfirm={confirmDelete}
        title="Delete Sighting"
        description="Are you sure you want to permanently remove this bird sighting record? This action cannot be reversed."
        confirmText="Remove Record"
      />
    </Layout>
  );
};

export default MyPosts;

