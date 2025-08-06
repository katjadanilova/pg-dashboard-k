import {useParams} from "react-router-dom";
import {DateRangePicker} from "../../components/DateRangePicker";

export function BatchesPage() {
    const {playgroundName} = useParams<{playgroundName: string}>();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Batches / {playgroundName}</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {playgroundName && (
                    <div>
                        <div className="batches-content">
                            <div className="batches-list">
                                <div className="batches-item">
                                    <h3>Batches</h3>
                                    <p>Batches will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
