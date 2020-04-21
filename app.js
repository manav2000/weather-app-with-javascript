window.addEventListener("load", () => {
    let long;
    let lat;
    let icons = {
        //day time
        '01d': 'clear',
        '02d': 'partlycloudy',
        '03d': 'partlysunny',
        '04d': 'cloudy',
        '09d': 'rain',
        '10d': 'rain',
        '11d': 'tstorms',
        '13d': 'snow',
        '50d': 'hazy',
        //night time
        '01n': 'clear',
        '02n': 'partlycloudy',
        '03n': 'partlysunny',
        '04n': 'cloudy',
        '09n': 'rain',
        '10n': 'rain',
        '11n': 'tstorms',
        '13n': 'snow',
        '50n': 'hazy',
    }
    const key = 'c4c1cfe6622f45212045ff30a0885459';

    //Get coordinates of your location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            // fetch data from api in json format
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    var iconId = data.weather[0].icon;
                    var weatherStatus = data.weather[0].main;
                    var temperature = data.main.temp;
                    var kelvin = 273;
                    console.log(data);
                    if (iconId.charAt(iconId.length - 1) === "d") {
                        document.querySelector('.icon').innerHTML = `<i class="wu wu-white wu-256 wu-${icons[iconId]}"></i>`
                    } else if (iconId.charAt(iconId.length - 1) === "n") {
                        document.querySelector('#body').style.background = "linear-gradient(#0f2027, #203a43, #2c5364 )";
                        document.querySelector('.icon').innerHTML = `<i class="wu wu-white wu-256 wu-${icons[iconId]} wu-night"></i>`
                    }
                    document.querySelector('.loc').textContent = data.name + " (" + data.sys.country + ")";
                    document.querySelector('.weather').textContent = weatherStatus;
                    //Convert given temperature data from kelvin to celcius
                    document.querySelector('.figure').textContent = Math.floor(temperature - kelvin);
                    //Print current time
                    var myVar = setInterval(myTimer, 1000);

                    function myTimer() {
                        var d = new Date();
                        document.querySelector('.time').innerHTML = d.toLocaleTimeString();
                    }
                })
        });
    }
});

//82005d27a116c2880c8f0fcb866998a0