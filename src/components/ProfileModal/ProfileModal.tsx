/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CrossIcon from "../../assets/svg/CrossIcon";
import UserPhoto from "../UserPhoto/UserPhoto";
import "./ProfileModal.scss";
import { isOpenProfileValue } from "../../features/isOpenProfileModalSlice";
import logOutImg from "../../assets/png/log_out.png";
import logOut from "../../API/logOut";

export default function ProfileModal() {
  const nickname = useAppSelector((state) => state.present.authData.value.name);
  const isOpen = useAppSelector(
    (state) => state.present.isOpenProfileModal.value
  );
  const [logOutMode, setLogOutMode] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
              {logOutMode === false ? (
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
              ) : (
                <section className="delete-account__content">
                  <section className="delete-account__img-wrapper">
                    <img
                      src={logOutImg}
                      alt="log out"
                      className="delete-account__img"
                    />
                  </section>
                  <section className="delete-account__text-n-btns">
                    <span className="delete-account__text">
                      Are you sure you want to log out?
                    </span>
                    <section className="delete-account__btns">
                      <button
                        type="button"
                        className="delete-account__cancel"
                        onClick={() => setLogOutMode(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="delete-account__ok"
                        onClick={() => {
                          toggleModal();
                          navigate("/");
                          logOut(nickname);
                        }}
                      >
                        Ok
                      </button>
                    </section>
                  </section>
                </section>
              )}
            </section>
            {logOutMode === false && (
              <section className="log-out">
                <button
                  type="button"
                  className="log-out__btn"
                  onClick={() => {
                    setLogOutMode(true);
                  }}
                >
                  Log out
                </button>
              </section>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
