import { useEffect, useState } from 'preact/hooks';

const STORAGE_KEYS = 'heighmap-keys';
let KEYS = [];

function readStorage() {
    KEYS = (localStorage.getItem(STORAGE_KEYS) || '').split(',').filter(Boolean);
    return KEYS.reduce((acc, key) => {
        return acc.concat({
            name: key,
            content: localStorage.getItem(key) || '',
        });
    }, []);
}

const state = {
    entries: readStorage(),
    onAdd: [],
    onChange: [],
    getEntries() {
        return this.entries;
    }
}; // this is kind of singleton

export function addEntry(entry) {
    entry.name = entry.name.replace(',', '-');
    state.entries = state.entries.concat(entry);
    // localStorage.setItem(entry.name, entry.content);
    KEYS.push(entry.name);
    // localStorage.setItem(STORAGE_KEYS, KEYS.join(','));
    state.onChange.forEach(callback => callback(state));
    selectEntry(entry);
}

export function selectEntry(entry) {
    state.selectedEntry = entry;
    state.onChange.forEach(callback => callback(state));
}

export function useApp(config) {
    useEffect(() => {
        if (config.onChange) {
            config.onChange(state);
            state.onChange.push(() => config.onChange(state));
        }
        // setTimeout(() => {
        //     addEntry({name: 'other one'});
        // }, 2000);
    }, []);
}