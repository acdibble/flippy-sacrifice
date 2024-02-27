import { useMemo } from 'react';

export default function Rain() {
  const children = useMemo(() => {
    let increment = 0;
    let nodes = [];

    while (increment < 95) {
      let randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
      let randoFiver = Math.floor(Math.random() * (4 - 2 + 1) + 2);
      increment += randoFiver;

      nodes.push(
        <div
          className="drop"
          style={{
            left: `${increment}%`,
            bottom: `${randoFiver + randoFiver - 1 + 100}%`,
            animationDelay: `0.${randoHundo}s`,
            animationDuration: `0.5${randoHundo}s`,
          }}
        >
          <div
            className="stem"
            style={{
              animationDelay: `0.${randoHundo}s`,
              animationDuration: `0.5${randoHundo}s`,
            }}
          />
          <div
            className="splat"
            style={{
              animationDelay: `0.${randoHundo}s`,
              animationDuration: `0.5${randoHundo}s`,
            }}
          />
        </div>,
      );
    }

    return nodes;
  }, []);

  return <div className="rain">{children}</div>;
}
