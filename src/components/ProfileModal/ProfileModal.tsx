/* eslint-disable react/jsx-no-useless-fragment */
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CrossIcon from "../../assets/svg/CrossIcon";
import UserPhoto from "../UserPhoto/UserPhoto";
import "./ProfileModal.scss";
import { isOpenProfileValue } from "../../features/isOpenProfileModalSlice";

export default function ProfileModal() {
  const nickname = useAppSelector((state) => state.present.authData.value.name);
  const isOpen = useAppSelector(
    (state) => state.present.isOpenProfileModal.value
  );
  const dispatch = useAppDispatch();

  function toggleModal() {
    dispatch(isOpenProfileValue());
  }

  return (
    <>
      {isOpen && (
        <aside className="profile-modal">
          <div className="profile-modal__wrapper">
            <section className="data-btn-cross">
              <button
                type="button"
                className="data-btn-cross__cross-wrapper"
                onClick={toggleModal}
              >
                <CrossIcon color="#707077" />
              </button>
              <section className="data-btn-cross__data-n-btn">
                <section className="data-btn-cross__data">
                  <UserPhoto parent="Header" />
                  <span className="data-btn-cross__nick">{nickname}</span>
                </section>
                <Link to="/profile">
                  <button
                    type="button"
                    className="data-btn-cross__btn"
                    onClick={toggleModal}
                  >
                    Enter to profile
                  </button>
                </Link>
              </section>
            </section>
            <section className="log-out">
              <button
                type="button"
                className="log-out__btn"
                onClick={toggleModal}
              >
                Log out
              </button>
            </section>
          </div>
        </aside>
      )}
    </>
  );
}
