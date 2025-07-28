import type {Dayjs} from "dayjs";
import {createContext, type ReactNode, useContext, useState} from "react";

type DateRange<T> = [T | null, T | null];

type DateRangeState = {
    dateRange: DateRange<Dayjs>;
};

type DateRangeContextType = {
    dateRangeState: DateRangeState;
    setDateRange: (dateRange: DateRange<Dayjs>) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

type DateRangeProviderProps = {
    children: ReactNode;
};

export function DateRangeProvider({children}: DateRangeProviderProps) {
    const [dateRangeState, setDateRangeState] = useState<DateRangeState>({
        dateRange: [null, null],
    });

    function setDateRange(dateRange: DateRange<Dayjs>) {
        setDateRangeState({
            dateRange,
        });
    }

    return (
        <DateRangeContext.Provider
            value={{
                dateRangeState,
                setDateRange,
            }}
        >
            {children}
        </DateRangeContext.Provider>
    );
}

export function useDateRangeContext() {
    const context = useContext(DateRangeContext);
    if (context === undefined) {
        throw new Error("useDateRangeContext must be used within a DateRangeProvider");
    }
    return context;
}

export type {DateRange};
