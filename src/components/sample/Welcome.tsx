import { useContext, useState, useEffect } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
  makeStyles,
  shorthands,
  CounterBadge,
} from "@fluentui/react-components";
import "./Welcome.css";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";
import axios from "axios";
import { Master } from "./Master";
import { tokens } from "@fluentui/react-components";
import { MySpinner } from "./MySpinner";

import {
  Live24Regular,
  LiveOff24Regular,
  // bundleIcon,
} from "@fluentui/react-icons";
import { Env } from "../../Env";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
    rowGap: "20px",
  },
});
interface ITask {
  taskName: string;
  currentTaskStatus: string;
  taskId: string;
  activeUser: number;
  id: string;
}

export function Welcome(props: {
  showFunction?: boolean;
  environment?: string;
}) {
  // const { showFunction, environment } = {
  //   showFunction: true,
  //   environment: window.location.hostname === "localhost" ? "local" : "azure",
  //   ...props,
  // };
  // const friendlyEnvironmentName =
  //   {
  //     local: "local environment",
  //     azure: "Azure environment",
  //   }[environment] || "local environment";

  const styles = useStyles();
  const [selectedValue, setSelectedValue] = useState<TabValue>("");

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
    console.log({ data });
  };
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      console.log({ userInfo });
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;

  const [loadingV2, setLoadingV2] = useState(false);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const getTasks = async () => {
    setLoadingV2(true);
    const { ApiEndpoint } = Env;

    const { data } = await axios.get(
      `${ApiEndpoint}/ee/fetchCurrentTasks`,
      //   "http://localhost:9080/ee/fetchCurrentTasks1",
      //   "http://10.131.50.90:1414/tasks",
      // "http://localhost:1414/tasks",
      //   "http://10.131.141.171:9080/fetchCurrentTasks"
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setTasks(data);
    setSelectedValue(`${data[0].id}#${data[0].taskId}`);
    setLoadingV2((l) => !l);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      className={`welcome page ${styles.root}`}
      style={{
        background: tokens.colorNeutralBackground3,
      }}
    >
      <div className="narrows page-padding">
        {/* <div className="narrow page-padding"> */}
        {/* <Image src="hello.png" /> */}
        <h1 className="center">
          Congratulations{userName ? ", " + userName : ""}!
        </h1>
        {loadingV2 && !loading && <MySpinner />}
        {tasks.length && (
          <div className="tabList">
            <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
              {tasks.map((task, index) => {
                return (
                  <Tab
                    id={task.id}
                    key={`tab-${index}`}
                    value={`${task.id}#${task.taskId}`}
                    icon={
                      task.currentTaskStatus === "Running" ? (
                        <Live24Regular />
                      ) : (
                        <LiveOff24Regular />
                      )
                    }
                  >
                    {index + 1}. {task.taskName}
                    {task.activeUser > 0 && (
                      <CounterBadge
                        appearance="filled"
                        color="brand"
                        count={task.activeUser}
                        style={{ marginLeft: 5 }}
                        overflowCount={999}
                      />
                    )}
                  </Tab>
                );
              })}
            </TabList>

            <div>
              <Master selectedValue={selectedValue} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
