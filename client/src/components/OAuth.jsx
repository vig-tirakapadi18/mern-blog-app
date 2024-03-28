import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatchActions = useDispatch();
    const navigate = useNavigate();

    const { signInSuccess } = userActions;

    const googleClickHandler = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const auth = getAuth(app);

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.diaplayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });

            const responseData = await response.json();

            if (responseData.ok) {
                dispatchActions(signInSuccess(responseData));
            }

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={googleClickHandler}>
            <FcGoogle className="w-5 h-5 mx-2 bg-white rounded-lg" />
            Continue with Google
        </Button>
    );
};

export default OAuth;
