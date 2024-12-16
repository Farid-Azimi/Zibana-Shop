import { createPortal } from "react-dom";

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCartMessage ({ message, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">پیغام</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ×
          </button>
        </div>
        <p className="mt-4 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          بستن
        </button>
      </div>
    </div>,
    document.body
  );
};


// interface ModalMessageProps {
//   message: string;
//   onClose: () => void;
// }

// const ModalMessage: React.FC<ModalMessageProps> = ({ message, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           &times;
//         </button>
//         <p className="text-center text-lg font-semibold text-gray-800">
//           {message}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ModalMessage;
