function convertSecondsToDuration(totalSeconds) {
    console.log("INSIDE1")

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
    console.log("INSIDE")
    if (hours > 0) {
        return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    } else {
        return `${seconds}s`
    }
}

module.exports = {
    convertSecondsToDuration,
}