export interface Translation {
  // Header
  appName: string;
  appSubtitle: string;
  
  // Upload section
  uploadTitle: string;
  uploadDescription: string;
  chooseFile: string;
  dragAndDrop: string;
  fileSupport: string;
  orTakePhoto: string;
  takePhoto: string;
  startingCamera: string;
  mobileCamera: string;
  
  // Camera modal
  takePhotoTitle: string;
  capturePhoto: string;
  cancel: string;
  loadingCamera: string;
  ready: string;
  
  // Analysis
  analyzing: string;
  analyzingDescription: string;
  analysisResults: string;
  medicineIdentified: string;
  unableToIdentify: string;
  
  // Results
  brandName: string;
  genericName: string;
  strength: string;
  form: string;
  activeIngredients: string;
  commonUses: string;
  safetyInformation: string;
  
  // Error messages
  cameraAccessFailed: string;
  cameraNotReady: string;
  videoNotReady: string;
  captureFailed: string;
  photoCaptured: string;
  analysisFailed: string;
  permissionDenied: string;
  cameraPermissionRequired: string;
  photosPermissionRequired: string;
  permissionRequested: string;
  pleaseAllowPermission: string;
  
  // Safety disclaimer
  medicalDisclaimer: string;
  disclaimerText: string;
  
  // Tips
  tipsForBetter: string;
  ensureGoodLighting: string;
  includeProductLabel: string;
  avoidBlurryPhotos: string;
  
  // Upload states
  uploadedImage: string;
  analyzeMedicine: string;
  
  // Additional UI text
  capturePhotoDescription: string;
  orText: string;
  scanAnother: string;
  saveResults: string;
  share: string;
  
  // Report Issue urgency levels
  urgencyLow: string;
  urgencyMedium: string;
  urgencyHigh: string;
  urgencyCritical: string;
  
  // Report Issue form labels
  issueTitleLabel: string;
  issueDescriptionLabel: string;
  stepsLabel: string;
  expectedLabel: string;
  actualLabel: string;
  browserLabel: string;
  deviceLabel: string;
  includeScreenshotLabel: string;
  
  // Footer
  resourcesTitle: string;
  supportTitle: string;
  appDescription: string;
  howItWorks: string;
  privacyPolicy: string;
  termsOfService: string;
  medicalDisclaimerPage: string;
  helpCenter: string;
  contactUs: string;
  reportIssue: string;
  
  // Error and fallback text
  unableToIdentifyDescription: string;
  
  // Page titles and content
  howItWorksPageTitle: string;
  howItWorksPageDescription: string;
  backToHome: string;
  uploadOrTakePhotoTitle: string;
  uploadOrTakePhotoDescription: string;
  aiAnalysisTitle: string;
  aiAnalysisDescription: string;
  detailedResultsTitle: string;
  detailedResultsDescription: string;
  tipsForBetterResultsTitle: string;
  
  // Privacy Policy page
  privacyPolicyPageTitle: string;
  privacyPolicyPageDescription: string;
  informationWeCollect: string;
  howWeUseInformation: string;
  dataSecurity: string;
  yourRights: string;
  contactForPrivacy: string;
  
  // Terms of Service page
  termsOfServicePageTitle: string;
  termsOfServicePageDescription: string;
  acceptanceOfTerms: string;
  useOfService: string;
  userResponsibilities: string;
  disclaimerOfWarranties: string;
  limitationOfLiability: string;
  
  // Medical Disclaimer page
  medicalDisclaimerPageTitle: string;
  medicalDisclaimerPageDescription: string;
  notMedicalAdvice: string;
  consultProfessionals: string;
  noEmergencyUse: string;
  accuracyLimitations: string;
  
  // Help Center page
  helpCenterPageTitle: string;
  helpCenterPageDescription: string;
  frequentlyAskedQuestions: string;
  gettingStarted: string;
  troubleshooting: string;
  
  // Contact page
  contactPageTitle: string;
  contactPageDescription: string;
  sendUsMessage: string;
  contactFormDescription: string;
  
  // Report Issue page
  reportIssuePageTitle: string;
  reportIssuePageDescription: string;
  
  // Privacy Policy content sections
  informationWeCollectContent: string;
  howWeProtectYourData: string;
  howWeProtectDataContent: string;
  useOfInformation: string;
  useOfInformationContent: string;
  yourRightsContent: string;
  
  // Terms of Service content sections
  acceptanceOfTermsContent: string;
  appropriateUseOfService: string;
  appropriateUseContent: string;
  limitationsAndResponsibilities: string;
  limitationsContent: string;
  prohibitions: string;
  prohibitionsContent: string;
  
  // Medical Disclaimer content sections
  notMedicalSubstitute: string;
  notMedicalSubstituteContent: string;
  medicalEmergencies: string;
  medicalEmergenciesContent: string;
  professionalVerification: string;
  professionalVerificationContent: string;
  accuracyLimitationsContent: string;
  
