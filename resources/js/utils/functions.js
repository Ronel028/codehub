export const dataURLtoFile = (dataurl) => {

    let generatedName = window.crypto.randomUUID()

    var arr = dataurl.split(",")
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    let u8arr = new Uint8Array(n);


    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], generatedName, { type: mime });
}