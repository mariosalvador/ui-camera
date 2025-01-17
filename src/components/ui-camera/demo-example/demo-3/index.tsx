"use client";
import { useRef, useState } from "react";
import CustomCamera from "../../camera";
import Image from "next/image";


export const DemoCameraThree = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [devicesOn, setDevicesOn] = useState<boolean>(false);
  const cameraRef = useRef<{
    captureImage: () => void;
    stopCamera: () => void;
  }>(null);

  const handleCaptureImage = () => {
    if (cameraRef.current && devicesOn) {
      cameraRef.current.captureImage();
    }
  };

  const handleGetAllVideoDevices = (devices: MediaDeviceInfo[]) => {
    if (devices.length > 0) {
      setDevicesOn(true);
    } else {
      setDevicesOn(false);
    }
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-4 max-h-[600px]">
      {/* Camera View */}
      <div className="w-full h-80 lg:h-auto rounded-lg relative bg-black">
        <CustomCamera
          ref={cameraRef}
          getAllVideoDevices={handleGetAllVideoDevices}
          getCapturedImage={(img) => setCurrentImage(img)}
          className="h-full w-full"
          videoClassName="h-full w-full"
          showDevices={false}
        />
        {
          devicesOn && (
            <button
              onClick={handleCaptureImage}
              className="absolute bottom-4 right-4 px-4 py-2 bg-transparent border text-white rounded hover:black/80"
            >
              Capturar Imagem
            </button>
          )
        }

      </div>

      {/* Captured Image */}
      {
        devicesOn && (
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
        )
      }
    </div>
  );
};