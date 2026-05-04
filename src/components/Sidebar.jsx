import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <footer className={styles.footer}>
        <p>&copy; copywrite {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
};

export default Sidebar;
