// Prop
import prefix from './prefix';
import CSSSupports from './CSSSupports';

const result = prefix("transform");

CSSSupports('transform', result);

export default result;
