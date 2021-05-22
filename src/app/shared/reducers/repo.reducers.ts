import { Action, createReducer, on } from '@ngrx/store';
import { favorite, unfavorite } from './../actions';

export const initialState = false;

const _repoReducer = createReducer(
  initialState,
  on(favorite, (state) => true),
  on(unfavorite, (state) => false),
);

export function repoReducer(state: boolean | undefined, action: Action) {
  return _repoReducer(state, action);
}
