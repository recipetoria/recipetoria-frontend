import { useNavigate } from "react-router-dom";
import CrossIcon from "../../assets/svg/CrossIcon";
import DeleteAccountImg from "../../assets/png/delete_account.png";
import "./DeleteAccount.scss";
import useModal from "../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import deleteAccount from "../../API/deleteAccount";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

export default function DeleteAccount() {
  const { toggle } = useModal();

  const token = useAppSelector((state) => state.present.authData.value.token);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
            src={DeleteAccountImg}
            alt="delete account"
            className="delete-account__img"
          />
        </section>
        <section className="delete-account__text-n-btns">
          <span className="delete-account__text">
            Are you sure you want to delete your account?
          </span>
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
              onClick={() => {
                deleteAccount(token).then(() => {
                  toggle();
                  navigate("/");
                  dispatch(
                    SnackbarTextValue({
                      text: "Your account was deleted",
                      withUndo: false,
                    })
                  );
                });
              }}
            >
              Ok
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
