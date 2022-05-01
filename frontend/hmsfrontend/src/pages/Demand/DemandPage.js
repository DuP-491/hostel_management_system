import DemandList from "../../components/Demand/DemandList";
import styles from "./DemandPage.module.css";

const DemandPage = (props) => {
  return (
    <>
      <center>
        <h1>Demands</h1>
      </center>
      <div className={styles["demand-list"]}>
        <DemandList />
      </div>
    </>
  );
};

export default DemandPage;
