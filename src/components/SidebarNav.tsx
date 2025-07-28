import {Dashboard as DashboardIcon, Description as DescriptionIcon, Loop as LoopIcon} from "@mui/icons-material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RouteIcon from "@mui/icons-material/Route";
import {type ReactElement, useState} from "react";
import "../global.scss";

type SidebarNavProps = {
    className?: string;
    onNavigate?: (playgroundName: string, optionName: string) => void;
};

type PlaygroundItem = {
    name: string;
};

type DropdownOption = {
    name: string;
    icon: ReactElement;
};

type NavButtonProps = {
    icon: ReactElement;
    label: string;
    isActive?: boolean;
    hasArrow?: boolean;
    isExpanded?: boolean;
    onClick: () => void;
};

function NavButton({icon, label, isActive = false, hasArrow = false, isExpanded = false, onClick}: NavButtonProps) {
    return (
        <button className={`nav-item-content ${isActive ? "active" : ""}`} onClick={onClick} type="button">
            {icon}
            <span className="nav-label">{label}</span>
            {hasArrow && (
                <span className={`nav-arrow ${isExpanded ? "expanded" : ""}`}>
                    <ExpandMoreIcon />
                </span>
            )}
        </button>
    );
}

const DROPDOWN_OPTIONS: DropdownOption[] = [
    {name: "Dashboard", icon: <DashboardIcon />},
    {name: "Flows", icon: <LoopIcon />},
    {name: "All Records", icon: <DescriptionIcon />},
];

export function SidebarNav({className, onNavigate}: SidebarNavProps) {
    //TODO: Replace with API data
    const [playgrounds] = useState<PlaygroundItem[]>([{name: "Basic Test"}, {name: "Spintest"}, {name: "playq"}, {name: "Spring Bat..."}]);

    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["playgrounds"]));
    const [activeMenuItem, setActiveMenuItem] = useState<{
        playground: string;
        option: string;
    } | null>(null);

    function toggleSection(sectionId: string) {
        setExpandedSections((prev) => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(sectionId)) {
                newExpanded.delete(sectionId);
            } else {
                newExpanded.add(sectionId);
            }
            return newExpanded;
        });
    }

    function handlePlaygroundsClick() {
        setActiveMenuItem(null);
        onNavigate?.("", "");
    }

    function handleMenuOptionClick(playgroundName: string, optionName: string) {
        setActiveMenuItem({playground: playgroundName, option: optionName});
        onNavigate?.(playgroundName, optionName);
    }

    function isMenuActive(playgroundName: string, optionName: string) {
        return activeMenuItem?.playground === playgroundName && activeMenuItem?.option === optionName;
    }

    function isMainPlaygroundsActive() {
        return activeMenuItem === null;
    }

    function renderSubItem(playground: PlaygroundItem) {
        const isExpanded = expandedSections.has(playground.name);

        return (
            <div key={playground.name} className="nav-subitem">
                <NavButton
                    icon={<BubbleChartIcon />}
                    label={playground.name}
                    hasArrow={true}
                    isExpanded={isExpanded}
                    onClick={() => toggleSection(playground.name)}
                />
                {isExpanded && (
                    <div className="nav-children">
                        {DROPDOWN_OPTIONS.map((option) => (
                            <div key={option.name} className="nav-subitem depth-1">
                                <NavButton
                                    icon={option.icon}
                                    label={option.name}
                                    isActive={isMenuActive(playground.name, option.name)}
                                    onClick={() => handleMenuOptionClick(playground.name, option.name)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <nav className={`sidebar-nav ${className || ""}`}>
            <div className="nav-section">
                <div className="nav-section-header">GENERAL</div>
                <div className="nav-items">
                    <div className="nav-item-main">
                        <NavButton
                            icon={<RouteIcon />}
                            label="Playgrounds"
                            hasArrow={true}
                            isExpanded={expandedSections.has("playgrounds")}
                            isActive={isMainPlaygroundsActive()}
                            onClick={handlePlaygroundsClick}
                        />

                        {expandedSections.has("playgrounds") && <div className="nav-children">{playgrounds.map(renderSubItem)}</div>}
                    </div>
                </div>
            </div>

            <div className="nav-section">
                <div className="nav-section-header">CUSTOM PAGES</div>
                <div className="nav-items"></div>
            </div>
        </nav>
    );
}
