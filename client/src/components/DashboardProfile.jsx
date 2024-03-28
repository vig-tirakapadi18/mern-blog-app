import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";

const DashboardProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                    <img
                        src={currentUser.profilePicture}
                        alt={currentUser.username}
                        className="rounded-full w-full h-full object-cover border-8 border-gray-400"
                    />
                </div>

                <TextInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="Password"
                />

                <Button
                    type="submit"
                    className="bg-gradient-to-r from-rose-500  to-emerald-500 outline-none border-none"
                    outline>
                    Update
                </Button>
            </form>
            <div className="text-rose-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
};

export default DashboardProfile;
