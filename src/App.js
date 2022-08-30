import './App.css';
import React, { useEffect } from 'react';
import Main from "./Components/Main/Main";
import { initializeApp } from "firebase/app";
import { activate, fetchAndActivate, fetchConfig, getRemoteConfig, getValue } from "firebase/remote-config";

const firebaseConfig = {
  //add the firebase config here
};



function App() {
  const [greet, setGreet] = React.useState("");
  
  const app = initializeApp(firebaseConfig);
  const remoteConfig = getRemoteConfig(app);
  remoteConfig.settings.minimumFetchIntervalMillis = 0;
  // setGreet(getValue("greet").asString());
  
  useEffect(() => {
      let greeting = '';
      fetchAndActivate(remoteConfig)
        .then(() => {
          greeting = getValue(remoteConfig, 'greet');
          setGreet(greeting._value);
        })
        .catch((err) => {
          console.log("Failed to fetch remote config", err);
        });
  }, []);
  
  return (
    <>
      <Main greet={ greet } />
    </>
  );
}

export default App;
