import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Define prop types for components
const questionShape = {
  id: String,
  author: String,
  authorAvatar: String,
  title: String,
  description: String,
  timeAgo: String,
  likes: Number,
  answers: Number,
};

const answerShape = {
  id: String,
  author: String,
  authorAvatar: String,
  content: String,
  timeAgo: String,
  likes: Number,
};

const trendingQuestionShape = {
  id: String,
  title: String,
  answers: Number,
};

const FindSolution = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [questionText, setQuestionText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const trendingQuestions = [
    {
      id: '1',
      title: 'How to improve soil quality for better crop yield?',
      answers: 11
    },
    {
      id: '2',
      title: 'Best irrigation practices for a small farm with limited water supply?',
      answers: 15
    },
    {
      id: '3',
      title: 'What are the signs of nitrogen deficiency in corn?',
      answers: 7
    },
    {
      id: '4',
      title: 'How to properly store harvested potatoes for winter?',
      answers: 9
    }
  ];

  const questions = [
    {
      id: '1',
      author: 'Ravi Kumar',
      authorAvatar: 'RK',
      title: 'What are the best organic methods to control aphids on my tomato plants?',
      description: "I've been noticing a lot of aphids on my tomato plants lately. I'm looking for effective organic solutions that won't harm the plants or beneficial insects. Any suggestions would be greatly appreciated!",
      timeAgo: '2 hours ago',
      likes: 12,
      answers: 5
    },
    {
      id: '2',
      author: 'Priya Sharma',
      authorAvatar: 'PS',
      title: 'How to improve soil quality for better vegetable growth?',
      description: 'My vegetable garden soil seems to be losing its fertility. What are some natural ways to enrich the soil and improve its quality for better vegetable growth?',
      timeAgo: '5 hours ago',
      likes: 8,
      answers: 3
    },
    {
      id: '3',
      author: 'Amit Patel',
      authorAvatar: 'AP',
      title: 'Best time to water plants in summer?',
      description: 'With the summer heat increasing, I want to know the optimal time to water my garden to ensure maximum water absorption and minimum evaporation.',
      timeAgo: '1 day ago',
      likes: 15,
      answers: 7
    },
    {
      id: '4',
      author: 'Sunita Devi',
      authorAvatar: 'SD',
      title: 'Natural pest control for my organic farm',
      description: 'I recently started an organic farm and want to avoid chemical pesticides. What are some effective natural pest control methods that have worked for you?',
      timeAgo: '2 days ago',
      likes: 22,
      answers: 11
    }
  ];

  const answers = [
    {
      id: '1',
      author: 'Sunita Sharma',
      authorAvatar: 'SS',
      content: "You can try a simple soap spray. Mix a few drops of mild dish soap with water and spray it directly on the aphids. It's safe for the plants and very effective.",
      timeAgo: '1 hour ago',
      likes: 8
    },
    {
      id: '2',
      author: 'Amit Patel',
      authorAvatar: 'AP',
      content: "Ladybugs are natural predators of aphids. You can buy them from a garden store and release them on your plants. It's a great long-term solution.",
      timeAgo: '45 minutes ago',
      likes: 4
    },
    {
      id: '3',
      author: 'Rajesh Singh',
      authorAvatar: 'RS',
      content: "Neem oil is another great organic pesticide. Mix it with water and a bit of soap, and spray it on the plants. It's effective against aphids and other pests too.",
      timeAgo: '30 minutes ago',
      likes: 6
    },
    {
      id: '4',
      author: 'Neha Gupta',
      authorAvatar: 'NG',
      content: "I've had success with companion planting. Planting garlic, chives, or onions near your tomatoes can help repel aphids naturally.",
      timeAgo: '20 minutes ago',
      likes: 3
    },
    {
      id: '5',
      author: 'Vikram Mehta',
      authorAvatar: 'VM',
      content: "A strong jet of water from a hose can knock aphids off your plants. Do this in the morning so the plants can dry during the day and avoid fungal diseases.",
      timeAgo: '15 minutes ago',
      likes: 5
    }
  ];

  const handlePostQuestion = () => {
    if (questionText.trim()) {
      console.log('Posting question:', questionText);
      setQuestionText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-green-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-lg font-medium">{t('findSolution') || 'findSolution'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full"></div>
              <span className="text-sm">English</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search for questions, topics, or people"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-180px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            {/* Questions Feed */}
            {questions.map((question) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                    {question.authorAvatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{question.author}</span>
                      <span className="text-sm text-gray-500">{question.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h3>
                <p className="text-gray-600 mb-4">{question.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 border-b border-gray-200 pb-4 mb-4">
                  <button className="flex items-center space-x-1 hover:text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{question.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>{question.answers} Answers</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-600">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Answers Section */}
                <div className="space-y-4">
                  {answers.map((answer) => (
                    <div key={answer.id} className="pl-4 border-l-2 border-gray-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700 flex-shrink-0">
                          {answer.authorAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900 text-sm">{answer.author}</span>
                            <span className="text-xs text-gray-500">{answer.timeAgo}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{answer.content}</p>
                          <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-green-600">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{answer.likes}</span>
                            </button>
                            <button className="text-xs text-gray-500 hover:text-green-600">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 h-full flex flex-col gap-4">
            {/* Ask a Question Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ask a question</h3>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={5}
                placeholder="Type your question here..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handlePostQuestion}
                  disabled={!questionText.trim()}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    questionText.trim()
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            </div>

            {/* Trending Questions */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex-1 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Questions</h3>
              <div className="space-y-4">
                {trendingQuestions.map((question) => (
                  <div key={question.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-1 hover:text-green-600 cursor-pointer">
                      {question.title}
                    </h4>
                    <span className="text-xs text-gray-500">{question.answers} Answers</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
FindSolution.propTypes = {
  // Add any props validation if needed
};

export default FindSolution;