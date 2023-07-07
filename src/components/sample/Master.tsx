import { Quiz } from "./Quiz";
interface IProps {
  selectedValue: unknown;
}

export function Master(props: IProps) {
  if (props.selectedValue === "getQuizQuestions") {
    return <Quiz />;
  } else {
    return <>Create todo</>;
  }
}
