export enum GardenRequirement {
  PET_FRIENDLY = "Pet-Friendly",
  EDIBLE = "Edible",
  CONTAINER_FRIENDLY = "Container-Friendly"
}

export interface GardenGroup {
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
  console.log(gardenGroup)
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

export interface Plant {
  name: string
}
