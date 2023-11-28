import { Checkbox } from "../../checkbox-group/checkbox-group.interface";
import { RadioButtonOption } from "../../radio-button-list/radio-button-option.interface";

export const placeOptions: RadioButtonOption[] = [
   { key: 'outdoor', label: 'poolCharacteristics.placeOptions.outdoor' },
   { key: 'indoor', label: 'poolCharacteristics.placeOptions.indoor' },
];

export const poolTypes: Checkbox[] = [
   {
      key: 'swimming_pool',
      label: 'poolCharacteristics.typeOptions.swimming_pool',
   },
   { key: 'spa', label: 'poolCharacteristics.typeOptions.spa' },
];