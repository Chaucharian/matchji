import { useEffect, useState } from "react";
import store from 'react-native-simple-store';
import { INITIAL_GAME_PARAMS } from '../const/variables';

export const useStore = () => {
  const [session, setSession] = useState(INITIAL_GAME_PARAMS);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async() => {
      // SET CUSTOM SESSION (TEST ONLY)
      // await store.save("currentLevel", { currentLevel: 8, amount: 30 });
      const storedData = await store.get("currentLevel");

      if(storedData) {
        setSession(storedData);
      } 
      setLoading(false);
    })();
  }, []);

  return { session, loading };
};
