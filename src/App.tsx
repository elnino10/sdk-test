import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { SDK } from "changelog-sdk/src/sdk";

function App() {
  const [count, setCount] = useState(0);
  const [showSdk, setShowSdk] = useState(false);
  const [tenantKey, setTenantKey] = useState("");

  const hostUrl = window.location.origin;
  const widgetURL = "http://localhost:5174";

  let sdk: SDK;
  const onClose: () => void = () => {
    setShowSdk(false);
  };

  useEffect(() => {
    // get tenant key from organisation data
    setTenantKey("tenant_key");
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== widgetURL) return;

      const { type } = event.data;
      switch (type) {
        case "CLOSE":
          setShowSdk(false);
          onClose();
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    return window.removeEventListener("message", handleMessage);
  }, [tenantKey]);

  const handleShowSDK = () => {
    if (!showSdk) setShowSdk(true);
    sdk = new SDK(onClose, { tenantKey, url: hostUrl });
    sdk.init();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button id="sdk-button" onClick={handleShowSDK}>
          show SDK
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

export default App;
