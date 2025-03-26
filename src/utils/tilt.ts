
/**
 * Applies a 3D tilt effect to an element
 * @param element - The DOM element to apply the tilt effect to
 * @param sensitivity - How sensitive the tilt should be (default: 10)
 * @param reset - Whether to reset the tilt when mouse leaves (default: true)
 * @param perspective - The perspective value in pixels (default: 1000)
 */
export const applyTiltEffect = (
  element: HTMLElement,
  sensitivity: number = 10,
  reset: boolean = true,
  perspective: number = 1000
): () => void => {
  if (!element) return () => {};

  element.style.transition = 'transform 0.3s ease-out';
  element.style.transformStyle = 'preserve-3d';
  element.style.perspective = `${perspective}px`;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateY = sensitivity * (mouseX - centerX) / (rect.width / 2);
    const rotateX = -sensitivity * (mouseY - centerY) / (rect.height / 2);
    
    element.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const handleMouseLeave = () => {
    if (reset) {
      element.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Applies a subtle parallax effect to child elements
 * @param parentElement - The container element
 * @param childSelectors - CSS selectors for child elements to apply parallax to
 * @param strength - The strength of the parallax effect (default: 20)
 */
export const applyParallaxEffect = (
  parentElement: HTMLElement,
  childSelectors: string[],
  strength: number = 20
): () => void => {
  if (!parentElement) return () => {};

  const childElements = childSelectors
    .map(selector => Array.from(parentElement.querySelectorAll(selector)))
    .flat();

  if (childElements.length === 0) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    childElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      const factor = 1 - (index % 3) * 0.2; // Different factor for each element
      
      htmlElement.style.transition = 'transform 0.1s ease-out';
      htmlElement.style.transform = `translate(${percentX * strength * factor}px, ${percentY * strength * factor}px)`;
    });
  };

  const handleMouseLeave = () => {
    childElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.transform = 'translate(0, 0)';
    });
  };

  parentElement.addEventListener('mousemove', handleMouseMove);
  parentElement.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    parentElement.removeEventListener('mousemove', handleMouseMove);
    parentElement.removeEventListener('mouseleave', handleMouseLeave);
  };
};
