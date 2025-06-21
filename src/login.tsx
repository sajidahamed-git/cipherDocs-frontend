import { useState } from "react";
// import "./App.css";

function Login() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className=" text-amber-300">Login page</h1>
      <div className="text-amber-300">Cipher</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Login;
