import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../types/state";
import { useState } from "react";
import Modal from "../modal/Modal";
import { setAddress, clearProuctsFromCart } from "../Cart/state/Cart.slice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { totalQuantity, totalPrice, address } = useSelector(
    (state: RootState) => state.cart
  );

  const [updatedAddress, setUpdatedAddress] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleCheckOut = () => {
    alert("hurray! order placed");
    dispatch(clearProuctsFromCart());
    navigate("/");
  };

  const renderChangeInputField = () => {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter new address"
          value={updatedAddress}
          onChange={(e) => {
            e.preventDefault();
            setUpdatedAddress(e.currentTarget.value);
          }}
          className="border-1 border-gray-300 rounded-sm p-2 my-2"
        />
      </div>
    );
  };

  const onSave = () => {
    dispatch(setAddress(updatedAddress));
  };

  return (
    <div
      data-testid="cart-total-container"
      className="border-1 border-gray-300 rounded-sm m-2 p-2"
    >
      <p>{`Total quantity: ${totalQuantity}`}</p>
      <p>{`Total price: $${totalPrice}`}</p>
      <p>{`Address: ${address}`}</p>
      <button
        className="border-1 border-gray-300 text-blue-500 rounded-sm p-1 cursor-pointer"
        onClick={() => {
          setShowAddressModal(true);
        }}
      >
        Change address
      </button>
      {showAddressModal && (
        <Modal
          isModalOpen={showAddressModal}
          setIsModalOpen={setShowAddressModal}
          onSubmit={onSave}
        >
          {renderChangeInputField()}
        </Modal>
      )}
      <br />
      <br />
      <button
        className="border-1 border-gray-300 bg-red-500 text-white rounded-sm p-2 w-full cursor-pointer"
        onClick={handleCheckOut}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
