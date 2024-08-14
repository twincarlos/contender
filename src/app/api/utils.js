export function arrayToObject(array) {
    return array.reduce((acc, obj) => {
        acc[obj.id] = obj;
        return acc;
    }, {});
};