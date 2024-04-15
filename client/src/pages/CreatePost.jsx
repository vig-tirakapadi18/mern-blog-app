import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate();

    const uploadImageHandler = async () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image!");
                return;
            }
            setImageUploadError(null);

            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state-changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError("Image upload failed!");
                    console.log(error);
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadUrl) => {
                            setImageUploadProgress(null);
                            setImageUploadError(null);
                            setFormData({ ...formData, image: downloadUrl });
                        }
                    );
                }
            );
        } catch (error) {
            setImageUploadError("Image upload failed!");
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const sumbitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/post/create", {
                mathod: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                setPublishError(responseData.message);
                return;
            }

            if (response.ok) {
                setPublishError(null);
                navigate(`/post/${responseData.slug}`);
            }
        } catch (error) {
            setPublishError("Something went wrong!");
        }
    };

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">
                Create a post
            </h1>
            <form
                className="flex flex-col gap-4"
                onSubmit={sumbitHandler}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        className="flex-1"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                title: event.target.value,
                            })
                        }
                    />

                    <select
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                category: event.target.value,
                            })
                        }>
                        <option value="uncategorized">Select a Category</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">ReactJs</option>
                        <option value="nodejs">NodeJs</option>
                        <option value="expressjs">ExpressJs</option>
                    </select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                        type="file"
                        accept="image/*"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={uploadImageHandler}
                        disabled={imageUploadProgress}
                        className="outline-none">
                        {imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}`}
                                />
                            </div>
                        ) : (
                            "Upload Image"
                        )}
                    </Button>
                </div>

                {imageUploadError && (
                    <Alert color="failure">{imageUploadError}</Alert>
                )}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt="upload"
                        className="w-full"
                    />
                )}
                <ReactQuill
                    theme="snow"
                    placeholder="Write something..."
                    className="h-72 mb-12"
                    required
                    onChange={(value) =>
                        setFormData({ ...formData, content: value })
                    }
                />
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-rose-500  to-emerald-500 rounded-lg text-white">
                    Publish
                </Button>

                {publishError && (
                    <Alert
                        className="mt-5"
                        color="failure">
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default CreatePost;
