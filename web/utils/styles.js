export function themeToRem(target) {
  return function(props) {
    return toRem(target)(props.theme.baseFontSize);
  };
}

export function toRem(targetFontSize) {
  return function $toRem(baseFontSize) {
    return `${(targetFontSize / baseFontSize).toFixed(4)}rem`;
  };
}