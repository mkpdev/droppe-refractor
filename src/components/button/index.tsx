import * as React from "react";
import styles from "./button.module.css";

interface props {
  children: React.ReactChild;
  onClick?: () => void;
}

export const Button: React.FC<props> = ({ children, onClick }) => (
  <button data-testid="Submit" className={styles.button} onClick={onClick}>
    {children}
  </button>
);
