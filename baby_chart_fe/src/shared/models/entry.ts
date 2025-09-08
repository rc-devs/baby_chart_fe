export interface Entry {
  id?: number;
  time: Date;
  medication: string | null;
  bath: boolean;
  comments: string;
  feeding: {
    bottle: boolean;
    breast: boolean;
    amount: number;
  } | null;
  diaper: {
    dirty: boolean;
    wet: boolean;
    color: string;
    consistency: string;
    comments: string;
  } | null;
}
