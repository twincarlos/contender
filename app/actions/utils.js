export function formDataEntries (formData) {
    const obj = {};
    for (const [key, value] of formData) if (value) obj[key] = value;
    return obj;
};