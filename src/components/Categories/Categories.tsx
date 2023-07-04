import { useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import CategoriesCards from "../CategoriesCards/CategoriesCards";
import { useAppDispatch } from "../../app/hooks";
import { categoriesStyleValue } from "../../features/CategoriesStyleSlice";

export default function Categories() {
  const { toggle } = useModal();
  const componentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (componentRef.current) {
      dispatch(
        categoriesStyleValue({
          style: { height: componentRef.current.offsetHeight },
        })
      );
    }
  }, [componentRef, dispatch]);

  return (
    <div ref={componentRef}>
      <h2 className="categories-page__h2">Categories</h2>
      <CategoriesCards toggle={toggle} />
    </div>
  );
}
