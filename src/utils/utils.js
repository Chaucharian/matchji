export const guidGenerator = () => {
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
};

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const sortEmojis = (emojis, amount = 10) => {
  if (amount < 4) {
    throw new Error("Minimun amount to sort must be 4");
  }
  const randomEmojis = [];
  let currentAmount = 2;
  let nextEmoji = emojis[random(0, emojis.length - 1)];

  // insert first
  randomEmojis.push(emojis[random(0, emojis.length - 1)]);

  // insert half of amount
  while (currentAmount <= amount / 2) {
    // verify if exists
    const match = randomEmojis.find((emoji) => emoji === nextEmoji);

    if (match) {
      while (randomEmojis.find((emoji) => emoji === nextEmoji)) {
        nextEmoji = emojis[random(0, emojis.length - 1)];
      }
    }

    randomEmojis.push(nextEmoji);
    currentAmount += 1;
  }

  // duplicate emojis
  randomEmojis.forEach((emoji) => randomEmojis.push(emoji));

  // sort positions
  randomEmojis.sort(() => Math.random() - 0.5);

  return randomEmojis;
};

export const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time));
