import { Express, Request, Response } from 'express';

const iltHookRoute = (app: Express) => {
  app.get('/users', async (req: Request, res: Response) => {
    // let usersRef = collection(database, 'users');
    // const citiesRef = collection(database, 'cities');
    // // const q = query(collection(database, 'users'), where('user_id', '!=', true));
    // const q = query(collection(database, 'users'));
    // const querySnapshot = await getDocs(q);
    // let restData = <any>[];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   restData.push({
    //     docId: doc.id,
    //     ...doc.data(),
    //   });
    //   console.log(doc.id, ' => ', {
    //     docId: doc.id,
    //     ...doc.data(),
    //   });
    // });
    // res.send(JSON.stringify(userRef));
  });
};

export default iltHookRoute;
