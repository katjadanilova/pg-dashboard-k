import {ArrowDownward, ArrowForward, CheckCircle, DirectionsRun, Error as ErrorIcon, PlayArrow} from "@mui/icons-material";
import type {ReactNode} from "react";
import {useState} from "react";
import {breakdownData} from "../../api/mockData";
import {DateRangePicker} from "../../components/DateRangePicker";
import {ErrorDisplay} from "../../components/ErrorDisplay";
import {UpSkeleton} from "../../components/UpComponents";
import {usePlaygroundContext} from "../../contexts/UIStateContext";
import {useMockDashboard} from "../../hooks/useMockData";
import type {DashboardData} from "../../types";
import {formatNumber} from "../../utils";

type CardProps = {
    title: string;
    count: string;
    icon: ReactNode;
    iconClass: string;
    onExpand: () => void;
    buttonText?: string;
    isExpanded?: boolean;
};

function CardButton({onClick, text, isExpanded}: {onClick: () => void; text: string; isExpanded?: boolean}) {
    return (
        <button type="button" onClick={onClick} className="card-button">
            {text} {isExpanded ? <ArrowDownward /> : <ArrowForward />}
        </button>
    );
}

function Card({title, count, icon, iconClass, onExpand, buttonText = "View All", isExpanded = false}: CardProps) {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className={`card-icon ${iconClass}`}>{icon}</div>
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-content">
                <div className="card-count">{count}</div>
                <CardButton onClick={onExpand} text={buttonText} isExpanded={isExpanded} />
            </div>
        </div>
    );
}

type BreakdownCardProps = {
    title: string;
    count: string;
};

function BreakdownCard({title, count}: BreakdownCardProps) {
    return (
        <div className="breakdown-card">
            <div className="breakdown-card-content">
                <h4 className="breakdown-card-title">{title}</h4>
                <div className="breakdown-card-count">{count}</div>
            </div>
        </div>
    );
}

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

function LoadingSkeleton() {
    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Dashboard</h1>
            </div>

            <div className="page-content">
                <div className="dashboard-content">
                    <div className="stats-cards">
                        {Array.from({length: 4}, (_, index) => (
                            <div key={index} className="dashboard-card">
                                <div className="card-header">
                                    <UpSkeleton variant="circular" width={40} height={40} />
                                    <UpSkeleton variant="text" width={120} height={24} />
                                </div>
                                <div className="card-content">
                                    <UpSkeleton variant="text" width={80} height={32} />
                                    <UpSkeleton variant="text" width={100} height={24} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DashboardPage() {
    const {playgroundState} = usePlaygroundContext();
    const {data: dashboardData, isLoading, error} = useMockDashboard();

    if (isLoading) {
        return <LoadingSkeleton />;
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
