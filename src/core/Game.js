import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Emoji } from "../components";
import { useGameContext, useGameProvider } from "../context/gameContext";
import Emojis from "../models/emojis";

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const Game = () => {
  const {
    settings: { initialEmojis: contextEmojis },
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
    // select an amount of emojis and duplicated one
    const sortedEmojis = randomEmojis
      .map((emoji, index) => index < amount && { emoji, id: index })
      .filter((emoji) => emoji !== false);
    const randomEmoji = sortedEmojis[random(0, sortedEmojis.length - 1)];
    sortedEmojis.push(randomEmoji);
    console.log(sortedEmojis);

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

  const [firstEmoji, setFirstEmoji] = useState({ id: null, index: null });
  const [secondEmoji, setSecondEmoji] = useState({ id: null, index: null });
  const initialEmojis = useMemo(() => generateEmojis(Emojis), [contextEmojis]);
  const [emojis, setEmojis] = useState(initialEmojis);
  const [match, setMatch] = useState(false);

  const resetSelection = () => {
    setFirstEmoji({ id: null, index: null });
    setSecondEmoji({ id: null, index: null });
  };

  const onSelectEmoji = ({ id, index }) => {
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
        setMatch(true);
        setEmojis(generateEmojis(Emojis));
        addTime(5);
      }
      resetSelection();
    }
  }, [firstEmoji, secondEmoji]);

  useEffect(() => {
    setEmojis(generateEmojis(Emojis));
  }, [contextEmojis]);

  return (
    <View styles={styles.container}>
      {emojis.map(({ emoji, id, left, top, size, rotation }, index) => {
        const newKey = useMemo(() => random(0, 10000000), [emojis]);
        return (
          <Emoji
            onPress={(emoji) => onSelectEmoji({ id, index })}
            emoji={{ emoji, id }}
            left={left}
            height={top}
            size={size}
            rotation={rotation}
            match={match}
            key={newKey}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
