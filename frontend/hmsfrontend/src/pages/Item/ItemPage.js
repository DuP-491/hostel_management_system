import ItemTable from "./../../components/Item/ItemTable/ItemTable";

import styles from "./ItemPage.module.css";

const ItemPage = (props) => {
  return (
    <>
      <div className={styles["item-table"]}>
        <ItemTable />
      </div>
    </>
  );
};

export default ItemPage;
