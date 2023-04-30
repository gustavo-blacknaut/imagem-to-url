const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

function saveImageFile(img64, tabCode) {
  const base64ImageData = `data:image/png;base64,${img64}`
  const base64Data = base64ImageData.replace(/^data:image\/png;base64,/, '');
  fs.writeFile(`./imagens/${tabCode}.png`, base64Data, 'base64', (err) => { if (err) throw err;})
}

function loadImageFile(tabCode, callback) {
  fs.readFile(`./imagens/${tabCode}.png`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
}

app.post('/enviarimg', (req, res) => {
  const tabCode = uuid.v4();
  saveImageFile(req.body.img64, tabCode);
  res.send({ tabCode });
});

app.get('/imagem/:tabCode', (req, res) => {
  const imagePath = path.join(__dirname, 'imagens', `${req.params.tabCode}.png`);
  loadImageFile(req.params.tabCode, (img64) => {
    res.sendFile(imagePath);
  });
});

app.listen(3000, () => {
  console.log(`Servidor iniciado na porta 3000`);
});