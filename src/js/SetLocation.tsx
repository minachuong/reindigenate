import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SetLocation = () => {
  const navigate = useNavigate();
  const navigateToCreateGardenGroup = () => {
    navigate(`/creategardengroup`);
  };

  const defaultKumeyaayCoordinates = {
    latitude: 32.7889366,
    longitude: -117.0946879
  };

  const positionError = () => {
    localStorage.setItem('lat', defaultKumeyaayCoordinates.latitude.toString());
    localStorage.setItem('long', defaultKumeyaayCoordinates.longitude.toString());
    navigateToCreateGardenGroup();
  };

  const [retrievedCoordinates, setRetrievedCoordinates] = useState({} as Coordinates);

  const requestLocation = async (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          console.log(position)
          const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          localStorage.setItem('lat', coords.latitude.toString());
          localStorage.setItem('long', coords.longitude.toString());
          setRetrievedCoordinates(coords);
          resolve(coords);
        }, reject);
      }
    })
  };

  const setLocation = async () => {
    try {
      await requestLocation();
      navigateToCreateGardenGroup();
    } catch {
      positionError();
    }
  };

  useEffect(() => {
    setLocation();
  }, []);

  return (
    <>
      <h1>Reindigenate</h1>
      <h3>the land you occupy with native plants</h3>
      { !retrievedCoordinates.latitude && <p>Please allow us to know your location. Otherwise, we'll use a default location.</p> }
      <p>Loading...</p>
    </>
  );
};

interface GeolocationPosition {
  coords: Coordinates
}

interface Coordinates {
  latitude: number,
  longitude: number
}

export default SetLocation;