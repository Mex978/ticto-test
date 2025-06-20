import { Transaction } from "@/types";

export interface IResultSession {}

export interface IResultSessionLayout extends IResultSession {
  items: {
    title: string;
    icon: React.ReactNode;
    value: string;
  }[];
  isLoading: boolean;
}
