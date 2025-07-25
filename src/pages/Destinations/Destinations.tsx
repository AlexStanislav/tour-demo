import "./Destinations.css";
import { useEffect, useState } from "react";
import { useDestinations } from "../../store/appStore";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import CheckBox from "../../components/CheckBox/CheckBox";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import { InView } from "react-intersection-observer";
import type { FiltersType } from "../../utils/types";

function Destinations() {
  const destinations = useDestinations();
  const [displayDestinations, setDisplayDestinations] = useState(destinations);
  const [loadedIndex, setLoadedIndex] = useState(10);

  const minPrice = destinations.reduce(
    (min, destination) => Math.min(min, destination.price),
    100
  );
  const maxPrice = destinations.reduce(
    (max, destination) => Math.max(max, destination.price),
    10000
  );

  const countries = () => {
    const uniqueCountries = new Set(
      destinations.map((destination) => destination.country)
    );
    return Array.from(uniqueCountries);
  };

  const accomodation = () => {
    const uniqueAccomodations = new Set(
      destinations.map((destination) => destination.category)
    );
    return Array.from(uniqueAccomodations);
  };

  const locations = () => {
    const uniqueLocations = new Set(
      destinations.map((destination) => destination.location)
    );
    return Array.from(uniqueLocations);
  };

  const amenities = () => {
    const uniqueAmenities = new Set(
      destinations.flatMap((destination) => destination.amenities)
    );
    return Array.from(uniqueAmenities);
  };

  const [filters, setFilters] = useState<FiltersType>({
    searchQuery: "",
    rating: 0,
    price: [minPrice, maxPrice],
    country: [],
    category: [],
    location: [],
    amenities: [],
  });

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value.toLowerCase();
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: searchValue,
    }));
  }

  function handlePriceFilter(min: number, max: number) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: [min, max],
    }));
  }

  function getRating(rating: {
    name: string;
    checked: boolean;
    value: string;
  }) {
    return rating.value.split("").length;
  }

  function parseFilters(
    prevFilters: FiltersType,
    data: { name: string; checked: boolean; value: string }
  ) {
    const currentValue = prevFilters[data.name as keyof FiltersType];
    const newValue = data.checked
      ? Array.isArray(currentValue)
        ? [...currentValue, data.value]
        : [currentValue, data.value]
      : (currentValue as string[]).filter((item) => item !== data.value);
    return { ...prevFilters, [data.name]: newValue };
  }

  function handleFilter(data: {
    name: string;
    checked: boolean;
    value: string;
  }) {
    if (data.name !== "rating") {
      setFilters((prevFilters) => {
        return parseFilters(prevFilters, data);
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        rating: data.checked ? getRating(data) : 0,
      }));
    }
  }

  useEffect(() => {
    const filteredDestinations = destinations.filter((dest) => {
      const searchMatch = dest.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

      const priceMatch =
        dest.price >= filters.price[0] && dest.price <= filters.price[1];

      const ratingMatch =
        filters.rating === 0 || dest.rating === filters.rating;

      const countryMatch =
        filters.country.length === 0 || filters.country.includes(dest.country);

      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(dest.category);

      const locationMatch =
        filters.location.length === 0 ||
        filters.location.includes(dest.location);

      const amenitiesMatch =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity) => dest.amenities.includes(amenity));

      return (
        searchMatch &&
        ratingMatch &&
        priceMatch &&
        countryMatch &&
        categoryMatch &&
        locationMatch &&
        amenitiesMatch
      );
    });
    console.log(filteredDestinations);
    setDisplayDestinations(filteredDestinations);
  }, [filters, destinations]);

  function clearFilter(filterKey: keyof FiltersType) {
    if (typeof filters[filterKey] === "number") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: 0,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: [],
      }));
    }
  }

  return (
    <section className="destinations">
      <nav className="filters">
        <div className="search">
          <div className="search__icon">
            <i className="icon__search"></i>
          </div>
          <input
            className="search__input"
            type="text"
            placeholder="Search destinations..."
            onChange={handleSearch}
          />
        </div>

        <div className="price">
          <h3 className="filters__title">Price range</h3>
          <RangeSlider
            min={minPrice}
            max={maxPrice}
            inputAction={handlePriceFilter}
          />
        </div>

        <div className="rating">
          <h3 className="filters__title">Rating</h3>
          {filters.rating > 0 && <span className="clear-filter__icon" onClick={() => clearFilter("rating")}></span>}
          {[...Array(5)].map((_, index) => (
            <CheckBox
              type="radio"
              key={index}
              label={Array(index + 1)
                .fill("⭐")
                .join("")}
              name="rating"
              checked={index + 1 === filters.rating}
              inputAction={handleFilter}
            />
          ))}
        </div>

        <div className="country">
          <h3 className="filters__title">Country</h3>
          {filters.country.length > 0 && <span className="clear-filter__icon" onClick={() => clearFilter("country")}></span>}
          {countries().map((country) => (
            <CheckBox
              key={country}
              label={country}
              name="country"
              checked={filters.country.includes(country)}
              inputAction={handleFilter}
            />
          ))}
        </div>

        <div className="category">
          <h3 className="filters__title">Accommodation</h3>
          {filters.category.length > 0 && <span className="clear-filter__icon" onClick={() => clearFilter("category")}></span>}
          {accomodation().map((type) => (
            <CheckBox
              key={type}
              label={type}
              name="category"
              checked={filters.category.includes(type)}
              inputAction={handleFilter}
            />
          ))}
        </div>

        <div className="location">
          <h3 className="filters__title">Location</h3>
          {filters.location.length > 0 && <span className="clear-filter__icon" onClick={() => clearFilter("location")}></span>}
          {locations().map((location) => (
            <CheckBox
              key={location}
              label={location}
              name="location"
              checked={filters.location.includes(location)}
              inputAction={handleFilter}
            />
          ))}
        </div>

        <div className="amenities">
          <h3 className="filters__title">Amenities</h3>
          {filters.amenities.length > 0 && <span className="clear-filter__icon" onClick={() => clearFilter("amenities")}></span>}
          {amenities().map((amenity) => (
            <CheckBox
              key={amenity}
              label={amenity}
              name="amenities"
              checked={filters.amenities.includes(amenity)}
              inputAction={handleFilter}
            />
          ))}
        </div>
      </nav>
      <section className="destinations__list">
        <header className="destinations__header"></header>
        <div className="destinations__cards">
          {displayDestinations.slice(0, loadedIndex).map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        <div className="destinations__load">
          <InView
            as="div"
            onChange={(inView) => {
              if (inView) {
                setLoadedIndex((prevIndex) => prevIndex + 4);
              }
            }}
          ></InView>
        </div>
        <div className="destinations__overlay">
          {displayDestinations.length === 0 &&
            "No destinations match your search criteria."}
        </div>
      </section>
    </section>
  );
}

export default Destinations;
