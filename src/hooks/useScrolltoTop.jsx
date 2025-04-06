import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const UseScrollTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};
