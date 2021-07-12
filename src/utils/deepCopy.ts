const deepCopy = (source: any): any => {
    if (Array.isArray(source)) return source.map((value) => deepCopy(value));
    if (typeof source === 'object') {
        const obj: any = {};
        Object.keys(source).forEach((key) => (obj[key] = deepCopy(source[key])));
        return obj;
    }
    return source;
};

export default deepCopy;
