const zip = (a, b) => a.map((ai, i) => [ai, b[i]]);
const random = (fromOrTo, to) => (
    isFinite(to) ? (fromOrTo + Math.random() * (to - fromOrTo)) : (Math.random() * fromOrTo)
);

const debounce = (fun, time) => {
    let timeout = null;
    return (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => fun(...args), time);
    }
};
