import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";
import * as React from "react";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: "50%",
    left: "40%",
    transform: "translate(-40%, -50%)",
    "> div": { ...shorthands.padding("20px") },
  },
});

export const MySpinner = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner size="huge" />
    </div>
  );
};
