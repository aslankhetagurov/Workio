export function formatToK(value: number | null): string | null {
    if (!value) return null;

    if (value >= 1000) {
        return `${value / 1000}k`;
    }

    return value.toString();
}
