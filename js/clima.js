// Define un módulo de JavaScript para obtener el clima actual de una ciudad a través de OpenWeatherMap
const climaWidget = (function() {
    const API_KEY = "63da5e52930472d1a9cca33fdc8207af"; // Reemplaza "TU_CLAVE_DE_API" con tu clave de API de OpenWeatherMap

    // Define una función interna para obtener la ubicación actual del usuario
    function obtenerUbicacion() {
        return new Promise(function(resolve, reject) {
            const url = 'https://ipapi.co/json/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const ciudad = data.city;
                    resolve(ciudad);
                })
                .catch(error => reject(error));
        });
    }

    // Define una función interna para obtener el clima actual de una ciudad a través de su nombre
    function obtenerClima(ciudad, unidad) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=${unidad}&appid=${API_KEY}`;

        return fetch(URL)
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    // Define una función para convertir la velocidad del viento de m/s a km/h
    function convertirVelocidad(viento) {
        return Math.round(viento * 3.6); // Multiplica por 3.6 para convertir de m/s a km/h
    }

    // Define una función interna para obtener la fecha actual en formato "día de mes de año y pone la primera letra del dia de la semana en mayuscula"
    function obtenerFecha() {
        const fecha = new Date();
        const opciones = { weekday: "long", month: "long", day: "numeric", year: "numeric", localeMatcher: "best fit" };
        const fechaString = fecha.toLocaleDateString("es-UY", opciones);
        const primeraLetraMayuscula = fechaString.charAt(0).toUpperCase();
        const diaDeLaSemana = primeraLetraMayuscula + fechaString.slice(1);
        return diaDeLaSemana;
    }

    // Devuelve un objeto con la función para actualizar el widget con el clima actual de la ubicación del usuario
    return {
        actualizarWidget: function() {
            obtenerUbicacion()
                .then(ciudad => {
                    const unidad = "metric";

            obtenerClima(ciudad, unidad)
                .then(data => {
                    const temperatura = Math.floor(data.main.temp);
                    const sensacionTermica = Math.floor(data.main.feels_like);
                    const humedad = Math.floor(data.main.humidity);
                    const viento = Math.floor(data.wind.speed);
                    const main = data.weather[0].main;

                    const climaWidget = document.getElementById("clima");

                let icono;
                let descripcion_esp;

        switch (main) {
            case "Clear":
                icono = "fa-solid fa-sun";
                descripcion_esp = "Cielo despejado";
                break;
            case "Clouds":
                icono = "fa-solid fa-cloud-bolt";
                descripcion_esp = "Nublado";
                break;
            case "Drizzle":
                icono = "fa-solid fa-cloud-rain";
                descripcion_esp = "Llovizna";
                break;
            case "Rain":
                icono = "fa-solid fa-cloud-showers-heavy";
                descripcion_esp = "Lluvia";
                break;
            case "Thunderstorm":
                icono = "fa-solid fa-bolt";
                descripcion_esp = "Tormenta eléctrica";
                break;
            case "Snow":
                icono = "fa-solid fa-snowflake";
                descripcion_esp = "Nieve";
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
                icono = "fa-solid fa-smog";
                descripcion_esp = "Neblina";
                break;
            case "Sand":
            case "Ash":
                icono = "fa-solid fa-wind";
                descripcion_esp = "Tormenta de arena";
                break;
            case "Squall":
            case "Tornado":
                icono = "fa-solid fa-wind";
                descripcion_esp = "Chubasco";
                break;
            default:
                icono = "fa-solid fa-question";
                descripcion_esp = "Desconocido";
        }

        const vientoKmh = convertirVelocidad(viento); // Convierte la velocidad del viento a km/h

        climaWidget.innerHTML = `
            <div class="arriba">
                <p class="fecha">${obtenerFecha()}</p>
                <p class="ciudad">${ciudad}</p>
            </div>
            <div class="abajo">
                <div class="izquierda">
                    <p class="temperatura"><i class="${icono}"></i> ${temperatura}&#8451;</p>
                    <p class="descripcion">${descripcion_esp}</p>
                </div>
                <div class="derecha">
                    <p class="info">Sensación térmica: ${sensacionTermica}&#8451;</p>
                    <p class="info">Humedad: ${humedad} %</p>
                <p class="info">Velocidad del viento: ${vientoKmh} km/h</p>
                </div>
            </div>`;

})
.catch(error => console.error(error));
})
.catch(error => console.error(error));
}
};
})();

// Ejemplo de uso:
climaWidget.actualizarWidget();