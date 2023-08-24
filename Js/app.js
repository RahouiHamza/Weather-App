const appId = "6e8e56ad1f1d804cebe7b3239fa2e2bd";
let xhttp = new XMLHttpRequest();
const row = document.querySelector(".row");
const form = document.querySelector("#form01");
const searchInput = document.querySelector("#search");

getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
}

form.onsubmit = (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    callApi('GET', { city })
    form.reset();
}

searchInput.keyup = function (e) {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim()
        callApi('GET', { city })
        form.reset();
    }
}

function callApi(method, parameter) {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&`
    // xhttp = new XMLHttpRequest();
    if (parameter.city)
        url += `q=${parameter.city}&units=metric`
    if (parameter.coords) {
        url += `lon=${parameter.coords.longitude}&lat=${parameter.coords.latitude}&units=metric`
    }
    xhttp.open(method, url, true);
    xhttp.send();
    console.log("sent");
}






function getPosition(position) {





    //   xhttp.open(
    //     "GET",
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=ar&appid=${appId}`,
    //     true
    //   );
    callApi('GET', { coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } })

}

xhttp.onreadystatechange = function () {
    // si la reponse est dispo avec succes
    if (this.readyState === 4 && this.status === 200) {
        // handle response

        handleResponse(JSON.parse(this.responseText));
    } 
};



function handleResponse(data) {
    createCardMarkup(data.id);
    setCardData(data.id, data);
}

function createCardMarkup(id) {
    const card = `
    <div id='w${id}' class="card">
    <p class="city"></p>
        <p class="temp"></p>
        <p class="tempMin"></p>
        <p class="tempMax"></p>
        <img class="icon" />
        <p class="description"></p>
    </div>
    `;
    row.innerHTML += card;
}
    
function setCardData(id, data) {
    const card = document.querySelector(`#w${id}`);
    card.querySelector(".city").innerHTML = `${data.name} ${data.sys.country} `;
    card.querySelector(".temp").innerHTML = `<img src="image/Temperature.png" alt="T" class="icons"> ${Math.ceil(data.main.temp)} °C`;
    card.querySelector(".tempMin").innerHTML = `<img src="image/Humidity.png" alt="H" class="icons"> ${Math.ceil(data.main.humidity)} %`;
    card.querySelector(".tempMax").innerHTML = `<img src="image/Wind.png" alt="W" class="icons"> ${data.wind.speed}  m/s`;
    const iconCode = data.weather[0].icon;

    card.querySelector(
        ".icon"
    ).src = ` https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    card.querySelector(".icon").alt = data.weather[0].description;
    card.querySelector(".description").innerHTML =
        data.weather[0].description;
    
}

