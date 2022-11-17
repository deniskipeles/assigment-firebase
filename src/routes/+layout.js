import { collection,getDocs } from "firebase/firestore";  
import {db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

 
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const {record,error} = await getRecord(params)
    const {record:coursesRecord,error:coursesError} = await getOnlineCoursesRecord(params)
    
    return {
      record,
      error,
      coursesError,
      coursesRecord
    };
}



async function getOnlineCoursesRecord(params) {
  try {
    const rawRecord = collection(db, 'online-courses-category');
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
async function getRecord(params) {
  try {
    const rawRecord = collection(db, 'services-categories');
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