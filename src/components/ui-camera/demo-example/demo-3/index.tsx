"use client";
import { useRef, useState } from "react";
import CustomCamera from "../../camera";
import Image from "next/image";


export const DemoCameraThree = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const cameraRef = useRef<{
    captureImage: () => void;
    stopCamera: () => void;
  }>(null);

  const handleCaptureImage = () => {
    if (cameraRef.current) {
      cameraRef.current.captureImage();
    }
  };
  return (
    <div className="p-4 flex flex-col lg:flex-row gap-4 max-h-[600px]">
      {/* Camera View */}
      <div className="w-full h-80 lg:h-auto rounded-lg relative bg-black">
        <CustomCamera
          ref={cameraRef}
          getCapturedImage={(img) => setCurrentImage(img)}
          className="h-full w-full"
          videoClassName="h-full w-full"
          showDevices={false}
        />
        <button
          onClick={handleCaptureImage}
          className="absolute bottom-4 right-4 px-4 py-2 bg-transparent border text-white rounded hover:black/80"
        >
          Capturar Imagem
        </button>
      </div>

      {/* Captured Image */}
      <div className="w-full h-80 lg:h-auto rounded-lg relative bg-black">
        {currentImage && (
          <Image
            width={300}
            height={300}
            src={currentImage}
            alt="Captured Image"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};