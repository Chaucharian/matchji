import { useEffect, useState, useCallback } from 'react';


export const useRewardedAd = ({ onGetReward }) => {
    const [reward, _setReward] = useState({});

    const setReward = useCallback( (reward) => {
      _setReward(reward);
    }, []);

    const closeRewardedAd = useCallback( () => {
        onGetReward(reward);
    }, [onGetReward, reward]);
  
    return {
       setReward,
       closeRewardedAd
    }

}