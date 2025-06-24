export const formatDateToMonthAndYear = (date: string) => {
    const parsedDate = new Date(date);
    const newDate = parsedDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });
    return newDate;
};
