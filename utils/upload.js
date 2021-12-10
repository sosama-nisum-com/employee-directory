const multer = require("multer");

function validateFile (file, callback) {
  let ext = file.originalname.split(".")[1]?.toLowerCase();
  
  if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
      return callback(new Error('Only images are allowed'))
  }
  callback(null, true)
}

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const [name, extension] = file.originalname.split(".");
    cb(null, `${name.replace(/\s+/g, "")}-${Date.now()}.${extension}`);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    validateFile(file, cb);
  },
});
