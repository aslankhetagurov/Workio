export const getDateHoursAgo = (hoursAgo: number) => {
    const ms = hoursAgo * 60 * 60 * 1000;
    const now = Date.now();
    const date = new Date(now - ms).toISOString();
    return date;
};
