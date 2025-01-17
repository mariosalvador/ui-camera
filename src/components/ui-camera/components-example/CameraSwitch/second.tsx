"use client";

import React, { useState } from "react";
import Image from "next/image";
import CustomCamera from "../../camera";

export const CameraPreviewGallery: React.FC = () => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);

  const handleCaptureImage = (imageData: string | null) => {
    if (imageData) {
      setCapturedImages((prev) => [...prev, imageData]);
    }
  };

  return (
    <div className="p-4">
      <CustomCamera
        getCapturedImage={handleCaptureImage}
        className="mb-4"
      />
      <div className="grid grid-cols-2 gap-4">
        {capturedImages.map((image, index) => (
          <div key={index} className="border rounded p-2">
            <Image
              src={image}
              alt={`Captured ${index}`}
              width={150}
              height={150}
              className="rounded"
            />
            <button
              className="bg-red-500 text-white px-2 py-1 mt-2 rounded w-full"
              onClick={() =>
                setCapturedImages((prev) =>
                  prev.filter((_, imgIndex) => imgIndex !== index)
                )
              }
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

