import { useEffect } from "react";

import { Button } from "antd";
import "./App.less";

import styles from "./index.module.less";

const App = () => {
  useEffect(() => {
    console.log("--sdsd--");
  }, []);
  return (
    <div className=" flex flex-row border border-green-200">
      <header className={styles["ss"]}>sssssdsdsdsdsd444455</header>
      s<Button type="primary">sds</Button>s
    </div>
  );
};

export default App;
