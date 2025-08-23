import { Chart } from "./chart";

export class Child {
  id!: number;
  child_name!: string;
  date_of_birth!: Date;
  user_id?: number;
  chart!: Chart;
}