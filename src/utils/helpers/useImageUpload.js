import axios from "axios";

const uploadUrl = "https://api.cloudinary.com/v1_1/dihvjdw0r/image/upload/";

export function useImageUpload() {
  const uploadImage = async (file, setProgress) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "m5adwqsh");
    data.append("cloud_name", "dihvjdw0r");

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        let progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("UPLOAD IS " + progress + "% DONE!");
        setProgress(progress);
      },
    };

    try {
      const response = await axios
        .post(uploadUrl, data, config)
        .catch((error) => {
          console.log("error", JSON.stringify(error));
        });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    uploadImage,
  };
}
