import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Users, Gavel, Languages } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  const { t, language, setLanguage } = useLanguage();

  const sections = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: t.acceptanceOfTerms,
      content: t.acceptanceOfTermsContent
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: t.appropriateUseOfService,
      content: t.appropriateUseContent
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: t.limitationsAndResponsibilities,
      content: t.limitationsContent
    },
    {
      icon: <Gavel className="w-6 h-6 text-purple-600" />,
      title: t.prohibitions,
      content: t.prohibitionsContent
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
            {t.termsOfServicePageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.termsOfServicePageDescription}
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {sections.map((section, index) => (
            <Card key={index} className="border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {section.content}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            {t.medicalDisclaimerTerms}
          </h2>
          <div className="space-y-3 text-red-700">
            <p>
              {t.pharmascanNotMedical}
            </p>
            <p>
              {t.alwaysConsultProfessional}
            </p>
            <p>
              {t.emergencyContact}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.modificationsToTerms}
          </h2>
          <p className="text-gray-700">
            {t.modificationsDescription}
          </p>
        </div>

        <div className="text-sm text-gray-500 text-center">
          {t.lastUpdated}
        </div>
      </div>
    </div>
  );
}