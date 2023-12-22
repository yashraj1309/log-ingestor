import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InsertForm = () => {
  const levelRef = useRef(null);
  const messageRef = useRef(null);
  const resourceIdRef = useRef(null);
  const timestampRef = useRef(null);
  const traceIdRef = useRef(null);
  const spanIdRef = useRef(null);
  const commitRef = useRef(null);
  const metadataRef = useRef(null);
  const [formData, setFormData] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp: "",
    traceId: "",
    spanId: "",
    commit: "",
    metadata: {
      parentResourceId: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const formattedValue =
      name === "timestamp" ? new Date(value).toISOString() : value;

    // If the property is nested in metadata, update it accordingly
    if (name === "metadata") {
      setFormData((prevData) => ({
        ...prevData,
        metadata: {
          parentResourceId: formattedValue,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    }
  };

  useEffect(() => {}, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );
    console.log(emptyFields);

    if (emptyFields.length > 0) {
      alert("Please fill in all required fields.");

      // Focus on the first empty field
      const firstEmptyFieldRef = emptyFields[0];
      switch (firstEmptyFieldRef) {
        case "level":
          levelRef.current.focus();
          break;
        case "message":
          messageRef.current.focus();
          break;
        case "resourceId":
          resourceIdRef.current.focus();
          break;
        case "timestamp":
          timestampRef.current.focus();
          break;
        case "traceId":
          traceIdRef.current.focus();
          break;
        case "spanId":
          spanIdRef.current.focus();
          break;
        case "commit":
          commitRef.current.focus();
          break;
        default:
          metadataRef.current.focus();
      }

      return;
    }
    fetch("http://localhost:3000/addlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        console.log("Data submitted successfully.");
        toast("Data submitted successfully.");
      } else {
        console.error("Error submitting data:", response.status);
        toast("Error");
      }
    });
    console.log(formData);
  };

  return (
    <div style={{ width: "700px", margin: "auto" }}>
      <h3 className="bg-primary text-white p-3 text-center mt-5 mb-3">
        Log Ingest Form
      </h3>
      <ToastContainer theme="dark" />
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
            ref={levelRef}
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
            ref={resourceIdRef}
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
            ref={traceIdRef}
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
            ref={spanIdRef}
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
            ref={commitRef}
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
            ref={metadataRef}
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
            ref={messageRef}
            name="message"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <Form.Label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
          >
            Timestamp
          </Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            name="timestamp"
            ref={timestampRef}
          />
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
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InsertForm;
