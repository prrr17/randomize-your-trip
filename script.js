//general search bar query (to Google)
document.getElementById("btn-general-search").onclick = function () {
  if (document.getElementById("search-box").value == "") {
    alert("No search?");
  } else {
    let searchBox = document.getElementById("search-box").value;

    //change input to fit Google requirements
    let searchQuery = searchBox.replace(" ", "+");
    console.log(searchQuery);

    let url = "https://www.google.com/search?q=" + searchQuery;
    window.open(url, "_blank");
  }
};

const citiesAndCodes = [
  {
    city: "Vancouver",
    code: "YVR",
  },
  {
    city: "Bogota",
    code: "BOG",
  },
  {
    city: "Munich",
    code: "MUC",
  },
  {
    city: "Berlin",
    code: "TXL",
  },
  {
    city: "Madrid",
    code: "MAD",
  },
  {
    city: "Athens",
    code: "ATH",
  },
  {
    city: "London",
    code: "LGW",
  },
  {
    city: "Florence",
    code: "FLR",
  },
  {
    city: "Lyon",
    code: "Lys",
  },
  {
    city: "Bergen",
    code: "BGO",
  },
  {
    city: "Moscow",
    code: "SVO",
  },
  {
    city: "Budapest",
    code: "BUD",
  },
  {
    city: "Nairobi",
    code: "NBO",
  },
  {
    city: "Prague",
    code: "PRG",
  },
  {
    city: "Perth",
    code: "PER",
  },
  {
    city: "Osaka",
    code: "ITM",
  },
  {
    city: "Bangkok",
    code: "BKK",
  },
];

//get only the cities
let citiesArray = [];
let lengthOfArray = citiesAndCodes.length;
let randomCity;
let apiKey = config.APIKey;

//Open HoodMapss on Click
function openHoodmaps() {
  document.getElementById("btn-hood").onclick = function () {
    if (document.getElementById("congrats").value == "") {
      alert("Where is your trip starting? Choose a departure city");
    } else {
      let url =
        "https://hoodmaps.com/" +
        randomCity.toLowerCase() +
        "-neighborhood-map";
      window.open(url, "_blank");
    }
  };
}

//Open Numbeo on Click
function openNumbeo() {
  document.getElementById("btn-numbeo").onclick = function () {
    if (document.getElementById("congrats").value == "") {
      alert("Where is your trip starting? Choose a departure city");
    } else {
      let url = "https://www.numbeo.com/cost-of-living/in/" + randomCity;
      window.open(url, "_blank");
    }
  };
}

//Clear input after result is shown
function clearInput() {
  let toEmpty = document.getElementById("inputCity");
  if (toEmpty.value != "") {
    toEmpty.value = "";
  }
}

//Get API OpenWeather
const fetchOpenWeather = () => {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handleResult;
  httpRequest.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      randomCity +
      "&appid=" +
      apiKey +
      "&units=metric"
  );
  httpRequest.send();

  async function handleResult() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let response = httpRequest.responseText;
        let result = JSON.parse(response);
        document.getElementById("weather-box-small").innerHTML = randomCity;

        //show upon request
        // document.getElementById("weather-icon").innerHTML =
        //   '<img src = "http://openweathermap.org/img/wn/' +
        //   result.weather[0].icon +
        //   "@2x.png`>"; 

        document.getElementById("temp-box").innerHTML =
          "Currently it is " +
          result.main.temp +
          "ºC & " +
          result.weather[0].main +
          "<br /><br />Max. temperature " +
          result.main.temp_max +
          "ºC <br /><br />Min. temperature " +
          result.main.temp_min +
          "ºC";
      } else {
        alert("Whoops. There was a problem with the request.");
      }
    }
  }
};

//Function clicking "start randomizing" button
document.getElementById("btn-search").onclick = function () {
  //What happens when clicked
  function onInput() {
    //check the input box is not empty
    if (document.getElementById("inputCity").value == "") {
      alert("Where is your trip starting? Choose a departure city");
    } else {
      for (let i = 0; i < lengthOfArray; i++) {
        let cities = citiesAndCodes[i].city;
        citiesArray.push(cities);
      }

      //get a random city out of the new array
      randomCity = citiesArray[Math.floor(Math.random() * lengthOfArray)];

      //add output
      document.getElementById("congrats").innerHTML = "Yay! You are going to ";
      document.getElementById("random-city").innerHTML = randomCity;
    }
  }

  openHoodmaps();
  openNumbeo();
  onInput();
  fetchOpenWeather();

  clearInput();
};
