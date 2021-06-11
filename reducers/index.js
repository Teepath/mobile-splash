import { RECEIVE_DECKS, ADD_TITLE, ADD_CARD, ADD_DECK } from "../actions/index";

function deck(state = {}, action) {
  switch (action.type) {
      case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
      case ADD_TITLE:
          return {
              ...state,
              [action.title]: {
                title: action.title,
                questions: []
            }
          };
    case ADD_DECK:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
      },
      };
    case ADD_CARD:
      
      state[action.title] = {
        ...state[action.title],
        questions:[...state[action.title].questions, action.card]
    }
          return {
            ...state,
    };
    default:
      return state;
  }
}

export default deck;