import CSSSupports from './CSSSupports';

const result = ("ontouchstart" in window);

CSSSupports('touch', result);

export default result;
