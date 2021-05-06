import {init, hideAll, changeTiles } from './actions';
import { sleep } from '../utils';
import { INITIAL_TILE_ANIMATION_DURATION } from '../const/variables';

// TODO merge hideAll and changeTiles into a same action
export const initializeBoard = async (dispatch) => {
    dispatch(init({ amount: 24, show: true }));
    await sleep(5000);
    dispatch(hideAll({ show: false }));
    dispatch(changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION }));
}
