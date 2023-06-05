import { atom } from "recoil"

export const PPUrl = atom({
    key :'ppurl',
    default: ''
})

export const Stats = atom({
    key: 'stats',
    default: {}
})