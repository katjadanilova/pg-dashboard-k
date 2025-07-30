import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Typography } from "@mui/joy";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import upwireLogo from "./assets/upwire-logo.png";
import { SidebarNav } from "./components/SidebarNav";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { DateRangeProvider } from "./contexts/DateRangeContext";
import { PlaygroundProvider } from "./contexts/PlaygroundContext";
import "./global.scss";
import { AllRecordsPage } from "./pages/workspace/AllRecordsPage";
import { DashboardPage } from "./pages/workspace/DashboardPage";
import { FlowsPage } from "./pages/workspace/FlowsPage";
import { PlaygroundsPage } from "./pages/workspace/PlaygroundsPage";
import { UpwireJoyThemeProvider } from "./theme";

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

            <Dropdown open={open} onOpenChange={handleOpenChange}>
                <MenuButton size="sm" variant="solid" color="primary" sx={{ borderRadius: "100%", padding: "5px" }}>
                    <AccountCircleIcon style={{ width: "30px", height: "30px" }} />
                </MenuButton>
                <Menu size="sm" id="user-menu" placement="bottom-end">
                    <MenuItem onClick={handleLogout}>
                        <ListItemDecorator>
                            <LogoutIcon color="primary" />
                        </ListItemDecorator>
                        <Typography>Log out</Typography>
                    </MenuItem>
                </Menu>
            </Dropdown>
        </div>
    );
}

function AppContent() {
    /*
    if (initializing) {
        return <LinearProgress />;
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
                            <Route path="/playground/:playgroundName/all-records" element={<AllRecordsPage />} />
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
                <PlaygroundProvider>
                    <DateRangeProvider>
                        <AppContent />
                    </DateRangeProvider>
                </PlaygroundProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
