import { Button } from "@mui/material";
import { useState } from "react";
import DemandList from "../../components/Demand/DemandList";
import styles from "./DemandPage.module.css";
import { messApi } from "../../utilities/serverConfigurations";

const DemandPage = (props) => {
  const [toLoad,setToLoad] = useState(false);
  const createDemandList = () => {
    fetch(`${messApi}/demand/`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      setToLoad(!toLoad);
  };

  return (
    <>
      <center>
        <h1>Demands</h1>
        <Button variant="contained" onClick={createDemandList}>
          Create new demand list
        </Button>
      </center>
      <div className={styles["demand-list"]}>
        <DemandList toLoad={toLoad} setToLoad={setToLoad} />
      </div>
    </>
  );
};

export default DemandPage;
