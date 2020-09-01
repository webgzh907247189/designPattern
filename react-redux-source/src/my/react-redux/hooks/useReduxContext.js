import React, { useContext } from "react";
import reactReduxContext from "../context";

function useReduxContext(){
    return useContext(reactReduxContext);
}

export default useReduxContext;