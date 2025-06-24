export const formatDateToDayAndMonthAndYear = (date: string) => {
    const parsedDate = new Date(date);
    const newDate = parsedDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    return newDate;
};
