function isCollide(firstElement: HTMLElement, secondElement: HTMLElement) {
  const firstRect = firstElement.getBoundingClientRect();
  const secondRect = secondElement.getBoundingClientRect();
  return !(
    firstRect.y + firstRect.height < secondRect.y ||
    firstRect.y > secondRect.y + secondRect.height ||
    firstRect.x + firstRect.width < secondRect.x ||
    firstRect.x > secondRect.x + secondRect.width
  );
}
export default isCollide;
