import { SAVE_EMAIL, SaveEmail } from '../../types';

export const saveEmail = (email: string): SaveEmail => {
  return {
    type: SAVE_EMAIL,
    payload: email,
  };
};
