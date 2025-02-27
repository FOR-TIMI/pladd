import { useRef, useEffect } from "react";

type ParallaxOptions = {
  strength?: number;
  perspective?: number;
  easing?: number;
  maxDistance?: number; // Maximum distance for effect to work
  resetOnScroll?: boolean; // Whether to reset position on scroll
};

/**
 * Custom hook for creating a smooth 3D parallax effect on mouse movement
 * Only applies effect when cursor is near the element
 * 
 * @param options Configuration options for the effect
 * @returns An object with the ref to attach to your element
 */
const useParallaxEffect = (options: ParallaxOptions = {}) => {
  const {
    strength = 25,
    perspective = 1000,
    easing = 0.1,
    maxDistance = 500, // Maximum cursor distance in pixels to apply effect
    resetOnScroll = true,
  } = options;
  
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Track current rotation values
  const rotation = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
  });
  
  // Track if element is in viewport
  const isInViewport = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Check if element is in viewport
    const checkVisibility = () => {
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      const isVisible = (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
      
      return isVisible;
    };
    
    const updateElementTransform = () => {
      // Apply easing to create smooth animation
      rotation.current.currentX += (rotation.current.targetX - rotation.current.currentX) * easing;
      rotation.current.currentY += (rotation.current.targetY - rotation.current.currentY) * easing;
      
      // Apply the transform with proper perspective
      const transform = `perspective(${perspective}px) rotateX(${rotation.current.currentY}deg) rotateY(${rotation.current.currentX}deg)`;
      element.style.transform = transform;
      
      // Continue animation loop if there's still movement
      if (
        Math.abs(rotation.current.targetX - rotation.current.currentX) > 0.1 ||
        Math.abs(rotation.current.targetY - rotation.current.currentY) > 0.1
      ) {
        animationRef.current = requestAnimationFrame(updateElementTransform);
      } else {
        // Stop animation if we're close enough to target
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };
    
    const resetPosition = () => {
      // Reset to neutral position
      rotation.current.targetX = 0;
      rotation.current.targetY = 0;
      
      // Start reset animation if not already running
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(updateElementTransform);
      }
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!element) return;
      
      // Check if element is in the viewport
      isInViewport.current = checkVisibility();
      
      if (!isInViewport.current) {
        // If not in viewport, reset and return
        resetPosition();
        return;
      }
      
      // Get element dimensions and position
      const rect = element.getBoundingClientRect();
      
      // Calculate cursor position relative to the center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to center of element
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Only apply effect if cursor is within maxDistance
      if (distance > maxDistance) {
        // Reset to neutral position if cursor is too far
        resetPosition();
        return;
      }
      
      // Calculate scale factor based on distance (closer = stronger effect)
      const scaleFactor = 1 - (distance / maxDistance);
      
      // Calculate the rotation based on cursor distance from center
      const rotateY = ((event.clientX - centerX) / (rect.width / 2)) * strength * scaleFactor;
      const rotateX = -((event.clientY - centerY) / (rect.height / 2)) * strength * scaleFactor;
      
      // Set target rotation
      rotation.current.targetX = rotateY;
      rotation.current.targetY = rotateX;
      
      // Start animation if not already running
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(updateElementTransform);
      }
    };
    
    const handleScroll = () => {
      if (resetOnScroll) {
        resetPosition();
      }
      
      // Update viewport check
      isInViewport.current = checkVisibility();
    };

    // Apply initial styling to prepare for 3D transforms
    element.style.transformStyle = "preserve-3d";
    element.style.transition = "transform 0.1s ease-out";
    
    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    element.addEventListener("mouseleave", resetPosition);
    
    // Initial visibility check
    isInViewport.current = checkVisibility();
    
    return () => {
      // Clean up
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      element.removeEventListener("mouseleave", resetPosition);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strength, perspective, easing, maxDistance, resetOnScroll]);
  
  return { elementRef };
};

export default useParallaxEffect;