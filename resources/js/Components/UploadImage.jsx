import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Upload from "@/Assets/Cloud_Upload.png";
import { useState } from "react";
import { uploadToCloudinary } from "@/Pages/Profile/Partials/Function/UploadCloudinary";
export default forwardRef(function UploadImage(
    {
        type = "file",
        classNameImage = "",
        isFocused = false,
        setData,
        resetTrigger = 0,
        defaultImage = null,
        ...props
    },
    ref
) {
    const [previewImage, setPreviewImage] = useState(defaultImage);
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);
    useEffect(() => {
        if (resetTrigger !== 0) {
            setPreviewImage(null);
            if (localRef.current) {
                localRef.current.value = null;
            }
        }
    }, [resetTrigger]);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setPreviewImage(localPreview);

        try {
            const imageUrl = await uploadToCloudinary(file);
            setData("photo", imageUrl);
        } catch (err) {
            console.error("Gagal upload ke Cloudinary:", err);
        }
    };

    return (
        <div className="w-full h-fit ">
            <div className="flex items-start mb-3">
                {previewImage && (
                    <img
                        {...props}
                        src={previewImage}
                        alt="preview"
                        className={"w-60 mt-2" + classNameImage}
                    />
                )}
            </div>
            <label className="flex w-fit font-medium items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md cursor-pointer">
                <img src={Upload} alt="" className="w-7 h-7" />
                <span>Select Image</span>
                <input
                    {...props}
                    onChange={handleUpload}
                    type={type}
                    className={"hidden"}
                    ref={localRef}
                />
            </label>
        </div>
    );
});
