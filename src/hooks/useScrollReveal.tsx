import { useEffect } from "react";

const useScrollReveal = () => {
  useEffect(() => {
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el: Element, scrollOffset = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) -
          scrollOffset
      );
    };

    const displayScrollElement = (element: Element) => {
      element.classList.add("revealed");
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 150)) {
          displayScrollElement(el);
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    // Initial check on page load
    handleScrollAnimation();

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, []);
};

export default useScrollReveal;
