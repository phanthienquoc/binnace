import { doc, runTransaction } from 'firebase/firestore';

/**
 *
 * Docs https://firebase.google.com/docs/firestore/manage-data/transactions
 * @param db
 */

const MAX_POP = 1000000;

const transactionalTemplate = async (db: any) => {
  try {
    const sfDocRef = doc(db, 'cities', 'SF');

    const newPopulation = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw 'Document does not exist!';
      }

      const newPop = sfDoc.data().population + 1;
      if (newPop <= MAX_POP) {
        transaction.update(sfDocRef, { population: newPop });
        return newPop;
      } else {
        return Promise.reject('Sorry! Population is too big');
      }
    });

    console.log('Population increased to ', newPopulation);
  } catch (e) {
    // This will be a "population is too big" error.
    console.error(e);
  }
};
