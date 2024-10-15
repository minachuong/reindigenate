export const GARDEN_GROUP_ID_PREFIX = 'gardenGroup';
export const PLANT_ID_PREFIX = 'plant';

export enum GardenRequirement {
  PET_FRIENDLY = "Pet-Friendly",
  EDIBLE = "Edible",
  CONTAINER_FRIENDLY = "Container-Friendly"
}

export interface Plant extends DynamicKeyObject {
  id: string,
  name: string,
}

interface DynamicKeyObject {
  [key: string]: any
}

export interface GardenGroup extends DynamicKeyObject{
  id: string,
  name: string,
  reqs: Array<GardenRequirement>,
  sunlightOffering: SunlightOffering
  plants: Array<Plant>
}

export enum SunlightOffering {
  FULL_SUN = "Full Sun",
  PARTIAL_SUN = "Partial Sun",
  FULL_SHADE = "Full Shade"
}

export const storeGardenGroup = (gardenGroup: GardenGroup) => {
  localStorage.setItem(gardenGroup.id, JSON.stringify(gardenGroup));
};

export const getGardenGroup = (gardenGroupId: string) => {
  const retrievedGroup = localStorage.getItem(gardenGroupId);
  if (retrievedGroup) {
    return JSON.parse(retrievedGroup);
  } else {
    throw new Error(`Unable to retrieve garden group with id: ${gardenGroupId}`);
  }
};

export const deleteGardenGroup = (gardenGroup: GardenGroup) => {
  localStorage.removeItem(gardenGroup.id);
};

export const createModelId = (modelNamePrefix: string): string => {
  return `${modelNamePrefix}${Math.floor(Math.random() * 100_000_000)}`;
};

export const getAllGardenGroups = () => {
  const gardenGroupIds = Object.keys(localStorage).filter((key) => {
    return key.startsWith(GARDEN_GROUP_ID_PREFIX);
  });

  return gardenGroupIds.map((groupId) => {
    return getGardenGroup(groupId);
  }); 
};

