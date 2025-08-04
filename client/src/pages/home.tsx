import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isMobileApp } from "@/lib/api-config";
import { analyzeMedicationImageDirect, hasOpenAIKey } from "@/services/openai-direct";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Search, PillBottle, TriangleAlert, HelpCircle, Settings, Trash2, Languages, Menu, X, History, Clock, MessageCircle } from "lucide-react";
import type { MedicationAnalysis, MedicationScan } from "@shared/schema";
import AdBanner from "@/components/ads/AdBanner";
import { AD_SLOTS } from "@/components/ads/AdConfiguration";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<MedicationAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [scanHistory, setScanHistory] = useState<MedicationScan[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();



  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Initialize video when stream is available
  useEffect(() => {
    if (stream && videoRef.current && showCamera) {
      const video = videoRef.current;
      video.srcObject = stream;
      
      const handleVideoReady = () => {
        setVideoReady(true);
      };
      
      video.addEventListener('loadedmetadata', handleVideoReady);
      video.play().catch(console.error);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleVideoReady);
      };
    }
  }, [stream, showCamera]);

  const analyzeMutation = useMutation({
    mutationFn: async (file: File) => {
      // Always try backend API first (web and mobile)
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('language', language);
        
        const response = await apiRequest('POST', '/api/analyze-medication', formData);
        
        const responseText = await response.text();
        console.log("Analysis response text:", responseText);
        
        try {
          return JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse analysis response as JSON:", parseError);
          console.error("Raw response:", responseText);
          throw new Error('Invalid response format from analysis API');
        }
      } catch (backendError) {
        console.log("Backend API failed, trying direct OpenAI:", backendError);
        
        // Fallback to direct OpenAI only if backend fails AND we're in mobile app
        if (isMobileApp()) {
          if (!hasOpenAIKey()) {
            throw new Error('Please configure OpenAI API key in app settings');
          }
          
          const base64Image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const base64 = result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          
          const analysis = await analyzeMedicationImageDirect(base64Image, language);
          return { analysis, scanId: Date.now() }; // Fake scanId for mobile
        } else {
          // For web app, re-throw the backend error
          throw backendError;
        }
      }
    },
    onSuccess: (data) => {
      setAnalysisResult(data.analysis);
      setShowResults(true);
      // Refetch history to include the new scan
      historyQuery.refetch();
      if (data.analysis.identified) {
        toast({
          title: t.medicineIdentified,
          description: `${data.analysis.brandName}`,
        });
      } else {
        toast({
          title: t.unableToIdentify,
          description: "Could not identify the medication from the image",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      
      let errorMessage = "Failed to analyze image";
      
      if (error instanceof Error) {
        // Clean up error message for better user experience
        if (error.message.includes("JSON parsing failed")) {
          errorMessage = "Image analysis response error - please try again";
        } else if (error.message.includes("Analysis response format error")) {
          errorMessage = "Analysis service error - please try again";
        } else if (error.message.includes("Service configuration error")) {
          errorMessage = "Service temporarily unavailable";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: t.analysisFailed,
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  // Query for scan history
  const historyQuery = useQuery({
    queryKey: ['/api/scans'],
    enabled: showHistory && !isMobileApp(), // Only fetch when history is shown and not in mobile app
  });

  const handleFileSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setShowResults(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setShowResults(false);
    setShowCamera(false);
    setVideoReady(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const analyzeImage = () => {
    if (selectedImage) {
      analyzeMutation.mutate(selectedImage);
    }
  };

  const startCamera = async (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent triggering file input
    setCameraLoading(true);
    try {
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Try different camera configurations
      let mediaStream: MediaStream | null = null;
      
      // First try: back camera with high resolution
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920, min: 640 },
            height: { ideal: 1080, min: 480 }
          }
        });
      } catch (backCameraError) {
        console.log('Back camera failed, trying front camera:', backCameraError);
        
        // Second try: front camera
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { 
              facingMode: 'user',
              width: { ideal: 1280, min: 640 },
              height: { ideal: 720, min: 480 }
            }
          });
        } catch (frontCameraError) {
          console.log('Front camera failed, trying basic video:', frontCameraError);
          
          // Third try: basic video without constraints
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
        }
      }
      
      if (mediaStream) {
        setStream(mediaStream);
        setShowCamera(true);
        
        // Set up video element after a small delay to ensure modal is rendered
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(console.error);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      let errorMessage = "Could not access camera. ";
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage += "Please allow camera permissions and try again.";
        } else if (error.name === 'NotFoundError') {
          errorMessage += "No camera found on this device.";
        } else if (error.name === 'NotReadableError') {
          errorMessage += "Camera is being used by another application.";
        } else if (error.name === 'NotSupportedError') {
          errorMessage += "Camera not supported on this device.";
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += "Please check permissions and try again.";
      }
      
      toast({
        title: "Camera Access Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setVideoReady(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !stream) {
      toast({
        title: "Camera not ready",
        description: "Please wait for the camera to fully load before capturing.",
        variant: "destructive",
      });
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      toast({
        title: "Capture failed",
        description: "Unable to capture photo. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Check if video has loaded
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast({
        title: "Video not ready",
        description: "Please wait for the camera feed to load completely.",
        variant: "destructive",
      });
      return;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        handleFileSelect(file);
        stopCamera();
        toast({
          title: "Photo captured",
          description: "Photo captured successfully! Ready to analyze.",
        });
      } else {
        toast({
          title: "Capture failed",
          description: "Unable to create photo file. Please try again.",
          variant: "destructive",
        });
      }
    }, 'image/jpeg', 0.8);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile optimized */}
      <header className="bg-white shadow-sm border-b border-gray-200 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <PillBottle className="text-white text-sm sm:text-lg" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{t.appName}</h1>
                <p className="text-xs text-gray-600 hidden sm:block">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Settings button for mobile app */}
              {isMobileApp() && (
                <Link to="/settings">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">{language === 'es' ? 'Config' : 'Settings'}</span>
                  </Button>
                </Link>
              )}
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="sm:hidden"
              >
                {showMobileMenu ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-1"
                title={t.scanHistory}
              >
                <History className="h-4 w-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600 hidden sm:inline">
                  {t.scanHistory}
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-1"
              >
                <Languages className="h-4 w-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">
                  {language === 'en' ? 'ES' : 'EN'}
                </span>
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="sm:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-3">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">{t.resourcesTitle}</h4>
                <div className="space-y-2">
                  <Link href="/how-it-works" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.howItWorks}
                  </Link>
                  <Link href="/privacy-policy" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.privacyPolicy}
                  </Link>
                  <Link href="/terms-of-service" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.termsOfService}
                  </Link>
                  <Link href="/medical-disclaimer" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.medicalDisclaimerPage}
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">{t.supportTitle}</h4>
                <div className="space-y-2">
                  <Link href="/help-center" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.helpCenter}
                  </Link>
                  <Link href="/contact" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.contactUs}
                  </Link>
                  <Link href="/report-issue" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowMobileMenu(false)}>
                    {t.reportIssue}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Ad Banner - High Value Placement */}
      <div className="w-full bg-gray-50 py-2">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <AdBanner 
            adSlot={AD_SLOTS.HEADER_BANNER}
            adFormat="horizontal"
            className="text-center"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* History Panel */}
        {showHistory && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  {t.recentScans}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {historyQuery.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading history...</span>
                </div>
              ) : historyQuery.data && Array.isArray(historyQuery.data) && historyQuery.data.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {historyQuery.data.map((scan: MedicationScan) => {
                    const analysis = scan.analysisResult as MedicationAnalysis;
                    return (
                      <div key={scan.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {analysis.identified ? analysis.brandName || analysis.genericName : t.unableToIdentify}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {t.scanPerformed}: {scan.createdAt ? new Date(scan.createdAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') : 'Unknown date'}
                            </p>
                            {analysis.identified && (
                              <div className="mt-2">
                                {analysis.strength && (
                                  <Badge variant="secondary" className="mr-2 text-xs">
                                    {analysis.strength}
                                  </Badge>
                                )}
                                {analysis.form && (
                                  <Badge variant="outline" className="text-xs">
                                    {analysis.form}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setAnalysisResult(analysis);
                              setShowResults(true);
                              setShowHistory(false);
                            }}
                            className="ml-4"
                          >
                            {t.viewDetails}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>{t.noHistoryYet}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upload Section */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.uploadTitle}</h2>
            
            {!imagePreview ? (
              <div className="space-y-4">
                {/* Primary: Take Photo */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">{t.takePhoto}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.capturePhotoDescription}
                  </p>
                  <Button onClick={startCamera} disabled={cameraLoading} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto mb-4">
                    {cameraLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.startingCamera}
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        {t.takePhoto}
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-500">{t.orText}</span>
                  </div>
                </div>
                
                {/* Secondary: Choose File */}
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-600 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{t.dragAndDrop}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {t.uploadDescription}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-4 w-4" />
                      {t.chooseFile}
                    </Button>
                    <p className="text-xs text-gray-600">
                      {t.fileSupport}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{t.uploadedImage}</h3>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Medicine preview" 
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>
                <div className="mt-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    onClick={analyzeImage}
                    disabled={analyzeMutation.isPending}
                  >
                    {analyzeMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.analyzing}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {t.analyzeMedicine}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Medical Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <TriangleAlert className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <span className="font-semibold">{t.medicalDisclaimer}</span> {t.disclaimerText}
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t.takePhotoTitle}</h3>
                <Button variant="ghost" size="sm" onClick={stopCamera}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                {stream ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    {!videoReady && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p className="text-sm">{t.loadingCamera}</p>
                        </div>
                      </div>
                    )}
                    {videoReady && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        {t.ready}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">Starting camera...</p>
                    </div>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={capturePhoto} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!stream || !videoReady}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {videoReady ? t.capturePhoto : t.loadingCamera}
                </Button>
                <Button variant="outline" onClick={stopCamera} className="flex-1">
                  {t.cancel}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {analyzeMutation.isPending && (
          <Card className="mb-6 sm:mb-8">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-4">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{t.analyzing}</h3>
              <p className="text-sm sm:text-base text-gray-600">{t.analyzingDescription}</p>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {showResults && analysisResult && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-lg font-semibold text-gray-900">{t.analysisResults}</h2>
                <div className={`flex items-center space-x-2 ${analysisResult.identified ? 'text-green-600' : 'text-red-600'}`}>
                  {analysisResult.identified ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">
                    {analysisResult.identified ? t.medicineIdentified : t.unableToIdentify}
                  </span>
                </div>
              </div>

              {analysisResult.identified ? (
                <>
                  {/* Product Information */}
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{t.brandName}</h3>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{analysisResult.brandName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{t.genericName}</h3>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{analysisResult.genericName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{t.strength}</h3>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{analysisResult.strength}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{t.form}</h3>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{analysisResult.form}</p>
                      </div>
                    </div>
                  </div>

                  {/* Active Ingredients */}
                  {analysisResult.activeIngredients.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{t.activeIngredients}</h3>
                      <div className="space-y-4">
                        {analysisResult.activeIngredients.map((ingredient, index) => (
                          <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <PillBottle className="text-white text-sm" />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  {ingredient.name} ({ingredient.amount})
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                  {ingredient.description}
                                </p>
                                {ingredient.purposes.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {ingredient.purposes.map((purpose, purposeIndex) => (
                                      <Badge key={purposeIndex} className="bg-green-100 text-green-800">
                                        {purpose}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Uses */}
                  {analysisResult.commonUses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{t.commonUses}</h3>
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {analysisResult.commonUses.map((use, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results Ad Banner - High Value Placement */}
                  <div className="my-6 p-4 bg-gray-50 rounded-lg">
                    <AdBanner 
                      adSlot={AD_SLOTS.RESULTS_BANNER}
                      adFormat="auto"
                      className="text-center"
                      style={{ minHeight: '120px' }}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-4">
                    <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{t.unableToIdentify}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
                    {t.unableToIdentifyDescription}
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">{t.tipsForBetter}</p>
                    <ul className="text-sm text-gray-600 text-left max-w-md mx-auto space-y-2 px-4">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{t.ensureGoodLighting}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{t.includeProductLabel}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{t.avoidBlurryPhotos}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Safety Information */}
              {analysisResult.safetyInfo.length > 0 && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <TriangleAlert className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <h4 className="font-semibold text-red-800 mb-2">{t.safetyInformation}</h4>
                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                      {analysisResult.safetyInfo.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center mb-6">
                <Button variant="outline" className="flex-1 max-w-xs" onClick={resetUpload}>
                  <Search className="mr-2 h-4 w-4" />
                  {t.scanAnother}
                </Button>
              </div>

              {/* Medical Disclaimer in Results */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <TriangleAlert className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <span className="font-semibold">{t.medicalDisclaimer}</span> {t.disclaimerText}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* In-Content Ad - Medium Value Placement */}
        <div className="my-8">
          <AdBanner 
            adSlot={AD_SLOTS.IN_CONTENT}
            adFormat="auto"
            className="text-center bg-gray-50 rounded-lg p-4"
            style={{ minHeight: '100px' }}
          />
        </div>
      </main>

      {/* Footer - Hidden on mobile */}
      <footer className="hidden sm:block bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <PillBottle className="text-white text-sm" />
                </div>
                <span className="font-semibold text-gray-900">{t.appName}</span>
              </div>
              <p className="text-sm text-gray-600">
                {t.appDescription}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">{t.resourcesTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/how-it-works" className="hover:text-gray-900 transition-colors">{t.howItWorks}</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">{t.privacyPolicy}</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-gray-900 transition-colors">{t.termsOfService}</Link></li>
                <li><Link href="/medical-disclaimer" className="hover:text-gray-900 transition-colors">{t.medicalDisclaimerPage}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">{t.supportTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help-center" className="hover:text-gray-900 transition-colors">{t.helpCenter}</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 transition-colors">{t.contactUs}</Link></li>
                <li><Link href="/report-issue" className="hover:text-gray-900 transition-colors">{t.reportIssue}</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          
          {/* Footer Ad Banner */}
          <div className="mb-6">
            <AdBanner 
              adSlot={AD_SLOTS.FOOTER_BANNER}
              adFormat="horizontal"
              className="text-center"
              style={{ minHeight: '90px' }}
            />
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-600">
              {t.copyrightText}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button - Better Mobile Position */}
      <Link href="/chat">
        <Button 
          className="fixed bottom-32 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50 flex items-center justify-center transition-all duration-200 hover:scale-105 border-2 border-white"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </Link>
    </div>
  );
}
