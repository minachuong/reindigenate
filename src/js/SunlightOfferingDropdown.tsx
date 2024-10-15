import { SunlightOffering } from "./GardenGroupService";

const SunlightOfferingDropDown = (props: SunlightOfferingDropDownProps) => {
  return (
    <div className="mb-3">
      <p className="fs-6 fw-medium mb-0">How much sunlight does this garden group receive?</p>
      <select className="form-select" aria-label="Select Sunlight Offering" id="sunlightOffering1" onChange={e => props.onSelect(e)}>
        <option disabled>Select Sunlight Offering</option>
        <option value={SunlightOffering.FULL_SUN}>Full Sun (6-12 hours)</option>
        <option value={SunlightOffering.PARTIAL_SUN}>Partial Sun (4-6 hours)</option>
        <option value={SunlightOffering.FULL_SHADE}>Full Shade</option>
      </select>
    </div>
  );
};

interface SunlightOfferingDropDownProps {
  onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

export default SunlightOfferingDropDown;