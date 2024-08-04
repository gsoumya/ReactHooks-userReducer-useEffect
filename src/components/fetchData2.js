98;
import axios from "axios";
import react, { useEffect, useReducer, useState } from "react";

const initialState = {
  isLoading: true,
  data: [],
  error: "",
};

const reducer = (state, action) => {
  // console.log(state, "State");
  let array;
  switch (action.type) {
    case "FETCH_SUCESS":
      return {
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "FETCH_Fail":
      return {
        isLoading: true,
        data: action.payload,
        error: "error while fect",
      };
    case "ADD":
      array = [...state.data];
      array.push(action.payload);
      return {
        isLoading: false,
        data: array,
        error: "",
      };
    default:
      return {
        isLoading: false,
        data: [],
        error: "",
      };
  }
};

export function FetchData2() {
  let [test, setTest] = useState(10);
  let test1 = [10, 20, 30];
  const [fetchData, dispatch] = useReducer(reducer, initialState);

  const addData = () => {
    setTest(100);
    test1.push(100);
    dispatch({
      type: "ADD",
      payload: {
        completed: false,
        id: 1,
        title: "Testttt",
        userId: 1,
      },
    });
  };

  useEffect(() => {
    console.log("use");
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        console.log(response, "Res usereducer");
        dispatch({
          type: "FETCH_SUCESS",
          payload: response.data.slice(0, 5),
        });
      })

      .catch((error) => {
        console.log(error, "Eroor");
      });
  }, []);

  return (
    <div>
      <h2>FetchData using Use Reduce</h2>
      <h3>
        {test}..........{test1}
      </h3>
      <ul>
        {fetchData.isLoading ? (
          <div>loading....</div>
        ) : (
          fetchData.data.map((d, i) => {
            return <div key={i}>{d.title}</div>;
          })
        )}
      </ul>
      <button onClick={addData}>ADD</button>
    </div>
  );
}
