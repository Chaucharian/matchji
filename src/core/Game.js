import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions, Vibration } from "react-native";
import { Emoji } from "../components";
import { useGameContext, useGameProvider } from "../context/gameContext";
import Emojis from "../models/emojis";
import Sound from "react-native-sound";

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
const NOT_MATCH_VIBRATION = 100;
const ADD_TIME = 5;

Sound.setCategory("Playback");
const matchSound = new Sound(`match.mp3`);
const tapSound = new Sound(`tap.mp3`);
tapSound.setVolume(1);
matchSound.setVolume(1);

export const Game = () => {
  const {
    settings: { initialEmojis: contextEmojis, emojiAmount },
    increaseScore,
    addTime,
    setEmojiAmount,
  } = useGameContext();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const sortEmojis = (emojis, amount = 10) => {
    const randomEmojis = [];

    // get random emojis
    for (let i = 0; i < amount; i++) {
      randomEmojis.push(emojis[random(0, emojis.length - 1)]);
    }
    // select an amount of emojis and duplicated one
    const sortedEmojis = randomEmojis.map((emoji, index) => {
      const key = guidGenerator();
      return { emoji, id: index, key };
    });
    // make a new object thus not modify reference
    const randomEmoji = { ...sortedEmojis[random(0, sortedEmojis.length - 1)] };
    randomEmoji.key = guidGenerator();
    sortedEmojis.push(randomEmoji);

    return sortedEmojis;
  };
  const getEmojiPosition = (width, height) => ({ x, y, size }) => {
    // separate emoji from window boundings
    const space = 20;
    const position = { x, y };

    if (x + size >= width) {
      position.x = x - size - space;
    } else if (x <= 0) {
      position.x = x + size + space;
    } else if (y + size >= height) {
      position.y = y - size - space;
    } else if (y <= 0) {
      position.y = y + size + space;
    }

    return position;
  };
  const getPosition = useMemo(() => getEmojiPosition(width, height), [
    width,
    height,
  ]);
  const generateEmojis = (emojis, amount) =>
    sortEmojis(emojis, amount).map((emoji) => {
      const size = random(20, 70);
      const rotation = random(0, 180);
      const { x: left, y: top } = getPosition({
        x: random(0, width),
        y: random(0, height),
        size,
      });
      return {
        ...emoji,
        left,
        top,
        size,
        rotation,
      };
    });

  const [firstEmoji, setFirstEmoji] = useState({ id: null, index: null });
  const [secondEmoji, setSecondEmoji] = useState({ id: null, index: null });
  const initialEmojis = useMemo(() => generateEmojis(Emojis, emojiAmount), [
    contextEmojis,
    emojiAmount,
  ]);
  const [emojis, setEmojis] = useState(initialEmojis);
  const [match, setMatch] = useState(false);

  const resetSelection = () => {
    setFirstEmoji({ id: null, index: null });
    setSecondEmoji({ id: null, index: null });
  };

  const onSelectEmoji = ({ id, index }) => {
    tapSound.play();
    if (firstEmoji.id === null) {
      setFirstEmoji({ id, index });
    } else if (secondEmoji.id === null && firstEmoji.index !== index) {
      setSecondEmoji({ id, index });
    }
  };

  useEffect(() => {
    if (firstEmoji.id !== null && secondEmoji.id !== null) {
      if (firstEmoji.id === secondEmoji.id) {
        console.log(" MATCH");
        matchSound.play();
        setMatch(true);
        addTime(ADD_TIME);
        setEmojiAmount(emojiAmount + 1);
      } else {
        Vibration.vibrate(NOT_MATCH_VIBRATION);
      }
      resetSelection();
    }
  }, [firstEmoji, secondEmoji]);

  useEffect(() => {
    console.log(emojiAmount);
    if (emojiAmount !== 5) {
      setEmojis(generateEmojis(Emojis, emojiAmount));
    }
  }, [emojiAmount]);

  useEffect(() => {
    setEmojis(generateEmojis(Emojis, emojiAmount));
  }, [contextEmojis]);

  return (
    <View styles={styles.container}>
      {emojis.map(({ emoji, id, left, top, size, rotation, key }, index) => {
        return (
          <Emoji
            onPress={() => onSelectEmoji({ id, index })}
            emoji={emoji}
            left={left}
            height={top}
            size={size}
            rotation={rotation}
            key={key}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "absolute",
  },
});
