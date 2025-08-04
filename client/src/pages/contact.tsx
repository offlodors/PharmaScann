import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Languages } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);

      toast({
        title: t.messageSent,
        description: t.messageSentDescription,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: t.language === 'es' ? "Error" : "Error",
        description: t.language === 'es' 
          ? "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo."
          : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
            {t.contactPageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.contactPageDescription}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {t.sendUsMessage}
              </CardTitle>
              <CardDescription>
                {t.contactFormDescription}
              </CardDescription>
            </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        {t.name}
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t.nameField}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        {t.email}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.emailField}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">
                      {t.category}
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectCategory} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">
                          {t.technicalIssue}
                        </SelectItem>
                        <SelectItem value="feedback">
                          {t.feedback}
                        </SelectItem>
                        <SelectItem value="question">
                          {t.generalQuestion}
                        </SelectItem>
                        <SelectItem value="partnership">
                          {t.partnership}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">
                      {t.subject}
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder={t.language === 'es' ? 'Breve descripción del tema' : 'Brief description of the topic'}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      {t.message}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t.messagePlaceholder}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting 
                      ? (t.language === 'es' ? 'Enviando...' : 'Sending...') 
                      : t.sendMessage
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}