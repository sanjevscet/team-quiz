import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";
import * as React from "react";

const useStyles = makeStyles({
  container: {
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
