export const SAVE_EMAIL = 'SAVE_EMAIL';

export type SaveEmail = {
  type: typeof SAVE_EMAIL;
  payload: string;
};

export type RootState = {
  email: string;
};
