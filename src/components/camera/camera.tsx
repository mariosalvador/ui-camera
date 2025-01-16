"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface CameraProps {
  showDevices?: boolean; // Mostrar dispositivos conectados
  showErrors?: boolean; // Mostrar erros
  getAllVideoDevices?: (value: MediaDeviceInfo[]) => void;
  getCapturedImage?: (value: string | null) => void;
  className?: string; // Classe de estilo personalizada
  videoClassName?: string; // Classe de estilo para o elemento de vídeo
  errorClassName?: string; // Classe de estilo para exibir erros
  setCameraError?: (value: string | null) => void;
}

const CustomCamera = forwardRef<{
  captureImage?: () => void;
  stopCamera?: () => void;
}, CameraProps>(
  (
    {
      showDevices = true,
      showErrors = true,
      getAllVideoDevices,
      getCapturedImage,
      className,
      videoClassName,
      errorClassName,
      setCameraError,
    },
    ref
  ) => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Buscar dispositivos de vídeo
    useEffect(() => {
      const fetchDevices = async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          const allDevices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = allDevices.filter(
            (device) => device.kind === "videoinput"
          );
          getAllVideoDevices?.(videoDevices);
          setDevices(videoDevices);

          if (videoDevices.length > 0) {
            setSelectedDeviceId(videoDevices[0].deviceId);
            setError(null);
          } else {
            const noCameraError = "Nenhuma câmera disponível.";
            setError(noCameraError);
            setCameraError?.(noCameraError);
          }
        } catch (err) {
          const permissionsError =
            "Erro ao acessar dispositivos de vídeo. Verifique as permissões.";
          setError(permissionsError);
          setCameraError?.(permissionsError);
          console.error("Error:", err);
        }
      };

      fetchDevices();
    }, [getAllVideoDevices, setCameraError]);

    // Atualizar feed de vídeo ao trocar de dispositivo
    useEffect(() => {
      const startCamera = async (deviceId: string) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId ? { exact: deviceId } : undefined },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setError(null);
          }
        } catch (err) {
          const startCameraError = "Erro ao iniciar a câmera. Verifique as permissões.";
          setError(startCameraError);
          setCameraError?.(startCameraError);
          console.error("Error:", err);
        }
      };

      if (selectedDeviceId) {
        startCamera(selectedDeviceId);
      }
      return () => stopCamera();
    }, [selectedDeviceId, setCameraError]);

    const stopCamera = () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    const captureImage = () => {
      if (!videoRef.current || !canvasRef.current) {
        const captureError =
          "Erro ao capturar imagem: vídeo ou canvas não disponível.";
        setError(captureError);
        setCameraError?.(captureError);
        return;
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        const contextError =
          "Erro ao capturar imagem: contexto do canvas não disponível.";
        setError(contextError);
        setCameraError?.(contextError);
        return;
      }

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      getCapturedImage?.(imageData);
      setError(null);
      setCameraError?.(null);
    };

    useImperativeHandle(ref, () => ({
      captureImage,
      stopCamera,
    }));

    return (
      <div className={className}>
        {showDevices && (
          <select
            className="w-full mb-4 border rounded p-2"
            onChange={(e) => setSelectedDeviceId(e.target.value)}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Câmera ${device.deviceId}`}
              </option>
            ))}
          </select>
        )}
        <div
          className={`w-full h-96 border rounded-lg overflow-hidden ${videoClassName}`}
        >
          {error && showErrors ? (
            <p className={`text-red-500 text-center ${errorClassName}`}>
              {error}
            </p>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            ></video>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    );
  }
);

CustomCamera.displayName = "CustomCamera";
export default CustomCamera;
