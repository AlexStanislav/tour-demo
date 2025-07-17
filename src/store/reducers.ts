import type { DestinationSearchType } from "../utils/types";

export const DestinationSearchReducer = (
  state: DestinationSearchType,
  action: { type: string; payload: DestinationSearchType }
) => {
  switch (action.type) {
    case "SET_DESTINATION":
      return action.payload;
    default:
      return state;
  }
};
