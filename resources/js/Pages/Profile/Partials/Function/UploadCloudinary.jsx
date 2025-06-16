export const uploadToCloudinary = async (file, uploadPreset = "social_media") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dwwngau2q/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || "Upload failed");
        }

        return result.secure_url;
    } catch (err) {
        console.error("Upload to Cloudinary failed:", err);
        throw err;
    }
};
