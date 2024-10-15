// When listItems are structs:
// the React.key and displayName used for each list item is the struct value.
// When listItems are objects:
// `keyProp` is the property on each object used for the React.Key and

import { Link } from "react-router-dom";

// `displayNameKey` is the property on each object used for displaying the item.
const ActionableListItems = ({listItems, actions, keyProp, displayNameKey, navigationHandler}: ActionableListItemsProps) => {
  return (
    <ul className="list-unstyled">
      {listItems.map(item => {
        return (
          <li key={keyProp ? item[keyProp] : item} className="pb-1">
            {navigationHandler ? (
              <Link to={navigationHandler(item)}>{displayNameKey ? item[displayNameKey]: item}</Link>
            ) : (
              <>{displayNameKey ? item[displayNameKey]: item}</>
            )}
            
            <div className="btn-group" role="group" aria-label="Basic outlined example">
              {actions.map(action => {
                return(
                  <button type="button" className={`btn btn-outline-${action.biIconSignal} btn-sm ms-2`} onClick={() => action.action(item)} key={action.biIconName}>
                    <i className={`${action.biIconName}`}></i>
                  </button>
                )
              })}
            </div>
          </li>
        )})}
    </ul>
  );
};

interface ActionableListItemsProps {
  listItems: Array<any>, 
  actions: Array<ActionOptions>, 
  keyProp?: string, 
  displayNameKey?: string,
  navigationHandler?: (item: any) => string
}

export enum BIIconSignal {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger"
}

export interface ActionOptions {
  action: (item: any) => void,
  biIconName: string,
  biIconSignal: BIIconSignal
}

export default ActionableListItems;