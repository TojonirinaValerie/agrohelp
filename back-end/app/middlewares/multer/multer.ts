import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/'); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
    // Use original name + timestamp to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter to accept only images (example)
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
  fileFilter,
});

export default upload;
