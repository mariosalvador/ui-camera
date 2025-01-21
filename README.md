# CustomCamera - Componente React para Acesso à Câmera

O `CustomCamera` é um componente React que permite gerenciar o acesso à câmera do usuário, capturar imagens e lidar com erros de maneira simples e eficiente. Ele foi projetado para ser flexível e atender a diversos cenários de uso em aplicações web.

---

## Instalação

Certifique-se de que o projeto utiliza o React e que o navegador oferece suporte à API `MediaDevices`. 

`*Adicione o componente ao seu projeto importando o arquivo principal da câmera diretamente, pois a instalação via npm ainda não está disponível*`.

```tsx
import CustomCamera from "./CustomCamera";
```

```tsx
import React, {
  forwardRef,
  useCallback,
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
  restartCamera?: () => void;
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

    const startCamera = useCallback(async (deviceId: string) => {
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
    }, [setCameraError]);

    const stopCamera = useCallback(() => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    }, []);

    // Atualizar feed de vídeo ao trocar de dispositivo
    useEffect(() => {
      if (selectedDeviceId) {
        startCamera(selectedDeviceId);
      }
      return () => stopCamera();
    }, [selectedDeviceId, startCamera, stopCamera]);

    const restartCamera = useCallback(() => {
      if (selectedDeviceId) {
        stopCamera();
        startCamera(selectedDeviceId);
      }
    }, [selectedDeviceId, stopCamera, startCamera]);

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
      restartCamera,
    }));

    return (
      <div className={className}>
        {showDevices && (
          <select
            className="w-full mb-4 border rounded p-2 dark:text-black"
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
          className={`w-full h-full border rounded-lg overflow-hidden ${videoClassName}`}
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
```


---

## Props Disponíveis

| **Propriedade**      | **Tipo**                             | **Obrigatório?** | **Descrição**                                                         | **Default** |   |   |   |
| -------------------- | ------------------------------------ | ---------------- | --------------------------------------------------------------------- | ----------- | - | - | - |
| `showDevices`        | `boolean`                            | Opcional (?)     | Exibe a lista de dispositivos de vídeo conectados.                    | `true`      |   |   |   |
| `showErrors`         | `boolean`                            | Opcional (?)     | Exibe mensagens de erro relacionadas à câmera.                        | `true`      |   |   |   |
| `getAllVideoDevices` | `(value: MediaDeviceInfo[]) => void` | Opcional (?)     | Callback que retorna todos os dispositivos de vídeo disponíveis.      | `undefined` |   |   |   |
| `getCapturedImage`   | \`(value: null \| string) => void    | Opcional (?)     | Callback que retorna a imagem capturada no formato Base64.            | `undefined` |   |   |   |
| `className`          | `string`                             | Opcional (?)     | Classe CSS para o contêiner principal.                                | `undefined` |   |   |   |
| `videoClassName`     | `string`                             | Opcional (?)     | Classe CSS para o elemento `<video>`.                                 | `undefined` |   |   |   |
| `errorClassName`     | `string`                             | Opcional (?)     | Classe CSS para mensagens de erro.                                    | `undefined` |   |   |   |
| `setCameraError`     | \`(value: string \| null) => void\`  | Opcional (?)     | Callback para capturar erros ao acessar a câmera ou capturar imagens. | `undefined` |   |   |   |

---

## Funções Expostas via `ref`

O componente utiliza `forwardRef` para expor duas funções controláveis externamente:

| **Função**     | **Descrição**                                                                                 |
|-----------------|---------------------------------------------------------------------------------------------|
| `captureImage`  | Captura uma imagem a partir do feed de vídeo e retorna os dados no formato Base64.           |
| `stopCamera`    | Interrompe o feed da câmera, liberando os recursos do dispositivo.                           |

---

## Uso Básico

Aqui está um exemplo de como usar o `CustomCamera` em um componente pai:

```tsx
"use client";

