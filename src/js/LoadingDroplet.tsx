import { useEffect, useState } from "react";

const LoadingDroplet = () => {
  const dropletClasses = ['bi-droplet', 'bi-droplet-half', 'bi-droplet-fill'];
  const [iconState, setIconState] = useState(dropletClasses[0]);

  useEffect(() => {
    let counter = 0;
    setInterval(() => {
      counter = counter + 1;
      const index = counter % dropletClasses.length;
      setIconState(dropletClasses[index]);
    }, 1000);
  }, []);

  return(
    <>
      <p className="position-absolute top-50 start-50 translate-middle d-flex">
      <i className={`fs-1 bi ${iconState}`}></i>
    </p>
    </>
  );
};

export default LoadingDroplet;