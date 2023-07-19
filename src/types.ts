export const SAVE_EMAIL = 'SAVE_EMAIL';

export type SaveEmail = {
  type: typeof SAVE_EMAIL;
  payload: string;
};

export type RootState = {
  user: {
    email: string,
  },
  wallet: {
    currency: number,
    total: number,
  },
};
