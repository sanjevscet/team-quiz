import { Quiz } from "./Quiz";
interface IProps {
  selectedValue: unknown;
}

export function Master(props: IProps) {
  const selectedValue = props.selectedValue as string;
  const endpoint = selectedValue.split("#")[1];
  if (endpoint === "getQuizQuestions") {
    return <Quiz />;
  } else {
    return <>Create todo</>;
  }
}
