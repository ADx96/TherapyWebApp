export const tabVariant = {
  active: {
    width: "55%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  inactive: {
    width: "15%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

export const tabTextVariant = {
  active: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: -30,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.1,
    },
    transitionEnd: { display: "none" },
  },
};

export const tabContentVariant = {
  active: {
    opacity: 1,
    x: 1,
    display: "block",
    transition: {
      type: "tween",
      duration: 0.4,
      delay: 0.2,
    },
  },
  inactive: {
    opacity: -2,
    x: 0,
    transition: {
      type: "Orchestration",
      duration: 0.3,
    },
    transitionEnd: { display: "none" },
  },
};
