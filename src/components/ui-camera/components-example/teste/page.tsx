"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import CustomCamera from "../../camera";

export default function Teste() {
  const [getDevices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [getCapturedImage, setCapturedImage] = useState<string | null>(null);

  const cameraRef = useRef<{ captureImage: () => void; stopCamera?: () => void; } | null>(null);

  const handleCaptureImage = () => {
    if (cameraRef.current) {
      cameraRef.current.captureImage();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Custom Camera Component - Test 1</h1>
      <CustomCamera
        ref={cameraRef}
        showDevices={false}
        getAllVideoDevices={(devices: MediaDeviceInfo[]) => setDevices(devices)}
        getCapturedImage={(e: string | null) => setCapturedImage(e)}
        setCameraError={(e: string | null) => console.log("Ele:", e)}
      />
      <br />
      <button
        onClick={handleCaptureImage}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Cap Image
      </button>

      <select
        onChange={(e) => {
          const selectedDevice = getDevices.find(
            (device) => device.deviceId === e.target.value
          );
          if (selectedDevice) {
            setDevices([selectedDevice]);
          }
        }}
        value={String(getDevices) || ""}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {getDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Câmera ${device.deviceId}`}
          </option>
        ))}
      </select>

      {getCapturedImage && (
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">IIIII</h2>
          <Image
            width={200}
            height={200}
            src={getCapturedImage}
            alt="Imagem Capturada"
            className="w-full max-w-md h-auto rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}
