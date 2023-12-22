import "./App.css";
import Header from "./components/Header";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import InsertForm from "./components/InsertForm";

import FilterTimeStamp from './components/timeStampFilter';

import FilterForm from "./components/filterForm";

function App() {

  const [showInsertform, setShowInsertForm] = useState(false);

  const [showFilterTimeStampForm, setShowFilterTimeStampForm] = useState(false);

  const [showFilterForm, setShowFilterForm] = useState(false);

  const insertFormHandler = () => {
    setShowInsertForm((prev) => !showInsertform);
    if(!showFilterForm) {
    setShowFilterForm(false);
    setShowFilterTimeStampForm(false);
    }
  };
  const filterFormHandler = () => {
    setShowFilterForm((prev)=>!showFilterForm)
    if(!showFilterForm) {
      setShowInsertForm(false);
      setShowFilterTimeStampForm(false);
    }
  };
  const timeStampFilterFormHandler = () => {
    setShowFilterTimeStampForm((prev) => !showFilterTimeStampForm)
    if(!showFilterTimeStampForm) {
      setShowFilterForm(false);
      setShowInsertForm(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <Container fluid className="d-flex justify-content-center mt-3 mb-3">
        <Button className="mx-1" variant="primary" onClick={insertFormHandler}> 
         {showInsertform?"Hide Insert Form":"Insert Log"} 
        </Button>
        <Button className="mx-1" variant="primary" onClick={filterFormHandler}>
          {showFilterForm?"Hide Search Logs Form":"Search Logs"}
        </Button>
        <Button className="mx-1" variant="primary" onClick={timeStampFilterFormHandler}> 
         {showFilterTimeStampForm?"Hide TimeStamp Form":"Filter Logs Using TimeStamp"} 
        </Button>
      </Container>

      {showInsertform && <InsertForm/>}
      {showFilterForm && <FilterForm/> }
      {showFilterTimeStampForm && <FilterTimeStamp/>}
    </div>
  );
}

export default App;
