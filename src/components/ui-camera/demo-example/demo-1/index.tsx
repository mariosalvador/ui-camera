import CustomCamera from "../../camera";


export const DemoCameraOne = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Custom Camera Component - Demo 1</h1>
      <CustomCamera showDevices={false} />
    </div>
  );
};