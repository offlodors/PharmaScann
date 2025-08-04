import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Bug, AlertTriangle, Camera, Upload, Languages } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ReportIssue() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    issueType: "",
    title: "",
    description: "",
    steps: "",
    expected: "",
    actual: "",
    browser: "",
    device: "",
    includeScreenshot: false,
    urgency: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/report-issue", formData);

      toast({
        title: t.language === 'es' ? "Problema Reportado" : "Issue Reported",
        description: t.language === 'es' 
          ? "Gracias por reportar el problema. Nuestro equipo lo revisará pronto."
          : "Thank you for reporting the issue. Our team will review it soon.",
      });

      setFormData({
        issueType: "",
        title: "",
        description: "",
        steps: "",
        expected: "",
        actual: "",
        browser: "",
        device: "",
        includeScreenshot: false,
        urgency: ""
      });
    } catch (error) {
      toast({
        title: t.language === 'es' ? "Error" : "Error",
        description: t.language === 'es' 
          ? "No se pudo enviar el reporte. Por favor, inténtalo de nuevo."
          : "Failed to send report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const issueTypes = [
    {
      value: "camera",
      label: t.language === 'es' ? "Problema con Cámara" : "Camera Issue",
      icon: <Camera className="w-4 h-4" />
    },
    {
      value: "upload",
      label: t.language === 'es' ? "Problema de Subida" : "Upload Issue", 
      icon: <Upload className="w-4 h-4" />
    },
    {
      value: "analysis",
      label: t.language === 'es' ? "Error de Análisis" : "Analysis Error",
      icon: <Bug className="w-4 h-4" />
    },
    {
      value: "ui",
      label: t.language === 'es' ? "Problema de Interfaz" : "UI Issue",
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      value: "other",
      label: t.language === 'es' ? "Otro" : "Other",
      icon: <Bug className="w-4 h-4" />
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
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.reportIssuePageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.reportIssuePageDescription}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Bug className="w-6 h-6 text-red-600" />
              <span>{t.issueDetails}</span>
            </CardTitle>
            <CardDescription>
              {t.pleaseProvideInformation}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="issueType">
                    {t.issueType}
                  </Label>
                  <Select value={formData.issueType} onValueChange={(value) => setFormData({...formData, issueType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectType} />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            {type.icon}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="urgency">
                    {t.urgency}
                  </Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectUrgency} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        {t.urgencyLow}
                      </SelectItem>
                      <SelectItem value="medium">
                        {t.urgencyMedium}
                      </SelectItem>
                      <SelectItem value="high">
                        {t.urgencyHigh}
                      </SelectItem>
                      <SelectItem value="critical">
                        {t.urgencyCritical}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">
                  {t.issueTitleLabel}
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder={t.language === 'es' ? 'Breve descripción del problema' : 'Brief description of the issue'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">
                  {t.detailedDescription}
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder={t.language === 'es' ? 'Describe qué estaba pasando cuando ocurrió el problema...' : 'Describe what was happening when the issue occurred...'}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="steps">
                  {t.stepsToReproduce}
                </Label>
                <Textarea
                  id="steps"
                  value={formData.steps}
                  onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  placeholder={t.language === 'es' ? '1. Ir a...\n2. Hacer clic en...\n3. El problema ocurre...' : '1. Go to...\n2. Click on...\n3. Issue occurs...'}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="expected">
                    {t.expectedResult}
                  </Label>
                  <Textarea
                    id="expected"
                    value={formData.expected}
                    onChange={(e) => setFormData({...formData, expected: e.target.value})}
                    placeholder={t.language === 'es' ? 'Qué esperabas que pasara...' : 'What you expected to happen...'}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="actual">
                    {t.actualResult}
                  </Label>
                  <Textarea
                    id="actual"
                    value={formData.actual}
                    onChange={(e) => setFormData({...formData, actual: e.target.value})}
                    placeholder={t.language === 'es' ? 'Qué pasó en realidad...' : 'What actually happened...'}
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="browser">
                    {t.browserLabel}
                  </Label>
                  <Input
                    id="browser"
                    value={formData.browser}
                    onChange={(e) => setFormData({...formData, browser: e.target.value})}
                    placeholder="Chrome 120, Safari 17, Firefox 121..."
                  />
                </div>

                <div>
                  <Label htmlFor="device">
                    {t.deviceLabel}
                  </Label>
                  <Input
                    id="device"
                    value={formData.device}
                    onChange={(e) => setFormData({...formData, device: e.target.value})}
                    placeholder="iPhone 15, Samsung Galaxy, MacBook..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="screenshot"
                  checked={formData.includeScreenshot}
                  onCheckedChange={(checked) => setFormData({...formData, includeScreenshot: !!checked})}
                />
                <Label htmlFor="screenshot" className="text-sm">
                  {t.includeScreenshotLabel}
                </Label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>
                    {t.language === 'es' ? 'Consejo:' : 'Tip:'}
                  </strong>{' '}
                  {t.language === 'es'
                    ? 'Cuanta más información proporciones, más rápido podremos resolver el problema. Include capturas de pantalla, mensajes de error específicos, y los pasos exactos que seguiste.'
                    : 'The more information you provide, the faster we can resolve the issue. Include screenshots, specific error messages, and the exact steps you followed.'
                  }
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting 
                  ? (t.language === 'es' ? 'Enviando...' : 'Sending...') 
                  : t.submitReport
                }
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            {t.language === 'es' 
              ? '¿Necesitas ayuda inmediata? Consulta nuestro Centro de Ayuda primero.'
              : 'Need immediate help? Check our Help Center first.'
            }
          </p>
          <Link href="/help-center">
            <Button variant="outline">
              {t.language === 'es' ? 'Ir al Centro de Ayuda' : 'Go to Help Center'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}