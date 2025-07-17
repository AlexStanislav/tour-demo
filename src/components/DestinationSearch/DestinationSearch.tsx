import "./DestinationSearch.css";
import FloatInput from "../FloatInput/FloatInput";
import { useDestinations } from "../../store/appStore";
import { useState } from "react";
import { useDestinationSearch } from "../../store/appStore";
import type { DestinationSearchType } from "../../utils/types";
import { useNavigate } from "react-router-dom";

function DestinationSearch() {
  const navigate = useNavigate();
  const destinations = useDestinations();
  const [autocompleteDestinations, setAutocompleteDestinations] = useState<string[]>([]);

  const [destinationSearchValue, destinationSearchDispatch] =
    useDestinationSearch() as [
      DestinationSearchType,
      React.Dispatch<{ type: string; payload: DestinationSearchType }>
    ];

  function searchDestination(destination: string) {
    if (!destination) {
      setAutocompleteDestinations([]);
    } else {
      const filteredDestinations = destinations.filter((dest) =>
        dest.name.toLowerCase().includes(destination.toLowerCase())
      );
      const destinationNames = filteredDestinations.map((dest) => dest.name);
      setAutocompleteDestinations(destinationNames);
      destinationSearchDispatch({
        type: "SET_DESTINATION",
        payload: {
          ...destinationSearchValue,
          destination: destinationNames[0],
        },
      });
    }
  }

  function setCheckIn(checkIn: string) {
    destinationSearchDispatch({
      type: "SET_DESTINATION",
      payload: {
        ...destinationSearchValue,
        checkIn: checkIn,
      },
    });
  }

  function setCheckOut(checkOut: string) {
    destinationSearchDispatch({
      type: "SET_DESTINATION",
      payload: {
        ...destinationSearchValue,
        checkOut: checkOut,
      },
    });
  }

  function setGuests(guests: number) {
    destinationSearchDispatch({
      type: "SET_DESTINATION",
      payload: {
        ...destinationSearchValue,
        guests: guests,
      },
    });
  }

  function submitForm() {
    const destination = destinations.find((dest) => dest.name === destinationSearchValue.destination);
    if (destination) navigate(`/destination/${destination.id}`);
  }

  return (
    <form className="destination-form" onSubmit={(e) => e.preventDefault()}>
      <div className="separator">
        <span className="separator__icon icon__destination"></span>
      </div>
      <FloatInput
        inputID="destination"
        inputType="text"
        labelString="Search for a destination"
        inputAction={searchDestination}
        autocompleteValues={autocompleteDestinations}
      />
      <div className="separator">
        <span className="separator__icon icon__calendar"></span>
      </div>
      <FloatInput
        inputID="checkIn"
        inputType="date"
        labelString="Check-in"
        inputAction={setCheckIn}
      />
      <div className="separator">
        <span className="separator__icon icon__checkout"></span>
      </div>
      <FloatInput
        inputID="checkOut"
        inputType="date"
        labelString="Check-out"
        inputAction={setCheckOut}
      />
      <div className="separator">
        <span className="separator__icon icon__guests"></span>
      </div>
      <FloatInput
        inputID="guests"
        inputType="number"
        labelString="Number of guests"
        inputAction={setGuests}
      />
      <button className="button" type="submit" onClick={submitForm}><i className="icon__search"></i></button>
    </form>
  );
}

export default DestinationSearch;
