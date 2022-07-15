import { atom } from "recoil";
import {recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const userModeState = atom({
    key: 'userModeState',
    default: '',
    effects_UNSTABLE: [persistAtom],
});