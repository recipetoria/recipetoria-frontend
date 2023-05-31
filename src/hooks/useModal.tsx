import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isOpenModalValue } from "../features/IsOpenModalSlice";

export default function useModal() {
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const dispatch = useAppDispatch();

  function toggle() {
    dispatch(isOpenModalValue(!isOpen));
  }

  return { toggle };
}
