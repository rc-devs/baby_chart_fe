import { Diaper } from "./diaper";
import { Feeding } from "./feeding";

export class Entry{
  id!: number;
  time!: Date;
  feeding?: Feeding;
  diaper?: Diaper;
  medication?: string;
  bath?: boolean;
  comments?: string;
}