import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userActions } from "../store/userSlice";

const DashboardSidebar = () => {
    const path = useLocation();
    const [tab, setTab] = useState("");
    const dispatchActions = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(path.search);
        const tabFromUrl = urlParams.get("tab");

        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [path.search]);

    const signOutHandler = async () => {
        try {
            const response = await fetch("/api/user/sign-out", {
                method: "POST",
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.log(responseData.message);
            } else {
                dispatchActions(userActions.signOutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={FaUser}
                            label={"User"}
                            labelColor="dark"
                            as="div">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item
                        icon={FaArrowRight}
                        className="cursor-pointer"
                        onClick={signOutHandler}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashboardSidebar;
