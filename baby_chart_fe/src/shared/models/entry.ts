export interface Entry {
  id?: number;
  time: Date;
  medicationBool: boolean;
  medicationDetails?: {
    medication: string;
    };
  bath?: boolean;
  comments?: string;
  feeding?: boolean;
  feedingDetails?: {
    bottle: boolean;
    breast: boolean;
    amount: number;
    };
  diaper?: boolean;
  diaperDetails?: {
    dirty: boolean;
    wet: boolean;
    color?: string;
    consistency?: string;
    comments?: string;
    };
}