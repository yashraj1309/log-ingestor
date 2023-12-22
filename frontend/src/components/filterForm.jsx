import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorList from "./errorList";

const FilterForm = () => {

    const [searchData, setSearchData] = useState([]);

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        level: "",
        message: "",
        resourceId: "",
        timestamp: "",
        traceId: "",
        spanId: "",
        commit: "",
        metadata: ""
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        const formattedValue =
          name === "timestamp" ? new Date(value).toISOString() : value;
          setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
          }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setShow(!show);
      
        // Construct the URL based on user input
        let searchUrl = `http://localhost:3000/search?`;
        for (const [key, value] of Object.entries(formData)) {
          if (value) {
            searchUrl += `${key}=${encodeURIComponent(value)}&`;
          }
        }
      
        // Remove the trailing ampersand (&)
        searchUrl = searchUrl.slice(0, -1);
        try {
            const response = await fetch(searchUrl);
            const status = response.status;
            const contentType = response.headers.get('Content-Type');
     
            if (status !== 200) {
              console.error('Error fetching data:', status);
              return;
            }
     
            const data = await response.json();
            setSearchData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };

  return (
    <div style={{ width: "700px", margin: "auto" }}>
      <h3 className="bg-primary text-white p-3 text-center mt-5 mb-3">
        Filter Form
      </h3>
      <Form onSubmit={handleSubmit} className="form-grid">
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Level
          </Form.Label>
          <Form.Control
            type="text"
            name="level"
            placeholder="Level"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Resource ID
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Resource ID"
            name="resourceId"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Trace ID
          </Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Trace ID"
            name="traceId"
          />
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Span ID
          </Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Span ID"
            name="spanId"
          />
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Commit
          </Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Commit"
            name="commit"
          />
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Parent Resource ID
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Parent Resource ID"
            name="metadata"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Message
          </Form.Label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Message"
            name="message"
            onChange={handleChange}
          ></textarea>
        </div>
        <div
          style={{
            justifySelf: "center",
            alignSelf: "center",
            gridColumn: "span 2",
          }}
        >
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            style={{ width: "150%", marginLeft: "-1rem" }}
          >
            {show?"Close Data":"Search"}
          </Button>
        </div>
      </Form>
      {show && 
    <div style={{ width: "450px", margin: "auto" }}>
        <ErrorList errorData={searchData}/>
        </div>
}
    </div>
  );
};

export default FilterForm;
