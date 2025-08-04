import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Shield, Eye, Database, Languages } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  const { t, language, setLanguage } = useLanguage();

  const sections = [
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: t.informationWeCollect,
      content: t.informationWeCollectContent
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: t.howWeProtectYourData,
      content: t.howWeProtectDataContent
    },
    {
      icon: <Eye className="w-6 h-6 text-purple-600" />,
      title: t.useOfInformation,
      content: t.useOfInformationContent
    },
    {
      icon: <Lock className="w-6 h-6 text-red-600" />,
      title: t.yourRights,
      content: t.yourRightsContent
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
            {t.privacyPolicyPageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.privacyPolicyPageDescription}
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

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.cookiesAndTracking}
          </h2>
          <p className="text-gray-700 mb-4">
            {t.cookiesDescription1}
          </p>
          <p className="text-gray-700">
            {t.cookiesDescription2}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.contactAndQuestions}
          </h2>
          <p className="text-gray-700">
            {t.contactDescription}
          </p>
        </div>

        <div className="text-sm text-gray-500 text-center">
          {t.lastUpdated}
        </div>
      </div>
    </div>
  );
}