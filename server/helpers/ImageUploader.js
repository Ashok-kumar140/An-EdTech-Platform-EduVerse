const cloudinary = require('cloudinary').v2;

exports.ImageUploader = async (file, folder, height, quality) => {

    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    // console.log(height, quality);

    const response = await cloudinary.uploader.upload(file.tempFilePath, options);
    // console.log(response);
    return response;

}