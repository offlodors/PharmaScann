import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export function useCapacitor() {
  const [isNative, setIsNative] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    const checkPlatform = async () => {
      setIsNative(Capacitor.isNativePlatform());
      
      if (Capacitor.isNativePlatform()) {
        try {
          const info = await Device.getInfo();
          setDeviceInfo(info);
          
          // Set status bar style for mobile
          if (Capacitor.getPlatform() !== 'web') {
            await StatusBar.setStyle({ style: Style.Default });
          }
        } catch (error) {
          console.error('Error getting device info:', error);
        }
      }
    };

    checkPlatform();
  }, []);

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const permissions = await Camera.requestPermissions({
        permissions: ['camera', 'photos']
      });
      
      return permissions.camera === 'granted' || permissions.photos === 'granted';
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  const checkPermissions = async (): Promise<boolean> => {
    try {
      const permissions = await Camera.checkPermissions();
      return permissions.camera === 'granted' || permissions.photos === 'granted';
    } catch (error) {
      console.error('Error checking permissions:', error);
      return false;
    }
  };

  const takePicture = async (): Promise<string | null> => {
    try {
      // Check and request permissions first
      const hasPermission = await checkPermissions();
      if (!hasPermission) {
        const granted = await requestPermissions();
        if (!granted) {
          throw new Error('Camera permission denied');
        }
      }

      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        width: 1024,
        height: 1024,
      });

      return image.dataUrl || null;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  };

  const pickImage = async (): Promise<string | null> => {
    try {
      // Check and request permissions first
      const hasPermission = await checkPermissions();
      if (!hasPermission) {
        const granted = await requestPermissions();
        if (!granted) {
          throw new Error('Photos permission denied');
        }
      }

      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        width: 1024,
        height: 1024,
      });

      return image.dataUrl || null;
    } catch (error) {
      console.error('Error picking image:', error);
      throw error;
    }
  };

  const exitApp = async () => {
    if (isNative) {
      await App.exitApp();
    }
  };

  return {
    isNative,
    deviceInfo,
    takePicture,
    pickImage,
    requestPermissions,
    checkPermissions,
    exitApp,
  };
}