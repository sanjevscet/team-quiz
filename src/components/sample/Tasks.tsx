import React, { useState, useEffect } from "react";
import axios from "axios";

interface ITask {
  taskName: string;
  currentTaskStatus: string;
  id: string | null;
}

export const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getTasks = async () => {
    const { data } = await axios.get(
    //   "http://10.187.10.188:9080/ee/fetchCurrentTasks1",
      //   "http://10.131.50.90:1414/tasks",
      //   "http://localhost:1414/tasks",
        "http://10.131.141.171:9080/fetchCurrentTasks"
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return <div>{JSON.stringify(tasks, null, 4)}</div>;
};
