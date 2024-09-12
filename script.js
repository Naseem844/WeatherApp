
    const apiKey = "5d62641bd29e2cf0330f394acdd698f4";
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    async function checkWeather(city) {
      if (!city || typeof city !== "string" || city.trim() === "") {
        throw new Error("Invalid city input");
      }

      try {
        const response = await fetch(
          `${apiUrl}${encodeURIComponent(city.trim())}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name || "N/A";
        document.querySelector(".temp").innerHTML =
          data.main && data.main.temp
            ? `${Math.round(data.main.temp)}°C`
            : "N/A";
        document.querySelector(".humidity").innerHTML =
          data.main && data.main.humidity ? `${data.main.humidity}%` : "N/A";
        document.querySelector(".wind").innerHTML =
          data.wind && data.wind.speed ? `${data.wind.speed} km/h` : "N/A";
      } catch (error) {
        console.error("City name is incorrect:", error);
        document.querySelector(".city").innerHTML = "Error fetching data";
        document.querySelector(".temp").innerHTML = "N/A";
        document.querySelector(".humidity").innerHTML = "N/A";
        document.querySelector(".wind").innerHTML = "N/A";
      }
    }

    searchBtn.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });