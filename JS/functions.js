let lat;
let lng;


const initialize = () => {
    navigator.geolocation.getCurrentPosition(data => {
        lat = data.coords.latitude;
        lng = data.coords.longitude;
        showLocation(lat, lng);

        const key = lat.toFixed(3) + lng.toFixed(3);
        if (key in localStorage) {
            const res = localStorage.getItem(key);
            const jsonRespLocal = JSON.parse(res);
            console.log("retriving from local storage");
            countryBorder(jsonRespLocal.iso3);
            renderPermaCountryInfo(jsonRespLocal);
        } else {
            $.ajax({
                url: "./php/permaInfo.php",
                method: "POST",
                data: {
                    q: `${lat} ${lng}`
                },
                beforeSend: function() {
                    $("#country").hide();
                    $("#loadingDiv").show();
                }
            }).done(res => {
                $("#country").show();
                localStorage.setItem(key, res);
                const jsonResp = JSON.parse(res);
                console.log("stored in local Storage");
                countryBorder(jsonResp.iso3);
                renderPermaCountryInfo(jsonResp);
            }).always(() => {
                removeLoader();
            });
        }

        $.ajax({
            url: "./php/updatedInfo.php",
            method: "POST",
            data: {
                q: `${lat} ${lng}`
            },
            beforeSend: function() {
                $("#country").hide();
                $("#loadingDiv").show();
            }
        }).done(res => {
            $("#country").show();
            const jsonResp = JSON.parse(res);
            renderTimezoneCurrency(jsonResp);
            renderWeatherInfo(jsonResp);
            renderNews(jsonResp);
        }).always(() => {
            removeLoader();
        });
    });
};

const showLocation = (lat, lng) => {
    layerGroup.clearLayers();
    L.marker([lat, lng]).addTo(layerGroup);
    mymap.panTo(new L.LatLng(lat, lng));
};

const showCurrentLocation = () => { 
    navigator.geolocation.getCurrentPosition(data => {
    lat = data.coords.latitude;
    lng = data.coords.longitude;
    showLocation(lat, lng);
    });
};


// Check localStorage
// If no data found in localStorage send request to API
// Params (query to send to API, Key to check for in localStorage)
const getDataAndStore = (q, localStorageKey) => {
    if (localStorageKey in localStorage) {
        const res = localStorage.getItem(localStorageKey);
        const jsonRespLocal = JSON.parse(res);
        showLocation(jsonRespLocal.lat, jsonRespLocal.lng);
        countryBorder(jsonRespLocal.iso3);
        renderPermaCountryInfo(jsonRespLocal)
        console.log("retriving from local storage");
    } else {
        $.ajax({
            url: "./php/permaInfo.php",
            method: "POST",
            data: {
                q: q
            },
            beforeSend: function() {
                $("#loadingDiv").show();
            }
        }).done(res => {
            try {
            const jsonResp = JSON.parse(res);
            countryBorder(jsonResp.iso3);
            renderPermaCountryInfo(jsonResp);   
            showLocation(jsonResp.lat, jsonResp.lng);
            localStorage.setItem(localStorageKey, res);
            console.log("stored in local Storage");
            } catch (error) {
                $("#error-message").html("Sorry. Not Found");
                setTimeout(() => {
                    $("#error-message").html("");
                }, 3500);
                return false;
            }
        }).always(() => {
            removeLoader();
        });
        
    }
    
    $.ajax({
        url: "./php/updatedInfo.php",
        method: "POST",
        data: {
            q: q
        },
        beforeSend: function() {
            $("#loadingDiv").show();
        }
    }).done(res => {
        try {
        const jsonResp = JSON.parse(res);
        renderTimezoneCurrency(jsonResp);
        renderWeatherInfo(jsonResp);
        renderNews(jsonResp);
        } catch (error) {
            $("#error-message").html("Sorry. Not Found");
                setTimeout(() => {
                    $("#error-message").html("");
                }, 3500);
            return false;
        }
    }).always(() => {
        removeLoader();
    });
}

const renderPermaCountryInfo = jsonResp => {
    const lat = jsonResp.lat;
    const lng = jsonResp.lng;
    const continent = jsonResp.continent;
    const population = jsonResp.countryInfo.population;
    const lang = jsonResp.countryInfo.languages;
    const sqkm = jsonResp.countryInfo.areaInSqKm;
    const capital = jsonResp.countryInfo.capital;
    const category = jsonResp._category;
    const neighbours = jsonResp.neighbours;
    const currencyName = jsonResp.currency_name;
    const country = jsonResp.country;
    const formatted = jsonResp.formatted;

    const neighboursList = $(`<dl class='list-group list-group-flush'><dt class="mb-3 text-center">NEIGHBOURS:</dt>)`);

    if(neighbours) {
        neighbours.forEach(element => {
            neighboursList.append(`
                <dd class="list-group-item text-info lead ">
                    <button class="btn btn-lg btn-block text-left text-info lead ">${element.name}</button>
                </dd>`);
        });
    };

    $("#h1").html(country);
    $("#formatted").html(formatted);
    $("#neighboursList").html(neighboursList);
    $("#latitude").html(lat);
    $("#longitude").html(lng);
    $("#continent").html(continent);
    $("#population").html(population);
    $("#languages").html(lang);
    $("#sqkm").html(sqkm);
    $("#capital").html(capital);
    $("#category").html(category);
    $("#currencyName").html(currencyName);
};

