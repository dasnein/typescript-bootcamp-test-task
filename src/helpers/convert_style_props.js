export default function convertStyleProps(styleObj, unit = 'px') {
  const styleEntries = Object.entries(styleObj).map(([key, value]) => ([key, value + unit]));
  const style = Object.fromEntries(styleEntries);

  return style;
}
