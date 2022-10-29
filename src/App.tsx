import React, { useEffect } from "react";

import "./App.less";
import styles from './index.module.less'

const App = () => {
  useEffect(()=>{
    console.log('--sdsd--')
  },[])
  return (
    <div className=" flex flex-row border border-green-200">
      <header className={styles['ss']}>
        sssssdsdsdsdsd444455
      </header>
    </div>
  );
};

export default App;
