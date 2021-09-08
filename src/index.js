import { configure } from '@superset-ui/core';
import _setupColors from './setupColors';

configure();
_setupColors();

export * from '@superset-ui/core';
export const setupColors  = _setupColors;