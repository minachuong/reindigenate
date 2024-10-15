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
      <h1 className="text-center pt-3">Reindigenate</h1>
      <h3 className="text-center px-3 fs-5">the land you occupy with native plants</h3>
      {!retrievedCoordinates.latitude &&
        <p className="text-center px-3 pb-3"><small>Please allow us to know your location. Otherwise, we'll use a default location.</small></p>
      }
      <div className="container position-relative">
        <p className="position-absolute top-50 start-50 translate-middle">Loading location...</p>
      </div>
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