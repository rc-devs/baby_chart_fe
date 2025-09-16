export interface EntryNoDiaperFeedingAttributes {
  id?: number;
  time?: Date; //not required in update of previous entries
  medication: string | null;
  bath: boolean;
  comments: string;
  feeding?: {
    bottle: boolean;
    breast: boolean;
    amount: number;
  } | null;
  diaper?: {
    dirty: boolean;
    wet: boolean;
    color: string;
    consistency: string;
    comments: string;
  } | null;
}
