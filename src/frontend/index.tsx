import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text } from "@forge/react";
import { safeInvoke } from "../lib/safe-invoke";

const App = () => {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    safeInvoke("getText", { example: "my-safe-invoke-variable" }).then(setData);
  }, []);
  return (
    <>
      <Text>Hello world!</Text>
      <Text>{data ? data : "Loading..."}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
