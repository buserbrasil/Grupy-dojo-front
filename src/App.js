import React from "react";
import "./App.css";

import Clock from "./Components/Clock/index.js"

const App = () => <Clock 
                   totalSessions={4}  
                   codingTurnTime={4}
                   codingBreakTime={2}
                   queueLength={5}
                   />;

export default App;
