import {
  IAppContextVals,
  AppContext,
} from "../../components/context/app-context";
import React from "react";

const useAppContext = (): IAppContextVals => {
  const data = React.useContext(AppContext);
  return data;
};

export default useAppContext;
