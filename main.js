//!----------------------------A simplified explanation of the task in general------------------------------------//
/* first i need to know how i can get my position after search I found this function to git the location
navigator.geolocation.getCurrentPosition(success,error);
this fun take tow parameter both of them is callBack fun 
this fun return an object (coords) contains a lot of proparety i think i need (latitude,longitude)
finally to git the weather from API i need to put  the lat and long that i have from the geolocation fun
and in the body of url API  to git the right one


 ok i think i can solve it In two ways: Either by tracking the user's location and making it a dynamic process by
 using navigator.geolocation.watchPosition;
 or I get the user's current location and when his done when he out and want use the website agin
call the function agin to git his position
 i need to store lat and long from the function to use it in the weather api to make the process dynamic  */

//!-----------------------------------------------Global var and data from API----------------------------------//
const arr=[1,2,3]
// this variable to store the value from API
let lat;
let long;


function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
        );
    });
}

// Usage
getCurrentLocation()
    .then((position) => {
        lat = position?.coords?.latitude;
        long = position?.coords?.longitude;
    })
    .catch((error) => {
        console.error("Error getting location: " + error.message);
    });







//!--------------------------------------------Start design the website-------------------------------------------//

//using Dom To Call body to Holds HTML element
const body = document.querySelector("body");

// //!------------------------------------------- create welcome screen

// this div contain all element of welcome screen
const welcomeScreenContainer = document.createElement("div");
welcomeScreenContainer.id = "w-s-c";
body.append(welcomeScreenContainer);

// create logo  and start div inside the  welcomeScreenContainer
const logoContainer = document.createElement("div");
logoContainer.id = "logo-c";

// create img element inside the logoContainer to add website logo

const logo = document.createElement("img");
logo.id = "logo";
logo.src = "./assets/images/website-logo.png";
logoContainer.append(logo);

//create section to hold information about the website

const startContainer = document.createElement("section");
startContainer.id = "start-c";
// website name
const websiteName = document.createElement("h1");
websiteName.innerText = "Weather Wise Hub";
websiteName.id = "webSiteName";

//website Description

const websiteDescription = document.createElement("h3");
websiteDescription.id = "websiteDescription";
websiteDescription.innerText = "Weather App";

//create button to start the website
const startButton = document.createElement("button");
startButton.innerText = "start";
startButton.id = "start-btn";

// append all website info to the start container(section tag)
startContainer.append(websiteName, websiteDescription, startButton);
welcomeScreenContainer.append(logoContainer, startContainer);

// //!------------------------------------------- create main screen


//!-------------current weather&location card
const createMainScreen = (weather,forrest) => {
    console.log(weather.main.temp);
    // create div to holds all main screen HTML element
    const mainScreenContainer = document.createElement("div");
    mainScreenContainer.id = "m-s-c";
    body.append(mainScreenContainer);

    //create current location and weather information section

    const currentLocationContainer = document.createElement("section");

    currentLocationContainer.id = "currentLocationSection";
    mainScreenContainer.append(currentLocationContainer);

    //weather icon
    const imgContainer = document.createElement("div");
    imgContainer.id = "img-container";
    currentLocationContainer.append(imgContainer);
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    weatherIcon.id = "weatherIcon";
    imgContainer.append(weatherIcon);

    //temperature
    const temperature = document.createElement("h1");
    temperature.innerText = `${Math.round(weather.main.temp)}${String.fromCharCode(176)}C`;
    temperature.id = "temperature";
    currentLocationContainer.append(temperature);

    //user location
    const currentLocation = document.createElement("h1");
    currentLocation.innerText = `${weather.sys.country}`;
    currentLocation.id = "currentLocation";
    currentLocationContainer.append(currentLocation);

    //user city
    const currentCity = document.createElement("h3");
    currentCity.innerText = `${weather.name}`;
    currentCity.id = "currentCity";
    currentLocationContainer.append(currentCity);

    // weather humidity and wind speed this div holds tow section  ( wind speed and Humidity)

    const humAndWindContainer = document.createElement("div");
    humAndWindContainer.id = "H-W-C";
    currentLocationContainer.append(humAndWindContainer);

    //humidity section

    const humiditySection = document.createElement("section");

    humiditySection.id = "humidity";
    humAndWindContainer.append(humiditySection);

    const humidityVal = document.createElement("h1");
    humidityVal.innerText = `${weather.main.humidity
        }%`;
    humidityVal.id = "humidityVal";
    humiditySection.append(humidityVal);

    const humidityWord = document.createElement("h3");
    humidityWord.innerText = `Humidity`;
    humidityWord.id = "humidityWord";
    humiditySection.append(humidityWord);

    // wind section

    const windSection = document.createElement("section");

    windSection.id = "wind";
    humAndWindContainer.append(windSection);

    const windVal = document.createElement("h1");
    windVal.innerText = `${Math.round(weather.wind.speed)} km/h`;
    windVal.id = "windVal";
    windSection.append(windVal);

    const windWord = document.createElement("h3");
    windWord.innerText = `wind speed`;
    windWord.id = "windWord";
    windSection.append(windWord);
//!-------------forrest weather card

const forrestContainer = document.createElement("section");

forrestContainer.id = "forrestContainer";
mainScreenContainer.append(forrestContainer);

forrest.forecast.forecastday.forEach(()=>{
    const forrestInfo = document.createElement("div");
forrestInfo.id = "forrestInfo";
forrestContainer.append(forrestInfo);

const forrestDate = document.createElement("h3");
forrestDate.innerText = `date`;
forrestDate.id = "forrestTemp";
forrestInfo.append(forrestDate);

const forrestIcon = document.createElement("img");
forrestIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
forrestIcon.id = "forrestIcon";
forrestInfo.append(forrestIcon);

const forrestTemp = document.createElement("h3");
forrestTemp.innerText = `Humidity`;
forrestTemp.id = "forrestTemp";
forrestInfo.append(forrestTemp);

})
};





//!-------------------------------EventListener functions

document.querySelector("#start-btn").addEventListener("click", async () => {

    welcomeScreenContainer.style.display = "none";

    //this fun to get weather data from Api accord the lat and long that i but it in the URL

    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=20df6ed2d3d499f39b1ec55b2f5a7406&units=metric`).then(res => res.json()).catch((err) => { console.log(err); }).catch(err => { console.log(err); })

    const forrest=await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=1612951226954bf0ada164306232012&q=${weather.name}&days=4&aqi=no&alerts=no`).then(res=>res.json()).catch((err)=>{console.log(err);}).catch(err=>{console.log(err);})
    console.log(forrest.forecast.forecastday);
    createMainScreen(weather,forrest);



    console.log(lat);
    console.log(long);

});



// const btn=document.createElement("button")
// btn.innerText="location"
// btn.id="btn"
// body.append(btn)
// document.querySelector("#btn").addEventListener("click",async()=>{
//     const   weather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1612951226954bf0ada164306232012&q=london&days=2&aqi=no&alerts=no`).then(res=>res.json()).catch((err)=>{console.log(err);}).catch(err=>{console.log(err);})
//     console.log(weather.forecast.forecastday
//         );


// })


