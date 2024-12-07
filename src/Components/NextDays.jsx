import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const NextDays = ({ lat, lon }) => {
  const [futureDays, setFutureDays] = useState([]);
  console.log(futureDays);

  const getNextDays = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4cfaf734407de24d9d0d720549cbb2c7`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Future weather data:", data);
        setFutureDays(data.list);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getNextDays();
  }, []);

  /* estraiamo le date */
  /*   const [date, time] = futureDays[0].dt_text.split(" ");
  const [year, month, day] = date.split("-");
  const day_month = `${day}-${month}`;
  const betterTime = time.slice(0, -3);

  const filteredDays = futureDays.reduce((acc, current) => {
    if (!acc[date]) {
      acc[date] = current; // Aggiungi la prima occorrenza della data
    }
    return acc;
  }, {}); 

  console.log(filteredDays);*/

  /* Raggruppo i dati per giorno */
  const groupByDay = () => {
    return futureDays.reduce((acc, day) => {
      const date = day.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(day);
      return acc;
    }, {});
  };

  const groupedDays = groupByDay();
  console.log("Grouped days", groupedDays);

  return (
    <Container>
      {Object.keys(groupedDays).map((date) => {
        const [year, month, day] = date.split("-");
        const day_month_year = `${day}.${month}.${year}`;
        const dayOfWeek = new Date(date).getDay();
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        const dayName = daysOfWeek[dayOfWeek];

        console.log("Giorno della settimana", dayName);
        return (
          <Row key={date}>
            <Col>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>
                    {dayName} - {day_month_year}
                  </Card.Title>
                  {groupedDays[date].map((day, index) => {
                    const [datePart, time] = day.dt_txt.split(" ");
                    console.log("date part", datePart);
                    const [hour, minute] = time.split(":");
                    return (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <p className="m-0">{`${hour}:${minute}`}</p>

                        <img
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          alt="Weather icon"
                        />
                        <p className="m-0">{day.weather[0].description}</p>

                        <p className="m-0">
                          Max Temp: {Math.floor(day.main.temp_max - 273.15)} °C
                        </p>
                        <p className="m-0">
                          Min Temp: {Math.floor(day.main.temp_min - 273.15)} °C
                        </p>
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default NextDays;
