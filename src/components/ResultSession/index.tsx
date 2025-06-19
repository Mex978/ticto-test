import { IResultSession } from "./data";

import { ResultSession as Layout } from "./Layout";

export const ResultSession: React.FC<IResultSession> = (props) => {
  const layoutProps = {
    ...props,
  };

  return <Layout {...layoutProps} />;
};
