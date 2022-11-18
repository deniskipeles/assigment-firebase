import { collection,doc,getDocs, limit, query, where } from "firebase/firestore";  
import {db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

 
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const id = params.service
    const {record,error} = await getRecord(id)
    // console.log(id,record)
    
    return {
      record,
      error,
    };
}




async function getRecord(id) {
  try {
    const categoryDocRef = doc(db, "services-categories", id);
    const rawRecord = query(collection(db, 'services-sub-categories'), where("category", "==", categoryDocRef), limit(50) );
       
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