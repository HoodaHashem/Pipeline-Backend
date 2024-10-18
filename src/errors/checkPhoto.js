const checkPhoto = {
  avatar: {
    custom: {
      options: (value, { req }) => {
        console.log("Received file:", req.file);
        console.log("Received body:", req.body);

        if (!req.file) {
          throw new Error("No file uploaded");
        }
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
          throw new Error("File must be a JPG, PNG, or JPEG image");
        }
        if (req.file.mimetype === "image/svg+xml") {
          throw new Error("SVG files are not allowed");
        }
        return true;
      },
    },
  },
};

export default checkPhoto;