const renderTimezoneCurrency = jsonResp => {
    const timezone = jsonResp.timezone.timezoneId;
    const sunrise = jsonResp.timezone.sunrise;
    const sunset = jsonResp.timezone.sunset;
    const currencyExchange = jsonResp.currency_rate;
    const time = jsonResp.timezone.time;

    $("#timezone").html(timezone);
    $("#sunrise").html(sunrise);
    $("#sunset").html(sunset);
    $("#currencyRate").html(currencyExchange);
    $("#currentTime").html(time);
};

const renderWeatherInfo = jsonResp => {
    $("#weatherCards").html("");

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    for (let index = 0; index < jsonResp.weather.daily.length; index++) {
        const date = new Date(jsonResp.weather.daily[index].dt*1000);
        const dayOFWeek = days[date.getDay()];
        const icon = jsonResp.weather.daily[index].weather[0].icon;
        const title = jsonResp.weather.daily[index].weather[0].main;
        const description = jsonResp.weather.daily[index].weather[0].description;
        const tempDay = jsonResp.weather.daily[index].temp.day;
        const tempEve = jsonResp.weather.daily[index].temp.eve;
        const tempMax = jsonResp.weather.daily[index].temp.max;
        const tempMin = jsonResp.weather.daily[index].temp.min;
        const humidity = jsonResp.weather.daily[index].humidity;
        const cloudiness = jsonResp.weather.daily[index].clouds;
        const pressure = jsonResp.weather.daily[index].pressure;
        const windSpeed = jsonResp.weather.daily[index].wind_speed;
        const rainProb = jsonResp.weather.daily[index].pop;
        
        const card = `
        <div class="col-md-6 col-lg-4 my-2">
            <div class="card">
                <div class="card-header">
                    <h4 class="text-info">${dayOFWeek}</h4>
                </div>
                <img src="http://openweathermap.org/img/wn/${icon}.png" class="card-img-top" alt="icon-weather" style="height: 100px; width: 100px;">
                <div class="card-body">
                    <h5 class="card-title text-secondary  ">${title}</h5>
                    <h6 class="card-title text-info font-weight-light text-capitalize font-italic">${description}</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item "><i class="fas fa-temperature-low text-warning font-weight-bold"></i> Max: ${tempMax} &#8451</i></li>
                        <li class="list-group-item "><i class="fas fa-temperature-low text-warning font-weight-bold"></i> Min: ${tempMin} &#8451</li>
                        <li class="list-group-item "><i class="fas fa-temperature-low text-warning font-weight-bold"></i> Day: ${tempDay} &#8451</li>
                        <li class="list-group-item "><i class="fas fa-temperature-low text-warning font-weight-bold"></i> Evening: ${tempEve} &#8451</li>
                        <li class="list-group-item ">Humidity: ${humidity}%</li>
                        <li class="list-group-item ">Cloudiness: ${cloudiness}%</li>
                        <li class="list-group-item ">Wind Speed: ${windSpeed} m/s</li>
                        <li class="list-group-item ">Pressure: ${pressure} hPa</li>
                        <li class="list-group-item ">Prob Rain: ${rainProb}%</li>
                    </ul>
                </div>
            </div>
        </div>`;

        $("#weatherCards").append(card);
    }
};

const renderNews = jsonResp => {
    $("#general-news").html("");

    if (jsonResp.news.status == "ok" && jsonResp.news.articles.length > 0) {
        jsonResp.news.articles.forEach(article => {
            const srcImg =  article.urlToImage;
            const title = article.title;
            const description = article.description;
            const url = article.url;
    
            const htmlTag = `
                <li class="media">
                    <a href="${url}" target="blank"><img src="${srcImg}" class="mr-3 mb-5 rounded d-none d-md-block" alt="Image Article" width="300px"></a>
                    <div class="media-body">
                        <a href="${url}" target="blank" class="text-decoration-none"><h5 class="text-dark mt-0 mb-3">${title}</h5></a>
                        <p>${description}</p>
                    </div>
                </li>`;
    
            $("#general-news").append(htmlTag);
        });    
    } else {
        const noNews = "<li class='display-4'>No News Found</li>";
        $("#general-news").append(noNews);
    }
    
};

const removeLoader = () => {
    $( "#loadingDiv" ).fadeOut(1000, function() {
    $( "#loadingDiv" ).hide();
    });  
}

const countryBorder = iso3 => {
    bordersLayer.clearLayers();

    const filter = {
          filter: geoJsonFeature => {
            if(geoJsonFeature.properties.ISO_A3 == iso3) {
              return true;
            } else {
              return false;
            }
          }
        }
        
    fetch("./includes/countries.geojson")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const borders = L.geoJSON(data, filter).addTo(bordersLayer);
        mymap.fitBounds(borders.getBounds());
    });
};