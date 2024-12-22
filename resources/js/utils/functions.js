import moment from "moment"

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

/*
    Convert date into relative date
*/
export const diffInDays = (date) => {
    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: '%d seconds',
            ss: '%d seconds',
            m: "%d minute",
            mm: "%d minutes",
            h: "%d hour",
            hh: "%d hours",
            d: "%d day",
            dd: "%d days",
            w: "%d week",
            ww: "%d weeks",
            M: "%d month",
            MM: "%d months",
            y: "%d year",
            yy: "%d years"
        }
    })
    return moment(date).startOf(getTime(date)).fromNow();

}

/*
    Get time in the data
*/
export const getTime = (value) => {
    let dt = new Date(value)
    let hours = dt.getHours()
    let minutes = dt.getMinutes()
    let seconds = dt.getSeconds()
    return `${hours}:${minutes}:${seconds}`
}