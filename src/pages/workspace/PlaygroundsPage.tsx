import {useNavigate} from "react-router-dom";
import {DateRangePicker} from "../../components/DateRangePicker";
import {ErrorDisplay} from "../../components/ErrorDisplay";
import {UpSkeleton} from "../../components/UpComponents";
import {useMockPlaygrounds} from "../../hooks/useMockData";
import type {PlaygroundData} from "../../types";
import {formatNumber} from "../../utils";

function PlaygroundStat({type, value}: {type: "success" | "failure"; value: string}) {
    return (
        <div className="playground-stat">
            <h3 className={`playground-stat-value-${type}`}>{value}</h3>
            <div className="playground-stat-label">{type === "success" ? "Success / 24h" : "Failure / 24h"}</div>
        </div>
    );
}

function PlaygroundCard({playground}: {playground: PlaygroundData}) {
    const navigate = useNavigate();

    function handleCardClick() {
        navigate(`/playground/${encodeURIComponent(playground.name)}/dashboard`);
    }

    return (
        <button type="button" className="playground-card" onClick={handleCardClick}>
            <div className="playground-card-header">
                <h2>{playground.name}</h2>
            </div>

            <div className="playground-card-content">
                <PlaygroundStat type="success" value={formatNumber(playground.successRate)} />
                <PlaygroundStat type="failure" value={formatNumber(playground.failureRate)} />
            </div>
        </button>
    );
}

function LoadingSkeleton() {
    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Playgrounds</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                <div className="playgrounds-list">
                    {Array.from({length: 3}, (_, index) => (
                        <div key={index} className="playground-card">
                            <div className="playground-card-header">
                                <UpSkeleton variant="rectangular" width={80} height={32} sx={{marginBottom: "1rem"}} />
                                <div className="playground-chips">
                                    <UpSkeleton variant="rectangular" width={80} height={32} />
                                    <UpSkeleton variant="rectangular" width={80} height={32} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function PlaygroundsPage() {
    const {data: playgroundData, isLoading, error} = useMockPlaygrounds();

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="page-content">
                <ErrorDisplay error={error as Error} />
            </div>
        );
    }

    if (!playgroundData) {
        return <div className="page-content">No playgrounds found</div>;
    }

    const allPlaygrounds = [...playgroundData.folders.flatMap((folder) => folder.playgrounds), ...playgroundData.uncategorized];

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Playgrounds</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                <div className="playgrounds-list">
                    {allPlaygrounds.map((playground) => (
                        <PlaygroundCard key={playground.name} playground={playground} />
                    ))}
                </div>
            </div>
        </div>
    );
}
