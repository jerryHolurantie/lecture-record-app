const multer = require('multer');


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/recordings`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${req.body.endTime}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = { upload };
