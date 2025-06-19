import { IResultCard } from "./data";

import { ResultCard as Layout } from "./Layout";

export const ResultCard: React.FC<IResultCard> = (props) => {
  const layoutProps = {
    ...props,
  };

  return <Layout {...layoutProps} />;
};
