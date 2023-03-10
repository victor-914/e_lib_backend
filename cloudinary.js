const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (file) => {
  console.log(file, "file_cloudinary");
  const image = await cloudinary.uploader
    .upload(
      file,
      {
        folder: "final_year_project",
      },
      (result) => result
    )
    .catch((e) => {
      console.log(e, "E_CLOUD");
    });
  return image;
};

module.exports = { upload };
