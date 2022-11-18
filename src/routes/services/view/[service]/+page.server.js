import { collection,doc,getDocs, limit, query, where } from "firebase/firestore";  
import {db} from '$lib/firebase.js';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.service
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
        
    // const rawRecord = collection(db, 'services-categories');
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
      record:[],
      error:error
    }
  }
}