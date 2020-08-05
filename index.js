//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

// Marca: Peugeot // Modelo: 206 // Puertas: 4 // Precio: $200.000,00
// Marca: Honda // Modelo: Titan // Cilindrada: 125c // Precio: $60.000,00
// Marca: Peugeot // Modelo: 208 // Puertas: 5 // Precio: $250.000,00
// Marca: Yamaha // Modelo: YBR // Cilindrada: 160c // Precio: $80.500,50
// =============================
// Vehículo más caro: Peugeot 208
// Vehículo más barato: Honda Titan
// Vehículo que contiene en el modelo la letra ‘Y’: Yamaha YBR $80.500,50


let rodados=[
    {marca:'Peugeot',
    Modelo: '206',
    Detalle:4,
    Precio:200000,
    auto:true
    },
    {marca:'Honda',
    Modelo: 'Titan',
    Detalle:125,
    Precio:60000,
    auto:false
    },
    {marca:'Peugeot',
    Modelo: '208',
    Detalle:5,
    Precio:250000,
    auto:true
    },
    {marca:'Yamaha',
    Modelo: 'YBR',
    Detalle:160,
    Precio:80500.50,
    auto:false
    }

]

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end();
});

function obtenerRodados(arrayRodados){
    let rodadoMasCaro;
    let rodadoMasBarato={};
    let diferenciaMenor;
    let rodadoContieneY;
    for (let i=0;i<arrayRodados.length;i++){
        let indexMenosUno=i-1;
        if(i-1<0){
            indexMenosUno=0;
            rodadoMasBarato.Precio=1000000000;
        }
        // console.log('esto es el array pasado',arrayRodados[i])
        // console.log('esto es rodados', rodados[indexMenosUno])
        if(arrayRodados[i].Precio-rodados[indexMenosUno].Precio>0){
            rodadoMasCaro=arrayRodados[i]
        }
        if(arrayRodados[i].Precio-rodados[indexMenosUno].Precio<=0 && arrayRodados[i].Precio < rodadoMasBarato.Precio ){
            rodadoMasBarato=arrayRodados[i]
        }
    if(arrayRodados[i].marca.includes('Y')){
        rodadoContieneY=arrayRodados[i];
    }   
    }
    console.log(rodadoMasCaro.Modelo)
    console.log('esto es el barato',rodadoMasBarato)
    console.log('esto es Y',rodadoContieneY)

    
};

obtenerRodados(rodados);

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});