import React, { useState } from "react";

export default function useVisualMode(initial) {
  // Original code
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) {
    if (replace) {
      setHistory(() => [...history.slice(0, history.length - 1)]);
    }
    setHistory(() => [...history, next]);
    setMode(next);
  }

  function back() {
    if ((history.length = 1)) {
      return;
    }
    setHistory(() => [...history.slice(0, history.length - 1)]);
    setMode(history.length - 1);
  }

  return { mode, transition, back };
}

// const state = {
//   elements: [initialMode],
//   currentElement: initialMode,
// };

// const push = (newEl) => {
//   state.elements = [...state.elements, newEL];
//   state.currentElement = newEl;
// };

// test("useVisualMode should return to previous mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.transition(SECOND));
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.transition(THIRD));
//   expect(result.current.mode).toBe(THIRD);

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(FIRST);
// });

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition() {
//     /* ... */
//   }
//   function back() {
//     /* ... */
//   }

//   return { mode, transition, back };
// }

// function transition(mode, replace = false) {
//   /* ... */
// }
