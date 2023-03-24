import cloudnary from "cloudinary";
import sharp from "sharp";

cloudnary.v2.config({
  cloud_name: "drbwctym7",
  api_key: "432239942823659",
  api_secret: "zMlrJDjoARHHzNj9J4JwugDmVic",
});

const uploadImageToCloudnary = async (
  buffer: Buffer,
  reSizeResolution = 200
) => {
  const data = await sharp(buffer)
    .resize(reSizeResolution)
    .toFormat("jpeg")
    .toBuffer();
  const stream = await cloudnary.v2.uploader.upload(
    `data:application/octet-stream;base64,${data.toString("base64")}`,
    { resource_type: "auto" },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return result;
      }
    }
  );
  return stream;
};

export default uploadImageToCloudnary;
