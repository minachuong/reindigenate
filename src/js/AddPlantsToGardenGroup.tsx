import { useParams } from "react-router-dom";
import { GardenGroup, getGardenGroup, Plant, storeGardenGroup } from "./GardenGroupService";
import { useEffect, useRef, useState } from "react";

const AddPlantsToGardenGroup = () => {
  const params = useParams();
  const gardenGroupId = params.gardenGroupId;
  const [gardenGroup, setGardenGroup] = useState({} as GardenGroup);
  const [displayError, setDisplayError] = useState(false);
  const [newPlant, setNewPlant] = useState({} as Plant);

  useEffect(() => {
    if (gardenGroupId) {
      const retrievedGardenGroup = getGardenGroup(gardenGroupId);
      console.log('retrievedGardenGroup', retrievedGardenGroup)

      setGardenGroup(retrievedGardenGroup);
    } else {
      console.error(`Could not retrieve GardenGroup with Id ${gardenGroupId}`);
      setDisplayError(true);
    }
  }, []);

  const addPlantToGroup = () => {
    const updatedGroup = Object.assign({}, gardenGroup);
    updatedGroup.plants.push(newPlant);
    storeGardenGroup(updatedGroup);
    setGardenGroup(updatedGroup);
    clearAddPlantInput();
  };

  const addPlantInputRef = useRef(null as any);

  const clearAddPlantInput = () => {
    addPlantInputRef.current.value = '';
  };

  const onPlantChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    setNewPlant({name: inputElement.value} as Plant);
  };
  
  const groupHasPlants = () => {
    return gardenGroup.plants && gardenGroup.plants.length > 0;
  };

  return(
    <>
      {displayError && <p>There was an error retrieving this garden group. Please refresh.</p>}
      {!displayError && gardenGroup && 
        <>
          <h3>{gardenGroup.name}</h3>
          {
            gardenGroup.reqs &&
            <>
              <p>Requirements:</p>
              <ul>
                {gardenGroup.reqs.map(req => <li>{req}</li>)}
              </ul>
            </>
          }
          {groupHasPlants() &&
            <>
              <h3>Plants</h3>
              <ul>
                {gardenGroup.plants.map(plant => <li>{plant.name}</li>)}
              </ul>
            </>
          }
          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary" type="button" id="addPlant" onClick={addPlantToGroup}>Add</button>
            <input type="text" className="form-control" ref={addPlantInputRef} placeholder="Add Plant" aria-label="Add Plant" aria-describedby="addPlant" onChange={onPlantChange} />
          </div>
        </>
      }
    </>
  );
};

export default AddPlantsToGardenGroup;