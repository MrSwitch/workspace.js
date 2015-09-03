// transform
// Assign CSS transform operation
import css from './css';
import supportsTransform3d from '../detect/transform3d';

export default function transform(element, prop, value) {
	var x = prop + "(" + value + ")";
	if (supportsTransform3d && prop === "translateX") {
		x = "translate3d(0,0,0) translate("+(value||'0')+",0)";
	}
	var o = {transform:x,msTransform:x,MozTransform:x,WebkitTransform:x};
	return css(element, o);
}
