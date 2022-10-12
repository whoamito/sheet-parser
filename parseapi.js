const express = require('express');
const { utils, read} = require("xlsx");
const multer = require("multer");

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

fileSheetToJson = (file) => {
  const workbook = read(file.buffer);
  return Promise.resolve(utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
}

app.post('/parse', upload.single('file'), async (req, resp) =>{
  const { file } = req;
  const jsonData = await fileSheetToJson(file);
  resp.json(jsonData);
});


app.listen(3000);
