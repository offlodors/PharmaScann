import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, Camera, Upload, Search, AlertCircle, Languages } from "lucide-react";
import { Link } from "wouter";

export default function HelpCenter() {
  const { t, language, setLanguage } = useLanguage();

  const faqs = [
    {
      question: t.howDoITakeGoodPhoto,
      answer: t.howDoITakeGoodPhotoAnswer
    },
    {
      question: t.whatFileTypesCanUpload,
      answer: t.whatFileTypesCanUploadAnswer
    },
    {
      question: t.howAccurateIsAnalysis,
      answer: t.howAccurateIsAnalysisAnswer
    },
    {
      question: t.canIUseForSelfMedication,
      answer: t.canIUseForSelfMedicationAnswer
    },
    {
      question: t.whatDoIDoIfNotIdentified,
      answer: t.whatDoIDoIfNotIdentifiedAnswer
    },
    {
      question: t.cameraNotWorking,
      answer: t.cameraNotWorkingAnswer
    }
  ];

  const quickActions = [
    {
      icon: <Camera className="w-6 h-6 text-blue-600" />,
      title: t.takePhotoAction,
      description: t.useCameraToAnalyze,
      action: () => window.location.href = "/"
    },
    {
      icon: <Upload className="w-6 h-6 text-green-600" />,
      title: t.uploadImage,
      description: t.uploadFromGallery,
      action: () => window.location.href = "/"
    },
    {
      icon: <Search className="w-6 h-6 text-purple-600" />,
      title: t.viewResults,
      description: t.analyzeIdentification,
      action: () => window.location.href = "/"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
{t.backToHome}
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center space-x-2"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'ES' : 'EN'}</span>
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.helpCenterPageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.helpCenterPageDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={action.action}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 p-3 bg-gray-50 rounded-lg w-fit">
                  {action.icon}
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.frequentlyAskedQuestions}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pt-4 pb-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                {t.importantReminder}
              </h3>
              <p className="text-yellow-700">
                {t.importantReminderText}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t.language === 'es' ? '¿No encontraste lo que buscabas?' : "Didn't find what you were looking for?"}
          </h3>
          <div className="space-x-4">
            <Link href="/contact">
              <Button>
                {t.language === 'es' ? 'Contáctanos' : 'Contact Us'}
              </Button>
            </Link>
            <Link href="/report-issue">
              <Button variant="outline">
                {t.language === 'es' ? 'Reportar Problema' : 'Report Issue'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}