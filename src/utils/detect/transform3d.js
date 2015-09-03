// Prop
import prefix from './prefix';
import CSSSupports from './CSSSupports';

const result = prefix("perspective");
CSSSupports('transform3d', result);

export default result;
