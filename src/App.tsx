import {useState} from "react";
import {SidebarNav} from "./components/SidebarNav";
import {AuthProvider} from "./contexts/AuthContext";
import "./global.scss";
import {UpwireJoyThemeProvider} from "./theme";

function AppContent() {
    const [currentView, setCurrentView] = useState<{
        playground: string;
        option: string;
    } | null>(null);

    function handleNavigation(playgroundName: string, optionName: string) {
        setCurrentView({playground: playgroundName, option: optionName});
    }

    function renderCurrentView() {
        if (!currentView) {
            return (
                <div>
                    <h1>Playgrounds</h1>
                    <div className="content-placeholder">
                        <p>Select a playground from the sidebar to get started.</p>
                    </div>
                </div>
            );
        }

        const {playground, option} = currentView;

        return (
            <div>
                <h1>
                    {playground} - {option}
                </h1>
                <div className="content-placeholder">
                    <p>
                        This is the {option} page for the {playground} playground.
                    </p>
                    <p>
                        Current view: {playground} → {option}
                    </p>
                    <div>
                        <h3>Content will be rendered here based on:</h3>
                        <ul>
                            <li>
                                <strong>Playground:</strong> {playground}
                            </li>
                            <li>
                                <strong>Option:</strong> {option}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

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
                <SidebarNav onNavigate={handleNavigation} />
                <main className="main-content">{renderCurrentView()}</main>
            </div>
        </UpwireJoyThemeProvider>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
