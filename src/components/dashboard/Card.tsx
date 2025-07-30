import {ArrowDownward, ArrowForward} from "@mui/icons-material";
import type {ReactNode} from "react";

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

export function Card({title, count, icon, iconClass, onExpand, buttonText = "View All", isExpanded = false}: CardProps) {
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

export function BreakdownCard({title, count}: BreakdownCardProps) {
    return (
        <div className="breakdown-card">
            <div className="breakdown-card-content">
                <h4 className="breakdown-card-title">{title}</h4>
                <div className="breakdown-card-count">{count}</div>
            </div>
        </div>
    );
}
