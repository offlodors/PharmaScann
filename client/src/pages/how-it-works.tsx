import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, Search, Shield, Upload, Languages } from "lucide-react";
import { Link } from "wouter";
import AdBanner from "@/components/ads/AdBanner";
import { AD_SLOTS } from "@/components/ads/AdConfiguration";

export default function HowItWorks() {
  const { t, language, setLanguage } = useLanguage();

  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: t.uploadOrTakePhotoTitle,
      description: t.uploadOrTakePhotoDescription
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: t.aiAnalysisTitle,
      description: t.aiAnalysisDescription
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: t.detailedResultsTitle,
      description: t.detailedResultsDescription
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
            {t.howItWorksPageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.howItWorksPageDescription}
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {step.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.tipsForBetterResultsTitle}
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t.ensureGoodLighting}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t.includeProductLabel}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t.avoidBlurryPhotos}
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            {t.medicalDisclaimer}
          </h3>
          <p className="text-yellow-700">
            {t.disclaimerText}
          </p>
        </div>

        {/* Page Ad Banner */}
        <div className="mt-8">
          <AdBanner 
            adSlot={AD_SLOTS.IN_CONTENT}
            adFormat="auto"
            className="text-center bg-gray-50 rounded-lg p-4"
            style={{ minHeight: '120px' }}
          />
        </div>
      </div>
    </div>
  );
}