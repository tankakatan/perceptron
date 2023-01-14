export const zip = (a, b) => a.map((ai, i) => [ai, b[i]]);
export const random = (fromOrTo, to) => (
    isFinite(to) ? (fromOrTo + Math.random() * (to - fromOrTo)) : (Math.random() * fromOrTo)
);

export const debounce = (fun, time) => {
    let timeout = null;
    return (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => fun(...args), time);
    }
};
