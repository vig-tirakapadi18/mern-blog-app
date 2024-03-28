import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";

const Dashboard = () => {
    const [tab, setTab] = useState("");
    const path = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(path.search);
        const tabFromUrl = urlParams.get("tab");

        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [path.search]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="min-w-56">
                <DashboardSidebar />
            </div>
            {tab === "profile" && <DashboardProfile />}
        </div>
    );
};

export default Dashboard;
