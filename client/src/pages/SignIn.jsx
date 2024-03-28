import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatchActions = useDispatch();

    const { loading, error: errorMessage } = useSelector((state) => state.user);

    const { signInStart, signInSuccess, signInFailure } = userActions;

    const inputChangeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value.trim(),
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!formData.email || !formData.password) {
            return dispatchActions(
                signInFailure("Please fill in all required fields.")
            );
        }

        try {
            dispatchActions(signInStart());
            const response = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (responseData.success === false) {
                return dispatchActions(signInFailure(responseData.message));
            }

            if (response.ok) {
                dispatchActions(signInSuccess(responseData));
                navigate("/");
            }
        } catch (error) {
            dispatchActions(signInFailure(error.message));
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                    <Link
                        to="/"
                        className="font-bold dark:text-white  text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-rose-500  to-emerald-500 rounded-lg text-white">
                            VIG&apos;s
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is the Blog App. You can sign in with your email
                        and password or with Google.
                    </p>
                </div>
                <div className="flex-1">
                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-4">
                        <div>
                            <Label value="Your Email" />
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div>
                            <Label value="Your Password" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <Button
                            className="bg-gradient-to-r from-rose-500  to-emerald-500 outline-none border-none"
                            type="submit"
                            disabled={loading}>
                            {loading ? (
                                <div>
                                    <Spinner size="sm" />
                                    <span className="pl-3">Loading...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don&apos;t have an account?</span>
                        <Link
                            to="/sign-up"
                            className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert
                            className="mt-5"
                            color="failure">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
