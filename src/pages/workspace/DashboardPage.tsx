import {CheckCircle, DirectionsRun, Error as ErrorIcon, PlayArrow} from "@mui/icons-material";
import {LinearProgress} from "@mui/joy";
import {useState} from "react";
import {breakdownData} from "../../api/mockData";
import {DateRangePicker} from "../../components/DateRangePicker";
import {BreakdownCard, Card} from "../../components/dashboard/Card";
import {ErrorDisplay} from "../../components/ErrorDisplay";
import {usePlaygroundContext} from "../../contexts/UIStateContext";
import {useMockDashboard} from "../../hooks/useMockData";
import type {DashboardData} from "../../types";
import {formatNumber} from "../../utils";

type TriggerCard = "started" | "finished" | "failed" | "running" | null;

type StatsCardsProps = {
    data: DashboardData;
};

function StatsCards({data}: StatsCardsProps) {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [triggerCard, setTriggerCard] = useState<TriggerCard>(null);

    function handleExpand(cardType: TriggerCard) {
        if (triggerCard === cardType) {
            setShowBreakdown(false);
            setTriggerCard(null);
        } else {
            setShowBreakdown(true);
            setTriggerCard(cardType);
        }
    }

    return (
        <div className="stats-cards">
            <Card
                title="Total Started"
                count={formatNumber(data.started.toString())}
                icon={<PlayArrow />}
                iconClass="card-icon-started"
                onExpand={() => handleExpand("started")}
                buttonText="See Breakdown"
                isExpanded={showBreakdown && triggerCard === "started"}
            />

            <Card
                title="Finished"
                count={formatNumber(data.finished.toString())}
                icon={<CheckCircle />}
                iconClass="card-icon-finished"
                onExpand={() => console.log("finished")}
            />

            <Card
                title="Active"
                count={formatNumber(data.failed.toString())}
                icon={<DirectionsRun />}
                iconClass="card-icon-running"
                onExpand={() => console.log("running")}
            />

            <Card
                title="Failed"
                count={formatNumber(data.stillRunning.toString())}
                icon={<ErrorIcon />}
                iconClass="card-icon-failed"
                onExpand={() => console.log("recent")}
            />

            {showBreakdown && triggerCard && (
                <div className={`breakdown-cards breakdown-cards-${triggerCard}`}>
                    {breakdownData.map((item, index) => (
                        <BreakdownCard key={index} title={item.title} count={item.count} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function DashboardPage() {
    const {playgroundState} = usePlaygroundContext();
    const {data: dashboardData, isLoading, error} = useMockDashboard();

    if (isLoading) {
        return (
            <div className="stats-cards loading">
                <LinearProgress />
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay error={error as Error} />;
    }

    if (!dashboardData) {
        return <div className="stats-cards">No data available</div>;
    }

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Dashboard / {playgroundState.currentPlayground}</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                <div className="dashboard-content">
                    <StatsCards data={dashboardData} />
                </div>
            </div>
        </div>
    );
}
