
export type AppView = "dashboard" | "store" | "chat" | "learn" | "tracker";

export interface GlucoseReading {
  id: number;
  value: number;
  date: string;
}
