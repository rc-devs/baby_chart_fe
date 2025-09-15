export interface Entry {
  id?: number;
  time?: Date; //not required in update of previous entries
  medication: string | null;
  bath: boolean;
  comments: string;
  feeding_attributes?: {
    bottle: boolean;
    breast: boolean;
    amount: number;
  } | null;
  diaper_attributes?: {
    dirty: boolean;
    wet: boolean;
    color: string;
    consistency: string;
    comments: string;
  } | null;
}
