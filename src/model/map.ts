export interface Coord {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface Position {
  adminArea: string;
  country: string;
  countryCode: string;
  feature: string;
  formattedAddress: string;
  locality: string;
  position: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  streetName: string;
  streetNumber: string;
  subAdminArea: string;
  subLocality: string;
}
