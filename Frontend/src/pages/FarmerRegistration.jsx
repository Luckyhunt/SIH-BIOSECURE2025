import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [formData, setFormData] = useState({
    farmerName: '',
    mobileNumber: '',
    preferredLanguage: 'en',
    govId: '',
    photo: null,
  });

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
    // Here you would typically send the data to your backend
    alert('Registration successful!');
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold">Farmer Registration</h1>
            </div>
            <LanguageSelector 
              variant="compact" 
              position="inline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Register Your Account
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Language Selector */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    {availableLanguages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Farmer Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Farmer Name
                  </label>
                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                </div>

                {/* Government ID */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Aadhaar / Government ID
                  </label>
                  <input
                    type="text"
                    name="govId"
                    value={formData.govId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter 12-digit Aadhaar number"
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                    required
                  />
                  <div className="flex items-center justify-center w-full">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 transition-colors bg-gray-50 hover:bg-gray-100"
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="h-full w-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                            <span className="bg-white/90 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
                              Change Photo
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <div className="p-3 bg-green-50 rounded-full mb-3">
                            <Upload className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Upload your photo
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG or PNG, max 5MB
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Complete Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerRegistration;
