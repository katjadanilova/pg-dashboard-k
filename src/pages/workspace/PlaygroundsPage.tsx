import {DateRangePicker} from "../../components/DateRangePicker";
import {usePlaygroundContext} from "../../contexts/UIStateContext";

export function PlaygroundsPage() {
    const {playgroundState} = usePlaygroundContext();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Playgrounds</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {playgroundState.currentPlayground ? (
                    <div>
                        <h2>Current Playground: {playgroundState.currentPlayground}</h2>
                        {playgroundState.currentOption && <h3>Current Option: {playgroundState.currentOption}</h3>}
                        <p>Select a playground from the sidebar to get started.</p>
                    </div>
                ) : (
                    <div>
                        <p>Select a playground from the sidebar to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
