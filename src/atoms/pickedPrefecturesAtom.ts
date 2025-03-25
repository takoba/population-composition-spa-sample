import { atom } from 'jotai';
import { Prefecture } from '~/types';

const pickedPrefecturesAtom = atom(new Set<Prefecture>());
export default pickedPrefecturesAtom
