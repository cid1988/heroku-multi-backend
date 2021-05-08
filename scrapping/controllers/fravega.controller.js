const request = require('request');
const cheerio = require('cheerio');

const API_PATH = '/api-backoffice';

const direcciones = [
    'https://www.fravega.com/l/tv-y-video/tv/',
    'https://www.fravega.com/l/celulares/celulares-liberados/',
    "https://www.fravega.com/l/audio/radios-y-audio-portatil/",
    "https://www.fravega.com/l/?categorias=informatica%2Fgaming-pc"
]

const direccionesGarbarino = [
   "https://www.garbarino.com/productos/tv-led-y-smart-tv/4342"
]

titulos = [];

const fravegaCtrl = {};

fravegaCtrl.getFravega = async (req, res, next) => {
    const productos = [];
 
    for (let i = 0; i < direcciones.length; i++) {
       const dir = direcciones[i];
       
       let a = await fravega(dir)
       productos.push(a)
    }
    for (let i = 0; i < direccionesGarbarino.length; i++) {
       const dir = direccionesGarbarino[i];
       
       let b = await garbarino(dir)
       productos.push(b)
    }
    res.json(productos);
};
 
const fravega = function(direccion){
    return new Promise((resolve, reject) => {
       request(direccion, (error, response, html)=>{
          if (error) return console.error(error);
          if(!error && response.statusCode == 200){
             const $ = cheerio.load(html)
    
             const productos = [];
    
             $('li').find('div > a').each(function (i, e) {
                let titulo = $(this).find('article div h4').text();
                let href = $(this).attr('href');
                let precioFinal = $(this).find('article div div span').text();
                let img = $(this).find('img').eq(0).attr('src');
 
                productos.push({'titulo': titulo, 'precioFinal': precioFinal, 'link': 'www.fravega.com' + href, img: img});
                titulos.push(titulo);
             });
             resolve(productos);
          }
       })
    })
}

const garbarino = function(direccion){
   return new Promise((resolve, reject) => {
      request(direccion, (error, response, html)=>{
         if (error) return console.error(error);
         if(!error && response.statusCode == 200){
            const $ = cheerio.load(html, {
               xml: {
                 normalizeWhitespace: true,
               }})
            const productos = [];

            $('.itemBox-content').each(function(i, e){
               let titulo = $(this).find('a h3').text();
               let precioFinal = $(this).find('a div .value-item').text();
               let link = $(this).find('a').attr('href');
               let img = $(this).find('a img').eq(0).attr('src');

               precioFinal = precioFinal.replace("$","")
               productos.push({'titulo': titulo, 'precioFinal': precioFinal, 'link': 'www.garbarino.com' + link, img: img});
               titulos.push(titulo);
            })
            resolve(productos);
         }
      })
   })
}

module.exports = fravegaCtrl;