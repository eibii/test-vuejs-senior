export interface Message {
  status: "danger" | "warn" | "info" | "success";
  title: string;
  message: string;
  percent?: number;
  duration?: number;
  autoClose?: boolean;
}

export interface Notify {
  messages: Array<Message>;
}
