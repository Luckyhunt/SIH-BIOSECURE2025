import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const FindSolution = () => {
  console.log('FindSolution component rendered');
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Log translation keys to ensure they're available
  console.log('Translation keys:', {
    back: t('back'),
    findSolution: t('findSolution'),
    findSolutionDescription: t('findSolutionDescription'),
    searchPlaceholder: t('searchPlaceholder'),
    search: t('search'),
    searching: t('searching'),
    resultsFor: t('resultsFor'),
    popularSolutions: t('popularSolutions'),
    searchingSolutions: t('searchingSolutions'),
    views: t('views'),
    watchNow: t('watchNow')
  });
  
  // Mock video data - in a real app, this would come from an API
  const mockVideos = [
    {
      id: '1',
      title: 'How to treat common plant diseases',
      description: 'Learn how to identify and treat common plant diseases in your crops',
      thumbnail: 'https://img.youtube.com/vi/abc123/0.jpg',
      duration: '8:45',
      views: '12.5K'
    },
    {
      id: '2',
      title: 'Organic pest control methods',
      description: 'Effective and natural ways to control pests without chemicals',
      thumbnail: 'https://img.youtube.com/vi/def456/0.jpg',
      duration: '10:20',
      views: '8.7K'
    },
    {
      id: '3',
      title: 'Best irrigation practices for small farms',
      description: 'Water conservation techniques for sustainable farming',
      thumbnail: 'https://img.youtube.com/vi/ghi789/0.jpg',
      duration: '15:30',
      views: '5.2K'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // In a real app, you would make an API call here
    console.log('Searching for:', searchQuery);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">{t('findSolution')}</h1>
          </div>
          <div className="relative">
            <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 placeholder:pl-1"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md ${
                isSearching || !searchQuery.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
              }`}
            >
              {isSearching ? t('searching') : t('search')}
            </button>
          </div>
        </form>

        {/* Results Section */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            {t('findSolutionDescription')}
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {searchQuery 
              ? `${t('resultsFor')} "${searchQuery}"` 
              : t('popularSolutions')}
          </h2>
          
          {isSearching ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('searchingSolutions')}...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative pt-[56.25%] bg-gray-200">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{video.views} {t('views')}</span>
                      <span className="mx-2">•</span>
                      <button className="text-green-600 hover:text-green-800">
                        {t('watchNow')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindSolution;