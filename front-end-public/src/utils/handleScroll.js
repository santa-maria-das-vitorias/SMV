export const handleScroll = (stickyContainer, stickyElement) => {
  const container = stickyContainer.value;
  const sticky = stickyElement.value;

  const containerRect = container.getBoundingClientRect();
  const stickyRect = sticky.getBoundingClientRect();

  sticky.style.width = `${containerRect.width}px`;

  if (containerRect.top <= 0 && containerRect.bottom > stickyRect.height) {
    sticky.style.position = "fixed";
    sticky.style.top = "5rem";
    sticky.style.bottom = "unset";
  } else if (containerRect.bottom <= stickyRect.height) {
    sticky.style.position = "absolute";
    sticky.style.top = "unset";
    sticky.style.bottom = "0";
  } else {
    sticky.style.position = "relative";
    sticky.style.top = "unset";
    sticky.style.bottom = "unset";
    sticky.style.width = "unset";
  }
};