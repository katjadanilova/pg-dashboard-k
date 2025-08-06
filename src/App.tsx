import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {APIProvider} from "./api/client";
import upwireLogo from "./assets/upwire-logo.png";
import {SidebarNav} from "./components/SidebarNav";
import {UpDropdown, UpListItemDecorator, UpMenu, UpMenuButton, UpMenuItem} from "./components/UpComponents";
import {AuthProvider, useAuthContext} from "./contexts/AuthContext";
import {UIStateProvider} from "./contexts/UIStateContext";
import "./global.scss";
import {BatchesPage} from "./pages/workspace/BatchesPage";
import {DashboardPage} from "./pages/workspace/DashboardPage";
import {FlowsPage} from "./pages/workspace/FlowsPage";
import {PlaygroundsPage} from "./pages/workspace/PlaygroundsPage";
import {RecordsPage} from "./pages/workspace/RecordsPage";
import {UpwireJoyThemeProvider} from "./theme";

function PageHeader() {
    const [open, setOpen] = useState(false);
    const auth = useAuthContext();

    function handleOpenChange(_event: any, open: boolean) {
        setOpen(open);
    }

    function handleLogout() {
        auth.logout();
        setOpen(false);
    }

    return (
        <div className="app-header">
            <img src={upwireLogo} alt="Upwire Logo" />

            <UpDropdown open={open} onOpenChange={handleOpenChange}>
                <UpMenuButton size="sm" variant="solid" color="primary" sx={{borderRadius: "100%", padding: "5px"}}>
                    <AccountCircleIcon style={{width: "30px", height: "30px"}} />
                </UpMenuButton>
                <UpMenu size="sm" id="user-menu" placement="bottom-end">
                    <UpMenuItem onClick={handleLogout}>
                        <UpListItemDecorator>
                            <LogoutIcon color="primary" />
                        </UpListItemDecorator>
                        <span>Log out</span>
                    </UpMenuItem>
                </UpMenu>
            </UpDropdown>
        </div>
    );
}

function AppContent() {
    /*
    const {initializing, needsAuthentication} = useAuthContext();
    if (initializing) {
        return <UpProgress />;
    }


    if (needsAuthentication) {
        return <LoginScreen />;
    }
     */

    return (
        <UpwireJoyThemeProvider>
            <div className="app-layout">
                <PageHeader />
                <div className="app-content">
                    <SidebarNav />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/playgrounds" replace />} />
                            <Route path="/playgrounds" element={<PlaygroundsPage />} />
                            <Route path="/playground/:playgroundName/dashboard" element={<DashboardPage />} />
                            <Route path="/playground/:playgroundName/flows" element={<FlowsPage />} />
                            <Route path="/playground/:playgroundName/records" element={<RecordsPage />} />
                            <Route path="/playground/:playgroundName/batches" element={<BatchesPage />} />
                            <Route path="*" element={<Navigate to="/playgrounds" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </UpwireJoyThemeProvider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <APIProvider>
                    <UIStateProvider>
                        <AppContent />
                    </UIStateProvider>
                </APIProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
