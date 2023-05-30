import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return { isOpen, toggle };
}
