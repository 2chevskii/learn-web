window.addEventListener('load', function () {
  const description = document.querySelector('.description');
  const degName = document.querySelector('.degree-name');
  const degNum = document.querySelector('.degree-number');

  const owApiKey = 'null';

  let tempCurrent = 0;
  let tempMode = -1;

  function onLocationUnknown() {
    degName.textContent = '=)';
    degNum.textContent = '42';
    description.textContent = 'Geolocation is unknown';
  }

  function kelvinToCelsius(k) {
    return k - 273.15;
  }

  function kelvinToFahrenheit(k) {
    return kelvinToCelsius(k) * (9 / 5) + 32;
  }

  function convertCoordsToApiCall(lat, long) {
    const apiUrl =
      'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}';

    return apiUrl
      .replace('{lat}', lat.toFixed(2))
      .replace('{lon}', long.toFixed(2))
      .replace('{apiKey}', owApiKey);
  }

  function changeTempMode() {
    tempMode *= -1;
    renderTemp();
  }

  function renderTemp() {
    if (tempMode === 1) {
      degName.textContent = 'C';
      degNum.textContent = kelvinToCelsius(tempCurrent).toFixed(0);
    } else {
      degName.textContent = 'F';
      degNum.textContent = kelvinToFahrenheit(tempCurrent).toFixed(0);
    }

    if (kelvinToCelsius(tempCurrent) > 15) {
      document.querySelector('body').classList.remove('cold');
      document.querySelector('body').classList.add('warm');
    } else {
      document.querySelector('body').classList.remove('warm');
      document.querySelector('body').classList.add('cold');
    }
  }

  degName.addEventListener('click', () => {
    changeTempMode();
  });

  if (this.navigator.geolocation) {
    this.navigator.geolocation.getCurrentPosition(
      pos => {
        const {
          coords: { longitude, latitude }
        } = pos;

        const url = convertCoordsToApiCall(latitude, longitude);

        this.fetch(url).then(
          res => {
            res.json().then(obj => {
              const locName = obj['name'];
              const temp = obj['main']['temp'];
              const desc = obj['weather'][0]['main'];

              description.textContent = `${locName}: ${desc}`;
              tempCurrent = temp;
              renderTemp();
            });
          },
          err => console.error(err)
        );
      },
      err => {
        console.error(err);
        onLocationUnknown();
      }
    );
  } else {
    onLocationUnknown();
  }
});
