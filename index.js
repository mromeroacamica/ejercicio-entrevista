//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

Array.prototype.sortBy = (function() {
    var sorters = {
      string: function(a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      },
  
      number: function(a, b) {
        return b - a;
      }
    };
  
    return function(prop) {
      var type = typeof this[0][prop] || 'string';
      return this.sort(function(a, b) {
        return sorters[type](a[prop], b[prop]);
      });
    };
  })();

let rodados = [
    {
        marca: 'Peugeot',
        Modelo: '206',
        Detalle: 4,
        Precio: 200000,
        auto: true,
        puertas: 'Puertas'
    },
    {
        marca: 'Honda',
        Modelo: 'Titan',
        Detalle: 125,
        Precio: 60000,
        auto: false,
        puertas: 'Cilindrada'
    },
    {
        marca: 'Peugeot',
        Modelo: '208',
        Detalle: 5,
        Precio: 250000,
        auto: true,
        puertas: 'Puertas'
    },
    {
        marca: 'Yamaha',
        Modelo: 'YBR',
        Detalle: 160,
        Precio: 80500.50,
        auto: false,
        puertas: 'Cilindrada'

    }

];

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end();
});


//función que recorre todo el array de rodados para poder determinar mas caro, mas barato y que contenga Y
function obtenerRodados(arrayRodados) {
    let rodadoMasCaro;
    let rodadoMasBarato = {};
    let rodadoContieneY;
    let rodadosOrdenados;
    for (let i = 0; i < arrayRodados.length; i++) {
        let indexMenosUno = i - 1;
        const { marca, Modelo, Detalle, Precio, auto, puertas } = arrayRodados[i];
        if (i - 1 < 0) {
            indexMenosUno = 0;
            rodadoMasBarato.Precio = 1000000000;
        }
        //determino rodado mas caro
        if (Precio - rodados[indexMenosUno].Precio > 0) {
            rodadoMasCaro = arrayRodados[i]
        }
        //deterino rodado mas economico
        if (Precio - rodados[indexMenosUno].Precio <= 0 && Precio < rodadoMasBarato.Precio) {
            rodadoMasBarato = arrayRodados[i]
        }
        //determino rodado que contenga Y
        if (marca.includes('Y')) {
            rodadoContieneY = arrayRodados[i];
        }
        console.log(`Marca: ${marca} // Modelo: ${Modelo} // ${puertas}: ${Detalle} // Precio: $${Precio.toFixed(2).toLocaleString()}`);
        
    }
    //mostrando los rodados de mayor a menor
    function mostrarRodadosOrdenados(array){
        array.forEach(element => {
            console.log(`${element.marca}  ${element.Modelo}`)
        });
    };
    
    
    console.log(`=============================
    \nVehículo más caro: ${rodadoMasCaro.marca} ${rodadoMasCaro.Modelo}
    \nVehículo más barato: ${rodadoMasBarato.marca} ${rodadoMasBarato.Modelo}
    \nVehículo que contiene en el modelo la letra ‘Y’: ${rodadoContieneY.marca} ${rodadoContieneY.Modelo} $${rodadoContieneY.Precio.toFixed(2).toLocaleString()}
    `)
    console.log(`=============================`)
    rodadosOrdenados=rodados.sortBy('Precio');
    console.log(`Vehículos ordenados por precio de mayor a menor:`)
    mostrarRodadosOrdenados(rodadosOrdenados);

};


//metodo que recibe el array como parametro y muestra en consola
function mostarTodo(array) {
    obtenerRodados(array)
    }

mostarTodo(rodados);


//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});