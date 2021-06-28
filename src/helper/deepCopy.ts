const deepCopy = (source: any): any => {
    if (typeof source !== 'object') return source;
    else {
        if (Array.isArray(source)) {
            return source.map((value) => deepCopy(value));
        } else {
            if (typeof source === 'object') {
                const obj: any = {};
                for (const key in source) {
                    obj[key] = deepCopy(source[key]);
                }
                return obj;
            }
        }
    }
};

export default deepCopy;
