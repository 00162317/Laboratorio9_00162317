const http = require('http'),
    fs = require('fs'),
    url = require('url'),
    {
        parse
    } = require('querystring');

mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};
/*¿Cuál es la principal función del módulo HTTP?*/
/*R// Implementa aplicaciones en un servidor web*/
/*¿Cuál es la principal función del módulo FileSystem?*/
/*Es un modulo que trabaja de la mano con los archivos del sistema en tu PC*/
/*¿Qué es un MIME type?*/
/*Es una forma estandarizada de indicar la naturaleza y el formato de un documento. */
/**********************Creacion del servidor*******************/
/*1.*/
http.createServer((req, res) => {
    //Control code.
    /*2.*/
    function collectRequestData(request, callback) {

        const FORM_URLENCODED = 'application/x-www-form-urlencoded';
        if (request.headers['content-type'] === FORM_URLENCODED) {
            let body = '';
            // Evento de acumulacion de data.
            request.on('data', chunk => {
                body += chunk.toString();
            });
            // Data completamente recibida
            request.on('end', () => {
                callback(null, parse(body));
            });
        } else {
            callback({
                msg: `The content-type don't is equals to ${FORM_URLENCODED}`
            });
        }

    }

    /*¿Qué contienen las variables "req" y "res" en la creación del servidor?*/
    /*R// Ambos son objetos pero REQ es lo que le pido y RES es lo que quiero mostrar*/
    /*¿La instrucción .listen(number) puede fallar? Justifique.*/
    /*Si podria fallar pero si el puerto esta mal escrito*/
    /*¿Por qué es útil la función "collectRequestData(...)"?*/
    /*R// Por que se encargará de convertir los campos de una petición en un objeto con todos los campos de la misma.*/
    /************MANEJO DE PETICIONES************/
    /*1.*/
    var pathname = url.parse(req.url).pathname;
    /*2*/
    if (pathname == "/") {
        pathname = "../index.html";
    }
    /*3.*/
    if (pathname == "../index.html") {
        //Peticion de la pagina principal
    }

    if (req.method === 'POST' && pathname == '/cv') {
        //Peticion del formulario a traves del metodo POST
    }

    if (pathname.split(".")[1] == "css") {
        //Peticion de la hoja CSS
    }
    /*¿Para qué, además de conocer la dirección de la petición, es útil la variable "pathname"?*/
    /*R// Para realizar consultas de tipo "parseQueryString" o para saber el host de tipo "slashesDenoteHost"*/
    /*****************Peticion de la pagina principal*********************** */
    /*1. y 2.*/
    if (pathname == "../index.html") {
        fs.readFile(pathname, (err, data) => {

            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // En caso no haberse encontrado el archivo
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                }); return res.end("404 Not Found");
            }
            // Pagina encontrada
            // HTTP Status: 200 : OK

            res.writeHead(200, {
                'Content-Type': mimeTypes[pathname.split('.').pop()] || 'text/html'
            });

            // Escribe el contenido de data en el body de la respuesta.
            res.write(data.toString());


            // Envia la respuesta
            return res.end();
        });
    }
    /*¿Qué contine el parametro "data"? */
    /*R// Contiene la informacion de los documentos que se confirman*/
    /*******************PETICION DE LA HOJA CSS***************************/
    /*¿Cuál es la diferencia entre brindar una respuesta HTML y brindar una CSS? */
    /*R//Que el tipo de extension es .html y .css. Tambien pensando que el primero que se envia es el HTML y termina con el CSS*/
    /**********POST A TRAVES DEL FORMULARO**********/
    /*1.*/
    if (req.method === 'POST' && pathname == "/cv") {
          collectRequestData(req, (err, result) => {
        
            if (err) {
              res.writeHead(400, {
                'content-type': 'text/html'
              });
              return res.end('Bad Request');
            }
        
          });
        } 
    /*2.*/
    if (req.method === 'POST' && pathname == "/cv") {
          collectRequestData(req, (err, result) => {
        
            if (err) {
              res.writeHead(400, {
                'content-type': 'text/html'
              });
              return res.end('Bad Request');
            }
        
            fs.readFile("../templates/plantilla.html", function (err, data) {
              if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                res.writeHead(404, {
                  'Content-Type': 'text/html'
                });
                return res.end("404 Not Found");
              }
        
              res.writeHead(200, {
                'Content-Type': mimeTypes[pathname.split('.').pop()] || 'text/html'
              });
            });
        
          });
        } 
        /*3.*/
        if (req.method === 'POST' && pathname == "/cv") {
              collectRequestData(req, (err, result) => {
            
                if (err) {
                  res.writeHead(400, {
                    'content-type': 'text/html'
                  });
                  return res.end('Bad Request');
                }
            
                fs.readFile("../templates/plantilla.html", function (err, data) {
                  if (err) {
                    console.log(err);
                    // HTTP Status: 404 : NOT FOUND
                    // Content Type: text/plain
                    res.writeHead(404, {
                      'Content-Type': 'text/html'
                    });
                    return res.end("404 Not Found");
                  }
            
                  res.writeHead(200, {
                    'Content-Type': mimeTypes[pathname.split('.').pop()] || 'text/html'
                  });
            
                  //Variables de control.
            
                  let parsedData = data.toString().replace('${dui}', result.dui)
                    .replace("${lastname}", result.lastname)
                    .replace("${firstname}", result.firstname)
                    .replace("${gender}", result.gender)
                    .replace("${civilStatus}", result.civilStatus)
                    .replace("${birth}", result.birth)
                    .replace("${exp}", result.exp)
                    .replace("${tel}", result.tel)
                    .replace("${std}", result.std);
            
                  res.write(parsedData);
                  return res.end();
                });
            
              });
            } 
            /*¿Qué contiene la variable "result"?*/
            /*R// |*/
            /*¿Por qué con la variable "data" se debe aplicarse el metodo toString()? Justifique.*/
            /*R// */
}).listen(8081);

