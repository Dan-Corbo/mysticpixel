// Define un módulo de JavaScript para obtener el clima actual de una ciudad a través de OpenWeatherMap
const climaWidget = (function() {
    const API_KEY = "63da5e52930472d1a9cca33fdc8207af"; // Reemplaza "TU_CLAVE_DE_API" con tu clave de API de OpenWeatherMap

    // Define una función interna para obtener el clima actual de una ciudad a través de su nombre
    async function obtenerClima(ciudad, unidad) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=${unidad}&appid=${API_KEY}`;

        try {
            const response = await fetch(URL);
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }

    // Define una función para convertir la velocidad del viento de m/s a km/h
    function convertirVelocidad(viento) {
        return (viento * 3.6).toFixed(1); // Multiplica por 3.6 para convertir de m/s a km/h
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

    // Devuelve un objeto con la función para actualizar el widget con el clima actual de una ciudad específica
    return {
        actualizarWidget: function(ciudad) {
            const unidad = "metric";

            obtenerClima(ciudad, unidad)
                .then(data => {
                    const temperatura = Math.floor(data.main.temp);
                    const sensacionTermica = Math.floor(data.main.feels_like);
                    const humedad = Math.floor(data.main.humidity);
                    const viento = data.wind.speed;
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
                            if (main.includes("few")) {
                                icono = "fa-solid fa-cloud-sun";
                                descripcion_esp = "Algunas nubes";
                            } else if (main.includes("scattered")) {
                                icono = "fa-solid fa-cloud-sun";
                                descripcion_esp = "Nubes dispersas";
                            } else if (main.includes("overcast")) {
                                icono = "fa-solid fa-cloud";
                                descripcion_esp = "Cielo nublado";
                            } else {
                                icono = "fa-solid fa-cloud";
                                descripcion_esp = "Nublado";
                            }
                            break;
                        case "Drizzle":
                            icono = "fa-solid fa-cloud-rain";
                            descripcion_esp = "Llovizna";
                            break;
                        case "Rain":
                            if (main.includes("light")) {
                                icono = "fa-solid fa-cloud-rain";
                                descripcion_esp = "Lluvia ligera";
                            } else if (main.includes("moderate")) {
                                icono = "fa-solid fa-cloud-showers-heavy";
                                descripcion_esp = "Lluvia moderada";
                            } else if (main.includes("heavy")) {
                                icono = "fa-solid fa-cloud-showers-heavy";
                                descripcion_esp = "Lluvia intensa";
                            } else if (main.includes("very heavy")) {
                                icono = "fa-solid fa-cloud-showers-heavy";
                                descripcion_esp = "Lluvia muy intensa";
                            } else {
                                icono = "fa-solid fa-cloud-rain";
                                descripcion_esp = "Lluvia";
                            }
                            break;
                        case "Thunderstorm":
                            icono = "fa-solid fa-bolt";
                            descripcion_esp = "Tormenta eléctrica";
                            break;
                        case "Snow":
                            if (main.includes("light")) {
                                icono = "fa-solid fa-snowflake";
                                descripcion_esp = "Nieve ligera";
                            } else if (main.includes("moderate")) {
                                icono = "fa-solid fa-snowflake";
                                descripcion_esp = "Nieve moderada";
                            } else if (main.includes("heavy")) {
                                icono = "fa-solid fa-snowflake";
                                descripcion_esp = "Nieve intensa";
                            } else {
                                icono = "fa-solid fa-snowflake";
                                descripcion_esp = "Nieve";
                            }
                            break;
                        case "Mist":
                            icono = "fa-solid fa-smog";
                            descripcion_esp = "Niebla";
                            break;
                        case "Smoke":
                            icono = "fa-solid fa-smog";
                            descripcion_esp = "Humo";
                            break;
                        case "Haze":
                            icono = "fa-solid fa-smog";
                            descripcion_esp = "Neblina";
                            break;
                        case "Dust":
                            icono = "fa-solid fa-smog";
                            descripcion_esp = "Polvo en suspensión";
                            break;
                        case "Fog":
                            icono = "fa-solid fa-smog";
                            descripcion_esp = "Niebla";
                            break;
                        case "Sand":
                            icono = "fa-solid fa-wind";
                            descripcion_esp = "Tormenta de arena";
                            break;
                        case "Ash":
                            icono = "fa-solid fa-wind";
                            descripcion_esp = "Ceniza volcánica";
                            break;
                        case "Squall":
                            icono = "fa-solid fa-wind";
                            descripcion_esp = "Chubasco";
                            break;
                        case "Tornado":
                            icono = "fa-solid fa-wind";
                            descripcion_esp = "Tornado";
                            break;
                        default:
                            icono = "fa-solid fa-question";
                            descripcion_esp = "Desconocido";
                            break;
                    }

                    const vientoKmh = convertirVelocidad(viento); // Convierte la velocidad del viento a km/h

                    const pais = data.sys.country;

                    const ciudadCapitalizada = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
                    const ubicacion = `${ciudadCapitalizada}, ${pais}`; // Concatenar ciudad y país

                    climaWidget.innerHTML = `
                        <div class="arriba">
                            <p class="fecha">${obtenerFecha()}</p>
                            <p class="ciudad">${ubicacion}</p> <!-- Mostrar ubicación (ciudad y país) -->
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
        }
    };
})();

// Función para actualizar el widget al hacer clic en el botón o al presionar Enter
function actualizarWidgetPorBusqueda() {
    const ciudadInput = document.getElementById("ciudadInput");
    const ciudad = ciudadInput.value;
    climaWidget.actualizarWidget(ciudad);
}

const ciudadInput = document.getElementById("ciudadInput");
const buscarButton = document.getElementById("buscarButton");

buscarButton.addEventListener("click", actualizarWidgetPorBusqueda);

ciudadInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        actualizarWidgetPorBusqueda();
    }
});
