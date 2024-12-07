import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

const WeatherCards = () => {
  const cities = [
    { name: "Roma" },
    { name: "New York" },
    { name: "Vienna" },
    { name: "Bruxelles" },
    { name: "Tokyo" },
    { name: "Sydney" },
    { name: "Città del Messico" },
    { name: "Mosca" },
    { name: "Mumbai" },
    { name: "Cape Town" }
  ];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  const [weatherData, setWeatherData] = useState({});
  const [coordinates, setCoordinates] = useState({});

  const degrees = (kelvin) => {
    return Math.floor(kelvin - 273.15);
  };

  const getCoordinates = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${randomCity.name}&appid=4cfaf734407de24d9d0d720549cbb2c7`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) =>
        setCoordinates({
          name: data[0].name,
          country: data[0].country,
          state: data[0].state,
          lat: data[0].lat,
          lon: data[0].lon
        })
      )
      .catch((error) => console.error("Error fetching coordinates:", error));
  };

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=4cfaf734407de24d9d0d720549cbb2c7`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData({
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          humidity: data.main.humidity,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min
        });
      })
      .catch((error) => console.error("Error fetching weather:", error));
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeather();
    }
  }, [coordinates]);

  return (
    <Container className="w-50 py-4">
      <Card className="custom-card m-3 ">
        <Card.Body className="custom-card-body">
          <Card.Title className="text-center fw-bold text-white mb-3">
            {coordinates.name}
          </Card.Title>
          <Card.Text className="text-center text-white">
            <strong> Now: </strong>
            {degrees(weatherData.temp)} °C
          </Card.Text>
          <Card.Text className="text-center text-white">
            <p>{weatherData.description}</p>
            <strong>Max: </strong>
            {degrees(weatherData.temp_max)} °C - <strong>Min: </strong>
            {degrees(weatherData.temp_min)} °C
          </Card.Text>
          <div className="text-center">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default WeatherCards;
