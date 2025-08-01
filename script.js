// Replace with your OpenWeatherMap API key
const apiKey = "7a66d093794a55797574b96699eae5c3";

let currentIndex = 0;
let $images;

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  $.getJSON(url, function (data) {
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const pressure = data.main.pressure;

    $("#weather-info").html(`
      <div class="basic-info">
        <h2>${city}</h2>
        <p>${temp} °C - ${desc}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon" />
        <button id="toggle-details">Show Details</button>
      </div>
      <div class="details-info" style="display:none; margin-top: 10px;">
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${wind} m/s</p>
        <p>Pressure: ${pressure} hPa</p>
        <button id="toggle-basic">Back</button>
      </div>
    `);

    // Toggle buttons
    $("#toggle-details").click(function () {
      $(".basic-info").hide();
      $(".details-info").show();
    });

    $("#toggle-basic").click(function () {
      $(".details-info").hide();
      $(".basic-info").show();
    });

  }).fail(function () {
    $("#weather-info").html("<p>Weather info not available</p>");
  });
}

function openLightbox(index) {
  currentIndex = index;
  const $img = $images.eq(index);
  const city = $img.data("city");

  $("#lightbox-img").attr("src", $img.attr("src"));
  fetchWeather(city);
  $("#lightbox").fadeIn();
}

$(document).ready(function () {
  $images = $(".gallery img");

  // Open modal on image click
  $images.click(function () {
    openLightbox($(this).index());
  });

  // Close modal
  $("#close").click(function () {
    $("#lightbox").fadeOut();
  });

  // Next button
  $("#next").click(function () {
    currentIndex = (currentIndex + 1) % $images.length;
    openLightbox(currentIndex);
  });

  // Prev button
  $("#prev").click(function () {
    currentIndex = (currentIndex - 1 + $images.length) % $images.length;
    openLightbox(currentIndex);
  });

  // Close modal if background clicked
  $("#lightbox").click(function (e) {
    if (e.target.id === "lightbox") $(this).fadeOut();
  });
});
