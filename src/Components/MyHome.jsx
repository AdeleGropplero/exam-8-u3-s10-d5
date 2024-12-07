import { Container } from "react-bootstrap";
import WeatherCards from "./WeatherCards";
import MyForm from "./MyForm";

const MyHome = () => {
  return (
    <>
      <Container className="myHome d-flex flex-column justify-content-center align-items-center">
        {/* Barra di ricerca */}
        <h1 className="pt-5">Search your weather. Be Epic.</h1>
        <MyForm />
        <h2 className="pt-4">Random city around the world</h2>

        <WeatherCards />
      </Container>
    </>
  );
};
export default MyHome;
