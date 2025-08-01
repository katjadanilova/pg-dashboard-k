import {LinearProgress} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {DateRangePicker} from "../../components/DateRangePicker";
import {ErrorDisplay} from "../../components/ErrorDisplay";
import {useMockPlaygrounds} from "../../hooks/useMockData";
import type {PlaygroundData} from "../../types";
import {formatNumber} from "../../utils";

function PlaygroundChip({type, value, isNull}: {type: "test" | "prod"; value: string; isNull: boolean}) {
    const chipClass = isNull ? "playground-chip playground-chip-grey" : `playground-chip playground-chip-${type}`;

    return (
        <div className={chipClass}>
            <div className={`playground-chip-label-${type}`}>{type === "test" ? "TEST" : "PROD"}</div>
            <div className="playground-chip-value">{value}</div>
        </div>
    );
}

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
                <div className="playground-chips">
                    <PlaygroundChip type="test" value={playground.testValue ?? "NONE"} isNull={playground.testValue === null} />
                    <PlaygroundChip type="prod" value={playground.prodValue ?? "NONE"} isNull={playground.prodValue === null} />
                </div>
            </div>

            <div className="playground-card-content">
                <PlaygroundStat type="success" value={formatNumber(playground.successRate)} />
                <PlaygroundStat type="failure" value={formatNumber(playground.failureRate)} />
            </div>
        </button>
    );
}

export function PlaygroundsPage() {
    const {data: playgrounds, isLoading, error} = useMockPlaygrounds();

    if (isLoading) {
        return (
            <div className="page-content">
                <LinearProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-content">
                <ErrorDisplay error={error as Error} />
            </div>
        );
    }

    if (!playgrounds) {
        return <div className="page-content">No playgrounds found</div>;
    }

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
                    {playgrounds.map((playground) => (
                        <PlaygroundCard key={playground.name} playground={playground} />
                    ))}
                </div>
            </div>
        </div>
    );
}
