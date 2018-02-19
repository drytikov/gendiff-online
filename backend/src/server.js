import Express from 'express';
import path from 'path';
import multer from 'multer';
import gendiff from '.';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = new Express();
app.use(Express.static('../../build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/upload', upload.array('files', 2), (req, res) => {
  const [firstFile, secondFile] = req.files;
  if (!firstFile || !secondFile) {
    res.send('');
  } else {
    const result = gendiff(firstFile, secondFile, req.body.outputFormat);
    res.send(result);
  }
});
app.listen(process.env.PORT || 5000);
