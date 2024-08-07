export function getErrorMessages(errors) {
    let messages = [];

    Object.values(errors).map(function (message) {
        messages.push(message[0]);
    });

    return messages;
}

export const dimensions = {
    "xs": "575px",
    "sm": "576px",
    "md": "768px",
    "lg": "992px",
    "xl": "1200px",
    "xxl": "1600px",
};
export function NoDataMessage(message = "Field Not Provided") {
    return message;
}

export function handleArrayToFormData(formData, array, field) {
    for (var i = 0; i < array.length; i++) {
        formData.append(`${field}[]`, JSON.stringify(array[i]));
    }

    return formData;
};
export const requiredRule = [{ required: true, message: "'${label}' is required" }];

export const formatPosition = (sighting) => ({
    lat: parseFloat(sighting.latitude),
    lng: parseFloat(sighting.longitude),
});

export function updateDrawerDimensions(window) {
    let width = "30%";
    if (window.innerWidth > 1300) {
        width = "30%";
    } else if (window.innerWidth > 768 && window.innerWidth < 1300) {
        width = "50%";
    } else if (window.innerWidth < 768) {
        width = "80%";
    }

    return width;
}

export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

export function dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
}
