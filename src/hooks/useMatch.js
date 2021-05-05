import { useCallback, useEffect, useState, useMemo } from "react";

export const useMatch = () => {
  const [firstTile, setFirsTile] = useState({ content: null, id: null });
  const [secondTile, setSecondTile] = useState({ content: null, id: null });
  const [isMatch, setIsMatch] = useState({
    tiles: [],
    match: false,
  });

  const resetMatch = () =>
    setIsMatch({
      tiles: [],
      match: false,
    });

  const resetSelection = () => {
    setFirsTile({ content: null, id: null });
    setSecondTile({ content: null, id: null });
  };

  const addCurrentTile = useCallback(
    ({ content, id }) => {
      if (firstTile.content === null) {
        setFirsTile({ content, id });
      } else if (secondTile.content === null && firstTile.id !== id) {
        setSecondTile({ content, id });
      }
    },
    [firstTile, secondTile, setFirsTile, setSecondTile]
  );

  useEffect(() => {
    if (firstTile.content !== null && secondTile.content !== null) {
      if (firstTile.content === secondTile.content) {
        setIsMatch({ tiles: [firstTile, secondTile], match: true });
      } else {
        setIsMatch({
          tiles: [firstTile, secondTile],
          match: false,
        });
      }
      resetSelection();
    }
  }, [firstTile, secondTile, setIsMatch]);

  return { isMatch, resetMatch, addCurrentTile };
};
