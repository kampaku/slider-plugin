function isCross(elemOne: HTMLElement, elemTwo: HTMLElement) {
  const leftElemEnd = elemOne.getBoundingClientRect().right;
  const leftElemBottom = elemOne.getBoundingClientRect().bottom;
  const rightElemStart = elemTwo.getBoundingClientRect().left;
  const rightElemTop = elemTwo.getBoundingClientRect().top;
  return (leftElemEnd > rightElemStart) && (leftElemBottom > rightElemTop);
}

export default isCross;