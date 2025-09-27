import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ArrowLeft, Star, Check, MessageSquare } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const RecentVisits = () => {
  const navigate = useNavigate()

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const visits = [
    { 
      id: '1', 
      name: 'Green Valley Poultry Farm', 
      date: 'Today', 
      duration: '2 hours', 
      status: 'Completed',
      isRecent: true
    },
    { 
      id: '2', 
      name: 'Sunrise Poultry Farm', 
      date: 'Yesterday', 
      duration: '1.5 hours', 
      status: 'Completed',
      isRecent: false
    },
    { 
      id: '3', 
      name: 'Heritage Poultry Farm', 
      date: 'March 12, 2024', 
      duration: '2 hours', 
      status: 'Completed',
      isRecent: false
    }
  ]

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({ rating, feedback });
    setFeedbackSubmitted(true);
    setShowFeedbackForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Visitor theme) */}
      <header className="bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">Recent Visits</h1>
          </div>
          <div className="relative">
            <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-1">
            <Calendar className="h-5 w-5" />
            <span>Recent Visits</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Your farm visit history</p>

          <div className="space-y-4">
            {visits.map((v, _) => (
              <div key={v.id} className={`border rounded-lg overflow-hidden ${v.isRecent ? 'border-purple-300 bg-purple-50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium text-gray-900">{v.name}</div>
                    <div className="text-xs text-gray-500">Visited on {v.date}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">{v.status}</span>
                    <div className="text-xs text-gray-500 mt-1">Duration: {v.duration}</div>
                  </div>
                </div>
                
                {v.isRecent && !feedbackSubmitted && (
                  <div className="bg-purple-50 p-4 border-t border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-800">You recently visited this farm</span>
                      </div>
                      <button 
                        onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        {showFeedbackForm ? 'Cancel' : 'Give Feedback'}
                      </button>
                    </div>
                    
                    {showFeedbackForm && (
                      <form onSubmit={handleSubmitFeedback} className="mt-2 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            How was your experience?
                          </label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`p-1 rounded-full ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                <Star className="h-6 w-6 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                            Your feedback (optional)
                          </label>
                          <textarea
                            id="feedback"
                            rows={3}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            placeholder="Share your experience..."
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Submit Feedback
                        </button>
                      </form>
                    )}
                  </div>
                )}
                
                {v.isRecent && feedbackSubmitted && (
                  <div className="bg-green-50 p-4 border-t border-green-100">
                    <div className="flex items-center text-green-700">
                      <Check className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Thank you for your feedback!</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default RecentVisits
