

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_TITLE = "ADD_TITLE";
export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addTitle(title) {
  return {
    type: ADD_TITLE,
    title,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}


export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}
