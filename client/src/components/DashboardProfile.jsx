import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { userActions } from "../store/userSlice";
import { FaExclamationTriangle } from "react-icons/fa";

const DashboardProfile = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserFailure, setUpdateUserFailure] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const imageRef = useRef();
    const { currentUser, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({});
    const dispatchActions = useDispatch();

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];

        if (file) {
            setUploadImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const uploadImageFile = async () => {
        setImageUploading(true);
        setImageUploadError(null);

        const storage = getStorage(app);
        const fileName = new Date().getTime() + uploadImage.name;

        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, uploadImage);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageUploadProgress(progress.toFixed(0));
            },
            // eslint-disable-next-line no-unused-vars
            (error) => {
                setImageUploadError(
                    "Could not upload image (File must be less than 2MB)!"
                );
                setImageUploadProgress(null);
                setUploadImage(null);
                setImageUrl(null);
                setImageUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
                    setImageUrl(downloadURl);
                    setFormData({ ...formData, profilePicture: downloadURl });
                    setImageUploading(false);
                });
            }
        );
    };

    useEffect(() => {
        if (uploadImage) {
            uploadImageFile();
        }
    }, [uploadImage]);

    const inputChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setUpdateUserFailure(null);
        setUpdateUserSuccess(null);

        if (Object.keys(formData).length === 0) {
            setUpdateUserFailure("No changes made!");
            return;
        }

        if (imageUploading) {
            setUpdateUserFailure("Please wait for the image to be uploaded!");
            return;
        }

        try {
            dispatchActions(userActions.updateStart());

            const response = await fetch(
                `/api/user/update/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                dispatchActions(
                    userActions.updateFailure(responseData.message)
                );
                setUpdateUserFailure(responseData.message);
            } else {
                dispatchActions(userActions.updateSuccess(responseData));
                setUpdateUserSuccess("User profile updated successfully!");
            }
        } catch (error) {
            dispatchActions(userActions.updateFailure(error));
            setUpdateUserFailure(error.message);
        }
    };

    const deleteUserHandler = async () => {
        setShowModal(false);

        try {
            dispatchActions(userActions.deleteStart());
            const response = await fetch(
                `/api/user/delete/${currentUser._id}`,
                {
                    method: "DELETE",
                }
            );
            const responseData = await response.json();

            if (!response.ok) {
                dispatchActions(
                    userActions.deleteFailure(responseData.message)
                );
            } else {
                dispatchActions(userActions.deleteSuccess(responseData));
            }
        } catch (error) {
            dispatchActions(userActions.deleteFailure(error.message));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form
                className="flex flex-col gap-4"
                onSubmit={submitHandler}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={imageChangeHandler}
                    ref={imageRef}
                    hidden
                />

                <div
                    className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => imageRef.current.click()}>
                    {imageUploadProgress && (
                        <CircularProgressbar
                            value={imageUploadProgress || 0}
                            text={`${imageUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgb(16, 185, 129, ${
                                        imageUploadProgress / 100
                                    })`,
                                },
                            }}
                        />
                    )}

                    <img
                        src={imageUrl || currentUser.profilePicture}
                        alt={currentUser.username}
                        className={`rounded-full w-full h-full object-cover border-8 border-gray-400 ${
                            imageUploadProgress &&
                            imageUploadProgress < 100 &&
                            "opacity-60"
                        }`}
                    />
                </div>

                {imageUploadError && (
                    <Alert color="failure">{imageUploadError}</Alert>
                )}

                <TextInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    onChange={inputChangeHandler}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    onChange={inputChangeHandler}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={inputChangeHandler}
                />

                <Button
                    type="submit"
                    className="bg-gradient-to-r from-rose-500  to-emerald-500 outline-none border-none"
                    outline>
                    Update
                </Button>
            </form>
            <div className="text-rose-500 flex justify-between mt-5">
                <span
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}>
                    Delete Account
                </span>
                <span className="cursor-pointer">Sign Out</span>
            </div>

            {updateUserSuccess && (
                <Alert
                    color="success"
                    className="mt-5">
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserFailure && (
                <Alert
                    color="failure"
                    className="mt-5">
                    {updateUserFailure}
                </Alert>
            )}
            {error && (
                <Alert
                    color="failure"
                    className="mt-5">
                    {error}
                </Alert>
            )}

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FaExclamationTriangle
                            color="#e11d48"
                            className="h-14 w-14 mb-5 mx-auto"
                        />
                        <h3 className="mb-5 text-lg dark:text-white">
                            Are you sure you want to delete your account?
                        </h3>
                        <div className="flex justify-center gap-8">
                            <Button
                                color="failure"
                                onClick={deleteUserHandler}>
                                Yes, I&apos;m sure!
                            </Button>
                            <Button onClick={() => setShowModal(false)}>
                                No, cancel!
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DashboardProfile;
