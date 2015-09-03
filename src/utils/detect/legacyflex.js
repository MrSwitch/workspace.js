// Prop
import prefix from './prefix';
import CSSSupports from './CSSSupports';

const result = prefix("BoxDirection");

CSSSupports('legacyflex', result);

export default result;
