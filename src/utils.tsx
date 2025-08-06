import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function formatNumber(number: string): string {
    const num = parseInt(number.replace(/\s/g, ""), 10);
    if (Number.isNaN(num)) return number;

    if (num >= 100000) {
        return `${Math.floor(num / 1000)}k`;
    } else {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}

// Date format constants
export const DATE_FORMATS = {
    // Input formats (what we receive from API/mock data)
    INPUT: {
        RECORD_DATE: "DD.MM.YYYY", // "05.04.2025"
        ISO_STRING: "YYYY-MM-DDTHH:mm:ssZ", // "2025-01-20T14:22:00Z"
        ISO_DATE: "YYYY-MM-DD", // "2025-01-20"
        TIMESTAMP: "X", // Unix timestamp
    },
    // Display formats (what we show to users)
    DISPLAY: {
        SHORT: "MMM DD", // "Apr 05"
        MEDIUM: "MMM DD, YYYY", // "Apr 05, 2025"
        LONG: "MMMM DD, YYYY", // "April 05, 2025"
        TIME: "MMM DD, YYYY HH:mm", // "Apr 05, 2025 14:30"
        ISO: "YYYY-MM-DD", // "2025-04-05"
        DATETIME: "MMM DD, YYYY HH:mm:ss", // "Apr 05, 2025 14:30:45"
    },
} as const;

export function parseDate(dateInput: string | number | Date | Dayjs | null | undefined, format?: string): Dayjs | null {
    if (!dateInput) return null;

    try {
        if (dayjs.isDayjs(dateInput)) {
            return dateInput;
        }

        if (dateInput instanceof Date) {
            return dayjs(dateInput);
        }

        if (typeof dateInput === "number") {
            if (dateInput < 10000000000) {
                return dayjs.unix(dateInput);
            } else {
                return dayjs(dateInput);
            }
        }

        if (typeof dateInput === "string") {
            if (format) {
                return dayjs(dateInput, format);
            }

            if (dateInput.includes("T") && (dateInput.includes("Z") || dateInput.includes("+"))) {
                return dayjs(dateInput);
            }

            if (dateInput.includes(".") && dateInput.split(".").length === 3) {
                return dayjs(dateInput, DATE_FORMATS.INPUT.RECORD_DATE);
            }

            if (dateInput.includes("-") && dateInput.split("-").length === 3) {
                return dayjs(dateInput, DATE_FORMATS.INPUT.ISO_DATE);
            }

            return dayjs(dateInput);
        }

        return null;
    } catch (error) {
        console.error("Failed to parse date:", dateInput, error);
        return null;
    }
}

export function formatDate(date: Dayjs | Date | string | number | null | undefined, format: keyof typeof DATE_FORMATS.DISPLAY = "MEDIUM"): string {
    if (!date) return "-";

    try {
        const dayjsDate = parseDate(date);
        if (!dayjsDate || !dayjsDate.isValid()) return "-";

        return dayjsDate.format(DATE_FORMATS.DISPLAY[format]);
    } catch (error) {
        console.error("Failed to format date:", date, error);
        return "-";
    }
}

export function isDateInRange(date: Dayjs | Date | string | number, startDate: Dayjs | null, endDate: Dayjs | null): boolean {
    const targetDate = parseDate(date);
    if (!targetDate || !targetDate.isValid()) return false;

    if (startDate && endDate) {
        return targetDate.isBetween(startDate, endDate, "day", "[]");
    } else if (startDate) {
        return targetDate.isSameOrAfter(startDate, "day");
    } else if (endDate) {
        return targetDate.isSameOrBefore(endDate, "day");
    }

    return true;
}

export function isValidDate(date: string | number | Date | Dayjs | null | undefined): boolean {
    if (!date) return false;

    try {
        const dayjsDate = parseDate(date);
        return Boolean(dayjsDate?.isValid());
    } catch {
        return false;
    }
}

export function compareDates(date1: string | number | Date | Dayjs, date2: string | number | Date | Dayjs): number {
    const dayjs1 = parseDate(date1);
    const dayjs2 = parseDate(date2);

    if (!dayjs1 || !dayjs1.isValid()) return -1;
    if (!dayjs2 || !dayjs2.isValid()) return 1;

    return dayjs1.isBefore(dayjs2) ? -1 : dayjs1.isAfter(dayjs2) ? 1 : 0;
}

export function parseRecordDate(dateString: string): Dayjs | null {
    return parseDate(dateString, DATE_FORMATS.INPUT.RECORD_DATE);
}

export function formatRecordDate(date: Dayjs | Date | string | null): string {
    return formatDate(date, "MEDIUM");
}

export function parsePlaygroundDate(dateString: string): Dayjs | null {
    return parseDate(dateString, DATE_FORMATS.INPUT.ISO_STRING);
}

export function formatPlaygroundDate(date: Dayjs | Date | string | null): string {
    return formatDate(date, "TIME");
}

export function toUnixTimestamp(date: string | number | Date | Dayjs | null | undefined): number | null {
    const dayjsDate = parseDate(date);
    if (!dayjsDate || !dayjsDate.isValid()) return null;
    return dayjsDate.unix();
}

export function fromUnixTimestamp(timestamp: number): Dayjs | null {
    return parseDate(timestamp);
}

export function toISOString(date: string | number | Date | Dayjs | null | undefined): string | null {
    const dayjsDate = parseDate(date);
    if (!dayjsDate || !dayjsDate.isValid()) return null;
    return dayjsDate.toISOString();
}

export function toDateObject(date: string | number | Date | Dayjs | null | undefined): Date | null {
    const dayjsDate = parseDate(date);
    if (!dayjsDate || !dayjsDate.isValid()) return null;
    return dayjsDate.toDate();
}
