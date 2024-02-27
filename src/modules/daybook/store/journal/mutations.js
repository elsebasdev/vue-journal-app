//! modifcan el state y son sincronas son llamadas desde los actions

import state from "./state";

export const setEntries = (state, entries)=>{

    state.entries = [...entries];
    state.isloading = false;
    console.log("mutacin cargada")

}

export const updateEntries = (state, entry) => {
const idx = state.entries.map(e => e.id).indexOf(entry.id);
state.entries[idx] = entry; 
    console.log("actualizado correctamente");
}

export const addEntries = (state, entry) => {

    state.entries.unshift(entry);
    console.log('muttion se agrego nueva entrada')
    
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id);
        console.log("mutacion elimnado correctamente");
    }