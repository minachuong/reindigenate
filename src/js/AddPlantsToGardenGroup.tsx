import { Link, useNavigate, useParams } from "react-router-dom";
import { createModelId, deleteGardenGroup, GardenGroup, GardenRequirement, getGardenGroup, Plant, PLANT_ID_PREFIX, storeGardenGroup } from "./GardenGroupService";
import { useEffect, useRef, useState } from "react";
import ActionableListItems, { ActionOptions, BIIconSignal } from "./ActionableListItems";

const AddPlantsToGardenGroup = () => {
  const params = useParams();
  const gardenGroupId = params.gardenGroupId;
  const [gardenGroup, setGardenGroup] = useState({} as GardenGroup);
  const [displayError, setDisplayError] = useState(false);
  const [newPlant, setNewPlant] = useState({} as Plant);

  useEffect(() => {
    if (gardenGroupId) {
      const retrievedGardenGroup = getGardenGroup(gardenGroupId);
      setGardenGroup(retrievedGardenGroup);
    } else {
      console.error(`Could not retrieve GardenGroup with Id ${gardenGroupId}`);
      setDisplayError(true);
    }
  }, []);

  const updateGardenGroup = (group: GardenGroup) => {
    // Object.assign clones the group stored in state
    //   and creates a new reference for the object 
    //   necessary for change detection
    const updatedGroup = Object.assign({}, group);
    storeGardenGroup(updatedGroup);
    setGardenGroup(updatedGroup);
  };

  const addPlantToGroup = () => {
    newPlant.id = createModelId(PLANT_ID_PREFIX);
    gardenGroup.plants.push(newPlant);
    updateGardenGroup(gardenGroup);
    clearAddPlantInput();
  };

  const addPlantInputRef = useRef(null as any);

  const clearAddPlantInput = () => {
    addPlantInputRef.current.value = '';
  };

  const onPlantChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const updatedPlant = Object.assign({}, newPlant);
    updatedPlant.name = inputElement.value;
    setNewPlant(updatedPlant as Plant);
  };

  const show = (groupProp: string) => {
    return gardenGroup[groupProp] && gardenGroup[groupProp].length > 0;
  };

  const deleteGroupReq = (req: GardenRequirement) => {
    const indexOfReq = gardenGroup.reqs.indexOf(req);
    gardenGroup.reqs.splice(indexOfReq, 1);
    updateGardenGroup(gardenGroup);
  };

  const groupReqActions: Array<ActionOptions> = [
    {
      action: deleteGroupReq,
      biIconName: 'bi-trash',
      biIconSignal: BIIconSignal.DANGER
    }
  ];

  const deletePlant = (plant: Plant) => {
    const indexOfPlant = gardenGroup.plants.indexOf(plant);
    gardenGroup.plants.splice(indexOfPlant, 1);
    updateGardenGroup(gardenGroup);
  };

  const plantActions: Array<ActionOptions> = [
    {
      action: deletePlant,
      biIconName: 'bi-trash',
      biIconSignal: BIIconSignal.DANGER
    }
  ];

  const navigate = useNavigate();
  const removeGardenGroup = () => {
    deleteGardenGroup(gardenGroup);
    navigate('/gardenIndex');
  };

  return(
    <div className="container">
      {displayError && <p>There was an error retrieving this garden group. Please refresh.</p>}
      {!displayError && gardenGroup && 
        <>
          <h3 className="text-center pt-3 fs-1">{gardenGroup.name}</h3>
          <h5 className="fs-5 fw-medium">Garden Group Requirements</h5>
          {show('reqs') ? (
            <ActionableListItems listItems={gardenGroup.reqs} actions={groupReqActions}/>
          ) : (
            <p>This garden group has no requirements.</p>
          )}
          {
            <>
              <h5 className="fs-5 fw-medium">Sunlight Offering</h5>
              <p>{gardenGroup.sunlightOffering}</p>
            </>
          }
          <h5 className="fs-5 fw-medium">Plants</h5>
          {show('plants') ? (
            <ActionableListItems listItems={gardenGroup.plants} actions={plantActions} keyProp="id" displayNameKey="name"/>
          ) : (
            <p>This garden group has no plants. Please add some below.</p>
          )}
          <div className="input-group mb-3">
            <button className="btn btn-primary" type="button" id="addPlant" onClick={addPlantToGroup}>Add</button>
            <input type="text" className="form-control" ref={addPlantInputRef} placeholder="Plant" aria-label="Add Plant" aria-describedby="addPlant" onChange={onPlantChange} />
          </div>
          <div className="btn-group" role="group" aria-label="Delete or View All">
            <button type="button" className="btn btn-outline-danger" onClick={removeGardenGroup}>Delete This Garden Group</button>
            <Link className="btn btn-outline-primary" to="/gardenIndex">View All Garden Groups</Link>
          </div>
        </>
      }
    </div>
  );
};

export default AddPlantsToGardenGroup;