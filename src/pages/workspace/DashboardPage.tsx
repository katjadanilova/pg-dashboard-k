import { CheckCircle, DirectionsRun, Error as ErrorIcon, PlayArrow } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "../../components/DateRangePicker";
import { BreakdownCard, Card } from "../../components/dashboard/Card";
import { formatNumber } from "../../utils";

type TriggerCard = "started" | "finished" | "failed" | "running" | null;

function StatsCards() {
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

    const breakdownData = [
        { title: "Default Notice", count: formatNumber("123400") },
        { title: "DLR", count: formatNumber("89000") },
        { title: "Mail Handler", count: formatNumber("156000") },
        { title: "Mail", count: formatNumber("89000") },
        { title: "Broken", count: formatNumber("45000") },
        { title: "New", count: formatNumber("30000") },
    ];

    return (
        <div className="stats-cards">
            <Card
                title="Started"
                count={formatNumber("523400")}
                icon={<PlayArrow />}
                iconClass="card-icon-started"
                onExpand={() => handleExpand("started")}
                buttonText="See Breakdown"
                isExpanded={showBreakdown && triggerCard === "started"}
            />

            <Card
                title="Finished"
                count={formatNumber("32215")}
                icon={<CheckCircle />}
                iconClass="card-icon-finished"
                onExpand={() => console.log("finished")}
            />

            <Card title="Failed" count={formatNumber("5000")} icon={<ErrorIcon />} iconClass="card-icon-failed" onExpand={() => console.log("failed")} />

            <Card
                title="Still Running"
                count={formatNumber("11789")}
                icon={<DirectionsRun />}
                iconClass="card-icon-running"
                onExpand={() => console.log("running")}
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
    const { playgroundName } = useParams<{ playgroundName: string }>();

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>Dashboard / {playgroundName}</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                <div className="dashboard-content">
                    <StatsCards />
                </div>
            </div>
        </div>
    );
}
