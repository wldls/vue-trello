import dragula from "dragula";
import "dragula/dist/dragula.min.css";

const dragger = {
  init(container, options) {
    return dragula([...container], options);
  },
  siblings({ el, wrapper, candidates, type }) {
    const curId = el.dataset[type + "Id"] * 1;

    let prev = null;
    let next = null;

    candidates.forEach((el, idx, arr) => {
      const id = el.dataset[type + "Id"] * 1;
      // card id가 target card의 id와 동일할 때 앞 뒤의 카드 계산
      if (id === curId) {
        // target card가 맨 앞에 있는 것이 아니라면 이전 카드의 데이터 값 계산
        prev =
          idx > 0
            ? {
                id: arr[idx - 1].dataset[type + "Id"] * 1,
                pos: arr[idx - 1].dataset[type + "Pos"] * 1
              }
            : null;

        // target card가 맨 마지막에 있는 것이 아니라면 다음 카드의 데이터 값 계산
        next =
          idx < arr.length - 1
            ? {
                id: arr[idx + 1].dataset[type + "Id"] * 1,
                pos: arr[idx + 1].dataset[type + "Pos"] * 1
              }
            : null;
      }
    });

    return { prev, next };
  }
};

export default dragger;
