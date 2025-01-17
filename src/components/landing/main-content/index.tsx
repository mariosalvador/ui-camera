"use client";
// import CustomCamera from "@/components/ui-camera/camera";
// import { CardContent } from "../card-content";
// import { Teste2 } from "@/components/ui-camera/components-example/test-2/page";
// import Teste from "@/components/ui-camera/components-example/teste/page";
// import { CameraPreviewGallery } from "@/components/ui-camera/components-example/CameraSwitch/second";
// import { VideoRecorder } from "@/components/ui-camera/components-example/CameraSwitch/thirst";
// import { useRef, useState } from "react";


export const MainContent = () => {
  // const [image, setCapturedImage] =useState<string | null>(null);
 
  //   const cameraRef = useRef<{ captureImage: () => void; stopCamera?: () => void;   restartCamera?: () => void; } | null>(null);
  
  //   const handleCaptureImage = () => {
  //     if (cameraRef.current) {
  //       cameraRef.current.captureImage();
  //     }
  //   };

    // const handleRestart = () => {
    //   if (cameraRef.current && cameraRef.current.restartCamera) {
    //     cameraRef.current.restartCamera();
    //   }
    // };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 space-y-14 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Seção de título e descrição */}
      <section className="flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-bold">Component Demos</h1>
        <p>
          Here are some of the UI Camera components that you can use in your
          projects.
        </p>
      </section>

      {/* Conteúdo principal */}
      <div className="z-10 flex flex-col w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex flex-col gap-10 h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {/* <CardContent>
            <CustomCamera />
          </CardContent> */}

          {/* <CardContent>
            <Teste />
          </CardContent> */}



          {/* Aproved */}
          {/* <CardContent>
            <CameraPreviewGallery />
          </CardContent> */}

          {/* Needed Update */}
          {/* <CardContent>
            <VideoRecorder />
          </CardContent>  */}


          {/* <CardContent>
            <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
              <div className="flex flex-wrap justify-between gap-4">
                <CustomCamera
                  ref={cameraRef}
                  className="w-full md:w-2/3"
                  videoClassName="rounded-lg border"
                  errorClassName="text-red-500"
                  getCapturedImage={(img) => {
                    setCapturedImage(img);
                    console.log("Imagem capturada:", img);
                  }}
                />
                <div className="w-full md:w-1/3 space-y-4">
                  <h3 className="text-lg font-semibold">Pré-visualização</h3>
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                    {
                      image !== null? (
                        <img
                          src={image}
                          alt="Captured Image"
                          className="max-w-full max-h-full"
                        />
                      ): (
                        <p className="text-gray-500">Nenhuma imagem capturada</p>
                      )
                    }
                  </div>
                  <button
                    onClick={() =>{
                      console.log("click")
                      if (cameraRef.current) {
                        console.log("Capturando imagem...");
                        cameraRef.current.captureImage();
                      }
                    }}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Capturar Imagem
                  </button>
                  <button
                    onClick={() => {
                      if (cameraRef.current && cameraRef.current.stopCamera) {
                        cameraRef.current.stopCamera();
                      }
                    }}
                    className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Desligar Câmera
                  </button>

                  <button
                    onClick={handleRestart}
                    className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Reiniciar Câmera
                  </button>
                </div>
              </div>
            </div>

          </CardContent> */}

        </div>
      </div>
    </main>
  );
};
