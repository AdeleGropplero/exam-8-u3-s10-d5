import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NextDays from "./NextDays";
/* import MyFutureWeather from "./MyFutureWeather"; */

function MyDetails() {
  const { lat, lon } = useParams();
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    const fetchPlaceWeather = () => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4cfaf734407de24d9d0d720549cbb2c7`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch dei dati:", data);
          setPlaceData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchPlaceWeather();
  }, [lat, lon]);

  const degrees = (kelvin) => {
    return Math.floor(kelvin - 273.15);
  };

  const convertUnixToDate = (dataUNIX) => {
    const date = new Date(dataUNIX * 1000);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-EN", options);
  };

  return (
    <div className="container-forecast">
      {placeData && (
        <div>
          <h4 className=" ps-4 pt-4 justify-content-center text-center">
            {convertUnixToDate(placeData.dt)}
          </h4>
          <Row className="my-5 d-flex justify-content-center">
            <Col className="col-3">
              <div>
                <h2 className=" text">
                  {placeData.name}, {placeData.sys.country}
                </h2>
                <div className="d-flex  ">
                  <h3 className="text">{degrees(placeData.main.temp)} °C</h3>
                </div>
                <div className="d-flex  mt-2">
                  <p className=" text fw-bold me-2">
                    Max: {degrees(placeData.main.temp_max)} °C{" "}
                  </p>
                  <p className=" text fw-bold ms-2">
                    Min: {degrees(placeData.main.temp_min)} °C{" "}
                  </p>
                </div>
                <h5 className=" mt-3 text">
                  {placeData.weather[0].description}
                </h5>
              </div>
            </Col>
            <Col className="col-3">
              <div className="pt-4">
                <p>Wind: {placeData.wind.speed} km/h</p>

                <p>Pressure: {placeData.main.pressure} hPa</p>

                <p>Humidity: {placeData.main.humidity} %</p>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <NextDays lat={lat} lon={lon} />
    </div>
  );
}

export default MyDetails;
