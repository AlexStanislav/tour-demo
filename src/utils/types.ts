export interface DestinationType {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  country: string;
  country_code: string;
  city: string;
  image: string;
  amenity_type: string[];
  location: string;
  amenities: string[];
}

export interface DestinationSearchType {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface FiltersType {
  searchQuery: string;
  rating: number;
  price: number[];
  country: string[];
  category: string[];
  location: string[];
  amenities: string[];
}

export interface CheckBoxProps {
  type?: string;
  label: string;
  name: string;
  inputAction: (value: {
    name: string;
    checked: boolean;
    value: string;
  }) => void;
}

export interface FloatInputProps {
  value?: string;
  inputID: string;
  inputType: string;
  labelString: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputAction: (value: any) => void;
  autocompleteValues?: string[];
}

export interface RangeSliderProps {
  min: number;
  max: number;
  inputAction: (min: number, max: number) => void;
}
