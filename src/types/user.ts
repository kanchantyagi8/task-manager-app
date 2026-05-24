export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Task = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};
