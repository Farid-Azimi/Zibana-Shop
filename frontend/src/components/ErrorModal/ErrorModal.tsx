import Modal from "react-modal";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="relative bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto flex flex-col justify-between z-[80]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[70]"
    >
      <Button
        className="absolute top-2 left-2 text-gray hover:text-lightGray transition"
        onClick={onClose}
      >
        <Icon name="CiSquareRemove" />
      </Button>
      <h2 className="text-lg font-bold mb-4">خطا</h2>
      <p className="text-gray mb-4">ابتدا وارد حساب کاربری خود شوید</p>
      <Button
        onClick={onLoginClick}
        className="bg-[#f62b72] text-white py-2 px-4 rounded hover:bg-[#d52a5e] transition mt-14 w-full text-center"
      >
        ورود به حساب کاربری
      </Button>
    </Modal>
  );
};

export default ErrorModal;
