import {DateRangePicker} from "../../components/DateRangePicker";
import {usePlaygroundContext} from "../../contexts/PlaygroundContext";

export function FlowsPage() {
    const {playgroundState} = usePlaygroundContext();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Flows</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {playgroundState.currentPlayground && (
                    <div>
                        <h2>Playground: {playgroundState.currentPlayground}</h2>
                        <div className="flows-content">
                            <p>Flow management for {playgroundState.currentPlayground}</p>
                            <div className="flows-list">
                                <div className="flow-item">
                                    <h3>Flow Management</h3>
                                    <p>Flow configuration and monitoring will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
