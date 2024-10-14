import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GardenGroup, GardenRequirement, storeGardenGroup, SunlightOffering } from "./GardenGroupService";

const CreateGardenGroup = () => {
  const lat = localStorage.getItem('lat');
  const long = localStorage.getItem('long');
  const [territory, setTerritory] = useState({} as NativLandTerritoryProperties);

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

  const createGardenGroup = (event: React.FormEvent<FormElement>) => {
    const formValues = event.currentTarget.elements;
    const groupId = `gardenGroup${Math.floor(Math.random() * 100_000_000)}`;
    const group: GardenGroup = {
      id: groupId,
      name: formValues.gardenGroupName.value,
      reqs: [
        formValues.petFriendly,
        formValues.edible,
        formValues.containerFriendly
      ].filter(element => element.checked).map(el => el.value as GardenRequirement),
      sunlightOffering: formValues.sunlightOffering.value as SunlightOffering,
      plants: []
    };

    storeGardenGroup(group);
    navigateToAddPlants(group.id);
  }


  useEffect(() => {
    getTerritory();
  }, []);

  return (
    <>
      { territory && 
        <>
          <h2>{territory.Name}</h2>
          <p>
            You are on unceded {territory.Name} Territory. To learn more about this native territory, please visit the
            <Link to={territory.description}> Native Land Digital Archive</Link>.
          </p>  
        </>
      }

      <form onSubmit={createGardenGroup}>
        <div className="form-group">
          <label htmlFor="gardenGroupName">Name a Garden Group</label>
          <input type="text" className="form-control" id="gardenGroupName" placeholder="Garden group name" />
        </div>

        <p>Describe some requirements of your garden group.</p>
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
        <select className="form-select" aria-label="Select Sunlight Offering" id="sunlightOffering">
          <option disabled>Select Sunlight Offering</option>
          <option value={SunlightOffering.FULL_SUN}>Full Sun (6-12 hours)</option>
          <option value={SunlightOffering.PARTIAL_SUN}>Partial Sun (4-6 hours)</option>
          <option value={SunlightOffering.FULL_SHADE}>Full Shade</option>
        </select>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </>
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