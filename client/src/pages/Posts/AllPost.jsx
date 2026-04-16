import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, Filter, SortAsc, PlusCircle, LayoutGrid } from 'lucide-react';
import { useAuth } from '../../context/Auth';
import Layout from '../../components/layout/Layout';
import BirdCard from '../../components/shared/BirdCard';
import { CardSkeleton } from '../../components/ui/Skeleton';

const AllPost = () => {
  const { isLoggedIn, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [errorToastShown, setErrorToastShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtering & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_URL}/posts/`;
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  // Derive unique bird types for filter
  const birdTypes = useMemo(() => {
    const types = new Set(posts.map(p => p.birdType));
    return ['All', ...Array.from(types).sort()];
  }, [posts]);

  // Filter and Search Logic
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.address.toLowerCase().includes(query) ||
        p.birdType.toLowerCase().includes(query)
      );
    }

    // Type Filter
    if (selectedType !== 'All') {
      result = result.filter(p => p.birdType === selectedType);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [posts, searchQuery, selectedType, sortBy]);



  const extraActions = (
    <Link
      to="/create-post"
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-3 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 font-bold"
    >
      <PlusCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Report Sighting</span>
      <span className="sm:hidden">Report</span>
    </Link>
  );

  return (
    <Layout 
      title="Bird Sightings" 
      subtitle="Discover and track rescued or sighted birds in your community. Every report helps conservation."
      extraActions={extraActions}
    >
      {/* Filtering Section */}
      <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input 
            type="text"
            placeholder="Search by name, location, or type..."
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

      {/* Content Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <CardSkeleton key={i} />)}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-24 bg-neutral-950 border border-neutral-900 rounded-3xl border-dashed">
          <LayoutGrid className="w-16 h-16 text-neutral-800 mx-auto mb-6" />
          <h3 className="text-2xl text-neutral-300 font-bold mb-2">No sightings found</h3>
          <p className="text-neutral-500 max-w-sm mx-auto">
            {searchQuery || selectedType !== 'All' 
              ? "Try adjusting your search filters to find what you're looking for." 
              : "Be the first to share a bird record with the community!"}
          </p>
          {(searchQuery || selectedType !== 'All') && (
            <button 
              onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
              className="mt-6 text-orange-500 hover:text-orange-400 font-bold transition-colors"
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
              isOwner={false}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AllPost;

