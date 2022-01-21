import React, { FC, useState } from "react";
import { useAnswers } from "./DataProvider";
import Question from "./Question";
import type { AdeguacyQuestionResponse } from "./types";

type QuestionSetProps = {
  questionSet: AdeguacyQuestionResponse["data"]["0"]["pages"]["0"];
  onNext: () => void;
};

const QuestionSet: FC<QuestionSetProps> = ({ questionSet, onNext }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const { update, answers } = useAnswers();

  const numberOfQuestions = questionSet.questions.length;
  const currentQuestion = questionSet.questions[questionIndex];

  console.log(answers);

  return (
    <div>
      <h1>Domanda {questionSet.id}</h1>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          const formData = new FormData(evt.currentTarget);

          let values = {};
          for (let [key, value] of formData.entries()) {
            // @ts-ignore
            values[key] = value as string;
          }

          update(values);

          if (questionIndex + 1 === numberOfQuestions) {
            onNext();
          } else {
            setQuestionIndex((prev) => prev + 1);
          }
        }}
      >
        <h1>{currentQuestion.info?.heading}</h1>
        <Question
          key={currentQuestion.question}
          label={currentQuestion.question}
          type={currentQuestion.type as any}
          options={currentQuestion.options}
          name={currentQuestion.field}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default QuestionSet;
