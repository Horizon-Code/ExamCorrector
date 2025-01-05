const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp and original name
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Root route
app.get('/', (req, res) => {
  res.send('Servidor de Horizon Education en funcionamiento');
});

// POST route to handle file uploads
app.post('/api/convert-image', upload.single('file'), (req, res) => {
  console.log('server api')
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Log the uploaded file information
  console.log('Uploaded file:', req.file);

  // Implement further logic to process the uploaded file as needed

  // Send a response back to the client
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
