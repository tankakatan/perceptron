const zip = (a, b) => a.map((ai, i) => [ai, b[i]]);
const random = (fromOrTo, to) => (
    isFinite(to) ? (fromOrTo + Math.random() * (to - fromOrTo)) : (Math.random() * fromOrTo)
);

const rescale = (x, src_min, src_max, dst_min, dst_max) => (
    dst_min + (x - src_min) * (dst_max - dst_min) / (src_max - src_min)
);

const isNumber = v => typeof v === 'number' && isFinite(v);
const isFloat = v => isNumber(v) && !Number.isInteger(v);
const averaged = list => list.length && list.reduce((sum, v) => sum + v, 0) / list.length;
const debounce = (fun, time) => {
    let timeout = null;
    return (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => fun(...args), time);
    }
};
