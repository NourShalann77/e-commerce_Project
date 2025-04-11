import { createContext, useState } from "react";
import { data } from "react-router-dom";
 
export let CounterContext =createContext();

export default  function CounterContextProvider(props) {

const [counter ,setcounter]= useState(0)
function changeCounter() {
    setcounter(Math.random()*1000)
    
}
    return  <CounterContext.Provider value={ {counter , changeCounter} }>
        {props.children}
    
     </CounterContext.Provider>

}

