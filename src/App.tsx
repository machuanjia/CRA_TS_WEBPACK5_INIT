import React, { useEffect } from "react";

import "./App.less";
import styles from './index.module.less'

const App = () => {
  useEffect(()=>{
    console.log('----')
  },[])
  return (
    <div className="App">
      <header className={styles['ss']}>
        ssss
      </header>
    </div>
  );
};

export default App;
