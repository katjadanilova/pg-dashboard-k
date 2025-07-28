import {DateRangePicker} from "../../components/DateRangePicker";
import {usePlaygroundContext} from "../../contexts/PlaygroundContext";

export function AllRecordsPage() {
    const {playgroundState} = usePlaygroundContext();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>All Records</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {playgroundState.currentPlayground && (
                    <div>
                        <h2>Playground: {playgroundState.currentPlayground}</h2>
                        <div className="records-content">
                            <p>Record management for {playgroundState.currentPlayground}</p>
                            <div className="records-list">
                                <div className="record-item">
                                    <h3>Data Records</h3>
                                    <p>Record viewing and management will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
