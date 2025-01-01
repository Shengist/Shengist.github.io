const abGame = (function () {
  //抓取文件元素
  const input_ab = document.querySelector(".form-control");
  const result_ab = document.querySelector(".list-group");

  //變數宣告
  var answer_ab = [];
  var check = [];
  var correct_a = 0;
  var correct_b = 0;

  //宣告handler函數
  const resetHandler = function () {
    input_ab.value = "";
  };
  const rebootHandler = function () {
    input_ab.value = "";
    result_ab.innerHTML += `<li class="list-group-item">Reboot</li>`;
    init_ab();
  };
  const confirmHandler = function () {
    if (input_ab.value.length != 4) {
      alert("請輸入四位數字");
      input_ab.value = "";
      return;
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (input_ab.value[i] == answer_ab[j]) {
          if (check.includes(answer_ab[j])) {
            alert("請輸入四個皆不相同的數字");
            input_ab.value = "";
            correct_a = 0;
            correct_b = 0;
            check = [];
            return;
          }
          if (i == j) {
            correct_a += 1;
          } else {
            correct_b += 1;
          }
          check[i] = answer_ab[j];
          // console.log(check[i]);
        }
      }
    }
    if (correct_a == 4) {
      alert("恭喜答對");
    }
    result_ab.innerHTML += `<li class="list-group-item">猜測數值：${input_ab.value}，結果是：${correct_a}a${correct_b}b</li>`;
    correct_a = 0;
    correct_b = 0;
    input_ab.value = "";
  };
  //初始化
  document.addEventListener("DOMContentLoaded", function () {
    init_ab();
  });

  //為鍵盤綁定click
  document
    .querySelectorAll("#number")
    .forEach((BUTTON) => BUTTON.addEventListener("click", clickFn));
  //設定reset
  document.querySelector("#reset").addEventListener("click", resetHandler);
  //設定reboot
  document.querySelector("#reboot").addEventListener("click", rebootHandler);

  //設定confirm
  document.querySelector("#confirm").addEventListener("click", confirmHandler);

  //輸入數字的函數
  function clickFn(e) {
    input_ab.value += `${e.currentTarget.innerText}`;
  }

  //亂數函數
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  //初始化函數
  function init_ab() {
    answer_ab = [];
    check = [];
    correct_a = 0;
    correct_b = 0;
    for (var a = 0; a < 4; a++) {
      var num = getRandomInt(0, 9);
      while (a != 0 && answer_ab.includes(num)) {
        num = getRandomInt(0, 9);
        if (!answer_ab.includes(num)) {
          break;
        }
      }
      answer_ab[a] = num;
    }
    // answer_ab.forEach((x) => console.log(x));
    console.log(answer_ab.join());
  }

  function destroy() {
    // 移除事件監聽器 (使用相同的函式參考)
    document
      .querySelectorAll("#number")
      .forEach((BUTTON) => BUTTON.removeEventListener("click", clickFn));
    document.querySelector("#reset").removeEventListener("click", resetHandler);
    document
      .querySelector("#reboot")
      .removeEventListener("click", rebootHandler);
    document
      .querySelector("#confirm")
      .removeEventListener("click", confirmHandler);

    // 重置變數
    answer_ab = null;
    check = null;
    correct_a = null;
    correct_b = null;

    // 清空 input 和 result 元素
    input_ab.value = "";
    result_ab.innerHTML = "";
  }
  function initializeScript() {
    // 定義 initializeScript
    init_ab(); // 呼叫 init_ab
    return { destroy: destroy }; // 回傳包含 destroy 方法的物件
  }
  return {
    init_ab: init_ab,
    destroy: destroy,
  };
  window.initializeScript = initializeScript;
})();
