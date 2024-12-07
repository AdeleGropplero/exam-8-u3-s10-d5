import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const MyForm = () => {
  const [searchPlace, setSearchPlace] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchPlace(query);

    if (query) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=4cfaf734407de24d9d0d720549cbb2c7`
      )
        .then((response) => response.json())
        .then(setResults)
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="mt-4 d-flex flex-column align-items-center form-wrapper">
      <Form.Group className="w-100" style={{ maxWidth: "400px" }}>
        <Form.Control
          className="form-control"
          style={{ textAlign: "center" }}
          type="search"
          placeholder="Search a place"
          value={searchPlace}
          onChange={handleInputChange}
        />
      </Form.Group>
      {results.length > 0 && (
        <ListGroup
          className="w-100 mt-4 list-group"
          style={{ maxWidth: "400px" }}
        >
          {results.map((result) => (
            <Link
              to={`/detail/${result.lat}/${result.lon}`}
              className="list-group-item list-item linkGroup"
              key={result.lat}
            >
              {result.name}, {result.country}
            </Link>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default MyForm;