  // Help Center content sections
  takePhotoAction: string;
  uploadImage: string;
  viewResults: string;
  useCameraToAnalyze: string;
  uploadFromGallery: string;
  analyzeIdentification: string;
  
  // Report Issue content sections
  issueDetails: string;
  pleaseProvideInformation: string;
  issueType: string;
  selectType: string;
  urgency: string;
  selectUrgency: string;
  issueTitle: string;
  briefDescription: string;
  detailedDescription: string;
  stepsToReproduce: string;
  expectedResult: string;
  actualResult: string;
  submitReport: string;
  
  // Common form labels
  howDoITakeGoodPhoto: string;
  whatFileTypesCanUpload: string;
  howAccurateIsAnalysis: string;
  canIUseForSelfMedication: string;
  
  // Help Center FAQ answers
  howDoITakeGoodPhotoAnswer: string;
  whatFileTypesCanUploadAnswer: string;
  howAccurateIsAnalysisAnswer: string;
  canIUseForSelfMedicationAnswer: string;
  whatDoIDoIfNotIdentified: string;
  whatDoIDoIfNotIdentifiedAnswer: string;
  cameraNotWorking: string;
  cameraNotWorkingAnswer: string;
  
  // Help Center sections
  importantReminder: string;
  importantReminderText: string;
  
  // Contact form fields
  name: string;
  nameField: string;
  email: string;
  emailField: string;
  category: string;
  selectCategory: string;
  subject: string;
  message: string;
  messagePlaceholder: string;
  sendMessage: string;
  
  // Contact form categories
  technicalIssue: string;
  feedback: string;
  generalQuestion: string;
  partnership: string;
  
  // Contact form messages
  messageSent: string;
  messageSentDescription: string;
  

  frequentlyAskedQuestions: string;
  
  // Footer copyright
  copyrightText: string;
  
  // History feature
  scanHistory: string;
  recentScans: string;
  noHistoryYet: string;
  scanPerformed: string;
  viewDetails: string;
  clearHistory: string;
  confirmClearHistory: string;
  historyCleared: string;
  
  // Privacy Policy additional sections
  cookiesAndTracking: string;
  cookiesDescription1: string;
  cookiesDescription2: string;
  contactAndQuestions: string;
  contactDescription: string;
  lastUpdated: string;
  
  // Terms of Service additional sections
  medicalDisclaimerTerms: string;
  pharmascanNotMedical: string;
  alwaysConsultProfessional: string;
  emergencyContact: string;
  modificationsToTerms: string;
  modificationsDescription: string;
  
  // Medical Disclaimer additional sections
  responsibleUse: string;
  responsibleUseIntro: string;
  consultHealthcare: string;
  verifyBeforeTaking: string;
  noSelfDiagnosis: string;
  readOriginalLabels: string;
  inCaseOfEmergency: string;
  emergencyDescription: string;
  emergencyAdvice: string;
  confirmationText: string;
}

