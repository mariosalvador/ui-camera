"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface CameraProps {
  getAllVideoDevices?: (value: MediaDeviceInfo[]) => void;
  getCapturedImage?: (value: string | null) => void;
  className?: string; // Classe de estilo personalizada
  videoClassName?: string; // Classe de estilo para o elemento de vídeo
  setCameraError?: (value: string | null) => void;
}

const CustomCamera = forwardRef<{
  captureImage?: () => void;
  stopCamera?: () => void;
}, CameraProps>(
  ({ getAllVideoDevices, getCapturedImage, className, videoClassName, setCameraError }, ref) => {

    const [, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para erros
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Buscar dispositivos de vídeo ao carregar o componente
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
            setError(null); // Limpar erros se câmeras forem detectadas
          } else {
            setError("Nenhuma câmera disponível.");
            setCameraError?.("Nenhuma câmera disponível.");
          }
        } catch (err) {
          setError("Erro ao acessar dispositivos de vídeo. Verifique as permissões.");
          setCameraError?.("Erro ao acessar dispositivos de vídeo. Verifique as permissões.");
          console.error("Error:", err);
        }
      };

      fetchDevices();
    }, [getAllVideoDevices, setCameraError]);

    // Atualizar o feed de vídeo sempre que o dispositivo selecionado mudar
    useEffect(() => {
      const startCamera = async (deviceId: string) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId ? { exact: deviceId } : undefined },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setError(null); // Limpar erros anteriores
          }
        } catch (err) {
          setError("Erro ao iniciar a câmera. Verifique as permissões.");
          setCameraError?.("Erro ao iniciar a câmera. Verifique as permissões.");
          console.error("Error:", err);
        }
      };

      if (selectedDeviceId) {
        startCamera(selectedDeviceId);
        setError(null); // Limpar erros anteriores
      }
      return () => stopCamera(); // Liberar recursos ao desmontar
    }, [selectedDeviceId, setCameraError]);

    const stopCamera = () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null; // Limpar o stream no elemento de vídeo
      }
    };

    const captureImage = () => {
      if (!videoRef.current || !canvasRef.current) {
        setError("Erro ao capturar imagem: vídeo ou canvas não disponível.");
        setCameraError?.("Erro ao capturar imagem: vídeo ou canvas não disponível.");
        return;
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        setError("Erro ao capturar imagem: contexto do canvas não disponível.");
        setCameraError?.("Erro ao capturar imagem: contexto do canvas não disponível.");
        return;
      }

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      if (getCapturedImage) {
        getCapturedImage(imageData);
      }
      setError(null); // Limpar erro após captura
      setCameraError?.(null);
    };

    // Permitir que funções sejam expostas ao componente pai
    useImperativeHandle(ref, () => ({
      captureImage,
      stopCamera, // Expor a função stopCamera
    }));

    return (
      <div className={className}>
        <div
          className={`w-full h-96 border border-gray-300 rounded-lg overflow-hidden ${videoClassName}`}
        >
          {error ? (
            <p className="text-red-500 text-center w-full h-full bg-black">{error}</p>
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
