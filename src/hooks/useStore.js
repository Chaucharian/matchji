import { useEffect, useState } from "react";
import store from 'react-native-simple-store';
import { INITIAL_GAME_PARAMS } from '../const/variables';

export const useStore = () => {
  const [session, setSession] = useState(INITIAL_GAME_PARAMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async() => {
      const storedData = await store.get("currentLevel");
      let newData = null; 

      if(storedData) {
        newData = storedData;
      } 
      setSession(newData);
      setLoading(false);
    })();
  }, []);

  return { session, loading };
};
