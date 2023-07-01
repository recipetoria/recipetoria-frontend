import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  isOpenModalMode,
  isOpenModalValue,
} from "../features/IsOpenModalSlice";

export default function useModal() {
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const isOpenMode = useAppSelector((state) => state.present.IsOpenModal.mode);
  const dispatch = useAppDispatch();

  function toggle() {
    dispatch(isOpenModalValue(!isOpen));

    if (isOpenMode !== "none") {
      dispatch(isOpenModalMode("none"));
    }
  }

  return { toggle };
}