export const translations: Record<string, Translation> = {
  en: {
    appName: "PharmaScan",
    appSubtitle: "Medicine Identifier",
    
    uploadTitle: "Upload Medicine Photo",
    uploadDescription: "Drag and drop or click to select an image of the medicine",
    chooseFile: "Choose File",
    dragAndDrop: "Upload a photo",
    fileSupport: "Supports JPG, PNG, HEIC up to 10MB",
    orTakePhoto: "Or take a photo with your camera",
    takePhoto: "Take Photo",
    startingCamera: "Starting Camera...",
    mobileCamera: "Mobile Camera",
    
    takePhotoTitle: "Take Photo",
    capturePhoto: "Capture Photo",
    cancel: "Cancel",
    loadingCamera: "Loading Camera...",
    ready: "Ready",
    
    analyzing: "Analyzing your medicine...",
    analyzingDescription: "Please wait while we identify the product and gather information.",
    analysisResults: "Analysis Results",
    medicineIdentified: "Medicine Identified",
    unableToIdentify: "Unable to Identify",
    
    brandName: "Brand Name",
    genericName: "Generic Name",
    strength: "Strength",
    form: "Form",
    activeIngredients: "Active Ingredients",
    commonUses: "Common Uses",
    safetyInformation: "Safety Information",
    
    cameraAccessFailed: "Camera Access Failed",
    cameraNotReady: "Camera not ready",
    videoNotReady: "Video not ready",
    captureFailed: "Capture failed",
    photoCaptured: "Photo captured",
    analysisFailed: "Analysis Failed",
    permissionDenied: "Permission denied",
    cameraPermissionRequired: "Camera permission is required to take photos",
    photosPermissionRequired: "Photos permission is required to select images",
    permissionRequested: "Permission requested",
    pleaseAllowPermission: "Please allow permission when prompted",
    
    medicalDisclaimer: "Medical Disclaimer:",
    disclaimerText: "This tool provides general information only. Always consult with a healthcare professional or pharmacist before taking any medication. Do not use this app for emergency medical decisions.",
    
    tipsForBetter: "Tips for better results:",
    ensureGoodLighting: "Ensure good lighting",
    includeProductLabel: "Include the product label",
    avoidBlurryPhotos: "Avoid blurry or tilted photos",
    
    uploadedImage: "Uploaded Image",
    analyzeMedicine: "Analyze Medicine",
    
    capturePhotoDescription: "Capture a photo of your medication for instant analysis",
    orText: "or",
    scanAnother: "Scan Another",
    saveResults: "Save Results",
    share: "Share",
    
    // Report Issue urgency levels
    urgencyLow: "Low - Suggested improvement",
    urgencyMedium: "Medium - Affects functionality",
    urgencyHigh: "High - Prevents normal use",
    urgencyCritical: "Critical - App not working",
    
    // Report Issue form labels
    issueTitleLabel: "Issue Title",
    issueDescriptionLabel: "Brief Description",
    stepsLabel: "Steps to Reproduce",
    expectedLabel: "Expected Result",
    actualLabel: "Actual Result",
    browserLabel: "Browser",
    deviceLabel: "Device",
    includeScreenshotLabel: "I have included a screenshot or can provide one if requested",
    
    resourcesTitle: "Resources",
    supportTitle: "Support",
    appDescription: "Helping you understand your medications with AI-powered identification and clear explanations.",
    howItWorks: "How it works",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    medicalDisclaimerPage: "Medical Disclaimer",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    reportIssue: "Report an Issue",
    
    unableToIdentifyDescription: "We couldn't identify this product. Please try uploading a clearer image or ensure the packaging is visible.",
    
    howItWorksPageTitle: "How PharmaScan Works",
    howItWorksPageDescription: "Discover how our AI technology helps you identify medications quickly and accurately.",
    backToHome: "Back to Home",
    uploadOrTakePhotoTitle: "1. Upload or Take Photo",
    uploadOrTakePhotoDescription: "Take a photo of your medication with the camera or upload an image from your gallery. Make sure the label is visible and clear.",
    aiAnalysisTitle: "2. AI Analysis",
    aiAnalysisDescription: "Our AI system analyzes the image using advanced recognition technology to identify the medication and extract important information.",
    detailedResultsTitle: "3. Detailed Results",
    detailedResultsDescription: "Receive comprehensive information including brand name, generic name, active ingredients, common uses, and safety information.",
    tipsForBetterResultsTitle: "Tips for Better Results",
    
    privacyPolicyPageTitle: "Privacy Policy",
    privacyPolicyPageDescription: "Learn how we collect, use, and protect your information when using our medication identification service.",
    informationWeCollect: "Information We Collect",
    howWeUseInformation: "How We Use Information", 
    dataSecurity: "Data Security",
    yourRights: "Your Rights",
    contactForPrivacy: "Contact Us About Privacy",
    
    termsOfServicePageTitle: "Terms of Service",
    termsOfServicePageDescription: "Please read these terms carefully before using our medication identification service.",
    acceptanceOfTerms: "Acceptance of Terms",
    useOfService: "Use of Service",
    userResponsibilities: "User Responsibilities", 
    disclaimerOfWarranties: "Disclaimer of Warranties",
    limitationOfLiability: "Limitation of Liability",
    
    medicalDisclaimerPageTitle: "Medical Disclaimer",
    medicalDisclaimerPageDescription: "Important medical information and limitations about our medication identification service.",
    notMedicalAdvice: "Not Medical Advice",
    consultProfessionals: "Consult Healthcare Professionals",
    noEmergencyUse: "No Emergency Use",
    accuracyLimitations: "Accuracy Limitations",
    
    helpCenterPageTitle: "Help Center",
    helpCenterPageDescription: "Find answers to common questions about using our medication identification service.",

    gettingStarted: "Getting Started",
    troubleshooting: "Troubleshooting",
    
    contactPageTitle: "Contact Us",
    contactPageDescription: "We're here to help. Fill out the form and we'll get back to you soon.",
    sendUsMessage: "Send us a Message",
    contactFormDescription: "The only way to contact us. We will respond within 24-48 hours.",
    
    reportIssuePageTitle: "Report an Issue",
    reportIssuePageDescription: "Help us improve by reporting any problems or issues you encounter.",
    
    // Privacy Policy content sections
    informationWeCollectContent: "We only collect the images you upload for analysis and the generated results. We do not store personally identifiable information without your explicit consent.",
    howWeProtectYourData: "How We Protect Your Data",
    howWeProtectDataContent: "We use end-to-end encryption for all data transmissions. Images are processed securely and automatically deleted after analysis.",
    useOfInformation: "Use of Information",
    useOfInformationContent: "Your information is used solely to provide you with medication analysis. We do not share, sell, or use your data for any other purpose.",
    yourRightsContent: "You have the right to access, correct, or delete your data at any time. You can also request a copy of all information we have about you.",
    
    // Terms of Service content sections
    acceptanceOfTermsContent: "By using PharmaScan, you agree to these terms of service. If you do not agree with any of these terms, please do not use our service.",
    appropriateUseOfService: "Appropriate Use of Service",
    appropriateUseContent: "PharmaScan is designed for informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment.",
    limitationsAndResponsibilities: "Limitations and Responsibilities",
    limitationsContent: "We do not guarantee complete accuracy of results. Users are responsible for verifying all information with qualified healthcare professionals.",
    prohibitions: "Prohibitions",
    prohibitionsContent: "Users must not use this service for illegal purposes, attempt to reverse engineer our technology, or violate any applicable laws or regulations.",
    
    // Medical Disclaimer content sections
    notMedicalSubstitute: "Not a Medical Substitute",
    notMedicalSubstituteContent: "PharmaScan is an informational tool only. It never replaces professional medical advice, diagnosis, or treatment.",
    medicalEmergencies: "Medical Emergencies",
    medicalEmergenciesContent: "In case of medical emergency, immediately call emergency services. Do not use this app for situations requiring urgent medical attention.",
    professionalVerification: "Professional Verification",
    professionalVerificationContent: "Always verify results with a pharmacist or doctor before making any medication decisions.",
    accuracyLimitationsContent: "While we strive for accuracy, results may vary. Factors like image quality, lighting, and medication packaging can affect identification accuracy.",
    
    // Help Center content sections
    takePhotoAction: "Take Photo",
    uploadImage: "Upload Image",
    viewResults: "View Results",
    useCameraToAnalyze: "Use camera to analyze",
    uploadFromGallery: "Upload from gallery",
    analyzeIdentification: "Analyze medication",
    
    // Report Issue content sections
    issueDetails: "Issue Details",
    pleaseProvideInformation: "Please provide as much information as possible to help us resolve the issue quickly.",
    issueType: "Issue Type",
    selectType: "Select type",
    urgency: "Urgency",
    selectUrgency: "Select urgency",
    issueTitle: "Issue Title",
    briefDescription: "Brief description of the issue",
    detailedDescription: "Detailed Description",
    stepsToReproduce: "Steps to Reproduce",
    expectedResult: "Expected Result",
    actualResult: "Actual Result",
    submitReport: "Submit Report",
    
    // Common form labels
    howDoITakeGoodPhoto: "How do I take a good photo of my medication?",
    whatFileTypesCanUpload: "What file types can I upload?",
    howAccurateIsAnalysis: "How accurate is the analysis?",
    canIUseForSelfMedication: "Can I use PharmaScan for self-medication?",
    
    // Help Center FAQ answers
    howDoITakeGoodPhotoAnswer: "For best results: 1) Ensure good lighting, 2) Include the entire product label, 3) Keep the camera steady to avoid blurry photos, 4) Take the photo straight-on, not at an angle.",
    whatFileTypesCanUploadAnswer: "We accept JPG, PNG, and HEIC files with a maximum size of 10MB. Most smartphone photos work perfectly.",
    howAccurateIsAnalysisAnswer: "We use advanced AI technology, but accuracy can vary based on image quality and label visibility. Always verify results with a healthcare professional.",
    canIUseForSelfMedicationAnswer: "No. PharmaScan is for informational purposes only. Never use this information for self-medication. Always consult with a doctor or pharmacist before taking any medication.",
    whatDoIDoIfNotIdentified: "What do I do if my medication isn't identified?",
    whatDoIDoIfNotIdentifiedAnswer: "If we can't identify your medication, try taking a clearer photo, ensure the label is fully visible, or consult directly with your pharmacist.",
    cameraNotWorking: "Camera not working on my device?",
    cameraNotWorkingAnswer: "Make sure you've granted camera permissions to the browser. On Android, clear browser cache if needed. On iOS, check permissions in Settings > Safari. Alternatively, use the file upload option.",
    
    // Help Center sections
    importantReminder: "Important Reminder",
    importantReminderText: "PharmaScan is an informational tool. For specific medical questions or emergencies, always contact qualified healthcare professionals.",
    
    // Contact form fields
    name: "Name",
    nameField: "Your name",
    email: "Email",
    emailField: "you@email.com",
    category: "Category",
    selectCategory: "Select a category",
    subject: "Subject",
    message: "Message",
    messagePlaceholder: "Tell us how we can help you...",
    sendMessage: "Send Message",
    
    // Contact form categories
    technicalIssue: "Technical Issue",
    feedback: "Feedback",
    generalQuestion: "General Question",
    partnership: "Partnership",
    
    // Contact form messages
    messageSent: "Message Sent",
    messageSentDescription: "Thank you for contacting us. We'll respond soon.",
    

    
    copyrightText: "© 2024 PharmaScan. This tool is for informational purposes only and should not replace professional medical advice.",
    
    // History feature
    scanHistory: "Scan History",
    recentScans: "Recent Scans",
    noHistoryYet: "No scans yet. Upload your first medication image to get started!",
    scanPerformed: "Scan performed",
    viewDetails: "View Details",
    clearHistory: "Clear History",
    confirmClearHistory: "Are you sure you want to clear all scan history?",
    historyCleared: "Scan history cleared successfully",
    
    // Privacy Policy additional sections
    cookiesAndTracking: "Cookies and Tracking Technologies",
    cookiesDescription1: "We use essential cookies only to enhance site functionality. We do not use tracking or advertising cookies.",
    cookiesDescription2: "You can disable cookies in your browser settings, although this may affect some site functionalities.",
    contactAndQuestions: "Contact and Questions",
    contactDescription: "If you have questions about this privacy policy or how we handle your data, please contact us through our Help Center.",
    lastUpdated: "Last updated: January 2024",
    
    // Terms of Service additional sections
    medicalDisclaimerTerms: "Medical Disclaimer",
    pharmascanNotMedical: "PharmaScan is NOT a medical device and is not intended to diagnose, treat, cure, or prevent any disease.",
    alwaysConsultProfessional: "Always consult with a qualified healthcare professional before making medication decisions.",
    emergencyContact: "In case of medical emergency, immediately contact local emergency services.",
    modificationsToTerms: "Modifications to Terms",
    modificationsDescription: "We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting. We recommend reviewing this page periodically.",
    
    // Medical Disclaimer additional sections
    responsibleUse: "Responsible Use",
    responsibleUseIntro: "To use PharmaScan safely:",
    consultHealthcare: "Always consult with healthcare professionals",
    verifyBeforeTaking: "Verify information before taking medications",
    noSelfDiagnosis: "Do not use for self-diagnosis or self-medication",
    readOriginalLabels: "Always read original medication labels",
    inCaseOfEmergency: "In Case of Emergency",
    emergencyDescription: "If you experience a medical emergency, immediately contact your local emergency services.",
    emergencyAdvice: "Consult with local medical professionals for specific information about poison control centers and emergency services in your area.",
    confirmationText: "By continuing to use PharmaScan, you confirm that you have read and understood this medical disclaimer."
  },
  
  es: {
    appName: "PharmaScan",
    appSubtitle: "Identificador de Medicinas",
    
    uploadTitle: "Subir Foto de Medicina",
    uploadDescription: "Arrastra y suelta o haz clic para seleccionar una imagen de la medicina",
    chooseFile: "Elegir Archivo",
    dragAndDrop: "Subir una foto",
    fileSupport: "Soporta JPG, PNG, HEIC hasta 10MB",
    orTakePhoto: "O toma una foto con tu cámara",
    takePhoto: "Tomar Foto",
    startingCamera: "Iniciando Cámara...",
    mobileCamera: "Cámara Móvil",
    
    takePhotoTitle: "Tomar Foto",
    capturePhoto: "Capturar Foto",
    cancel: "Cancelar",
    loadingCamera: "Cargando Cámara...",
    ready: "Listo",
    
    analyzing: "Analizando tu medicina...",
    analyzingDescription: "Por favor espera mientras identificamos el producto y recopilamos información.",
    analysisResults: "Resultados del Análisis",
    medicineIdentified: "Medicina Identificada",
    unableToIdentify: "No se Pudo Identificar",
    
    brandName: "Nombre de Marca",
    genericName: "Nombre Genérico",
    strength: "Concentración",
    form: "Forma",
    activeIngredients: "Ingredientes Activos",
    commonUses: "Usos Comunes",
    safetyInformation: "Información de Seguridad",
    
    cameraAccessFailed: "Falló el Acceso a la Cámara",
    cameraNotReady: "Cámara no está lista",
    videoNotReady: "Video no está listo",
    captureFailed: "Falló la captura",
    photoCaptured: "Foto capturada",
    analysisFailed: "Falló el Análisis",
    permissionDenied: "Permiso denegado",
    cameraPermissionRequired: "Se requiere permiso de cámara para tomar fotos",
    photosPermissionRequired: "Se requiere permiso de fotos para seleccionar imágenes",
    permissionRequested: "Permiso solicitado",
    pleaseAllowPermission: "Por favor permite el acceso cuando se solicite",
    
    medicalDisclaimer: "Aviso Médico:",
    disclaimerText: "Esta herramienta proporciona información general únicamente. Siempre consulta con un profesional de la salud o farmacéutico antes de tomar cualquier medicamento. No uses esta aplicación para decisiones médicas de emergencia.",
    
    tipsForBetter: "Consejos para mejores resultados:",
    ensureGoodLighting: "Asegura buena iluminación",
    includeProductLabel: "Incluye la etiqueta del producto",
    avoidBlurryPhotos: "Evita fotos borrosas o inclinadas",
    
    uploadedImage: "Imagen Subida",
    analyzeMedicine: "Analizar Medicina",
    
    capturePhotoDescription: "Captura una foto de tu medicamento para análisis instantáneo",
    orText: "o",
    scanAnother: "Escanear Otro",
    saveResults: "Guardar Resultados",
    share: "Compartir",
    
    // Report Issue urgency levels
    urgencyLow: "Baja - Mejora sugerida",
    urgencyMedium: "Media - Afecta funcionalidad",
    urgencyHigh: "Alta - Impide uso normal",
    urgencyCritical: "Crítica - App no funciona",
    
    // Report Issue form labels
    issueTitleLabel: "Título del Problema",
    issueDescriptionLabel: "Descripción Breve",
    stepsLabel: "Pasos para Reproducir",
    expectedLabel: "Resultado Esperado",
    actualLabel: "Resultado Real",
    browserLabel: "Navegador",
    deviceLabel: "Dispositivo",
    includeScreenshotLabel: "He incluido una captura de pantalla o puedo proporcionarla si se solicita",
    
    resourcesTitle: "Recursos",
    supportTitle: "Soporte",
    appDescription: "Te ayudamos a entender tus medicamentos con identificación de IA y explicaciones claras.",
    howItWorks: "Cómo funciona",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    medicalDisclaimerPage: "Descargo Médico",
    helpCenter: "Centro de Ayuda",
    contactUs: "Contáctanos",
    reportIssue: "Reportar un Problema",
    
    unableToIdentifyDescription: "No pudimos identificar este producto. Por favor intenta subir una imagen más clara o asegúrate de que el empaque sea visible.",
    
    howItWorksPageTitle: "Cómo Funciona PharmaScan",
    howItWorksPageDescription: "Descubre cómo nuestra tecnología de IA te ayuda a identificar medicamentos de manera rápida y precisa.",
    backToHome: "Volver al Inicio",
    uploadOrTakePhotoTitle: "1. Subir o Tomar Foto",
    uploadOrTakePhotoDescription: "Toma una foto de tu medicamento con la cámara o sube una imagen de tu galería. Asegúrate de que la etiqueta sea visible y clara.",
    aiAnalysisTitle: "2. Análisis con IA",
    aiAnalysisDescription: "Nuestro sistema de IA analiza la imagen usando tecnología avanzada de reconocimiento para identificar el medicamento y extraer información importante.",
    detailedResultsTitle: "3. Resultados Detallados",
    detailedResultsDescription: "Recibe información completa incluyendo nombre comercial, genérico, ingredientes activos, usos comunes e información de seguridad.",
    tipsForBetterResultsTitle: "Consejos para Mejores Resultados",
    
    privacyPolicyPageTitle: "Política de Privacidad",
    privacyPolicyPageDescription: "Aprende cómo recopilamos, usamos y protegemos tu información al usar nuestro servicio de identificación de medicamentos.",
    informationWeCollect: "Información que Recopilamos",
    howWeUseInformation: "Cómo Usamos la Información",
    dataSecurity: "Seguridad de Datos",
    yourRights: "Tus Derechos",
    contactForPrivacy: "Contáctanos sobre Privacidad",
    
    termsOfServicePageTitle: "Términos de Servicio",
    termsOfServicePageDescription: "Por favor lee estos términos cuidadosamente antes de usar nuestro servicio de identificación de medicamentos.",
    acceptanceOfTerms: "Aceptación de Términos",
    useOfService: "Uso del Servicio",
    userResponsibilities: "Responsabilidades del Usuario",
    disclaimerOfWarranties: "Renuncia de Garantías",
    limitationOfLiability: "Limitación de Responsabilidad",
    
    medicalDisclaimerPageTitle: "Descargo Médico",
    medicalDisclaimerPageDescription: "Información médica importante y limitaciones sobre nuestro servicio de identificación de medicamentos.",
    notMedicalAdvice: "No es Consejo Médico",
    consultProfessionals: "Consulta Profesionales de la Salud",
    noEmergencyUse: "No Usar en Emergencias",
    accuracyLimitations: "Limitaciones de Precisión",
    
    helpCenterPageTitle: "Centro de Ayuda",
    helpCenterPageDescription: "Encuentra respuestas a preguntas comunes sobre el uso de nuestro servicio de identificación de medicamentos.",
    frequentlyAskedQuestions: "Preguntas Frecuentes",
    gettingStarted: "Empezando",
    troubleshooting: "Solución de Problemas",
    
    contactPageTitle: "Contáctanos",
    contactPageDescription: "Estamos aquí para ayudarte. Completa el formulario y te responderemos pronto.",
    sendUsMessage: "Envíanos un Mensaje",
    contactFormDescription: "La única forma de contactarnos. Te responderemos dentro de 24-48 horas.",
    
    reportIssuePageTitle: "Reportar un Problema",
    reportIssuePageDescription: "Ayúdanos a mejorar reportando cualquier problema o inconveniente que encuentres.",
    
    // Privacy Policy content sections
    informationWeCollectContent: "Solo recopilamos las imágenes que subas para análisis y los resultados generados. No almacenamos información personal identificable sin tu consentimiento explícito.",
    howWeProtectYourData: "Cómo Protegemos tus Datos",
    howWeProtectDataContent: "Utilizamos cifrado de extremo a extremo para todas las transmisiones de datos. Las imágenes se procesan de forma segura y se eliminan automáticamente después del análisis.",
    useOfInformation: "Uso de la Información",
    useOfInformationContent: "Tu información se utiliza únicamente para proporcionarte análisis de medicamentos. No compartimos, vendemos ni utilizamos tus datos para ningún otro propósito.",
    yourRightsContent: "Tienes derecho a acceder, corregir o eliminar tus datos en cualquier momento. También puedes solicitar una copia de toda la información que tenemos sobre ti.",
    
    // Terms of Service content sections
    acceptanceOfTermsContent: "Al usar PharmaScan, aceptas estos términos de servicio. Si no estás de acuerdo con alguno de estos términos, por favor no uses nuestro servicio.",
    appropriateUseOfService: "Uso Apropiado del Servicio",
    appropriateUseContent: "PharmaScan está diseñado solo para fines informativos. No debe utilizarse como sustituto de consejos médicos profesionales, diagnósticos o tratamientos.",
    limitationsAndResponsibilities: "Limitaciones y Responsabilidades",
    limitationsContent: "No garantizamos la precisión completa de los resultados. Los usuarios son responsables de verificar toda la información con profesionales de la salud calificados.",
    prohibitions: "Prohibiciones",
    prohibitionsContent: "Los usuarios no deben usar este servicio para propósitos ilegales, intentar hacer ingeniería inversa de nuestra tecnología, o violar cualquier ley o regulación aplicable.",
    
    // Medical Disclaimer content sections
    notMedicalSubstitute: "No es un Sustituto Médico",
    notMedicalSubstituteContent: "PharmaScan es solo una herramienta informativa. Nunca reemplaza el consejo médico profesional, diagnóstico o tratamiento.",
    medicalEmergencies: "Emergencias Médicas",
    medicalEmergenciesContent: "En caso de emergencia médica, llama inmediatamente a los servicios de emergencia. No uses esta aplicación para situaciones que requieren atención médica urgente.",
    professionalVerification: "Verificación Profesional",
    professionalVerificationContent: "Siempre verifica los resultados con un farmacéutico o médico antes de tomar cualquier decisión sobre medicamentos.",
    accuracyLimitationsContent: "Aunque nos esforzamos por la precisión, los resultados pueden variar. Factores como la calidad de la imagen, iluminación y empaque del medicamento pueden afectar la precisión de la identificación.",
    
    // Help Center content sections
    takePhotoAction: "Tomar Foto",
    uploadImage: "Subir Imagen",
    viewResults: "Ver Resultados", 
    useCameraToAnalyze: "Usar cámara para analizar",
    uploadFromGallery: "Subir desde galería",
    analyzeIdentification: "Analizar medicamento",
    
    // Report Issue content sections
    issueDetails: "Detalles del Problema",
    pleaseProvideInformation: "Por favor proporciona toda la información posible para ayudarnos a resolver el problema rápidamente.",
    issueType: "Tipo de Problema",
    selectType: "Seleccionar tipo",
    urgency: "Urgencia",
    selectUrgency: "Seleccionar urgencia",
    issueTitle: "Título del Problema",
    briefDescription: "Descripción breve del problema",
    detailedDescription: "Descripción Detallada",
    stepsToReproduce: "Pasos para Reproducir",
    expectedResult: "Resultado Esperado",
    actualResult: "Resultado Real",
    submitReport: "Enviar Reporte",
    
    // Common form labels
    howDoITakeGoodPhoto: "¿Cómo tomar una buena foto de mi medicamento?",
    whatFileTypesCanUpload: "¿Qué tipos de archivo puedo subir?",
    howAccurateIsAnalysis: "¿Qué tan preciso es el análisis?",
    canIUseForSelfMedication: "¿Puedo usar PharmaScan para automedicarme?",
    
    // Help Center FAQ answers
    howDoITakeGoodPhotoAnswer: "Para obtener los mejores resultados: 1) Asegúrate de tener buena iluminación, 2) Incluye toda la etiqueta del producto, 3) Mantén la cámara estable para evitar fotos borrosas, 4) Toma la foto directamente, no en ángulo.",
    whatFileTypesCanUploadAnswer: "Aceptamos archivos JPG, PNG y HEIC con un tamaño máximo de 10MB. La mayoría de las fotos de smartphones funcionan perfectamente.",
    howAccurateIsAnalysisAnswer: "Utilizamos tecnología avanzada de IA, pero la precisión puede variar según la calidad de la imagen y la visibilidad de la etiqueta. Siempre verifica los resultados con un profesional de la salud.",
    canIUseForSelfMedicationAnswer: "No. PharmaScan es solo para fines informativos. Nunca uses esta información para automedicarte. Siempre consulta con un médico o farmacéutico antes de tomar cualquier medicamento.",
    whatDoIDoIfNotIdentified: "¿Qué hago si no se identifica mi medicamento?",
    whatDoIDoIfNotIdentifiedAnswer: "Si no podemos identificar tu medicamento, intenta tomar una foto más clara, asegúrate de que la etiqueta sea completamente visible, o consulta directamente con tu farmacéutico.",
    cameraNotWorking: "¿La cámara no funciona en mi dispositivo?",
    cameraNotWorkingAnswer: "Asegúrate de haber dado permisos de cámara al navegador. En Android, limpia la caché del navegador si es necesario. En iOS, verifica los permisos en Configuración > Safari. Como alternativa, usa la opción de subir archivo.",
    
    // Help Center sections
    importantReminder: "Recordatorio Importante",
    importantReminderText: "PharmaScan es una herramienta informativa. Para preguntas médicas específicas o emergencias, contacta siempre a profesionales de la salud calificados.",
    
    // Contact form fields
    name: "Nombre",
    nameField: "Tu nombre",
    email: "Correo Electrónico",
    emailField: "tu@email.com",
    category: "Categoría",
    selectCategory: "Selecciona una categoría",
    subject: "Asunto",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos cómo podemos ayudarte...",
    sendMessage: "Enviar Mensaje",
    
    // Contact form categories
    technicalIssue: "Problema Técnico",
    feedback: "Comentarios",
    generalQuestion: "Pregunta General",
    partnership: "Colaboración",
    
    // Contact form messages
    messageSent: "Mensaje Enviado",
    messageSentDescription: "Gracias por contactarnos. Te responderemos pronto.",
    

    
    copyrightText: "© 2024 PharmaScan. Esta herramienta es solo para fines informativos y no debe reemplazar el consejo médico profesional.",
    
    // History feature
    scanHistory: "Historial de Escaneos",
    recentScans: "Escaneos Recientes",
    noHistoryYet: "Aún no hay escaneos. ¡Sube tu primera imagen de medicamento para comenzar!",
    scanPerformed: "Escaneo realizado",
    viewDetails: "Ver Detalles",
    clearHistory: "Limpiar Historial",
    confirmClearHistory: "¿Estás seguro de que quieres limpiar todo el historial de escaneos?",
    historyCleared: "Historial de escaneos eliminado exitosamente",
    
    // Privacy Policy additional sections
    cookiesAndTracking: "Cookies y Tecnologías de Seguimiento",
    cookiesDescription1: "Utilizamos cookies esenciales únicamente para mejorar la funcionalidad del sitio. No utilizamos cookies de seguimiento o publicitarias.",
    cookiesDescription2: "Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar algunas funcionalidades del sitio.",
    contactAndQuestions: "Contacto y Preguntas",
    contactDescription: "Si tienes preguntas sobre esta política de privacidad o cómo manejamos tus datos, por favor contáctanos a través de nuestro Centro de Ayuda.",
    lastUpdated: "Última actualización: Enero 2024",
    
    // Terms of Service additional sections
    medicalDisclaimerTerms: "Descargo de Responsabilidad Médica",
    pharmascanNotMedical: "PharmaScan NO es un dispositivo médico y no está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad.",
    alwaysConsultProfessional: "Siempre consulta con un profesional de la salud calificado antes de tomar decisiones sobre medicamentos.",
    emergencyContact: "En caso de emergencia médica, contacta inmediatamente a los servicios de emergencia locales.",
    modificationsToTerms: "Modificaciones a los Términos",
    modificationsDescription: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. Te recomendamos revisar esta página periódicamente.",
    
    // Medical Disclaimer additional sections
    responsibleUse: "Uso Responsable",
    responsibleUseIntro: "Para usar PharmaScan de manera segura:",
    consultHealthcare: "Consulta siempre con profesionales de la salud",
    verifyBeforeTaking: "Verifica la información antes de tomar medicamentos",
    noSelfDiagnosis: "No uses para autodiagnóstico o automedicación",
    readOriginalLabels: "Lee siempre las etiquetas originales de los medicamentos",
    inCaseOfEmergency: "En Caso de Emergencia",
    emergencyDescription: "Si experimentas una emergencia médica, contacta inmediatamente a tus servicios de emergencia locales.",
    emergencyAdvice: "Consulta con profesionales médicos locales para información específica sobre centros de control de envenenamiento y servicios de emergencia en tu área.",
    confirmationText: "Al continuar usando PharmaScan, confirmas que has leído y entendido este aviso médico."
  }
};

export type Language = keyof typeof translations;