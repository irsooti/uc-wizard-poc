import "./styles.css";
import mock from "./mock.json";
import QuestionSet from "./QuestionSet";
import { useState } from "react";
import times from "lodash/times";
import { DataProvider } from "./DataProvider";

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const data = mock.data[dataIndex];
  const numberOfPages = data.pages.length;
  const currentPage = data.pages[pageIndex];

  if (isComplete) {
    return (
      <section>
        <h1>Completato</h1>
        <p>si può gestire meglio</p>
      </section>
    );
  }

  return (
    <div className="App">
      <DataProvider>
        <h1>{data.title}</h1>
        <h4>{data.description}</h4>
        <hr />
        <QuestionSet
          onNext={() => {
            if (data.pages[pageIndex + 1]) {
              console.log("NEXT PAGE");
              setPageIndex((prev) => prev + 1);
            } else if (mock.data[dataIndex + 1]) {
              setDataIndex((prev) => prev + 1);
              setPageIndex(0);
              console.log("NEXT DATA");
            } else {
              console.log("COMPLETED");
              setIsComplete(true);
            }
          }}
          key={currentPage.id}
          questionSet={currentPage}
        />
        <ul>
          {times(numberOfPages).map((pageNumber) => (
            <li key={pageNumber}>
              {pageNumber === pageIndex ? (
                pageNumber
              ) : (
                <button
                  onClick={() => setPageIndex((prev) => prev - 1)}
                  disabled={pageIndex < pageNumber}
                >
                  {pageNumber}
                </button>
              )}
            </li>
          ))}
        </ul>
      </DataProvider>
    </div>
  );
}
