import React, { FC, useMemo } from "react";

type QuestionProps = (
  | {
      type: "radio";
      options: string[];
    }
  | { type: "input" }
  | { type: "checkbox" }
) & { label: string; name: string };

const Question: FC<QuestionProps> = ({ label, name, ...props }) => {
  const field = useMemo(() => {
    switch (props.type) {
      case "radio":
        return props.options.map((opt) => (
          <div key={opt}>
            <label>{opt}</label>
            <input type="radio" value={opt} name={name} />
          </div>
        ));

      case "checkbox":
        return <input type="checkbox" name={name} />;

      case "input":
        return <input type="text" name={name} />;
    }
  }, [props, name]);

  return (
    <div>
      <label>{label}</label>
      {field}
    </div>
  );
};

export default Question;
