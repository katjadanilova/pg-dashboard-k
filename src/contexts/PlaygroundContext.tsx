import {createContext, type ReactNode, useContext, useState} from "react";

type PlaygroundState = {
    currentPlayground: string | null;
    currentOption: string | null;
};

type PlaygroundContextType = {
    playgroundState: PlaygroundState;
    setCurrentPlayground: (playground: string | null, option: string | null) => void;
    clearPlayground: () => void;
};

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

type PlaygroundProviderProps = {
    children: ReactNode;
};

export function PlaygroundProvider({children}: PlaygroundProviderProps) {
    const [playgroundState, setPlaygroundState] = useState<PlaygroundState>({
        currentPlayground: null,
        currentOption: null,
    });

    function setCurrentPlayground(playground: string | null, option: string | null) {
        setPlaygroundState({
            currentPlayground: playground,
            currentOption: option,
        });
    }

    function clearPlayground() {
        setPlaygroundState({
            currentPlayground: null,
            currentOption: null,
        });
    }

    return (
        <PlaygroundContext.Provider
            value={{
                playgroundState,
                setCurrentPlayground,
                clearPlayground,
            }}
        >
            {children}
        </PlaygroundContext.Provider>
    );
}

export function usePlaygroundContext() {
    const context = useContext(PlaygroundContext);
    if (context === undefined) {
        throw new Error("usePlaygroundContext must be used within a PlaygroundProvider");
    }
    return context;
}
