import { Link } from "react-router-dom";
import styles from "./NavigationLinks.module.css";

const NAVIGATION_LINKS = [
  {
    key: 1,
    name: "Home",
    path: "/",
  },
  {
    key: 2,
    name: "Items",
    path: "/item",
  },
  {
    key: 3,
    name: "Demands",
    path: "/demand",
  },
  {
    key: 4,
    name: "Current Stock",
    path: "/stock",
  },
];

const NavigationLinks = (props) => {
  const navLinks = NAVIGATION_LINKS.map((link) => {
    return (
      <li key={link.key}>
        <Link to={link.path} className={styles["nav-link"]}>
          {link.name}
        </Link>
      </li>
    );
  });

  return <ul className={styles["navigation-links"]}>{navLinks}</ul>;
};

export default NavigationLinks;
