// Define una función interna para obtener la fecha actual en formato "Día de Mes de Año y pone la primera letra del día de la semana en mayúscula"
function obtenerFecha() {
    const fecha = new Date();
    const opciones = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        localeMatcher: "best fit",
    };
    const fechaString = fecha.toLocaleDateString("es-UY", opciones);
    const primeraLetraMayuscula = fechaString.charAt(0).toUpperCase();
    const diaDeLaSemana = primeraLetraMayuscula + fechaString.slice(1);
    return diaDeLaSemana;
}

  // Obtener el clima actual de una ciudad
const obtenerClima = async (ciudad, unidad) => {
    const API_KEY = "63da5e52930472d1a9cca33fdc8207af"; // Reemplaza "TU_CLAVE_DE_API" con tu clave de API de OpenWeatherMap
    try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=${unidad}&appid=${API_KEY}`
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error al obtener el clima");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

  // Obtener el pronóstico de varios días para una ciudad
const obtenerPronostico = async (ciudad, unidad) => {
    const API_KEY = "63da5e52930472d1a9cca33fdc8207af"; // Reemplaza "TU_CLAVE_DE_API" con tu clave de API de OpenWeatherMap
    try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=${unidad}&appid=${API_KEY}`
    );
        if (response.ok) {
        const data = await response.json();
        return data;
        } else {
        throw new Error("Error al obtener el pronóstico");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

function obtenerIconoClima(descripcion) {
    let icono = "";
    let descripcionEsp = "";

    switch (descripcion) {
        case "Clear":
            icono = "fas fa-sun";
            descripcionEsp = "Cielo despejado";
            }
            break;
        case "Clouds":
            icono = "fas fa-cloud";
            descripcionEsp = "Nublado";

            if (descripcion.includes("few clouds")) {
                icono = "fas fa-cloud-sun";
                descripcionEsp = "Parcialmente nublado";
            } else if (descripcion.includes("scattered clouds")) {
                icono = "fas fa-cloud-sun";
                descripcionEsp = "Nubes dispersas";
            } else if (descripcion.includes("broken clouds")) {
                icono = "fas fa-cloud";
                descripcionEsp = "Nublado con nubes dispersas";
            }
            break;
        case "Rain":
            icono = "fas fa-cloud-showers-heavy";
            descripcionEsp = "Lluvia";

            if (descripcion.includes("light rain")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Lluvia ligera";
            } else if (descripcion.includes("moderate rain")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Lluvia moderada";
            } else if (descripcion.includes("heavy intensity rain")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Lluvia fuerte";
            } else if (descripcion.includes("very heavy rain")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Lluvia muy fuerte";
            } else if (descripcion.includes("extreme rain")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Lluvia extrema";
            }
            break;
        case "Drizzle":
            icono = "fas fa-cloud-rain";
            descripcionEsp = "Llovizna";

            if (descripcion.includes("light intensity drizzle")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Llovizna ligera";
            } else if (descripcion.includes("drizzle")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Llovizna";
            } else if (descripcion.includes("heavy intensity drizzle")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Llovizna intensa";
            } else if (descripcion.includes("light intensity drizzle rain")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Llovizna con lluvia ligera";
            } else if (descripcion.includes("drizzle rain")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Llovizna con lluvia";
            } else if (descripcion.includes("heavy intensity drizzle rain")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Llovizna intensa con lluvia";
            } else if (descripcion.includes("shower rain and drizzle")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Lluvia intensa y llovizna";
            } else if (descripcion.includes("heavy shower rain and drizzle")) {
                icono = "fas fa-cloud-showers-heavy";
                descripcionEsp = "Lluvia intensa y llovizna";
            } else if (descripcion.includes("shower drizzle")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Llovizna intensa";
            }
            break;
        case "Thunderstorm":
            icono = "fas fa-bolt";
            descripcionEsp = "Tormenta";
            break;
        case "Snow":
            icono = "fas fa-snowflake";
            descripcionEsp = "Nieve";

            if (descripcion.includes("light snow")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Nieve ligera";
            } else if (descripcion.includes("moderate snow")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Nieve moderada";
            } else if (descripcion.includes("heavy snow")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Nieve fuerte";
            } else if (descripcion.includes("sleet")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Aguanieve";
            } else if (descripcion.includes("light shower sleet")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Aguanieve ligera";
            } else if (descripcion.includes("shower sleet")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Aguanieve";
            } else if (descripcion.includes("light rain and snow")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Lluvia ligera y nieve";
            } else if (descripcion.includes("rain and snow")) {
                icono = "fas fa-cloud-rain";
                descripcionEsp = "Lluvia y nieve";
            } else if (descripcion.includes("light shower snow")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Nieve ligera";
            } else if (descripcion.includes("shower snow")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Nieve";
            } else if (descripcion.includes("heavy shower snow")) {
                icono = "fas fa-snowflake";
                descripcionEsp = "Nieve intensa";
            }
            break;
        case "Mist":
            icono = "fas fa-smog";
            descripcionEsp = "Neblina";
            break;
        case "Smoke":
            icono = "fas fa-smog";
            descripcionEsp = "Humo";
            break;
        case "Haze":
            icono = "fas fa-smog";
            descripcionEsp = "Neblina";
            break;
        case "Dust":
            icono = "fas fa-smog";
            descripcionEsp = "Polvo";
            break;
        case "Fog":
            icono = "fas fa-smog";
            descripcionEsp = "Niebla";
            break;
        case "Sand":
            icono = "fas fa-smog";
            descripcionEsp = "Arena";
            break;
        case "Ash":
            icono = "fas fa-smog";
            descripcionEsp = "Ceniza volcánica";
            break;
        case "Squall":
            icono = "fas fa-wind";
            descripcionEsp = "Chubasco";
            break;
        case "Tornado":
            icono = "fas fa-wind";
            descripcionEsp = "Tornado";
            break;
        case "Squalls":
            icono = "fas fa-wind";
            descripcionEsp = "Chubascos";
            break;
        case "Tornadoes":
            icono = "fas fa-wind";
            descripcionEsp = "Tornados";
            break;
        case "Dust whirls":
            icono = "fas fa-wind";
            descripcionEsp = "Remolinos de polvo";
            break;
        case "Sandstorm":
            icono = "fas fa-wind";
            descripcionEsp = "Tormenta de arena";
            break;
        case "Volcanic ash":
            icono = "fas fa-wind";
            descripcionEsp = "Ceniza volcánica";
            break;
        case "Squall line":
            icono = "fas fa-wind";
            descripcionEsp = "Línea de chubascos";
            break;
        case "Funnel cloud":
            icono = "fas fa-wind";
            descripcionEsp = "Nube embudo";
            break;
        case "Dust storm":
            icono = "fas fa-wind";
            descripcionEsp = "Tormenta de polvo";
            break;
        case "Freezing rain":
            icono = "fas fa-cloud-showers-heavy";
            descripcionEsp = "Lluvia congelante";
            break;
        default:
            icono = "fas fa-question";
            descripcionEsp = "Desconocido";
            break;
    }

    return { icono, descripcionEsp };
}

