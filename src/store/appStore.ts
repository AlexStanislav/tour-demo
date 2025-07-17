import React from "react";
import type { DestinationType, DestinationSearchType } from "../utils/types";

export const DestinationContext = React.createContext<DestinationType[]>([]);
export const useDestinations = () => React.useContext(DestinationContext);

export const DestinationSearchInitialState: DestinationSearchType = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 0,
};

export const DestinationSearchContext = React.createContext(
  DestinationSearchInitialState
);
export const DestinationSearchDispatchContext = React.createContext<
  React.Dispatch<{ type: string; payload: DestinationSearchType }>
>(() => {});

export const useDestinationSearch = () => [
  React.useContext(DestinationSearchContext),
  React.useContext(DestinationSearchDispatchContext),
]