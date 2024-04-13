import { Button, FileInput, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">
                Create a post
            </h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        className="flex-1"
                    />

                    <select
                        name=""
                        id="">
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
                    />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline>
                        Upload Image
                    </Button>
                </div>
                <ReactQuill
                    theme="snow"
                    placeholder="Write something..."
                    className="h-72 mb-12"
                    required
                />
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-rose-500  to-emerald-500 rounded-lg text-white">
                    Publish
                </Button>
            </form>
        </div>
    );
};

export default CreatePost;
