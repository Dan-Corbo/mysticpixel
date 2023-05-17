// Define un módulo de JavaScript para obtener la hora actual en formato de 24 horas con segundos
const horaActual = (function() {
    // Define una función interna para obtener la hora actual en formato de 24 horas con segundos
    function obtenerHora() {
      // Crea una instancia de Date para obtener la hora actual
    const date = new Date();
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();

      // Añade ceros a la izquierda si la hora, minutos o segundos son menores que 10
    hora = hora < 10 ? "0" + hora : hora;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
      // Devuelve la hora en formato de 24 horas con segundos
    return hora + ":" + minutos + ":" + segundos;
    }

    // Devuelve un objeto con la función para obtener la hora actual en formato de 24 horas con segundos
    return {
        obtenerHora: obtenerHora
    }
})();

    // Ejemplo de uso:
        console.log(horaActual.obtenerHora()); 
        // Imprime la hora actual en formato de 24 horas con segundos en la consola
