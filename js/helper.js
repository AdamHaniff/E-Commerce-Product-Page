// HELPER FUNCTION
function removeContainerClickedClass(thumbnailContainers) {
  thumbnailContainers.forEach((container) => {
    if (container.classList.contains("container-clicked")) {
      container.classList.remove("container-clicked");
    }
  });
}

export { removeContainerClickedClass };
