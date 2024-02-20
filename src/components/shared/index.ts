export const handlePadding = (number: number) => {
  return {
    paddingLeft: number,
    paddingRight: number,
    paddingBottom: number,
    paddingTop: number,
  };
};

export const handleMargin = (number: number) => {
  return {
    marginLeft: number,
    marginRight: number,
    marginBottom: number,
    marginTop: number,
  };
};

export const handleSquare = (number: number) => {
  return {
    width: number,
    height: number,
  };
};

export const handleRound = (number: number) => {
  return {
    width: number,
    height: number,
    borderRadius: number / 2,
  };
};

export const handleHitSlop = (size: number = 10) => ({
  top: size,
  left: size,
  right: size,
  bottom: size,
});
export const passedStyle = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;
