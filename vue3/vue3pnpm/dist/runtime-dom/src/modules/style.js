export const patchStyle = (el, prevVal, nextVal = {}) => {
    for (const key in nextVal) {
        el.style[key] = nextVal[key];
    }
    if (prevVal) {
        for (const key in prevVal) {
            if (!nextVal[key]) {
                el.style[key] = null;
            }
        }
    }
};
//# sourceMappingURL=style.js.map