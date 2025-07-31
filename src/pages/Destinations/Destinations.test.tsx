import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Destinations from "./Destinations";
import { MemoryRouter } from "react-router-dom";
import { DestinationContext } from "../../store/appStore";

const mockValues = [
  {
    id: "1",
    name: "Destination 1",
    image: "image1.jpg",
    description: "Description 1",
    price: 100,
    rating: 4,
    category: "Category 1",
    country: "Country 1",
    country_code: "US",
    city: "City 1",
    location: "Location 1",
    amenities: ["amenity1", "amenity2", "amenity3"],
    amenity_type: ["amenity_type1", "amenity_type2", "amenity_type3"],
  },
  {
    id: "2",
    name: "Destination 2",
    image: "image2.jpg",
    description: "Description 2",
    price: 200,
    rating: 5,
    category: "Category 2",
    country: "Country 2",
    country_code: "US",
    city: "City 2",
    location: "Location 2",
    amenities: ["amenity4", "amenity5", "amenity6"],
    amenity_type: ["amenity_type4", "amenity_type5", "amenity_type6"],
  },
];

const MockDestinations = () => {
  return (
    <MemoryRouter>
      <DestinationContext.Provider value={mockValues}>
        <Destinations />
      </DestinationContext.Provider>
    </MemoryRouter>
  );
};

describe("Destinations component", () => {
  it("renders a list of destinations loaded from Context", () => {
    render(<MockDestinations />);

    expect(screen.getByText("Destination 1")).toBeInTheDocument();
    expect(screen.getByText("Destination 2")).toBeInTheDocument();
  });

  it("renders a destination based on the search query", () => {
    render(<MockDestinations />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "Destination 1" } });

    expect(screen.getByText("Destination 1")).toBeInTheDocument();
    expect(screen.queryByText("Destination 2")).not.toBeInTheDocument();
  });

  it("renders a destination based on multiple filters", () => {
    render(<MockDestinations />);

    const firstCountry = screen.getByTestId("country-1");
    const ratingSelect = screen.getByTestId("4-stars");

    fireEvent.click(firstCountry);
    fireEvent.click(ratingSelect);

    expect(screen.getByText("Destination 1")).toBeInTheDocument();
    expect(screen.queryByText("Destination 2")).not.toBeInTheDocument();
  })
});
