export function formatNumber(number: string): string {
    const num = parseInt(number.replace(/\s/g, ""), 10);
    if (Number.isNaN(num)) return number;

    if (num >= 100000) {
        return `${Math.floor(num / 1000)}k`;
    } else {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}
