/* eslint-disable react/jsx-no-useless-fragment */
import { ModalProps } from "../../types/types";
import "./Modal.scss";

export default function Modal(props: ModalProps) {
  const { children, isOpen, toggle } = props;

  return (
    <>
      {isOpen && (
        <section
          className="modal-overlay"
          onClick={toggle}
          onKeyDown={() => {}}
          role="textbox"
          tabIndex={-1}
        >
          <section
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            role="textbox"
            tabIndex={-1}
            onKeyUp={() => {}}
          >
            {children}
          </section>
        </section>
      )}
    </>
  );
}
