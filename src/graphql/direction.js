import gql from "graphql-tag";

export const DIRECTION = gql`
  input PlaceCoordinatesInput! {
    startLat: Float!
    startLng: Float!
    endLat: Float!
    endLng: Float
  }

  enum AllowTravelModes {
    transit
    driving
    walking
  }

  query($coordinates: PlaceCoordinatesInput!, $travelMode: AllowTravelModes!) {
    direction(
      coordinates: $coordinates,
      travelMode: $travelMode
    ) {
      steps {
        stepInstruction
      }
    }
  }
`;
