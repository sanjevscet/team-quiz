import { useContext, useState, useEffect } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { AzureFunctions } from "./AzureFunctions";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { Tasks } from "./Tasks";
import { TeamsFxContext } from "../Context";
import axios from "axios";
import { Master } from "./Master";
import { tokens } from "@fluentui/react-components";

interface ITask {
  taskName: string;
  currentTaskStatus: string;
  id: string;
}

export function Welcome(props: {
  showFunction?: boolean;
  environment?: string;
}) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const [selectedValue, setSelectedValue] = useState<TabValue>("");

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
    console.log({ data });
  };
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;

  const [tasks, setTasks] = useState<ITask[]>([]);
  const getTasks = async () => {
    const { data } = await axios.get(
      //   "http://localhost:9080/ee/fetchCurrentTasks1",
      //   "http://10.131.50.90:1414/tasks",
      "http://localhost:1414/tasks",
      //   "http://10.131.141.171:9080/fetchCurrentTasks"
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setTasks(data);
    setSelectedValue(data[0].id);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      className="welcome page"
      style={{
        background: tokens.colorNeutralBackground3,
      }}
    >
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">
          Congratulations{userName ? ", " + userName : ""}!
        </h1>
        <p className="center">
          Your app is running in your {friendlyEnvironmentName}
        </p>

        <div className="tabList">
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
            {tasks.map((task, index) => {
              return (
                <Tab id={task.id} key={`tab-${index}`} value={task.id}>
                  {index + 1}. {task.taskName}
                </Tab>
              );
            })}
            {/* <Tab id="Local" value="local">
              1. Build your app locally
            </Tab>
            <Tab id="Azure" value="azure">
              2. Provision and Deploy to the Cloud
            </Tab>
            <Tab id="Publish" value="publish">
              3. Publish to Teams
            </Tab>
            <Tab id="Tasks" value="tasks">
              4. Tasks
            </Tab> */}
          </TabList>

          <div>
            <Master selectedValue={selectedValue} />
          </div>

          {/* <div>
            {selectedValue === "azure" && (
              <div>
                <Deploy />
              </div>
            )}
            {selectedValue === "publish" && (
              <div>
                <Publish />
              </div>
            )}
            {selectedValue === "tasks" && (
              <div>
                <Tasks />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
