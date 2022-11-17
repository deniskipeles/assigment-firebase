import { collection,getDocs } from "firebase/firestore";  
import {db} from '$lib/firebase.js';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const {record,error} = await getRecord(params)
    
    return {
      record,
      error,
    };
}




async function getRecord(params) {
  try {
    const rawRecord = collection(db, 'online-courses-category');
    const recordSnapshot = await (await getDocs(rawRecord));
    const recordList = recordSnapshot.docs.map(doc => {
      let data=doc.data()
      data = JSON.stringify(data)
      data = JSON.parse(data)
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