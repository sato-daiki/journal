export const getSize = (isMobileDevice: boolean, baseSize: number): number => {
  return isMobileDevice ? baseSize * 0.8 : baseSize;
};
