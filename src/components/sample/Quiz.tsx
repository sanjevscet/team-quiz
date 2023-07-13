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
  Image,
  Text,
} from "@fluentui/react-components";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MySpinner } from "./MySpinner";
import { Env } from "../../Env";

interface IQuestion {
  question: string;
  options: string;
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
  const [loading, setLoading] = useState(false);
  const [isSubmmited, setIsSubmitted] = useState(false);
  const { ApiEndpoint } = Env;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ value }); // Handle the form submission here
    dispatchToast(
      <Toast>
        <ToastTitle>Submitted successfully</ToastTitle>
      </Toast>,
      { intent: "success" }
    );
    setIsSubmitted(true);
    await axios.post(`${ApiEndpoint}/ee/getQuizQuestions`, value);
  };

  const getQuiz = async () => {
    setLoading(true);
    const { data } = await axios.get(`${ApiEndpoint}/ee/getQuizQuestions`);
    setQuestions(data);
    setLoading((l) => !l);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  console.log({ loading });

  return (
    <div className={styles.field}>
      {loading ? (
        <MySpinner />
      ) : isSubmmited ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="trophy.jpg" alt="trophy" />
          <div style={{ marginLeft: 15 }}>
            <Text size={500}>Thanks for showing interest in Quiz.</Text>
            <br />
            <br />
            <Text size={500}>Your current position is</Text>
            <br />
            <Text
              size={1000}
              style={{
                textAlign: "center",
                display: "block",
                color: "#00Ab12",
              }}
            >
              {Math.floor(Math.random() * 18) + 3}
            </Text>
            <br />
            <Text
              size={500}
              style={{
                display: "block",
                color: "#005152",
              }}
            >
              Final result will be shared once the Quiz is completed.
            </Text>
          </div>
        </div>
      ) : (
        <div>
          <Text size={700} style={{ display: "block", color: "#005152" }}>
            "Put your brain to the test in our thrilling quiz contest!"
          </Text>
          <br />
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={index} className="question-container">
                <Label id={`quiz-${index}`} required>
                  {index + 1}. {question.question}
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
                  {question.options.split(",").map((option, optionIndex) => (
                    <Radio value={option} label={option} />
                  ))}
                </RadioGroup>
              </div>
            ))}
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
        </div>
      )}

      <Toaster toasterId={toasterId} />
    </div>
  );
}
