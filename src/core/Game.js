import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
} from "react-native";
import { Emoji } from "../components";
import { useGameContext, useGameProvider } from "../context/gameContext";
import Emojis from "../models/emojis";

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const useMatchEmoji = () => {
  const [firstEmoji, setFirstEmoji] = useState(0);
  const [secondEmoji, setSecondEmoji] = useState(1);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    if (firstEmoji === secondEmoji) {
      setMatch(true);
    }
  }, [firstEmoji, secondEmoji]);

  return { match, setEmoji };
};

export const Game = () => {
  const {
    settings: { backgroundColor },
    increaseScore,
    addTime,
  } = useGameContext();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const sortEmojis = (emojis, amount = 10) => {
    const randomEmojis = [];

    // get random emojis
    for (let i = 0; i < amount; i++) {
      randomEmojis.push(emojis[random(0, emojis.length - 1)]);
    }
    console.log(randomEmojis);
    // select an amount of emojis and duplicated one
    const sortedEmojis = randomEmojis
      .map((emoji, index) => index < amount && { emoji, id: index })
      .filter((emoji) => emoji !== false);
    const randomEmoji = sortedEmojis[random(0, sortedEmojis.length - 1)];
    sortedEmojis.push(randomEmoji);
    return sortedEmojis;
  };
  const getEmojiPosition = (width, height) => ({ x, y, size }) => {
    // separate emoji from window boundings
    const space = 20;
    const position = { x, y };

    if (x + size >= width) {
      position.x = width - size - space;
    } else if (x <= 0) {
      position.x = x + size + space;
    } else if (y + size >= height) {
      position.y = height - size - space;
    } else if (y <= 0) {
      position.y = y + size + space;
    }

    return position;
  };
  const getPosition = useMemo(() => getEmojiPosition(width, height), [
    width,
    height,
  ]);

  const generateEmojis = (emojis) => {
    return sortEmojis(emojis).map(({ emoji, id }) => {
      const size = random(20, 70);
      const rotation = random(0, 180);
      const { x: left, y: top } = getPosition({
        x: random(0, width),
        y: random(0, height),
        size,
      });
      return {
        emoji,
        id,
        left,
        top,
        size,
        rotation,
      };
    });
  };

  const [firstEmoji, setFirstEmoji] = useState(null);
  const [secondEmoji, setSecondEmoji] = useState(null);
  const initialEmojis = useMemo(() => generateEmojis(Emojis), []);
  const [emojis, setEmojis] = useState(initialEmojis);

  const resetSelection = () => {
    setFirstEmoji(null);
    setSecondEmoji(null);
  };

  const onSelectEmoji = ({ id, index }) => {
    if (firstEmoji === null) {
      setFirstEmoji({ id, index });
    } else if (secondEmoji === null && firstEmoji.index !== index) {
      setSecondEmoji({ id });
    }
  };

  const removeEmojis = (emojis, id) =>
    emojis.filter((emoji) => emoji.id !== id);

  useEffect(() => {
    if (firstEmoji !== null && secondEmoji !== null) {
      if (firstEmoji.id === secondEmoji.id) {
        console.log(" MATCH");
        setEmojis(generateEmojis(Emojis));
        addTime(5);
      }
      resetSelection();
    }
  }, [firstEmoji, secondEmoji]);

  return (
    <View styles={styles.container}>
      {emojis.map(({ emoji, id, left, top, size, rotation }, index) => (
        <Emoji
          onPress={(emoji) => onSelectEmoji({ emoji, index })}
          emoji={{ emoji, id }}
          left={left}
          height={top}
          size={size}
          rotation={rotation}
          key={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
