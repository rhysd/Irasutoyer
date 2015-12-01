import * as Action from './actions';

export interface StateType {}

const init: StateType = {};

export default function irasutoyer(state: StateType = init, action: Action.Type): StateType {
    return state;
}
