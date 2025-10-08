import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, CameraOff, ArrowLeft, RefreshCw, QrCode } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const hasBarcodeDetector = () => {
  return typeof window !== 'undefined' && 'BarcodeDetector' in window
}

const QR_FORMATS = ['qr_code']

const ScanFarmQR = () => {
  const navigate = useNavigate()

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const detectorRef = useRef(null)
  const rafRef = useRef(null)

  const [active, setActive] = useState(false)
  const [facingMode, setFacingMode] = useState('environment')
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const stopCamera = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => tr.stop())
      streamRef.current = null
    }
    setActive(false)
  }

  const startCamera = async () => {
    setError(null)
    setResult(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setActive(true)

      if (hasBarcodeDetector()) {
        const BD = window.BarcodeDetector
        detectorRef.current = new BD({ formats: QR_FORMATS })
        tick() // start scanning loop
      } else {
        // Fallback: no detector support
        setError('Camera or Barcode scanning not supported on this device/browser.')
      }
    } catch (e) {
      console.error(e)
      setError('Camera permission denied. Please enable camera access in your browser settings.')
      stopCamera()
    }
  }

  const tick = async () => {
    if (!videoRef.current || !canvasRef.current || !detectorRef.current) {
      return
    }
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    try {
      const bitmap = canvas.transferControlToOffscreen
        ? canvas.transferControlToOffscreen()
        : canvas
      const codes = await detectorRef.current.detect(bitmap)
      if (codes && codes.length > 0) {
        const code = codes[0]
        const text = code.rawValue || code.rawValue === '' ? code.rawValue : (code?.rawValue ?? '')
        if (text) {
          setResult(text)
          stopCamera()
        }
      }
    } catch (err) {
      // Ignore per-frame errors
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  const handleSwitchCamera = async () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))
    if (active) {
      stopCamera()
      await startCamera()
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGoToFarm = () => {
    if (!result) return
    // If QR contains a path like /farms/ID, navigate there; else try to parse id
    try {
      if (result.startsWith('/farms/')) {
        navigate(result)
      } else if (/^https?:\/\//i.test(result)) {
        // If full URL, try to extract /farms/:id
        const url = new URL(result)
        const match = url.pathname.match(/\/farms\/(\w+)/)
        if (match) {
          navigate(`/farms/${match[1]}`)
          return
        }
        // As a last resort, navigate directly
        window.location.href = result
      } else {
        // Assume the text is the farm id
        navigate(`/farms/${result}`)
      }
    } catch {
      // fallback: do nothing
    }
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
            <h1 className="text-lg font-semibold">Scan Farm QR</h1>
          </div>
          <div className="relative">
            <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <QrCode className="h-5 w-5" />
            <span>Scan Farm QR</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Point your camera at the farm QR to check in</p>

          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2">
            {!active ? (
              <button onClick={startCamera} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 inline-flex items-center justify-center gap-2">
                <Camera className="h-4 w-4" /> Open Camera
              </button>
            ) : (
              <button onClick={stopCamera} className="px-4 py-2 rounded-lg bg-gray-100 border hover:bg-gray-50 inline-flex items-center justify-center gap-2">
                <CameraOff className="h-4 w-4" /> Stop
              </button>
            )}
            <button onClick={handleSwitchCamera} className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-50 inline-flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4" /> Switch Camera
            </button>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>

        {/* Scanner */}
        <div className="bg-black/90 rounded-xl overflow-hidden relative">
          <video ref={videoRef} className="w-full max-h-[60vh] object-contain" playsInline muted />
          <canvas ref={canvasRef} className="hidden" />
          {active && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border-2 border-purple-500/70 rounded-xl" />
              <div className="absolute left-1/2 -translate-x-1/2 top-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                Scanning...
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl shadow-sm p-4 border space-y-3">
            <div className="text-sm text-gray-500">Decoded Text</div>
            <div className="font-mono text-gray-900 break-all">{result}</div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              <button onClick={handleGoToFarm} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center">Go to Farm</button>
              <button onClick={startCamera} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 inline-flex items-center justify-center gap-2">
                <Camera className="h-4 w-4" /> Scan Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ScanFarmQR
