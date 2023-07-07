import {
  Label,
  makeStyles,
  Radio,
  RadioGroup,
  tokens,
  Button,
  useToastController,
  ToastTitle,
  Toast,
  useId,
  Toaster,
} from "@fluentui/react-components";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface IQuestion {
  question: string;
  options: string[];
}

const useStyles = makeStyles({
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
  },
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
});

export function Quiz() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [value, setValue] = React.useState<any[]>([]);
  const styles = useStyles();
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ value }); // Handle the form submission here
    dispatchToast(
      <Toast>
        <ToastTitle>Submitted successfully</ToastTitle>
      </Toast>,
      { intent: "success" }
    );
  };

  const getQuiz = async () => {
    const { data } = await axios.get("http://localhost:1414/quiz");
    setQuestions(data);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className={styles.field}>
      {/* <h2>Quiz</h2> */}
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <Label id={`quiz-${index}`} required>
              {question.question}
            </Label>
            <RadioGroup
              value={value[index]?.answer}
              onChange={(_, data) =>
                setValue((prevItems) => {
                  const updatedItems = [...prevItems];
                  updatedItems[index] = {
                    ...updatedItems[index],
                    answer: data.value,
                    question: question.question,
                    question_id: index + 1,
                  };
                  return updatedItems;
                })
              }
              aria-labelledby={`quiz-${index}`}
              required={true}
            >
              {/* <p>{question.question}</p> */}
              {question.options.map((option, optionIndex) => (
                <Radio value={option} label={option} />
              ))}
            </RadioGroup>
          </div>
        ))}
        {/* <button type="submit" className="submit-button">
          Submit
        </button> */}
        <Button appearance="primary" type="submit">
          Submit
        </Button>
        <Button
          appearance="outline"
          style={{ marginLeft: 10 }}
          onClick={() => {
            setValue([]);
          }}
        >
          Clear
        </Button>
      </form>
      <Toaster toasterId={toasterId} />
    </div>
  );
}
