import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, RefreshCw, QrCode, ArrowLeft } from 'lucide-react';
// import VetFooter from '../components/VetFooter';
import LanguageSelector from '../components/LanguageSelector';

const hasBarcodeDetector = () => {
  return typeof window !== 'undefined' && 'BarcodeDetector' in window;
};

const QR_FORMATS = ['qr_code'];

const VetScanFarmQR = () => {
  const navigate = useNavigate();
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);

  const [active, setActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [error, setError] = useState(null);

  const stopCamera = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    }
    setActive(false);
  };

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);

      if (hasBarcodeDetector()) {
        const BD = window.BarcodeDetector;
        detectorRef.current = new BD({ formats: QR_FORMATS });
        tick(); // start scanning loop
      } else {
        setError('QR code scanning is not supported in this browser.');
      }
    } catch (e) {
      console.error(e);
      setError('Camera permission denied. Please allow camera access to scan QR codes.');
      stopCamera();
    }
  };

  const tick = async () => {
    if (!videoRef.current || !canvasRef.current || !detectorRef.current) {
      return;
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const bitmap = canvas.transferControlToOffscreen
        ? canvas.transferControlToOffscreen()
        : canvas;
      const codes = await detectorRef.current.detect(bitmap);
      if (codes && codes.length > 0) {
        const code = codes[0];
        const text = code.rawValue || code.rawValue === '' ? code.rawValue : code?.rawValue ?? '';
        if (text) {
          stopCamera();
          // Navigate to farm details with the scanned ID
          navigate(`/vet/farm/${text}`);
        }
      }
    } catch (e) {
      console.error('Error detecting QR code:', e);
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Farm Check-in</h1>
          </div>
          <div className="relative">
            <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                <QrCode className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Scan Farm QR Code
              </h2>
              <p className="text-gray-600">
                Point your camera at the farm QR code to check in
              </p>
            </div>

            {/* Camera Preview */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
              {!active ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Camera preview will appear here</p>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute inset-0 border-4 border-orange-400 rounded-lg pointer-events-none" />
                </>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
                  <div className="text-center bg-white rounded-lg p-4 max-w-xs">
                    <p className="text-sm text-red-600 mb-3">{error}</p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <button
                type="button"
                onClick={toggleCamera}
                className="p-3 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                title="Switch Camera"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              {!active ? (
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center gap-2 transition-colors min-w-[140px] justify-center"
                >
                  <Camera className="h-5 w-5" />
                  Open Camera
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors min-w-[140px] justify-center"
                >
                  <Camera className="h-5 w-5" />
                  Close Camera
                </button>
              )}
            </div>


            {/* Instructions */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <h3 className="text-sm font-medium text-orange-800 mb-2">Instructions:</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Point your camera directly at the QR code</li>
                <li>• Ensure good lighting for better scanning</li>
                <li>• Hold steady until the code is detected</li>
                <li>• You can also enter the Farm ID manually if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      {/* <VetFooter /> */}
      <footer className='bg-gray-900 text-white py-6 px-4 mt-8'>
  <div className='max-w-7xl mx-auto'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center sm:text-left'>
      <div className='space-y-2'>
        <h4 className='font-semibold text-green-400 text-sm'>🚨 Emergency Support</h4>
        <p className='text-xs'>Disease Alert: <strong className='text-green-400'>1800-123-4567</strong></p>
        <p className='text-xs'>Veterinary Emergency: <strong className='text-red-400'>108</strong></p>
      </div>
      <div className='space-y-2'>
        <h4 className='font-semibold text-blue-400 text-sm'>🛠️ Technical Support</h4>
        <p className='text-xs'>Email: <strong className='text-blue-400'>support@digitalfarm.gov.in</strong></p>
        <p className='text-xs'>WhatsApp: <strong className='text-blue-400'>+91-9876543210</strong></p>
      </div>
      <div className='space-y-2'>
        <h4 className='font-semibold text-orange-400 text-sm'>🐾 Veterinary Support</h4>
        <p className='text-xs'>Helpline: <strong className='text-orange-400'>1800-VET-HELP</strong></p>
        <p className='text-xs'>Email: <strong className='text-orange-400'>vet@digitalfarm.gov.in</strong></p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default VetScanFarmQR;