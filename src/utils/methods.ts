/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export function useOutsideComponentEvent(ref: any, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const elementNode = event.target as Node;
      if (ref.current && !ref.current.contains(elementNode)) {
        callback();
        return;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export function getTrendingDestinations(
  trendingCountryCodes: string[],
  destinations: any[]
) {
  const trendingDestinations = trendingCountryCodes.reduce((acc, code) => {
    const destination = destinations.find((dest) => dest.country_code === code);
    if (destination) {
      acc.push(destination);
    }
    return acc;
  }, [] as typeof destinations);

  return trendingDestinations;
}

export function getLocations(destinations: any[], locationsAmount: number) {
  const destinationLocations: Record<string, typeof destinations> = {};
  destinations.forEach((destination) => {
    const { location } = destination;
    if (!destinationLocations[location]) destinationLocations[location] = [];
    destinationLocations[location].push(destination);
  });

  const locationCategories = Object.keys(destinationLocations).slice(
    0,
    locationsAmount
  );
  const locationData: Record<string, typeof destinations> = {};

  locationCategories.forEach((category) => {
    locationData[category] = destinationLocations[category].slice(
      0,
      locationsAmount
    );
  });

  return { locationCategories, locationData };
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}