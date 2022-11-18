import { query, orderBy, limit } from "firebase/firestore";  
import { collection,getDocs } from "firebase/firestore";  
import {db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

 
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const {record:services,error:servicesError} = await getRecordServices(params)
    const {record:experts,error:expertsError} = await getRecordEXperts(params)
    const {record:courses,error:coursesError} = await getRecordCourses(params)
    
    return {
      services,
      servicesError,
      experts,
      expertsError,
      courses,
      coursesError
    };
}

async function getRecordCourses(params) {
    try {
      const rawRecord = collection(db, 'online-courses-category');
      const q = query(rawRecord, orderBy("name"), limit(4));
      const recordSnapshot = await (await getDocs(q));

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


async function getRecordEXperts(params) {
  try {
    const rawRecord = collection(db, 'experts');
    const q = query(rawRecord, orderBy("name"), limit(4));
    const recordSnapshot = await (await getDocs(q));
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



async function getRecordServices(params) {
  try {
    const rawRecord = collection(db, 'services-categories');
    const q = query(rawRecord, orderBy("name"), limit(4));
    const recordSnapshot = await (await getDocs(q));
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