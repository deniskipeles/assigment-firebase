import { collection,doc,getDocs, query, where } from "firebase/firestore";  
import {db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

 
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const course = params.course
    const categoryDocRef = doc(db, "online-courses-category", course);
    const filters = {
      key:"category",
      value: categoryDocRef
    }
    const {record,error} = await getRecord("online-courses",filters)
    // console.log(record)
    return {
      record,
      error,
      course
    };
}





async function getRecord(table,filters) {
  try {
    const rawRecord = query(collection(db, table), where(filters.key, "==", filters.value));
    // const rawRecord = collection(db, 'online-courses');
    const recordSnapshot = await (await getDocs(rawRecord));
    const recordList = recordSnapshot.docs.map(doc => {
      let data=doc.data()
      data =  JSON.stringify(data)
      data =  JSON.parse(data)
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