export function toDateTime(secs:number) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t
}