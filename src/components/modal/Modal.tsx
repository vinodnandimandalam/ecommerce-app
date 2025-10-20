import ReactModal from "react-modal";

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  showCloseButton?: boolean;
  showSubmitButton?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

const Modal = ({
  children,
  isModalOpen,
  setIsModalOpen,
  showCloseButton = true,
  showSubmitButton = true,
  onClose,
  onSubmit,
}: ModalProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
    onClose?.();
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    onSubmit?.();
  };

  return (
    <ReactModal
      data-testid="modal-container"
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      appElement={document.getElementById("root") || document.body}
      ariaHideApp={false} // Disable aria hiding for testing
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "4px",
          zIndex: 1001,
          border: "none",
          outline: "none",
        },
      }}
    >
      <div data-testid="modal-content">
        {children}

        {showCloseButton && (
          <button
            data-testid="close-button"
            onClick={handleClose}
            aria-label="Close"
            className="border-1 border-gray-300 bg-blue-500 text-white rounded-sm m-2 p-2 cursor-pointer"
          >
            Close
          </button>
        )}

        {showSubmitButton && (
          <button
            data-testid="submit-button"
            onClick={handleSubmit}
            aria-label="Submit"
            className="border-1 border-gray-300 text-white rounded-sm m-2 p-2 bg-blue-500 cursor-pointer"
          >
            Submit
          </button>
        )}
      </div>
    </ReactModal>
  );
};

export default Modal;
