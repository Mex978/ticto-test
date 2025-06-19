import React from "react";
import { IHome } from "./data";
import { Home as Layout } from "./Layout";

export const Home: React.FC<IHome> = (props) => {
  const layoutProps = {
    ...props,
  };

  return <Layout {...layoutProps} />;
};
