import { collection,getDocs } from "firebase/firestore";  
import {db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

 
/* @type {import('./$types').PageServerLoad} */
export async function fetchNavData(params) {
    const {record,error} = await getRecord(params)
    
    return {
      record,
      error
    };
}



async function getRecord(table) {
  try {
    const rawRecord = collection(db, table);
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
      record:[],
      error:error
    }
  }
}