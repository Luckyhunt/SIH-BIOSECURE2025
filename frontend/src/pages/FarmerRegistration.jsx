import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector'; // Assuming this component exists

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [formData, setFormData] = useState({
    farmerName: '',
    mobileNumber: '',
    // Initialize with a default language
    preferredLanguage: 'en', 
    govId: '',
    photo: null,
  });

  // This list defines the languages available and is passed to the LanguageSelector
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ta', name: 'தமிழ்' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler to update the language state when the custom selector is used
  const handleLanguageChange = (newLangCode) => {
    setFormData(prev => ({
      ...prev,
      preferredLanguage: newLangCode,
    }));
    console.log('Preferred Language updated to:', newLangCode);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // NOTE: Replace alert with a custom modal in production apps
    alert('Registration successful! Language submitted was: ' + formData.preferredLanguage);
    navigate(-1); // Go back to previous page
  };

  // Add error boundary to catch any rendering issues
  try {
    console.log('FarmerRegistration component rendering...');
  } catch (error) {
    console.error('Error in FarmerRegistration:', error);
    return <div className="p-4 text-red-500">Error loading page: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Language Selector in Top Right (Now properly connected to state) */}
      <LanguageSelector 
        variant="compact" 
        position="top-right"
        className="bg-white/90 border-gray-200 text-gray-700 hover:bg-white"
        currentLanguage={formData.preferredLanguage}
        onLanguageChange={handleLanguageChange}
        availableLanguages={availableLanguages}
      />
      
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold">Farmer Registration</h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Container (Improved mobile padding: p-6 instead of p-4) */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* The old form-based language select was removed here */}

            {/* Farmer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farmer Name
              </label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                required
              />
            </div>

            {/* Government ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar / Gov ID
              </label>
              <input
                type="text"
                name="govId"
                value={formData.govId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
                required
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 bg-gray-50 hover:bg-white transition-colors flex flex-col items-center justify-center relative"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg p-1"
                  />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-green-500 mb-2" />
                    <p className="text-sm text-gray-600 font-semibold">Click to upload photo</p>
                    <p className="text-xs text-gray-500 mt-0.5">JPG or PNG (Max 5MB)</p>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-md"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FarmerRegistration;
