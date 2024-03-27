import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputChangeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value.trim(),
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("Please fill in all required fields.");
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (responseData.success === false) {
                return setErrorMessage(responseData.message);
            }
            setLoading(false);

            if (response.ok) {
                navigate("/sign-in");
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
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
                        This is the Blog App. You can sign up with your email
                        and password or with Google.
                    </p>
                </div>
                <div className="flex-1">
                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-4">
                        <div>
                            <Label value="Your Username" />
                            <TextInput
                                type="text"
                                placeholder="Username"
                                id="username"
                                onChange={inputChangeHandler}
                            />
                        </div>
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
                                "Sign Up"
                            )}
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Already have an account?</span>
                        <Link
                            to="/sign-in"
                            className="text-blue-500">
                            Sign In
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

export default SignUp;
