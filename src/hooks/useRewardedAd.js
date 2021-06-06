import { useEffect, useState, useCallback } from 'react';


export const useRewardedAd = ({ onGetReward }) => {
    const [reward, _setReward] = useState(null);

    const setReward = useCallback( (reward) => {
      _setReward(reward);
    }, [_setReward]);

    const closeRewardedAd = useCallback( () => {
        if(reward) {
          onGetReward(reward);
        }
    }, [onGetReward, reward]);
  
    return {
       setReward,
       closeRewardedAd
    }

}