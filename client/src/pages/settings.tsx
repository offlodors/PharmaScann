import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Key, Info } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { isMobileApp } from "@/lib/api-config";
import { getOpenAIKey, setOpenAIKey } from "@/services/openai-direct";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [apiKey, setApiKeyState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const existingKey = getOpenAIKey();
    if (existingKey) {
      // Show masked version
      setApiKeyState("sk-" + "*".repeat(40) + existingKey.slice(-8));
    }
  }, []);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: language === 'es' 
          ? "Por favor ingresa una API key válida"
          : "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast({
        title: "Error",
        description: language === 'es' 
          ? "La API key debe comenzar con 'sk-'"
          : "API key must start with 'sk-'",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      setOpenAIKey(apiKey);
      toast({
        title: language === 'es' ? "Guardado" : "Saved",
        description: language === 'es' 
          ? "API key guardada correctamente"
          : "API key saved successfully",
      });
      
      // Mask the key in the input
      setApiKeyState("sk-" + "*".repeat(40) + apiKey.slice(-8));
    } catch (error) {
      toast({
        title: "Error",
        description: language === 'es' 
          ? "Error al guardar la API key"
          : "Failed to save API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearApiKey = () => {
    setOpenAIKey("");
    setApiKeyState("");
    toast({
      title: language === 'es' ? "Eliminado" : "Cleared",
      description: language === 'es' 
        ? "API key eliminada"
        : "API key cleared",
    });
  };

  if (!isMobileApp()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {language === 'es' 
                ? "La configuración solo está disponible en la aplicación móvil."
                : "Settings are only available in the mobile app."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'es' ? 'Volver' : 'Back'}
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {language === 'es' ? 'Configuración' : 'Settings'}
          </h1>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              {language === 'es' ? 'API Key de OpenAI' : 'OpenAI API Key'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {language === 'es' 
                  ? "Para usar el análisis de medicamentos, necesitas una API key de OpenAI. Puedes obtenerla en platform.openai.com"
                  : "To use medication analysis, you need an OpenAI API key. You can get one at platform.openai.com"}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="apiKey">
                {language === 'es' ? 'API Key' : 'API Key'}
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSaveApiKey} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading 
                  ? (language === 'es' ? 'Guardando...' : 'Saving...') 
                  : (language === 'es' ? 'Guardar' : 'Save')}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearApiKey}
                disabled={isLoading}
              >
                {language === 'es' ? 'Limpiar' : 'Clear'}
              </Button>
            </div>

            <Alert>
              <AlertDescription className="text-xs text-gray-600">
                {language === 'es' 
                  ? "Tu API key se guarda localmente en tu dispositivo y nunca se envía a nuestros servidores."
                  : "Your API key is stored locally on your device and is never sent to our servers."}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}