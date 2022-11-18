import { collection,doc,getDocs, limit, query, where } from "firebase/firestore";  
import {db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';


export async function fetchServices(id) {
    const {record,error} = await getRecord(id)
    
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
      record:null,
      error:error
    }
  }
}