import React, { useRef } from "react";
import CustomCamera from "./CustomCamera";

const CameraExample: React.FC = () => {
  const cameraRef = useRef<{
    captureImage?: () => void;
    stopCamera?: () => void;
  }>(null);

  const handleGetAllDevices = (devices: MediaDeviceInfo[]) => {
    console.log("Dispositivos de vídeo:", devices);
  };

  const handleCapturedImage = (image: string | null) => {
    console.log("Imagem capturada:", image);
  };

  const handleCameraError = (error: string | null) => {
    if (error) console.error("Erro na câmera:", error);
  };

  return (
    <div>
      <h1>Câmera Customizada</h1>
      <CustomCamera
        ref={cameraRef}
        getAllVideoDevices={handleGetAllDevices}
        getCapturedImage={handleCapturedImage}
        setCameraError={handleCameraError}
        showDevices={true}
        showErrors={true}
        className="camera-container"
        videoClassName="video-element"
        errorClassName="error-text"
      />
      <button onClick={() => cameraRef.current?.captureImage()}>
        Capturar Imagem
      </button>
      <button onClick={() => cameraRef.current?.stopCamera()}>
        Parar Câmera
      </button>
    </div>
  );
};

export default CameraExample;
```

---

## Descrição de Funcionamento

1. **Busca de Dispositivos**:
   - O componente detecta automaticamente dispositivos de vídeo conectados ao navegador e os exibe em um `<select>` (se `showDevices` estiver habilitado).

2. **Captura de Imagem**:
   - A função `captureImage` utiliza um elemento `<canvas>` oculto para capturar o frame atual do feed de vídeo, retornando a imagem no formato Base64.

3. **Manutenção do Feed de Vídeo**:
   - Trocar o dispositivo selecionado atualiza automaticamente o feed de vídeo exibido.

4. **Parar a Câmera**:
   - A função `stopCamera` libera os recursos do dispositivo de vídeo, encerrando o feed.

5. **Mensagens de Erro**:
   - Mensagens de erro são exibidas no componente (caso `showErrors` seja `true`) e podem ser capturadas externamente via `setCameraError`.

---

## Estilização

Adicione classes CSS  personalizadas ou, o Tailwind Css para ajustar o layout e aparência dos elementos do componente.

```css
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-element {
  width: 100%;
  height: 400px;
  border: 2px solid #ddd;
}

.error-text {
  color: red;
  font-size: 14px;
}
```

```tsx 
      <CustomCamera
        ref={cameraRef}
        showDevices={false}
        showErrors={false}
        getAllVideoDevices={handleGetAllVideoDevices}
        getCapturedImage={handleGetCapturedImage}
        setCameraError={handleSetCameraError}
        className="px-5 bg-orange-600"
        videoClassName="bg-violet-500"
        errorClassName="text-red-600"
      />
```
---

## Possíveis Cenários de Uso

- Aplicações que precisam capturar fotos diretamente de uma webcam.
- Ferramentas de reconhecimento facial ou leitura de QR codes.
- Interfaces administrativas para verificar dispositivos conectados.

---

## Erros Comuns e Soluções

1. **Câmera não inicia**:
   - Certifique-se de que o navegador possui permissões de câmera habilitadas.
   - Verifique se há dispositivos de vídeo conectados.

2. **Imagem não é capturada**:
   - Certifique-se de que o `<canvas>` e o feed de vídeo estão corretamente configurados.

3. **Erro ao trocar dispositivos**:
   - Pode ocorrer devido a permissões insuficientes ou dispositivos desconectados. Use `setCameraError` para capturar e exibir mensagens apropriadas.

---

## Testado em Navegadores

- Google Chrome
- Mozilla Firefox
- Microsoft Edge

---

## Notas Finais

Este componente foi projetado para simplificar a interação com câmeras em navegadores modernos. Ele fornece flexibilidade com suas opções de personalização e callbacks, permitindo integrações em diversos cenários.
