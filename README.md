Porterito-particle-firebase
===========================

A Nodejs app which connects to the Particle.io API, listen to a given event triggered by a Photon board and
saves the data to Firebase.


## Photon

Upload `photon.cpp` to your photon board, then connect a simple push switch using the D1 pin


<img src="http://i.imgur.com/w9qxyIF.png" width="400">

How the code works? when the button is pushed it's publish the value defined for the variable to the Particle API.


Define the variable

```cpp
 Particle.variable("btn_push", &btn_state, INT);
```

Set and publish the value when the button is pushed

```cpp
if(pushButtonState == LOW){

    digitalWrite(led, HIGH);

    if  (btn_state == 0) {
        btn_state = 1;
        Particle.publish("btn_push", String(btn_state));
    } else if (btn_state == 1){
        btn_state = 0;
        Particle.publish("btn_push", String(btn_state));
    }
  }
```

## Server

The `listener.js` sets an *EventSource* pointing to the Pariticle API endpoint.

```js
var eventSource = new EventSource(API_URL + deviceID + "/events/?access_token=" + accessToken);
```

Add the a listener to the `btn_push` event

```js
eventSource.addEventListener('btn_push', (e) => {
    let parsedData = JSON.parse(e.data)

    // POST en la base da datos de Firebase
    firebase.database().ref("sensor/btn_push").set(parsedData)
}, false)
```


### Install dependencies

```bash
$ npm install
```

### Setup Firebase and Particle API

Define your Particle API keys on the function

```js
connectToParticle('TuDeviceID', 'TuAccessToken');
```

Initialize your Firebase app  on `index.html`

```html
<script>
    var config = {
        apiKey: "--",
        authDomain: "--",
        databaseURL: "--",
        storageBucket: "--",
        messagingSenderId: "--"
    };
    firebase.initializeApp(config);
</script>
```


### Run

```bash
$ webpack
$ node app/server.js
```


## Extra

Show the Firebase data on an Android App in real-time

[https://github.com/juliocesar-io/porterito-android-firebase](https://github.com/juliocesar-io/porterito-android-firebase)