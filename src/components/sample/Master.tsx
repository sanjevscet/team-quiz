import { Text } from "@fluentui/react-components";
import { DoActivity } from "./DoActivity";
import { MyCountDown } from "./MyCountDown";
import { Quiz } from "./Quiz";
interface IProps {
  selectedValue: unknown;
}

export function Master(props: IProps) {
  // const targetDate = new Date("2023-07-19T23:59:59");
  const targetDates = [
    new Date("2023-07-14T23:59:59"),
    new Date("2023-07-19T13:59:59"),
    new Date("2023-07-18T23:23:23"),
    new Date("2023-07-16T17:49:53"),
    new Date("2023-07-15T08:42:32"),
  ];

  const randomIndex = Math.floor(Math.random() * targetDates.length);
  // const randomValue = targetDates[randomIndex];

  const selectedValue = props.selectedValue as string;
  const endpoint = selectedValue.split("#")[1];
  if (endpoint === "getQuizQuestions") {
    return <Quiz />;
  }
  if (endpoint === "doActivity") {
    return <DoActivity />;
  }
  if (selectedValue.split("#")[0] === "2") {
    return (
      <>
        <Text
          size={800}
          style={{ margin: 30, display: "block", marginTop: 10 }}
        >
          This event will start in -
        </Text>
        <MyCountDown targetDate={targetDates[randomIndex]} />
      </>
    );
  } else {
    return (
      <>
        <Text
          size={800}
          style={{ margin: 30, display: "block", marginTop: 10 }}
        >
          This event will start in -
        </Text>
        <MyCountDown targetDate={targetDates[randomIndex]} />
      </>
    );
  }
}
