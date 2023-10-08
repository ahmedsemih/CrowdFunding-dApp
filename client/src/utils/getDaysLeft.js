export default (deadline) => {
    const currentTime = new Date().getTime();
    const remainingTime = deadline - currentTime;
    const remainingDays = remainingTime / (1000 * 3600 * 24);
    return Math.ceil(remainingDays);
}