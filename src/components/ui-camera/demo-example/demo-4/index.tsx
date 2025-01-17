"use client";
import { useRef, useState } from "react";
import CustomCamera from "../../camera";
import { CameraOff, Camera } from "lucide-react";

export const DemoCameraFour = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const cameraRef = useRef<{
    captureImage: () => void;
    stopCamera: () => void;
    restartCamera: () => void;
  }>(null);

  const handleStopCamera = () => {
    if (cameraRef.current) {
      setIsCameraOn(false)
      cameraRef.current.stopCamera()
    }
  }

  const handleRestartCamera = () => {
    if (cameraRef.current) {
      setIsCameraOn(true)
      cameraRef.current.restartCamera()
    }
  }
  return (
    <div className="p-4 flex flex-col lg:flex-row gap-4 max-h-[600px]">
      {/* Camera View */}
      <div className="w-full h-80 lg:h-auto rounded-lg relative bg-black">
        <CustomCamera
          ref={cameraRef}
          className="h-full w-full"
          videoClassName="h-full w-full"
          showDevices={false}
        />

        {
          isCameraOn ? (
            <button
              onClick={handleStopCamera}
              className="absolute bottom-4 right-4 px-2 py-2 bg-transparent border  text-white rounded-full hover:black/80"
            >
              <CameraOff className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={handleRestartCamera}
              className="absolute bottom-4 right-4 px-2 py-2 bg-transparent border  text-white rounded-full hover:black/80"
            >
              <Camera className="w-6 h-6" />
            </button>
          )
        }
      </div>
    </div>
  );
};