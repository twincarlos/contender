export function arrayToObject(array, key) {
    return array.reduce((acc, obj) => {
        acc[obj[key]] = obj;
        return acc;
    }, {});
};