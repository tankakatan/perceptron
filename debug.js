const DebugOutput = (initialState = {}) => {
    let state = initialState;

    const pre = document.getElementById('debug-output');
    const write = s => pre.innerHTML = s;
    const clear = () => write('');
    const setState = o => state = o;
    const prettify = v => isFloat(v) ? v.toFixed(3) : v;
    const dump = o => (
        setState(o),
        write(Object.keys(o).map(k => `${k}: ${prettify(o[k])}`).join('\n'))
    );

    const merge = o => dump({...state, ...o});

    return {state, clear, write, dump, merge};
};
