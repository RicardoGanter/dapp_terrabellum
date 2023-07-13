export const calculateProbability = (datos) => {
    const total = datos.reduce((sum, dato) => sum + dato, 0);
    const probabilidades = datos.map((dato) => ((dato / total) * 100).toFixed(1));
    return probabilidades;
}  