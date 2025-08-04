import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useCapacitor } from "@/hooks/use-capacitor";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";

interface MobileCameraProps {
  onImageSelected: (file: File) => void;
}

export function MobileCamera({ onImageSelected }: MobileCameraProps) {
  const { isNative, takePicture, pickImage } = useCapacitor();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleTakePicture = async () => {
    try {
      const dataUrl = await takePicture();
      if (dataUrl) {
        // Convert data URL to File object
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        onImageSelected(file);
        
        toast({
          title: t.photoCaptured,
          description: t.analyzingDescription,
        });
      }
    } catch (error) {
      toast({
        title: t.captureFailed,
        description: t.cameraAccessFailed,
        variant: "destructive",
      });
    }
  };

  const handlePickImage = async () => {
    try {
      const dataUrl = await pickImage();
      if (dataUrl) {
        // Convert data URL to File object
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'selected-photo.jpg', { type: 'image/jpeg' });
        onImageSelected(file);
        
        toast({
          title: t.uploadedImage,
          description: t.analyzingDescription,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to select image",
        variant: "destructive",
      });
    }
  };

  // If running as native app, use Capacitor camera
  if (isNative) {
    return (
      <div className="space-y-4">
        <Button 
          onClick={handleTakePicture}
          className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Camera className="mr-3 h-6 w-6" />
          {t.takePhoto}
        </Button>
        
        <Button 
          onClick={handlePickImage}
          variant="outline"
          className="w-full h-14 text-lg"
          size="lg"
        >
          <Upload className="mr-3 h-6 w-6" />
          {t.chooseFile}
        </Button>
      </div>
    );
  }

  // Fallback to web camera for browser
  return null;
}

export default MobileCamera;