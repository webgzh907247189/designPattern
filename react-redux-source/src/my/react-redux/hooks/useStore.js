import React, { useContext } from "react";
import reactReduxContext from "../context";

function useStore(){
    return useContext(reactReduxContext).store;
}

export default useStore;