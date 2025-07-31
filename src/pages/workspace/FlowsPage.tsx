import {useParams} from "react-router-dom";
import {DateRangePicker} from "../../components/DateRangePicker";

export function FlowsPage() {
    const {playgroundName} = useParams<{playgroundName: string}>();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Flows</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {playgroundName && (
                    <div>
                        <h2>Playground: {playgroundName}</h2>
                        <div className="flows-content">
                            <p>Flow management for {playgroundName}</p>
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
