import { memoizeWith } from 'ramda';
import useSession from './useSession';

const useMemoSession = memoizeWith(useSession);

export default useMemoSession;
