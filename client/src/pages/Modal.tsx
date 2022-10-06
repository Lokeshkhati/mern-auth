import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useClickOutside";

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useOutsideClick(modalRef, () => {
    setShowModal(false);
  });

  return (
    <div className="flex justify-center ">
      <div ref={modalRef} className=" w-32">
        <button
          className="bg-blue-500 px-4 py-1 rounded-sm mb-4 "
          onClick={() => setShowModal(!showModal)}
        >
          Menu
        </button>
        {showModal && (
          <div className="border-2 border-green-500 rounded-sm  h-72 w-32  "></div>
        )}
      </div>
    </div>
  );
}

export default Modal;
