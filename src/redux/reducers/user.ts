import { SAVE_EMAIL, SaveEmail } from '../../types';

const initialState = {
  email: '',
};

const user = (state = initialState, action: SaveEmail) => {
  switch (action.type) {
    case SAVE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
