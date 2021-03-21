import useSWR, { mutate } from "swr";
import axios from "axios";

const URL = "http://localhost:9999/api/user";
const fetcher = (key) => fetch(key).then((res) => res.json());
const swr = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  const update = async (name) => {
    const result = await axios.put(URL, { name });
    console.log("Name updated ", result.data);
  };
  return (
    <div>
      Todo Title: {data.name} <br /> Status: {data.age} <br />
      <button
        onClick={async () => {
          mutate(URL, { ...data, name: "cc" });
          await update("cc");
          mutate(URL, data);
        }}
      >
        Mutate
      </button>
    </div>
  );
};
export default swr;
