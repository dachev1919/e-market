import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    if (loading) {
      const getData = async () => {
        // firebase firestore realtime data update
        await onSnapshot(collectionRef, (snapshot) => {
          setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        });
      };

      getData();
    }
  }, [collectionRef, loading]);

  return { data, loading };
};

export default useGetData;