const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const upload = multer();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(upload.array());
app.use(express.static('public'));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const faixas = [
  {
    min: 0,
    max: 22847.76,
    aliquota: 0,
    parcela: 0
  },
  {
    min: 22847.77,
    max: 33919.8,
    aliquota: 7.5,
    parcela: 1713.58
  },
  {
    min: 33919.81,
    max: 45012.60,
    aliquota: 15,
    parcela: 4257.57
  },
  {
    min: 45012.61,
    max: 55976.16,
    aliquota: 22.5,
    parcela: 7633.51
  },
  {
    min: 55976.17,
    max: Infinity,
    aliquota: 27.5,
    parcela: 10432.32
  }
];

app.post('/api/calc', (req, res) => {
  let aliquota = 0;
  let parcela = 0;
  const { salario } = req.body;
  faixas.forEach((item) => {
    if (salario >= item.min && salario <= item.max) {
      aliquota = item.aliquota;
      parcela = item.parcela;
    }
  });

  res.status(200).send({
    success: 'true',
    aliquota: aliquota,
    parcela: parcela
  });
});

app.get('/api/calc', (req, res) => {
  const calc = 2;
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    result: calc
  });
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
