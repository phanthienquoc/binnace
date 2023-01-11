import { doc, runTransaction } from 'firebase/firestore';

/**
 *
 * Docs https://firebase.google.com/docs/firestore/manage-data/transactions
 * @param database
 */

const MAX_POP = 1000000;

const transactionalTemplate = async (database: any) => {
  try {
    const sfDocRef = doc(database, 'cities', 'SF');

    const newPopulation = await runTransaction(
      database,
      async (transaction) => {
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
      }
    );

    console.log('Population increased to ', newPopulation);
  } catch (e) {
    // This will be a "population is too big" error.
    console.error(e);
  }
};
