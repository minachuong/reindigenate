import { useEffect, useState } from "react";
import { deleteGardenGroup, GardenGroup, getAllGardenGroups } from "./GardenGroupService";
import ActionableListItems, { ActionOptions, BIIconSignal } from "./ActionableListItems";
import { Link, useNavigate } from "react-router-dom";

const GardenGroupIndex = () => {
  const [gardenGroups, setGardenGroups] = useState([] as Array<GardenGroup>);

  useEffect(() => {
    const groups = getAllGardenGroups();
    setGardenGroups(groups);
  }, []);

  const itemNavigationPath = (group: any): string => {
    return `/addplants/${group.id}`;
  };

  const navigate = useNavigate();
  const deleteReload = (gardenGroup: GardenGroup) => {
    deleteGardenGroup(gardenGroup);
    navigate(0);
  };

  const groupActions: Array<ActionOptions> = [
    {
      action: deleteReload,
      biIconName: 'bi-trash',
      biIconSignal: BIIconSignal.DANGER
    }
  ];

  return (
    <div className="container">
      <h3 className="text-center py-3 fs-1">Your Garden Groups</h3>
      <ActionableListItems listItems={gardenGroups} actions={groupActions} keyProp="id" displayNameKey="name" navigationHandler={itemNavigationPath}/>
      <div className="btn-group" role="group" aria-label="Create Garden Group">
        <Link className="btn btn-primary" to="/creategardengroup">Create a Garden Group</Link>
      </div>
    </div>
  );
};

export default GardenGroupIndex;