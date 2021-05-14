const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3001;
const API_PATH_MEDICINA = process.env.API_PATH_MEDICINA;
const API_PATH_SCRAPPING = process.env.API_PATH_SCRAPPING;
const API_PATH_FIAT_RUVI = process.env.API_PATH_FIAT_RUVI;

app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Allow', 'GET, POST, PUT, DELETE');
   next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////
//Routes
//Scrapping
app.use(API_PATH_SCRAPPING + '/fravega', require('./scrapping/routes/routes'));

//Medicina
app.use(API_PATH_MEDICINA + '/getData', require('./medicina-backend/routes/routes'));
app.use(API_PATH_MEDICINA + '/getConsultas', require('./medicina-backend/routes/routes'));

//Fiat ruvi
// require('./fiat-ruvi/productos/productos.route.js')(app);
app.use(API_PATH_FIAT_RUVI + '/productos', require('./fiat-ruvi/productos/productos.route'));

////////////////////////////////////////
app.listen(port, function(){
   console.log('El Server está corriendo...');
   console.log('Puerto: ' + port);
});
