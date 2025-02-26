import { RefObject, useEffect } from "react";

const useTrackCursor = <T extends HTMLElement | null>(ref: RefObject<T>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      element.style.setProperty("--x", `${x}%`);
      element.style.setProperty("--y", `${y}%`);
    };

    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref]);
};

export default useTrackCursor;
