import { useLocation } from "react-router";

const DemandItemPage = (props) => {
  const location = useLocation();

  return (
    <>
      <center>
        <h1>Demand Item Page</h1>
      </center>
      <p>{location.state.demandId}</p>
    </>
  );
};

export default DemandItemPage;
