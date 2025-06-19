export interface IResultCard {
  title: string;
  value: string;
  type?: "success" | "error";
  icon?: React.ReactNode;
}

export interface IResultCardLayout extends IResultCard {}
