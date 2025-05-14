export const formatDateToTimeAgo = (date: string): string => {
    const past = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - past.getTime();

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (!diffDays && !diffHours) {
        return 'New';
    }

    return `${diffDays ? diffDays + 'd' : ''} ${diffHours}h ago`;
};
