const paGame = (function () {
  //抓取文件元素
  const input_pa = document.querySelector(".form-control");
  const result_pa = document.querySelector(".list-group");

  //宣告元素
  var answer_pa;
  var startnum;
  var endnum;
  //宣告handler函數
  const resetHandler = function () {
    input_pa.value = "";
  };
  const rebootHandler = function () {
    input_pa.value = "";
    result_pa.innerHTML += `<li class="list-group-item">Reboot</li>`;
    init_pa();
  };
  const confirmHandler = function () {
    if (input_pa.value > startnum && input_pa.value < answer_pa) {
      startnum = input_pa.value;
    } else if (input_pa.value < endnum && input_pa.value > answer_pa) {
      endnum = input_pa.value;
    } else if (input_pa.value > endnum || input_pa.value < startnum) {
      alert("請輸入範圍內數字");
      input_pa.value = "";
      return;
    } else if (input_pa.value == answer_pa) {
      alert("恭喜答對");
      init_pa();
      return;
    }
    result_pa.innerHTML += `<li class="list-group-item">你猜測了${input_pa.value},沒猜到喲！<br />目前的數字區間為：${startnum}~${endnum}</li>`;
    input_pa.value = "";
  };

  //初始化
  document.addEventListener("DOMContentLoaded", function () {
    init_pa();
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
    input_pa.value += `${e.currentTarget.innerText}`;
  }

  //亂數函數
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  //初始化函數
  function init_pa() {
    input_pa.value = "";
    startnum = 1;
    endnum = 100;
    answer_pa = getRandomInt(1, 100);
    console.log(answer_pa);
    result_pa.innerHTML = "";
    result_pa.innerHTML += `<li class="list-group-item">目前數字區間：${startnum}~${endnum}</li>`;
  }
})();
