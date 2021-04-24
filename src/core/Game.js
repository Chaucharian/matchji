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

const overlappingArea = (l1, r1, l2, r2) => {
  // Area of 1st Rectangle
  const area1 = Math.abs(l1.x - r1.x) * Math.abs(l1.y - r1.y);

  // Area of 2nd Rectangle
  const area2 = Math.abs(l2.x - r2.x) * Math.abs(l2.y - r2.y);

  // Length of intersecting part i.e
  // start from max(l1.x, l2.x) of
  // x-coordinate and end at min(r1.x,
  // r2.x) x-coordinate by subtracting
  // start from end we get required
  // lengths
  const x_dist = Math.min(r1.x, r2.x) - Math.max(l1.x, l2.x);
  const y_dist = Math.min(r1.y, r2.y) - Math.max(l1.y, l2.y);
  let areaI = 0;
  if (x_dist > 0 && y_dist > 0) {
    areaI = x_dist * y_dist;
  }

  return area1 + area2 - areaI;
};

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
  const generateEmojis = (emojis, amount) => {
    const emojisPositioned = sortEmojis(emojis, amount).map((emoji) => {
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

    emojisPositioned.map((emoji, i) => {
      const nextEmoji = emojisPositioned[i + 1];
      const space = 5;

      if (nextEmoji) {
        const l1 = { x: emoji.left, y: emoji.top };
        const r1 = { x: emoji.left + emoji.size, y: emoji.top + emoji.size };
        const l2 = { x: nextEmoji.left, y: nextEmoji.top };
        const r2 = {
          x: nextEmoji.left + nextEmoji.size,
          y: nextEmoji.top + nextEmoji.size,
        };
        console.log(
          "EMOJI 1 ",
          emoji.emoji,
          "EMOJI 2",
          nextEmoji.emoji,
          " AREA ",
          overlappingArea(l1, r1, l2, r2)
        );
        // if (emoji.left + emoji.size >= nextEmoji.left) {
        //   emoji.left = emoji.left + emoji.size - nextEmoji.left;
        // }
        // if (emoji.top + emoji.size >= nextEmoji.top) {
        //   emoji.top = emoji.top + emoji.size - nextEmoji.top;
        // }
      }
    });

    return emojisPositioned;
  };

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
            top={top}
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
