export const breakpoints = [550, 1300];
// export const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

export const mq = breakpoints.map(
  (bp, i) =>
    `${
      bp > 550
        ? `@media (min-width:${breakpoints[i - 1]}px) and (max-width: ${
            breakpoints[i]
          }px)`
        : `@media (max-width: ${bp}px)`
    }`
);

export const tvq = `@media (min-width:550px) and (max-width: 830px)`;
