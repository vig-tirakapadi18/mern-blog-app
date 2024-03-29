import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/themeSlice";
import { userActions } from "../store/userSlice";

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const dispatchActions = useDispatch();
    const path = useLocation();

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
        <Navbar className="border-b-2">
            <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-rose-500  to-emerald-500 rounded-lg text-white">
                    VIG&apos;s
                </span>
                Blog
            </Link>
            <form>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={FaSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button
                className="w-12 h-10 lg:hidden"
                color="gray"
                pill>
                <FaSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button
                    className="w-12 h-10 hidden sm:inline"
                    color="gray"
                    pill
                    onClick={() => dispatchActions(themeActions.toggleTheme())}>
                    {theme === "light" ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="user"
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }>
                        <Dropdown.Header>
                            <span className="block text-sm">
                                @{currentUser.username}
                            </span>
                            <span className="block text-sm font-medium truncate">
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={signOutHandler}>
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button
                            gradientDuoTone="purpleToBlue"
                            outline>
                            Sign In
                        </Button>
                    </Link>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    active={path === "/"}
                    as={"div"}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link
                    active={path === "/about"}
                    as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link
                    active={path === "/projects"}
                    as={"div"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
