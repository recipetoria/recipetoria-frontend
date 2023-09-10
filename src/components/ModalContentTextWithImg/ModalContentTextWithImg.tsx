import CrossIcon from "../../assets/svg/CrossIcon";
import useModal from "../../hooks/useModal";
import "./ModalContentTextWithImg.scss";
import LaptopImage from "../../assets/png/laptop.png";

export default function ModalContentTextWithImg() {
  const { toggle } = useModal();

  return (
    <section className="modal-content-text-with-img">
      <button
        type="button"
        className="modal-content-text-with-img__cross-wrapper"
        onClick={toggle}
      >
        <CrossIcon color="#707077" />
      </button>
      <section className="modal-content">
        <h2 className="modal-content__h2">Congratulations!</h2>
        <h3 className="modal-content__h3">You have successfully registered</h3>
        <div className="modal-content__img-wrapper">
          <img src={LaptopImage} alt="laptop" className="modal-content__img" />
        </div>
      </section>
    </section>
  );
}
