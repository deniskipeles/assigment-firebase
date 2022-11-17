// import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
import { collection, query, where, getDocs } from "firebase/firestore";
import {app,db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';


/* @type {import('./$types').PageServerLoad} */
export async function fetcher(table,filters) {
    const {record,error} = await getRecord(table,filters)
    
    return {
      record,
      error
    };
}



async function getRecord(table, filters) {
    try {
        const rawRecord = query(collection(db, table), where(filters.key, "==", filters.value));
        // const rawRecord = collection(db, table);
        const recordSnapshot = await (await getDocs(rawRecord));
        const recordList = recordSnapshot.docs.map(doc => {
            const data=doc.data()
            return{
                ...data,
                id:doc.id
            }
        });
        return {
        record: recordList,
        error:null
        };
    
  } catch (error) {
    return {
      record:null,
      error:error
    }
  }
}