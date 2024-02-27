//! las acciones siempre son asincronas y llaman a las mutaciones
import { v4 as uuidv4 } from 'uuid';

import journalApi from "@/api/journalAPI"



export const loadEntries = async( { commit } ) => {

    try {
        const { data } = await journalApi.get('entries.json');
        if(!data){
            commit('setEntries',[]);
            return
        }
        const entries = [];
        for (let id of Object.keys( data )) {
            entries.push({
                id,
                ...data[id]
            })
        }
        commit('setEntries',entries);
        console.log("entradas cargadas")
        //todo axios get request all entries
    } catch (error) {
        //! manejo de excepciones
    }

}

export const updateEntries = async ({commit},entry) => {

        const {text, date, picture = ''} = entry;
        const datasave = {text,date,picture}
        const response = await journalApi.put(`entries/${entry.id}.json`,datasave);
        commit('updateEntries',{...entry})

}

export const createEntries = async ({commit},entry) =>{

        const {text, date, picture = ''} = entry;

        const datasave = {text,date,picture}
        const {data} = await journalApi.post(`entries.json`,datasave);
        datasave.id = data.name;
        commit('addEntries',{...datasave})
        return data.name;

}
export const deleteEntries = async ({commit},id) => {

    const response = await journalApi.delete(`entries/${id}.json`);
    console.log("elinado desde la accions")
    commit('deleteEntry',id)

}