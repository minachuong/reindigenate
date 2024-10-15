import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createModelId, GARDEN_GROUP_ID_PREFIX, GardenGroup, GardenRequirement, storeGardenGroup, SunlightOffering } from "./GardenGroupService";
import SunlightOfferingDropDown from "./SunlightOfferingDropdown";

const CreateGardenGroup = () => {
  const lat = localStorage.getItem('lat');
  const long = localStorage.getItem('long');
  const [territory, setTerritory] = useState({} as NativLandTerritoryProperties);
  const [sunlightOffering, setSunlightOffering] = useState('');
  const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);
  const [createButtonEnabled, setCreateButtonEnabled] = useState(false);

  const getTerritory = async () => {
    try {
      const response = await fetch(`https://native-land.ca/api/index.php?maps=territories&position=${lat},${long}`);
      const json: Array<NativeLandTerritoryResponse> = await response.json();
      const territoryProperties = json[0].properties;
      setTerritory(territoryProperties);
      return json;
    } catch {
      console.error("Native Land Digital Error")
    }
  };

  const navigate = useNavigate();
  const navigateToAddPlants = (gardenGroupId: string) => {
    navigate(`/addplants/${gardenGroupId}`);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;
    if (nameValue.length > 0) {
      setShowNameErrorMessage(false);
      setCreateButtonEnabled(true);
    } else {
      setShowNameErrorMessage(true);
      setCreateButtonEnabled(false);
    }
  };

  const createGardenGroup = (event: React.FormEvent<FormElement>) => {
    const formValues = event.currentTarget.elements;
    const groupId = createModelId(GARDEN_GROUP_ID_PREFIX);
    const group: GardenGroup = {
      id: groupId,
      name: formValues.gardenGroupName.value,
      reqs: [
        formValues.petFriendly,
        formValues.edible,
        formValues.containerFriendly
      ].filter(element => element.checked).map(el => el.value as GardenRequirement),
      sunlightOffering: sunlightOffering as SunlightOffering,
      plants: []
    };

    storeGardenGroup(group);
    navigateToAddPlants(group.id);
    event.preventDefault();
  };

  const onSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectEl = event.target;
    setSunlightOffering(selectEl.value as SunlightOffering);
  };

  useEffect(() => {
    getTerritory();
  }, []);

  return (
    <div className="container">
      {territory && 
        <>
          <h2 className="text-center pt-3 fs-1">{territory.Name}</h2>
          <p className="text-center px-3 lh-1 fs-5">You are on unceded {territory.Name} Territory.</p>
          <p className="text-center px-3 fs-6">
            Reindigenizing land means to heal our relationship with land. 
            To do that, we must know and honor the native people who in the past and very present cultivate the land. 
            <small className="d-block"> Learn more about this native territory by visiting the <Link to={territory.description} target="_blank">Native Land Digital Archive</Link>.</small>
          </p>
          <p className="text-center fs-6">
            Begin your journey of healing the land by providing information about an area of your garden you wish to add a native plant to.
          </p> 
        </>
      }
      <form onSubmit={createGardenGroup}>
        <div className="form-group pb-3">
          <label htmlFor="gardenGroupName" className="fs-6 fw-medium">Name a Garden Group<small className="text-warning">*</small></label>
          <input type="text" className="form-control" id="gardenGroupName" placeholder="Garden group name" onChange={onNameChange}/>
          {showNameErrorMessage && <small className="badge text-bg-danger">Ensure name for your garden group is provided.</small>}
        </div>
        <div className="pb-3">
          <p className="fs-6 fw-medium mb-0">What does your garden group need to be?</p>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={GardenRequirement.PET_FRIENDLY} id="petFriendly" />
            <label className="form-check-label" htmlFor="petFriendly">
              Pet-friendly
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={GardenRequirement.EDIBLE} id="edible" />
            <label className="form-check-label" htmlFor="edible">
              Edible
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={GardenRequirement.CONTAINER_FRIENDLY} id="containerFriendly" />
            <label className="form-check-label" htmlFor="containerFriendly">
              Container-friendly
            </label>
          </div>
        </div>
        <SunlightOfferingDropDown onSelect={onSelection} />
        <button type="submit" className="btn btn-primary" disabled={!createButtonEnabled}>Create</button>
      </form>
    </div>
  );
};

interface FormElements extends HTMLFormControlsCollection {
  gardenGroupName: HTMLInputElement,
  petFriendly: HTMLInputElement,
  edible: HTMLInputElement,
  containerFriendly: HTMLInputElement,
  sunlightOffering: HTMLSelectElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface NativLandTerritoryProperties {
  Name: string,
  Slug: string,
  description: string
}

interface NativeLandTerritoryResponse {
  properties: NativLandTerritoryProperties
}

export default CreateGardenGroup;