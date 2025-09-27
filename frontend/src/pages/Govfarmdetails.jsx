import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Star, Phone, Mail, Globe } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const FarmDetailsPage = () => {
  const navigate = useNavigate();
  const [farm] = useState({
    id: '1',
    name: 'Green Valley Poultry Farm',
    location: 'Agriculture City, State',
    type: 'Layer Chickens',
    capacity: 1500,
    rating: 4.8,
    status: 'Healthy',
    description: 'A leading poultry farm specializing in free-range egg production with a focus on animal welfare and sustainable farming practices. Our farm maintains the highest standards of hygiene and animal care.',
    established: '2010',
    totalWorkers: 12,
    animalsVaccinated: true,
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@greenvalleyfarm.com',
      website: 'www.greenvalleyfarm.com'
    },
    facilities: [
      'Automated feeding system',
      'Biosecurity measures', 
      'On-site veterinary care',
      'Climate-controlled housing',
      'Waste management system',
      'Egg processing unit'
    ],
    certifications: [
      'Organic Certification',
      'Animal Welfare Approved',
      'Food Safety Certified'
    ],
    photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg']
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate(-1)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-lg font-medium">{farm.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Farm Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{farm.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{farm.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{farm.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">(64 reviews)</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {farm.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Layer Chickens</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Capacity: 1500 birds</span>
                </div>
              </div>
            </div>

            {/* About the Farm */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About the Farm</h2>
              <p className="text-gray-600 mb-6">{farm.description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Established</div>
                    <div className="text-gray-900">{farm.established}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Total Workers</div>
                    <div className="text-gray-900">{farm.totalWorkers}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Farm Type</div>
                    <div className="text-gray-900">{farm.type}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Animals Vaccinated</div>
                    <div className="text-gray-900">{farm.animalsVaccinated ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Farm Capacity</div>
                    <div className="text-gray-900">{farm.capacity} birds</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h2>
              <div className="grid grid-cols-2 gap-3">
                {farm.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Farm Photos */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Farm Photos</h2>
              <div className="grid grid-cols-3 gap-4">
                {farm.photos.map(( index) => (
                  <div key={index} className="aspect-square bg-blue-400 rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-lg font-semibold">imgbb.com</div>
                      <div className="text-sm">image not found</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {farm.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-500 mr-3" />
                  <span className="text-blue-600">{farm.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-3" />
                  <span className="text-blue-600">{farm.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-blue-500 mr-3" />
                  <span className="text-blue-600">{farm.contact.website}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                <MapPin className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">{farm.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetailsPage;