import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CameraOff, ChevronLeft, RefreshCw, QrCode, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const hasBarcodeDetector = () => {
  return typeof window !== 'undefined' && 'BarcodeDetector' in window;
};

const QR_FORMATS = ['qr_code'];

const GovScanFarmQR = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);

  const [active, setActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [manualId, setManualId] = useState('');

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
    setResult(null);
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
        setError(t('cameraNotSupported'));
      }
    } catch (e) {
      console.error(e);
      setError(t('cameraPermissionDenied'));
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
        ? // @ts-ignore
          canvas.transferControlToOffscreen()
        : canvas;
      const codes = await detectorRef.current.detect(bitmap);
      if (codes && codes.length > 0) {
        const code = codes[0];
        const text = code.rawValue || code.rawValue === '' ? code.rawValue : code?.rawValue ?? '';
        if (text) {
          setResult(text);
          stopCamera();
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

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      navigate(`/government/farm-details/${manualId.trim()}`);
    }
  };

  useEffect(() => {
    if (active) {
      tick();
    }
    return () => {
      stopCamera();
    };
  }, [active, facingMode]);

  // Navigate when result is found
  useEffect(() => {
    if (result) {
      navigate(`/government/farm-details/${result}`);
    }
  }, [result, navigate]);

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
              <h1 className="text-lg font-medium">Scan Farm QR</h1>
            </div>
            <div className="relative">
              <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Camera Preview */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="aspect-square bg-black relative">
            {!active && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
                <QrCode className="h-12 w-12 mb-4 text-blue-400" />
                <p className="text-lg font-medium mb-2">Scan Farm QR Code</p>
                <p className="text-sm text-gray-300 mb-6">
                  Position the QR code in the frame to scan
                </p>
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  <span>Start Camera</span>
                </button>
              </div>
            )}

            <video
              ref={videoRef}
              playsInline
              className={`w-full h-full object-cover ${!active ? 'hidden' : ''}`}
              muted
            />
            <canvas ref={canvasRef} className="hidden" />

            {active && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <button
                  onClick={toggleCamera}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  aria-label="Switch camera"
                >
                  <RefreshCw className="h-6 w-6" />
                </button>
                <button
                  onClick={stopCamera}
                  className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  aria-label="Stop camera"
                >
                  <CameraOff className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Manual Entry */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Or enter Farm ID manually
          </h2>
          <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              placeholder="Enter Farm ID"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 min-w-[120px]"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GovScanFarmQR;
