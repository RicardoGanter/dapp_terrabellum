import ConnectInnomicNft from "components/funcion/connectinnomicnft"

const upgradeNft = async ( id ) =>{ 
    const data = []
    if (id.length === 3){
        id.map((a)=>{
        data.push(a[1]) 
        })
    }
    // const array = []
    if(data.length>2){ 
        const probabilidad = (seleccionarNumeroConProbabilidad(id[0][0].hability1,id[1][0].hability1,id[2][0].hability1)) 
        if(probabilidad){
        const randomNumber = Math.floor(Math.random() * 3); 
        const contract = await ConnectInnomicNft()
        await  contract.upgrade(data[0],data[1],data[2], randomNumber )  
        } 
    }
} 

function seleccionarNumeroConProbabilidad(...valores) {
const total = valores.length; // Obtener el total de valores

// Calcular la probabilidad de cada valor
const probabilidades = valores.reduce((prob, valor) => {
    prob[valor] = (prob[valor] || 0) + 1;
    return prob;
}, {});

for (const valor in probabilidades) {
    probabilidades[valor] = ((probabilidades[valor] / total) * 100).toFixed(2) + "%";
}

// setProbability(Object.values(probabilidades)); // Actualizar el estado con las probabilidades 
const valoresProbabilidad = Object.values(probabilidades); // Obtener los valores del objeto
const totalProbabilidad = valoresProbabilidad.reduce((sum, prob) => sum + parseFloat(prob), 0); // Utilizar parseFloat para convertir los porcentajes en números
let acumulativo = 0;
const rand = Math.random() * totalProbabilidad;
for (let i = 0; i < valoresProbabilidad.length; i++) {
    acumulativo += parseFloat(valoresProbabilidad[i]); // Utilizar parseFloat para convertir los porcentajes en números
    if (rand <= acumulativo) {
    return Object.keys(probabilidades)[i]; // Retorna la clave seleccionada
    }
}
}   

export default upgradeNft