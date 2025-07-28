import {DateRangePicker} from "../../components/DateRangePicker";
import {usePlaygroundContext} from "../../contexts/PlaygroundContext";

export function DashboardPage() {
    const {playgroundState} = usePlaygroundContext();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Dashboard</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {playgroundState.currentPlayground && (
                    <div>
                        <h2>Playground: {playgroundState.currentPlayground}</h2>
                        <div className="dashboard-content">
                            <p>Dashboard content for {playgroundState.currentPlayground}</p>
                            <div className="dashboard-stats">
                                <div className="stat-card">
                                    <h3>Overview</h3>
                                    <p>Dashboard statistics and metrics will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
