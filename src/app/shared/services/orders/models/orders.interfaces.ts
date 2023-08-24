export interface IOrder {
  id?: number;
  code: string;
  name: string;
  description: string;
  status: string;
  createDate: string;
  notes: Notes[]
}

export interface Notes {
  noteDescription: string;
  noteDate: string;
}
