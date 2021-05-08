const port = 8888;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const API_PATH_MEDICINA = '/api-medicina';
const API_PATH_SCRAPPING = '/api-medicina';

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

////////////////////////////////////////
app.listen(port, function(){
   console.log('El Server está corriendo...');
   console.log('Puerto: ' + port);
});