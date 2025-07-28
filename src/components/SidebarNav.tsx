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

export function SidebarNav({className, onNavigate}: SidebarNavProps) {
    //TODO: Replace with API data
    const [playgrounds] = useState<PlaygroundItem[]>([{name: "Basic Test"}, {name: "Spintest"}, {name: "playq"}, {name: "Spring Bat..."}]);

    const dropdownOptions: DropdownOption[] = [
        {name: "Dashboard", icon: <DashboardIcon />},
        {name: "Flows", icon: <LoopIcon />},
        {name: "All Records", icon: <DescriptionIcon />},
    ];

    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["playgrounds"]));
    const [activeItem, setActiveItem] = useState<{
        playground: string;
        option: string;
    } | null>({
        playground: "Basic Test",
        option: "Dashboard",
    });

    function toggleSection(sectionId: string) {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    }

    function handleItemClick(playgroundName: string, optionName: string) {
        setActiveItem({playground: playgroundName, option: optionName});
        onNavigate?.(playgroundName, optionName);
    }

    function isItemActive(playgroundName: string, optionName: string) {
        return activeItem?.playground === playgroundName && activeItem?.option === optionName;
    }

    function handlePlaygroundToggle(playgroundName: string) {
        toggleSection(playgroundName);
    }

    function handleOptionClick(playgroundName: string, optionName: string) {
        handleItemClick(playgroundName, optionName);
    }

    function handlePlaygroundsToggle() {
        toggleSection("playgrounds");
    }

    function renderPlaygroundItem(playground: PlaygroundItem) {
        const isExpanded = expandedSections.has(playground.name);

        const optionElements = [];
        for (const option of dropdownOptions) {
            optionElements.push(
                <div key={option.name} className="nav-item depth-2">
                    <button
                        className={`nav-item-content ${isItemActive(playground.name, option.name) ? "active" : ""}`}
                        onClick={() => {
                            handleOptionClick(playground.name, option.name);
                        }}
                        type="button"
                    >
                        <span className="nav-icon">{option.icon}</span>
                        <span className="nav-label">{option.name}</span>
                    </button>
                </div>,
            );
        }

        return (
            <div key={playground.name} className="nav-item depth-0">
                <button
                    className="nav-item-content"
                    onClick={() => {
                        handlePlaygroundToggle(playground.name);
                    }}
                    type="button"
                >
                    <span className="nav-icon">
                        <BubbleChartIcon />
                    </span>
                    <span className="nav-label">{playground.name}</span>
                    <span className={`nav-arrow ${isExpanded ? "expanded" : ""}`}>
                        <ExpandMoreIcon />
                    </span>
                </button>
                {isExpanded && <div className="nav-children">{optionElements}</div>}
            </div>
        );
    }

    const playgroundElements = [];
    for (const playground of playgrounds) {
        playgroundElements.push(renderPlaygroundItem(playground));
    }

    return (
        <nav className={`sidebar-nav ${className || ""}`}>
            <div className="nav-section">
                <div className="nav-section-header">GENERAL</div>
                <div className="nav-items">
                    <div className="nav-item depth-0">
                        <button className="nav-item-content" onClick={handlePlaygroundsToggle} type="button">
                            <span className="nav-icon">
                                <RouteIcon />
                            </span>
                            <span className="nav-label">Playgrounds</span>
                            <span className={`nav-arrow ${expandedSections.has("playgrounds") ? "expanded" : ""}`}>
                                <ExpandMoreIcon />
                            </span>
                        </button>
                        {
                        expandedSections.has("playgrounds") && <div className="nav-children">{playgroundElements}
                        </div>
                        }
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
