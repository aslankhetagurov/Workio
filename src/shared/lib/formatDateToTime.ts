export const formatDateToTime = (date: string) => {
    const parsedDate = new Date(date);
    const parsedTime = parsedDate.toLocaleTimeString('en-US', {
        timeStyle: 'short',
    });
    return parsedTime;
};
