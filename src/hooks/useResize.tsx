import { useState, useEffect } from "react";

const SCREEN_SM = 599;
const SCREEN_MD = 904;
const SCREEN_LG = 1279;
const SCREEN_XL = 1439;
const SCREEN_XXL = 1440;

export default function useResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWidth((e.target as Window)?.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", (e) => {
        setWidth((e.target as Window)?.innerWidth);
      });
    };
  }, []);

  return {
    width,
    isScreenSm: width <= SCREEN_SM && width >= 320,
    isScreenMd: width <= SCREEN_MD && width >= SCREEN_SM + 1,
    isScreenLg: width <= SCREEN_LG && width >= SCREEN_MD + 1,
    isScreenXl: width <= SCREEN_XL && width >= SCREEN_LG + 1,
    isScreenXxl: width <= SCREEN_XXL && width >= SCREEN_XL + 1,
  };
}
