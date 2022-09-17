import { atom } from 'recoil';

export const thePlayerList = atom({
    key: 'playerList',
    default: []
})

export const theRaidList = atom({
    key: 'raidList',
    default: []
})

export const theCheckInOuts = atom({
    key: 'checkInOuts',
    default: 0
})

export const theLoots = atom({
    key: 'loots',
    default: 0
})

export const thePlayersSelected = atom({
    key: 'playersSelected',
    default: []
})

export const theEventList = atom({
    key: 'eventList',
    default: []
})

export const theFormFieldAddPlayer = atom({
    key: 'formFieldAddPlayer',
    default: ""
})

export const theFormFieldAddPlayerStatus = atom({
    key: 'formFieldAddPlayerStatus',
    default: "m"
})

export const theFormFieldRemovePlayer = atom({
    key: 'formFieldRemovePlayer',
    default: ""
})

export const theFormFieldAddEvent = atom({
    key: 'formFieldAddEvent',
    default: ""
})

export const theFormFieldRemoveEvent = atom({
    key: 'formFieldRemoveEvent',
    default: ""
})