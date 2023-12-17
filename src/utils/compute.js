/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

import { FIREBASE_API } from '../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

export async function computeUserDeposit(id) {
  const container = [];
  const deposits = [];
  try {
    const q = query(collection(DB, 'deposits'), where('user_id', '==', id), where('status', '==', 'approved'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      container.push(doc.data());
    });
    container.forEach((element) => {
      deposits.push(Number(element.amount));
    });
    const sum = deposits.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  } catch (error) {
    console.error(error);
  }
}

export async function computeUserProfit(id) {
  const container = [];
  const deposits = [];
  try {
    const q = query(collection(DB, 'Profits'), where('user_id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      container.push(doc.data());
    });
    container.forEach((element) => {
      deposits.push(Number(element.amount));
    }); 
    const sum = deposits.reduce((partialSum, a) => partialSum + a, 0);

    return sum;
  } catch (error) {
    console.error(error);
  }
}

export async function computeUserWithdrawal(id) {
 
  const container = [];
  const deposits = [];
  try {
    const q = query(collection(DB, 'withdrawals'), where('user_id', '==', id),where('status', '==', 'approved'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      container.push(doc.data());
    });
    
    container.forEach((element) => {
      deposits.push(Number(element.amount));
    }); 

    console.log('withdrawals', container)
    const sum = deposits.reduce((partialSum, a) => partialSum + a, 0);
    
    return sum;
  } catch (error) {
    console.error(error);
  }
}
