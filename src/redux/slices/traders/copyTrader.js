/* eslint-disable consistent-return */
// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, getDocs,arrayRemove, collection,updateDoc,arrayUnion, query, where } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error : null,
  success : false
};

const slice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // SUCCESS
    traderCopied(state, action) {
        state.isLoading = false;
        state.success = action.payload;
      },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------


export function copyTrader(traderId) {
    return async () => {
      dispatch(slice.actions.startLoading());
      const auth = getAuth();
      let status
      try {
        const tradersRef = doc(DB, 'traders', `${traderId}`);
       const isCopied = await isTraderCopied(traderId);
       if(isCopied){
        await updateDoc(tradersRef, {
          subscribers: arrayRemove(auth.currentUser.uid)
      })
      .then(() => {
           status = 'Removed'
         
      });
       }else{
        // Atomically add a new region to the "regions" array field.
        await updateDoc(tradersRef, {
          subscribers: arrayUnion(auth.currentUser.uid)
        })
        .then(() => {
          status = 'Copied'
        });
       }
       dispatch(slice.actions.traderCopied(status));
      } catch (error) {
        const errorMessage = error.message;
        dispatch(slice.actions.hasError(errorMessage));
      }
      return status;
    };
  }

 async function isTraderCopied(traderId) {
    const auth = getAuth();
      try {
        const container = []
        const q = query(collection(DB, 'traders'), where('id', '==', traderId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
        return container[0].subscribers.includes(auth.currentUser.uid)
      } catch (error) {
        const errorMessage = error.message;
        console.error(errorMessage)
      }
  
  }
// export function getDeposit(id) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const userRef = doc(DB, 'deposits', `${id}`);
//       const docSnap = await getDoc(userRef);

//       if (docSnap.exists()) {
//         console.log('Document data:', docSnap.data());
//         const depositDetails = docSnap.data();
//         dispatch(slice.actions.setValues(depositDetails));
//       } else {
//         dispatch(slice.actions.hasError('something went worng'));
//         console.log('No such document!');
//       }
//     } catch (error) {
//       const errorMessage = error.message;
//       dispatch(slice.actions.hasError(errorMessage));
//     }
//   };
// }

// export function getAllTrader() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const container = []
//       const q = query(collection(DB, 'traders'));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         container.push(doc.data());
//       });
//       dispatch(slice.actions.gotAllTraders(container));
//     } catch (error) {
//       const errorMessage = error.message;
//       dispatch(slice.actions.hasError(errorMessage));
//     }
//   };
// }

// export const getImageUrl =  () => {
//     const image =  axios.get('https://picsum.photos/200')
//     return image;
// }
// export function clearState() {
//   return async () => {
//     dispatch(slice.actions.resetState());
//   };
// }

// export const fetchUserTrades = () => {
//   const auth = getAuth();
//   const userId = auth.currentUser.uid
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // Create a query against the collection.
//       const container = [];
//       const q = query(collection(DB, 'trades'), where('userId', '==', userId));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         container.push(doc.data());
//       });
//       dispatch(slice.actions.gotAllTrades(container));
//     } catch (error) {
//       const errorMessage = error.message;
//       dispatch(slice.actions.hasError(errorMessage));
//     }
   
//   };
// }

// export const fetchPersonalTrades = () => {
//   const auth = getAuth();
//   const userId = auth.currentUser.uid
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // Create a query against the collection.

//       const container = [];
//       const q = query(collection(DB, 'trades'), where('userId', '==', userId),where('status', '==', 'PENDING'));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         container.push(doc.data());
//       });
//       dispatch(slice.actions.gotAllPersonalTrades(container));
//     } catch (error) {
//       const errorMessage = error.message;
//       dispatch(slice.actions.hasError(errorMessage));
//     }
   
//   };
// }
