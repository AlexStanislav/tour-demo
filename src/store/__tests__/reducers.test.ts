import { DestinationSearchReducer } from "../reducers";
import { DestinationSearchInitialState } from "../appStore";

describe("destinationsReducer", () => {
  it("should return the initial state", () => {
    expect(
      DestinationSearchReducer(DestinationSearchInitialState, {
        type: "unknown",
        payload: DestinationSearchInitialState,
      })
    ).toEqual({
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 0,
    });
  });

  it("should handle SET_DESTINATION", () => {
    expect(
      DestinationSearchReducer(DestinationSearchInitialState, {
        type: "SET_DESTINATION",
        payload: {
          destination: "Destination 1",
          checkIn: "2023-01-01",
          checkOut: "2023-01-05",
          guests: 2,
        },
      })
    ).toEqual({
      destination: "Destination 1",
      checkIn: "2023-01-01",
      checkOut: "2023-01-05",
      guests: 2,
    });
  });
});
