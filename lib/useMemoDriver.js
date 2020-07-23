import { memoizeWith } from 'ramda';

import useDriver from './useDriver';

const useMemoDriver = memoizeWith(useDriver);

export default useMemoDriver;
