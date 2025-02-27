import { useEffect, useState } from "react";

/**
 * Custom hook that adds a global cursor spotlight effect for dark mode only
 * 
 * @param options Configuration options for cursor effects
 */
const useGlobalCursor = (options = {
  spotlightSize: '300px',
  spotlightColor: 'rgba(99, 102, 241, 0.07)',
  enabled: true,
  enableOnTouch: false,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      // Check for theme class on document
      const isDark = document.documentElement.classList.contains('dark-mode') || 
                     document.body.classList.contains('dark-mode');
      
      // Fallback to localStorage
      if (!isDark) {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') return true;
      }
      
      return isDark;
    };
    
    // Set initial state
    setIsDarkMode(checkDarkMode());
    
    // Create observer to detect theme changes in the DOM
    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });
    
    // Observe both document and body for class changes
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    // Only create the spotlight if dark mode is active and the feature is enabled
    if (!options.enabled || !isDarkMode) return;
    
    // Create the spotlight element
    const spotlight = document.createElement('div');
    spotlight.classList.add('global-cursor-spotlight');
    
    // Set initial styles for the spotlight
    Object.assign(spotlight.style, {
      position: 'fixed',
      pointerEvents: 'none',
      width: options.spotlightSize,
      height: options.spotlightSize,
      backgroundColor: options.spotlightColor,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.2s ease',
      zIndex: '99',
      opacity: '0',
      mixBlendMode: 'screen',
      filter: 'blur(30px)',
    });
    
    // Add spotlight to the DOM
    document.body.appendChild(spotlight);
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update spotlight position
      spotlight.style.left = `${clientX}px`;
      spotlight.style.top = `${clientY}px`;
      spotlight.style.opacity = '1';
    };
    
    // Handle touch movement (optional)
    const handleTouchMove = (e: TouchEvent) => {
      if (!options.enableOnTouch) return;
      
      const touch = e.touches[0];
      if (!touch) return;
      
      const { clientX, clientY } = touch;
      
      // Update spotlight position
      spotlight.style.left = `${clientX}px`;
      spotlight.style.top = `${clientY}px`;
      spotlight.style.opacity = '1';
    };
    
    // Hide spotlight when cursor leaves the window
    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };
    
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
    
    // Add event listeners
    if (isTouchDevice && options.enableOnTouch) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseLeave);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchend', handleMouseLeave);
      
      if (document.body.contains(spotlight)) {
        document.body.removeChild(spotlight);
      }
    };
  }, [isDarkMode, options.enabled, options.spotlightSize, options.spotlightColor, options.enableOnTouch]);
  
  // Nothing to return as this is a global effect
};

export default useGlobalCursor;