import { useState } from "react";
import Modal from "./Modal";

const ModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handleClose = () => {
    console.log("Modal closed");
  };

  const handleSubmit = () => {
    console.log("Modal submitted");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Modal Component Demo</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Open Basic Modal
      </button>

      <button
        onClick={() => setIsCustomModalOpen(true)}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Open Custom Modal
      </button>

      {/* Basic Modal */}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      >
        <div>
          <h3>Basic Modal</h3>
          <p>This is a basic modal with default close and submit buttons.</p>
        </div>
      </Modal>

      {/* Custom Modal */}
      <Modal
        isModalOpen={isCustomModalOpen}
        setIsModalOpen={setIsCustomModalOpen}
        showCloseButton={false}
        showSubmitButton={false}
      >
        <div>
          <h3>Custom Modal</h3>
          <p>
            This modal has no default buttons. You can add your own custom
            buttons.
          </p>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => setIsCustomModalOpen(false)}
              style={{ margin: "5px", padding: "8px 16px" }}
            >
              Custom Close
            </button>
            <button
              onClick={() => {
                alert("Custom action!");
                setIsCustomModalOpen(false);
              }}
              style={{ margin: "5px", padding: "8px 16px" }}
            >
              Custom Action
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
