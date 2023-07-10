import { Text } from "@fluentui/react-components";
import { DoActivity } from "./DoActivity";
import { MyCountDown } from "./MyCountDown";
import { Quiz } from "./Quiz";
interface IProps {
  selectedValue: unknown;
}

export function Master(props: IProps) {
  const targetDate = new Date("2023-07-19T23:59:59");

  const selectedValue = props.selectedValue as string;
  const endpoint = selectedValue.split("#")[1];
  if (endpoint === "getQuizQuestions") {
    return <Quiz />;
  }
  if (endpoint === "doActivity") {
    return <DoActivity />;
  } else {
    return (
      <>
        <Text
          size={800}
          style={{ margin: 30, display: "block", marginTop: 10 }}
        >
          This event will be started soon.
        </Text>
        <MyCountDown targetDate={targetDate} />
      </>
    );
  }
}
