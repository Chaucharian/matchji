import { useCallback, useEffect, useState, useMemo } from "react";

export const useMatch = () => {
  const [firstTile, setFirsTile] = useState({ content: null, index: null });
  const [secondTile, setSecondTile] = useState({ content: null, index: null });
  const [isMatch, setIsMatch] = useState({
    content: null,
    match: false,
  });

  const resetMatch = () =>
    setIsMatch({
      content: null,
      match: null,
    });

  const resetSelection = () => {
    setFirsTile({ content: null, index: null });
    setSecondTile({ content: null, index: null });
  };

  const onValidateMatch = useCallback(
    ({ content, index }) => {
      if (firstTile.content === null) {
        setFirsTile({ content, index });
      } else if (secondTile.content === null && firstTile.index !== index) {
        setSecondTile({ content, index });
      }
    },
    [firstTile, secondTile, setFirsTile, setSecondTile]
  );

  useEffect(() => {
    if (firstTile.content !== null && secondTile.content !== null) {
      if (firstTile.content === secondTile.content) {
        setIsMatch({ content: firstTile.content, match: true });
      } else {
        setIsMatch({ content: null, match: false });
      }
      resetSelection();
    }
  }, [firstTile, secondTile, setIsMatch]);

  return { isMatch, resetMatch, onValidateMatch };
};
