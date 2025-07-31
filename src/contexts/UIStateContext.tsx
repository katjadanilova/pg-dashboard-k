import type {Dayjs} from "dayjs";
import {createContext, type ReactNode, useCallback, useContext, useState} from "react";

type DateRange<T> = [T | null, T | null];

type PlaygroundState = {
    currentPlayground: string | null;
    currentOption: string | null;
};

type DateRangeState = {
    dateRange: DateRange<Dayjs>;
};

type UIState = {
    playground: PlaygroundState;
    dateRange: DateRangeState;
};

type UIStateContextType = {
    uiState: UIState;
    setCurrentPlayground: (playground: string | null, option: string | null) => void;
    clearPlayground: () => void;
    setDateRange: (dateRange: DateRange<Dayjs>) => void;
};

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

type UIStateProviderProps = {
    children: ReactNode;
};

export function UIStateProvider({children}: UIStateProviderProps) {
    const [uiState, setUIState] = useState<UIState>({
        playground: {
            currentPlayground: null,
            currentOption: null,
        },
        dateRange: {
            dateRange: [null, null],
        },
    });

    const setCurrentPlayground = useCallback((playground: string | null, option: string | null) => {
        setUIState((prev) => ({
            ...prev,
            playground: {
                currentPlayground: playground,
                currentOption: option,
            },
        }));
    }, []);

    const clearPlayground = useCallback(() => {
        setUIState((prev) => ({
            ...prev,
            playground: {
                currentPlayground: null,
                currentOption: null,
            },
        }));
    }, []);

    const setDateRange = useCallback((dateRange: DateRange<Dayjs>) => {
        setUIState((prev) => ({
            ...prev,
            dateRange: {
                dateRange,
            },
        }));
    }, []);

    return (
        <UIStateContext.Provider
            value={{
                uiState,
                setCurrentPlayground,
                clearPlayground,
                setDateRange,
            }}
        >
            {children}
        </UIStateContext.Provider>
    );
}

export function useUIStateContext() {
    const context = useContext(UIStateContext);
    if (context === undefined) {
        throw new Error("useUIStateContext must be used within a UIStateProvider");
    }
    return context;
}

export function usePlaygroundContext() {
    const {uiState, setCurrentPlayground, clearPlayground} = useUIStateContext();
    return {
        playgroundState: uiState.playground,
        setCurrentPlayground,
        clearPlayground,
    };
}

export function useDateRangeContext() {
    const {uiState, setDateRange} = useUIStateContext();
    return {
        dateRangeState: uiState.dateRange,
        setDateRange,
    };
}

export type {DateRange};
