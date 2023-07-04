import { useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import CategoriesCards from "../CategoriesCards/CategoriesCards";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { categoriesStyleValue } from "../../features/CategoriesStyleSlice";

export default function Categories() {
  const { toggle } = useModal();
  const componentRef = useRef<HTMLDivElement>(null);
  const tags = useAppSelector((state) => state.present.tags.value);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (componentRef.current) {
      dispatch(
        categoriesStyleValue({
          style: { height: componentRef.current.offsetHeight },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div ref={componentRef}>
      <h2 className="categories-page__h2">Categories</h2>
      <CategoriesCards toggle={toggle} />
    </div>
  );
}
