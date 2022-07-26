import { atom } from "jotai"

export const tipTextAtom = atom<string>('')
export const treasureCountAtom = atom<number>(0)
export const deathCountAtom = atom<number>(0)
export const mobileControlsAtom = atom({left: false, right: false, up: false, space: false, shift: false, down: false})