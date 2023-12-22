import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ErrorList from "./errorList";

const FilterTimeStamp = () => {
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");

  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async () => {

     // Convert dates to ISO string format
     const isoStartTimestamp = startTimestamp ? new Date(startTimestamp).toISOString() : "";
     const isoEndTimestamp = endTimestamp ? new Date(endTimestamp).toISOString() : "";

     setShow(!show);

     if(isoStartTimestamp==="" || isoEndTimestamp==="") {
        alert("Please Enter both timestamps");
        return;
     }
     const searchUrl = `http://localhost:3000/search/timestamp?startTimestamp=${encodeURIComponent(isoStartTimestamp)}&endTimestamp=${encodeURIComponent(isoEndTimestamp)}`;

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
    <div>
    <div style={{ width: "450px", margin: "auto" }}>
    
      <div className="mb-3">
        <Form.Label
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            marginRight: "1rem",
          }}
        >
          Start Timestamp
        </Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setStartTimestamp(e.target.value)}
          name="timestamp"
        />
      </div>

      <div className="mb-3">
        <Form.Label
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            marginRight: "1rem",
          }}
        >
          End Timestamp
        </Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setEndTimestamp(e.target.value)}
          name="timestamp"
        />
      </div>
      <Button
            variant="primary"
            type="submit"
            className="mt-3"
            onClick={handleSearch}
          >
            {show?"Close":"Search"}
          </Button>
    </div>
    {show && 
    <div style={{ width: "450px", margin: "auto" }}>
        <ErrorList errorData={searchData}/>
        </div>
}
    </div>
  );
};

export default FilterTimeStamp;
