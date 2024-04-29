// * API Key: 162746512f3141ebab1234018242703
// * http://api.weatherapi.com/v1/current.json?key=162746512f3141ebab1234018242703&q=Paris
// * html  element
let container = document.querySelector(".cont")
let input = document.querySelector("#input")
// * function
async function getData(town) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=162746512f3141ebab1234018242703&q=${town}&days=3`);
    let data = await response.json();
    displayData(data)
}   
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        // Reverse geocode to get town or city
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                var town = data.address.town || data.address.city || "Unknown";
                console.log("User's town:",town );
                getData(town);
            })
            .catch(error => {
                console.error("Error fetching town:", error);
            });
    });
} else {
    console.error("Geolocation is not supported by this browser");
}

// ? 1 ============> function data ${    name    } \
// ? 2 ============> function display ${    name    } \\

function displayData(arr) {




let dateString = arr.location.localtime;
let date = new Date(dateString);
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayOfWeek = days[date.getDay()];
let day = date.getDate();
let month = date.toLocaleString('default', { month: 'short' });
let formattedDate = day + month; // This will result in "25Apr"

console.log(formattedDate); // Output: 25Apr
let day1 = days[date.getDay()];
date.setDate(date.getDate() + 1);
let day2 = days[date.getDay()];
date.setDate(date.getDate() + 1);
let day3 = days[date.getDay()];
console.log(day1,day2,day3);
        let content = `
                 <div class="col-sm-12 p-0  col-md-6 col-lg-4">
                    <div class="inner card_1   d-flex flex-column">
                        <div class="header_card p-3  d-flex justify-content-between align-items-center">
                            <h5 class="h6 m-0">${day1}</h5>
                            <h6 class="h6  m-0">${formattedDate}</h6>
                        </div>
                        <div class="cord_body p-3 d-flex flex-column justify-content-center align-items-start ">
                            <h3 class="h4">${arr.location.region}</h3>
                            <h2 class="fw-bold display-2">${arr.current.temp_c} <sup>o</sup>C</h2>
                            <div class="image">
                                <img src="${arr.current.condition.icon}" class="w-100" alt="">
                            </div>
                            <span class="fw-bold Sunny">${arr.current.condition.text}</span>
                            <div class="custom mt-3  d-flex justify-content-start gap-3 align-items-center">
                                <span class="d-flex justify-content-center align-items-center flex-column"><img
                                        src="img/images4.png" alt="">${arr.current.vis_miles}%</span>
                                <span class="d-flex justify-content-center align-items-center flex-column "><img
                                        src="img/images5.png" alt="">${arr.current.vis_km}km/h</span>
                                <span class="d-flex justify-content-center align-items-center flex-column "><img
                                        src="img/images6.png" alt="">${arr.current.wind_dir}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 p-0  col-md-6 col-lg-4">
                    <div class="inner card_2 h-100 gap-3  d-flex flex-column">
                        <div class="header_card p-3  d-flex justify-content-center align-items-center">
                            <h5 class="h6 m-0">${day2}</h5>
                        </div>
                        <div
                            class="cord_body h-100 p-3 d-flex gap-2  flex-column justify-content-start align-items-center ">
                            <div class="image">
                                <img src="${arr.forecast.forecastday[1].day.condition.icon}" class="w-100" alt="">
                            </div>
                            <h2 class="fw-bold h3">${arr.forecast.forecastday[1].day.avgtemp_c}"<sup>o</sup>C</h2>
                            <span class="fw-bold text-opacity-50 ">${arr.forecast.forecastday[1].day.mintemp_c}" <sup>o</sup></span>
                            <span class="fw-bold Sunny">${arr.forecast.forecastday[1].day.condition.text}"</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 p-0  col-md-6 col-lg-4">
                    <div class="inner card_1 h-100 gap-3  d-flex flex-column">
                        <div class="header_card p-3  d-flex justify-content-center align-items-center">
                            <h5 class="h6 m-0">${day3}</h5>
                        </div>
                        <div
                            class="cord_body h-100 p-3 d-flex gap-2  flex-column justify-content-start align-items-center ">
                            <div class="image">
                                <img src="img/images3.png" class="w-100" alt="">
                            </div>
                            <h2 class="fw-bold h3">${arr.forecast.forecastday[2].day.avgtemp_c}"<sup>o</sup>C</h2>
                            <span class="fw-bold text-opacity-50 ">${arr.forecast.forecastday[2].day.mintemp_c}" <sup>o</sup></span>
                            <span class="fw-bold Sunny">${arr.forecast.forecastday[2].day.condition.text}"</span>
                        </div>
                    </div>
                </div>`
        container.innerHTML = content;
}

input.addEventListener("input", function () {
    let town = input.value; 
    getData(town);
})
