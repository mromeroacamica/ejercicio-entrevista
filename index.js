//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

let rodados=[
    {marca:'Peugeot',
    Modelo: '206',
    Detalle:4,
    Precio:200000,
    auto:true,
    puertas: 'Puertas'
    },
    {marca:'Honda',
    Modelo: 'Titan',
    Detalle:125,
    Precio:60000,
    auto:false,
    puertas: 'Cilindrada'
    },
    {marca:'Peugeot',
    Modelo: '208',
    Detalle:5,
    Precio:250000,
    auto:true,
    puertas: 'Puertas'
    },
    {marca:'Yamaha',
    Modelo: 'YBR',
    Detalle:160,
    Precio:80500.50,
    auto:false,
    puertas: 'Cilindrada'

    }

]

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end();
});
let rodadoMasCaro;
let rodadoMasBarato={};
let diferenciaMenor;
let rodadoContieneY;

function obtenerRodados(arrayRodados){
    for (let i=0;i<arrayRodados.length;i++){
        const {marca,Modelo,Detalle,Precio,auto,puertas}=arrayRodados[i];
        let indexMenosUno=i-1;
        if(i-1<0){
            indexMenosUno=0;
            rodadoMasBarato.Precio=1000000000;
        }
        // console.log('esto es el array pasado',Precio)
        // console.log('esto es rodados', rodados[indexMenosUno])
        if(Precio-rodados[indexMenosUno].Precio>0){
            rodadoMasCaro=arrayRodados[i]
        }
        if(Precio-rodados[indexMenosUno].Precio<=0 && Precio < rodadoMasBarato.Precio ){
            rodadoMasBarato=arrayRodados[i]
        }
    if(marca.includes('Y')){
        rodadoContieneY=arrayRodados[i];
    }   
    console.log(`Marca: ${marca} // Modelo: ${Modelo} // ${puertas}: ${Detalle} // Precio: $${Precio.toFixed(2).toLocaleString()}`);
    }
    
};



function mostarTodo(array){
    obtenerRodados(array)
    console.log(`=============================
    \nVehículo más caro: ${rodadoMasCaro.marca} ${rodadoMasCaro.Modelo}
    \nVehículo más barato: ${rodadoMasBarato.marca} ${rodadoMasBarato.Modelo}
    \nVehículo que contiene en el modelo la letra ‘Y’: ${rodadoContieneY.marca} ${rodadoContieneY.Modelo} $${rodadoContieneY.Precio.toFixed(2).toLocaleString()}
    `)
    
}

mostarTodo(rodados);

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});