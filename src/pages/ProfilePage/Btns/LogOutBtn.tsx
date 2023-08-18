import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import { ModalContentContext } from "../../../contexts/ModalContentContext";
import ModalContentInProfile from "../../../components/ModalContentInProfile/ModalContentInProfile";
import LogOutImg from "../../../assets/png/log_out.png";
import logOut from "../../../API/logOut";
import { useAppSelector } from "../../../app/hooks";

export default function LogOutBtn() {
  const { toggle } = useModal();
  const navigate = useNavigate();

  const { setModalContent } = useContext(ModalContentContext);
  const name = useAppSelector((state) => state.present.authData.value.name);

  return (
    <button
      type="button"
      className="profile-menu__btn"
      onClick={() => {
        toggle();
        setModalContent(
          <ModalContentInProfile
            imageSrc={LogOutImg}
            text="Are you sure you want to log out?"
            handleClickByOkBtn={() => {
              navigate("/");
              logOut(name);
            }}
            submitBtn={{
              text: "Ok",
              style: "btn",
            }}
            cancelBtnStyle="borderNone"
          />
        );
      }}
    >
      Log out
    </button>
  );
}
