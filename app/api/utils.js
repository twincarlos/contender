export function arrayToObject(array, key) {
    const obj = {};
    array.forEach(ele => obj[ele[key]] = ele);
    return obj;
};