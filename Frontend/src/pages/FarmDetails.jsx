import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Star, ArrowLeft, Users, Egg, Activity, Calendar, Phone, Mail, Globe, Edit, Trash2, Settings, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const FARM_DETAILS = {
  '1': {
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
      'Climate-controlled housing',
      'Biosecurity measures',
      'Waste management system',
      'On-site veterinary care',
      'Egg processing unit'
    ],
    certifications: [
      'Organic Certification',
      'Animal Welfare Approved',
      'Food Safety Certified'
    ],
    photos: [
      'https://i.ibb.co/0nQxYJv/photo-1.jpg',
      'https://i.ibb.co/8XJvJXQ/photo-2.jpg',
      'https://i.ibb.co/0nQxYJv/photo-1.jpg'  // Using photo-1 twice as only two distinct photos were provided
    ]
  },
  '2': {
    id: '2',
    name: 'Sunrise Egg Farm',
    location: 'Farm District, State',
    type: 'Mixed Poultry',
    capacity: 2000,
    rating: 4.5,
    status: 'Caution',
    description: 'Family-owned farm with mixed poultry operations, providing fresh eggs and poultry products to local communities. We prioritize sustainable farming and animal welfare.',
    established: '2005',
    totalWorkers: 8,
    animalsVaccinated: true,
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'contact@sunrisefarm.com',
      website: 'www.sunrisefarm.com'
    },
    facilities: [
      'Free-range areas',
      'Feed storage facility',
      'Egg processing unit',
      'Veterinary care unit',
      'Organic feed production',
      'Composting system'
    ],
    certifications: [
      'Free Range Certification',
      'Local Farm Verified',
      'Organic Certified'
    ],
    photos: [
      'https://i.ibb.co/0nQxYJv/photo-1.jpg',
      'https://i.ibb.co/8XJvJXQ/photo-2.jpg',
      'https://i.ibb.co/0nQxYJv/photo-1.jpg'  // Using photo-1 twice as only two distinct photos were provided
    ]
  },
  '3': {
    id: '3',
    name: 'Heritage Broiler Farm',
    location: 'Rural County, State',
    type: 'Broiler Chickens',
    capacity: 800,
    rating: 4.9,
    status: 'Healthy',
    description: 'Specializing in heritage breed broiler chickens, raised with traditional methods and highest quality standards. We focus on slow-growth breeds for superior taste and texture.',
    established: '2015',
    totalWorkers: 6,
    animalsVaccinated: false,
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'heritage@broilerfarm.com',
      website: 'www.heritagebroilers.com'
    },
    facilities: [
      'Natural ventilation systems',
      'Outdoor access areas',
      'Feed mixing plant',
      'Processing facility',
      'On-site hatchery',
      'Feed storage silos'
    ],
    certifications: [
      'Heritage Breed Certified',
      'Humane Certified',
      'Non-GMO Project Verified',
      'Pasture Raised'
    ],
    photos: [
      'https://i.ibb.co/0nQxYJv/photo-1.jpg',
      'https://i.ibb.co/8XJvJXQ/photo-2.jpg',
      'https://i.ibb.co/0nQxYJv/photo-1.jpg'  // Using photo-1 twice as only two distinct photos were provided
    ]
  }
};

const FarmDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';
  const navigate = useNavigate();
  const { t } = useLanguage();

  const farm = id ? FARM_DETAILS[id] : null;

  if (!farm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{t('farmNotFound') || 'Farm not found'}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {isAdmin ? (
              <>
                <button 
                  onClick={() => {/* Handle edit */}} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" /> {t('editFarm')}
                </button>
                <button 
                  onClick={() => {/* Handle delete */}} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" /> {t('deleteFarm')}
                </button>
                <button 
                  onClick={() => {/* Handle manage */}} 
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" /> {t('manageFarm')}
                </button>
              </>
            ) : (
              <button className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                {t('contactFarm')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Blue for admin, purple for regular users */}
      <header className={`${isAdmin ? 'bg-blue-600' : 'bg-purple-600'} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20" 
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">{farm.name}</h1>
              {isAdmin && (
                <>
                  <span className="ml-2 px-2 py-1 text-xs bg-white/20 text-white rounded-full flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3" /> Admin Mode
                  </span>
                  <button 
                    className="ml-2 px-3 py-1 text-sm bg-white/10 text-white rounded-md hover:bg-white/20 flex items-center gap-1 border border-white/20"
                    onClick={() => console.log('Edit farm clicked')}
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <div className="flex gap-2">
                <button 
                  onClick={() => {}}
                  className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
                <button 
                  onClick={() => {}}
                  className="px-3 py-1.5 text-sm bg-yellow-600 hover:bg-yellow-700 text-white rounded-md flex items-center gap-1"
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Activity Log</span>
                </button>
              </div>
            )}
            <div className="relative">
              <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Farm Header */}
        <section className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{farm.name}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${farm.status === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {farm.status === 'Healthy' ? t('statusHealthy') : t('statusCaution')}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{farm.location}</span>
              </div>
              <div className="mt-2 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{farm.rating}</span>
                <span className="text-gray-500 ml-1">({Math.floor(Math.random() * 100) + 20} reviews)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg flex items-center">
                <Egg className="h-4 w-4 mr-2" />
                <span>{farm.type}</span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Capacity: {farm.capacity} birds</span>
              </div>
            </div>
          </div>
        </section>

        {/* Farm Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Farm */}
            <section className="bg-white rounded-xl shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">{t('aboutFarm') || 'About the Farm'}</h3>
              <p className="text-gray-700 mb-4">{farm.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">{t('established') || 'Established'}</h4>
                    <p className="font-medium">{farm.established}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">{t('totalWorkers') || 'Total Workers'}</h4>
                    <p className="font-medium">{farm.totalWorkers}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">{t('farmType') || 'Farm Type'}</h4>
                    <p className="font-medium">{farm.type}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8H4a5 5 0 014.5 2.67A6.97 6.97 0 007 16c0 .34.024.673.07 1h5.86z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">{t('animalsVaccinated') || 'Animals Vaccinated'}</h4>
                    <p className="font-medium">{farm.animalsVaccinated ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">{t('farmCapacity') || 'Farm Capacity'}</h4>
                    <p className="font-medium">{farm.capacity} birds</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Facilities */}
            <section className="bg-white rounded-xl shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">{t('facilities') || 'Facilities'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {farm.facilities.map((facility, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                    </div>
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Farm Photos */}
            <section className="bg-white rounded-xl shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">{t('farmPhotos') || 'Farm Photos'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {farm.photos.map((photo, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img 
                      src={photo} 
                      alt={`${farm.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            {farm.certifications.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4">{t('certifications') || 'Certifications'}</h3>
                <div className="flex flex-wrap gap-2">
                  {farm.certifications.map((cert, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <section className="bg-white rounded-xl shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">{t('contactInfo') || 'Contact Information'}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <a href={`tel:${farm.contact.phone}"`} className="text-purple-600 hover:underline">
                    {farm.contact.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <a href={`mailto:${farm.contact.email}"`} className="text-purple-600 hover:underline">
                    {farm.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                  </div>
                  <a 
                    href={`https://${farm.contact.website}"`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    {farm.contact.website}
                  </a>
                </div>
              </div>
            </section>

            {/* Farm Location */}
            <section className="bg-white rounded-xl shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">{t('location') || 'Location'}</h3>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  <MapPin className="h-12 w-12" />
                  <span className="sr-only">Map of {farm.location}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{farm.location}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// Add these to your translation files:
// 'editFarm': 'Edit Farm',
// 'deleteFarm': 'Delete Farm',
// 'manageFarm': 'Manage Farm',
// 'adminView': 'Admin View'

export default FarmDetails;
