"use client";

import React, { useRef } from "react";
import CustomCamera from "../../camera";

export const Teste2: React.FC = () => {
  const cameraRef = useRef<{
    captureImage?: () => void;
    stopCamera?: () => void;
  }>(null);

  const handleCaptureImage = () => {
    if (cameraRef.current && cameraRef.current.captureImage) {
      cameraRef.current.captureImage();
    }
  };

  const handleStopCamera = () => {
    if (cameraRef.current && cameraRef.current.stopCamera) {
      cameraRef.current.stopCamera();
    }
  };

  const handleGetAllVideoDevices = (devices: MediaDeviceInfo[]) => {
    console.log("Dispositivos de vídeo encontrados:", devices);
  };

  const handleGetCapturedImage = (imageData: string | null) => {
    if (imageData) {
      console.log("Imagem capturada:", imageData);
    }
  };

  const handleSetCameraError = (error: string | null) => {
    if (error) {
      console.error("Erro na câmera:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Camera Component - Test 2</h1>
      <CustomCamera
        ref={cameraRef}
        showDevices={false}
        showErrors={false}
        getAllVideoDevices={handleGetAllVideoDevices}
        getCapturedImage={handleGetCapturedImage}
        setCameraError={handleSetCameraError}
        className="px-5"
        videoClassName="bg-black"
        errorClassName="error-message"
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleCaptureImage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Capturar Imagem
        </button>
        <button
          onClick={handleStopCamera}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Parar Câmera
        </button>
      </div>
    </div>
  );
};