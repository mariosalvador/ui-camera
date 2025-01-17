"use client";

import React, { useRef, useState } from "react";

export const VideoRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleStartRecording = async () => {
    if (!videoRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleDownload = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted className="border rounded mb-4"></video>
      <div className="flex gap-2">
        <button
          onClick={handleStartRecording}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Iniciar Gravação
        </button>
        <button
          onClick={handleStopRecording}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Parar Gravação
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Baixar Vídeo
        </button>
      </div>
    </div>
  );
};