// Define una función para convertir la velocidad del viento de m/s a km/h
function convertirVelocidad(viento) {
    return (viento * 3.6).toFixed(1); // Multiplica por 3.6 para convertir de m/s a km/h
}

// Widget de clima
const climaWidget = (() => {
    const climaWidget = document.getElementById("clima");

    return {
        actualizarWidget: async (ciudad, unidad) => {
            try {
                const clima = await obtenerClima(ciudad, unidad);

                if (clima) {
                    const temperatura = Math.floor(clima.main.temp);
                    const descripcion = clima.weather[0].description;
                    const { icono, descripcionEsp } = obtenerIconoClima(clima.weather[0].main);

                    const sensacionTermica = Math.floor(clima.main.feels_like);
                    const humedad = clima.main.humidity;
                    const viento = clima.wind.speed;

                    const vientoKmh = convertirVelocidad(viento);

                    const pais = clima.sys.country;
                    const ciudadCapitalizada =
                        ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
                    const ubicacion = `${ciudadCapitalizada}, ${pais}`;

                    const pronostico = await obtenerPronostico(ciudad, unidad);

                    if (pronostico) {
                        const pronosticoDia1 = pronostico.list[0];
                        const pronosticoDia2 = pronostico.list[8];
                        const pronosticoDia3 = pronostico.list[16];

                        const temperaturaDia1 = Math.floor(pronosticoDia1.main.temp);
                        const descripcionDia1 = pronosticoDia1.weather[0].description;
                        const { icono: iconoDia1, descripcionEsp: descripcionEspDia1 } = obtenerIconoClima(pronosticoDia1.weather[0].main);

                        const temperaturaDia2 = Math.floor(pronosticoDia2.main.temp);
                        const descripcionDia2 = pronosticoDia2.weather[0].description;
                        const { icono: iconoDia2, descripcionEsp: descripcionEspDia2 } = obtenerIconoClima(pronosticoDia2.weather[0].main);

                        const temperaturaDia3 = Math.floor(pronosticoDia3.main.temp);
                        const descripcionDia3 = pronosticoDia3.weather[0].description;
                        const { icono: iconoDia3, descripcionEsp: descripcionEspDia3 } = obtenerIconoClima(pronosticoDia3.weather[0].main);

                        climaWidget.innerHTML = `
                            <div class="arriba">
                                <p class="fecha">${obtenerFecha()}</p>
                                <p class="ciudad">${ubicacion}</p>
                            </div>
                            <div class="abajo">
                                <div class="izquierda">
                                    <p class="temperatura"><i class="${icono}"></i> ${temperatura}&#8451;</p>
                                    <p class="descripcion">${descripcionEsp}</p>
                                </div>
                                <div class="derecha">
                                    <p class="info">Sensación térmica: ${sensacionTermica}&#8451;</p>
                                    <p class="info">Humedad: ${humedad} %</p>
                                    <p class="info">Velocidad del viento: ${vientoKmh} km/h</p>
                                </div>
                                <div class="pronostico">
                                    <div class="dia">
                                        <p class="nombre-dia">Hoy</p>
                                        <p class="temperatura"><i class="${iconoDia1}"></i> ${temperaturaDia1}&#8451;</p>
                                        <p class="descripcion">${descripcionEspDia1}</p>
                                    </div>
                                    <div class="dia">
                                        <p class="nombre-dia">Mañana</p>
                                        <p class="temperatura"><i class="${iconoDia2}"></i> ${temperaturaDia2}&#8451;</p>
                                        <p class="descripcion">${descripcionEspDia2}</p>
                                    </div>
                                    <div class="dia">
                                        <p class="nombre-dia">${obtenerNombreDia(pronosticoDia3.dt_txt)}</p>
                                        <p class="temperatura"><i class="${iconoDia3}"></i> ${temperaturaDia3}&#8451;</p>
                                        <p class="descripcion">${descripcionEspDia3}</p>
                                    </div>
                                </div>
                            </div>`;
                    } else {
                        climaWidget.innerHTML = "No se pudo obtener el pronóstico.";
                    }
                } else {
                    climaWidget.innerHTML = "No se pudo obtener el clima.";
                }
            } catch (error) {
                climaWidget.innerHTML = "Error al obtener el clima.";
            }
        },
    };
})();

  // Función para obtener el nombre del día a partir de una fecha
function obtenerNombreDia(fecha) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fechaObjeto = new Date(fecha);
    const indiceDiaSemana = fechaObjeto.getDay();
    return diasSemana[indiceDiaSemana];
}

  // Función para actualizar el widget al hacer clic en el botón o al presionar Enter
function actualizarWidgetPorBusqueda() {
    const ciudadInput = document.getElementById("ciudadInput");
    const ciudad = ciudadInput.value;
    climaWidget.actualizarWidget(ciudad, "metric");
}

    const ciudadInput = document.getElementById("ciudadInput");
    const buscarButton = document.getElementById("buscarButton");

    buscarButton.addEventListener("click", actualizarWidgetPorBusqueda);

    ciudadInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        actualizarWidgetPorBusqueda();
    }
});
