import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
    const path = useLocation();
    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(path.search);
        const tabFromUrl = urlParams.get("tab");

        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [path.search]);

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={FaUser}
                            label={"User"}
                            labelColor="dark">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item
                        icon={FaArrowRight}
                        className="cursor-pointer">
                        Profile
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashboardSidebar;
