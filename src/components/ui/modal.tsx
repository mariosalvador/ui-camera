import React from 'react';

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-full h-screen">
      <div className="bg-white dark:border dark:border-gray-500 dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-medium mb-6 text-black dark:text-white flex items-center">
          ⚠️ Important
        </h2>
        <p className="text-black dark:text-gray-400 mb-6">
          🚧 This feature is under development and may not be available at this time. ✨ We appreciate your patience...
          <span className='text-black font-semibold dark:text-gray-50'>You can view the component&apos;s Doc on Github. Click continue to proceed </span>

        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200"
            onClick={() => {
              window.location.href = 'https://github.com/mariosalvador/ui-camera';
              onClose();
            }
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};