function connectToParticle(deviceID, accessToken) {
    console.log('Conectando a Particle ..')

    const API_URL = 'https://api.spark.io/v1/devices/'

    const dataElement = document.getElementById('data');

    var eventSource = new EventSource(API_URL + deviceID + "/events/?access_token=" + accessToken);

    eventSource.addEventListener('open', (e) => {
        console.log("Opened!"); },false)

    eventSource.addEventListener('error', (e) => {
        console.log("Errored!"); },false)

    eventSource.addEventListener('btn_push', (e) => {
        let parsedData = JSON.parse(e.data)
        console.log('Boton pulsado', parsedData)

        dataElement.innerHTML = e.data
        // POST en la base da datos de Firebase
        firebase.database().ref("sensor/btn_push").set(parsedData)


    }, false)

    return eventSource
}

// Conectarse a el API de particle, obtener Token en https://build.particle.io
connectToParticle('TuDeviceID', 'TuAccessToken');