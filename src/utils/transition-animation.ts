export function slideIn(element: Element, done: () => void) {
  const a = element.animate(
    [
      {
        opacity: 0,
        transform: "translateY(60px)",
      },
      {
        opacity: 1,
        transform: "translateY(0px)",
      },
    ],
    {
      duration: 500,
    }
  );
  a.finished.then(done);
}

export function slideOut(element: Element, done: () => void) {
  const a = element.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0px)",
      },
      {
        opacity: 0,
        transform: "translateY(60px)",
      },
    ],
    {
      duration: 250,
    }
  );
  a.finished.then(done);
}

export function fadeIn(element: Element, done: () => void) {
  const a = element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 250,
  });
  a.finished.then(done);
}

export function fadeOut(element: Element, done: () => void) {
  const a = element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 250,
  });
  a.finished.then(done);
}
