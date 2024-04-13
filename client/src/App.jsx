import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import FooterComp from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";

const App = () => {
    return (
        <Fragment>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/about"
                    element={<About />}
                />
                <Route
                    path="/projects"
                    element={<Projects />}
                />
                <Route element={<PrivateRoute />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                </Route>
                <Route element={<AdminPrivateRoute />}>
                    <Route
                        path="/create-post"
                        element={<CreatePost />}
                    />
                </Route>
                <Route
                    path="/sign-in"
                    element={<SignIn />}
                />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
            </Routes>
            <FooterComp />
        </Fragment>
    );
};

export default App;
