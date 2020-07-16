import { __ } from 'ramda';
import mapFields from './mapFields';

const mapDateFields = mapFields(__, (val) => new Date((val / 10000) - 62135596800000));

export default mapDateFields;
