import React, { useContext } from "react";
import reactReduxContext from "../context";

function useDispatch(){
    return useContext(reactReduxContext).store.dispatch;
}

export default useDispatch;