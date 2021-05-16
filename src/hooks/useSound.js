import { useState, useEffect, useMemo } from 'react';
import Sound from "react-native-sound";

export const useSound = ({ category = "Playback", mode, volume, file }) => {
    const [sound, setSound] = useState(new Sound(file));
    
    const actions = useMemo( () => ({
        play: () => {
            sound.play( (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                  }
                sound.release();
            });
        },
        stop: sound.stop()
    }), [sound]);

    useEffect( () => {
        sound.setVolume(1);
    },[sound]);

    useEffect( () => {
        Sound.setCategory(category, true);
        // Sound.setMode()
    },[category]);

    return actions
}