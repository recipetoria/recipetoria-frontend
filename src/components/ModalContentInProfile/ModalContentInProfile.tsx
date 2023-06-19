import CrossIcon from "../../assets/svg/CrossIcon";
import "./ModalContentInProfile.scss";
import useModal from "../../hooks/useModal";

interface IModalContentInProfileProps {
  imageSrc: string;
  text: string;
  handleClickByOkBtn: () => void;
}

export default function ModalContentInProfile(
  props: IModalContentInProfileProps
) {
  const { imageSrc, text, handleClickByOkBtn } = props;

  const { toggle } = useModal();

  return (
    <section className="delete-account">
      <button
        type="button"
        className="delete-account__cross-wrapper"
        onClick={toggle}
      >
        <CrossIcon color="#707077" />
      </button>
      <section className="delete-account__content">
        <section className="delete-account__img-wrapper">
          <img
            src={imageSrc}
            alt="delete account"
            className="delete-account__img"
          />
        </section>
        <section className="delete-account__text-n-btns">
          <span className="delete-account__text">{text}</span>
          <section className="delete-account__btns">
            <button
              type="button"
              className="delete-account__cancel"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              type="button"
              className="delete-account__ok"
              onClick={handleClickByOkBtn}
            >
              Ok
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
