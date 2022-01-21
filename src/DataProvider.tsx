import React, { FC, useCallback, useContext, useState } from "react";

type Answer = { [key: string]: string };

type DataContextProps = Answer;

type AnswerContextProps = {
  update: (values: Answer) => void;
};

const DataContext = React.createContext<DataContextProps>({});
const AnswerContext = React.createContext<AnswerContextProps>({
  update: () => console.warn("Not Implemented")
});

export const DataProvider: FC<{ defaultAnswers?: Answer }> = ({
  defaultAnswers = {},
  children
}) => {
  const [answers, setAnswers] = useState<Answer>(defaultAnswers);

  const onAnswer = useCallback((values: Answer) => {
    setAnswers((prev) => ({ ...prev, ...values }));
  }, []);

  return (
    <AnswerContext.Provider value={{ update: onAnswer }}>
      <DataContext.Provider value={answers}>{children}</DataContext.Provider>
    </AnswerContext.Provider>
  );
};

export const useAnswers = () => {
  const answers = useContext(DataContext);
  const { update } = useContext(AnswerContext);

  return { answers, update };
};
