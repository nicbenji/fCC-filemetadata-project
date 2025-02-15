const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(_req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (req.file) {
    const { originalname, mimetype, size } = req.file;

    res.json({
      name: originalname,
      type: mimetype,
      size: size
    });
  } else {
    res.json({ error: 'No file attached' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
