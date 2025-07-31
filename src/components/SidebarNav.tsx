import {Dashboard as DashboardIcon, Description as DescriptionIcon, Loop as LoopIcon} from "@mui/icons-material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RouteIcon from "@mui/icons-material/Route";
import {type ReactElement, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {usePlaygroundContext} from "../contexts/UIStateContext";
import "../global.scss";
import {useMockPlaygrounds} from "../hooks/useMockData";
import type {PlaygroundData} from "../types";

type SidebarNavProps = {
    className?: string;
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

export function SidebarNav({className}: SidebarNavProps) {
    const {data: playgrounds = [], isLoading: playgroundsLoading} = useMockPlaygrounds();
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["playgrounds"]));
    const navigate = useNavigate();
    const location = useLocation();
    const {setCurrentPlayground, clearPlayground} = usePlaygroundContext();

    useEffect(() => {
        const pathMatch = location.pathname.match(/^\/playground\/([^/]+)\/([^/]+)/);
        if (pathMatch) {
            const playgroundName = decodeURIComponent(pathMatch[1]);
            const optionName = pathMatch[2];
            setExpandedSections((prev) => new Set([...prev, "playgrounds", playgroundName]));
            setCurrentPlayground(playgroundName, optionName);
        } else {
            clearPlayground();
        }
    }, [location.pathname, setCurrentPlayground, clearPlayground]);

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
        clearPlayground();
        navigate("/playgrounds");
    }

    function handleMenuOptionClick(playgroundName: string, optionName: string) {
        const routeMap: Record<string, string> = {
            Dashboard: "dashboard",
            Flows: "flows",
            "All Records": "all-records",
        };
        const route = routeMap[optionName];
        if (route) {
            setCurrentPlayground(playgroundName, optionName);
            navigate(`/playground/${encodeURIComponent(playgroundName)}/${route}`);
        }
    }

    function isMenuActive(playgroundName: string, optionName: string) {
        const routeMap: Record<string, string> = {
            Dashboard: "dashboard",
            Flows: "flows",
            "All Records": "all-records",
        };
        const route = routeMap[optionName];
        return location.pathname === `/playground/${encodeURIComponent(playgroundName)}/${route}`;
    }

    function isMainPlaygroundsActive() {
        return location.pathname === "/playgrounds";
    }

    function renderSubItem(playground: PlaygroundData) {
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

                        {expandedSections.has("playgrounds") && (
                            <div className="nav-children">
                                {playgroundsLoading ? (
                                    <div className="nav-subitem">
                                        <div className="nav-item-content">
                                            <span className="nav-label">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    playgrounds.map(renderSubItem)
                                )}
                            </div>
                        )}
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
