import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Stethoscope, Phone, Clock, Languages } from "lucide-react";
import { Link } from "wouter";

export default function MedicalDisclaimer() {
  const { t, language, setLanguage } = useLanguage();

  const warnings = [
    {
      icon: <Stethoscope className="w-6 h-6 text-red-600" />,
      title: t.notMedicalSubstitute,
      content: t.notMedicalSubstituteContent
    },
    {
      icon: <Phone className="w-6 h-6 text-red-600" />,
      title: t.medicalEmergencies,
      content: t.medicalEmergenciesContent
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      title: t.professionalVerification,
      content: t.professionalVerificationContent
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      title: t.accuracyLimitations,
      content: t.accuracyLimitationsContent
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
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
          
          <div className="bg-red-100 border border-red-300 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h1 className="text-3xl font-bold text-red-800">
                {t.medicalDisclaimerPageTitle}
              </h1>
            </div>
            <p className="text-lg text-red-700 font-medium">
              {t.medicalDisclaimerPageDescription}
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {warnings.map((warning, index) => (
            <Card key={index} className="border-l-4 border-l-red-500 bg-red-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {warning.icon}
                  <CardTitle className="text-xl text-red-800">{warning.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-red-700 font-medium">
                  {warning.content}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">
            {t.responsibleUse}
          </h2>
          <div className="space-y-3 text-yellow-700">
            <p className="font-medium">
              {t.responsibleUseIntro}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                {t.consultHealthcare}
              </li>
              <li>
                {t.verifyBeforeTaking}
              </li>
              <li>
                {t.noSelfDiagnosis}
              </li>
              <li>
                {t.readOriginalLabels}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {t.inCaseOfEmergency}
          </h2>
          <div className="text-blue-700">
            <p className="font-medium mb-2">
              {t.emergencyDescription}
            </p>
            <p>
              {t.emergencyAdvice}
            </p>
          </div>
        </div>

        <div className="text-center bg-gray-100 rounded-lg p-6">
          <p className="text-gray-700 font-medium">
            {t.confirmationText}
          </p>
        </div>
      </div>
    </div>
  );
}