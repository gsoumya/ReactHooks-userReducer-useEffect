import react, { useEffect, useState } from "react";
import axios from "axios";

export function FetchData1() {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("use");
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        console.log(response, "Res");
        setData([response.data]);
        isLoading(false);
        setError("");
      })

      .catch((error) => {
        console.log(error, "Eroor");
        setData("");
        isLoading(false);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>FetchData using useState</h1>
      <ul>
        {loading ? (
          <div>loading....</div>
        ) : (
          data.map((d) => {
            return <div key={d.id}>{d.title}</div>;
          })
        )}
      </ul>
    </div>
  );
}
