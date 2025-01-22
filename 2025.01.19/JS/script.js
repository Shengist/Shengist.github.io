///變數宣告
let todoList = [];
let todayDate, hlDate;
const addBtn = document.querySelector("#add_btn");
const todoListHtml = document.querySelector("#todoList");
const dateListHtml = document.querySelector("#dateList");
const todayHtml = document.querySelector("#todayDateSpan");
const allTodoListHtml = document.querySelector("#allTodoList");
///初始化相關----------------------------------
//DOM載入
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  renderToday();
  renderingTodoListArray();
  renderingDateList(todayDate);
  renderingTodoList(todoList);
});

//渲染test測試資料
function renderTestdata() {
  let date = new Date();
  date = Intl.DateTimeFormat("sv-SE").format(date);
  let time = new Date();
  console.log(time.getMinutes() < 10);
  if (time.getHours() < 10 && time.getMinutes() > 10) {
    time = "0" + time.getHours() + ":" + time.getMinutes();
  } else if (time.getHours() < 10 && time.getMinutes() < 10) {
    time = "0" + time.getHours() + ":0" + time.getMinutes();
  } else if (time.getHours() > 10 && time.getMinutes() < 10) {
    time = time.getHours() + ":0" + time.getMinutes();
    console.log(time);
  } else {
    time = time.getHours() + ":" + time.getMinutes();
  }

  let timestamp = Date.now();
  for (let i = 0; i < 5; i++) {
    todoList.push({
      timestamp: `${(parseInt(timestamp, 10) + i).toString()}`,
      date: `${date}`,
      time: `${time}`,
      content: `${i}`,
    });
  }
  saveTodoListToStorage(todoList);
  renderingTodoListArray();
  renderingTodoList(todoList);
  console.log(todoList);
  // todoList = [{
  //     timestamp: "1737462317349",
  //     date: "2025-01-21",
  //     time: "20:25",
  //     content: "s",
  // }]
  // console.log(date, time, timestamp);
}

//渲染TodoListArray
function renderingTodoListArray() {
  todoList = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let parsedValue = JSON.parse(value);
    todoList.push({ timestamp: key, ...parsedValue });
  }
}

//時間初始化
function renderToday() {
  todayDate = new Date();
  hlDate = new Date(todayDate);
  displayDate = Intl.DateTimeFormat("sv-SE").format(todayDate);
  todayHtml.innerText = `今天日期為:${displayDate}`;
}

///---------------------------------------------------
//新增按鈕的功能
addBtn.addEventListener("click", function (event) {
  // console.log(document.getElementById("formContent").value);
  let vaild=true;
  let date = document.getElementById("formDate").value;
  date = new Date(date);
  date = Intl.DateTimeFormat("sv-SE").format(date);
  let time = document.getElementById("formDate").value;
  time = time.split("T")[1];
  // console.log(time);
  let content = document.getElementById("formContent").value;
  // if ()
  if(vaild){
    todoList.push({
      timestamp: `${Date.now()}`,
      date: `${date}`,
      time: `${time}`,
      content: `${content.toString()}`,
    });
  }
  saveTodoListToStorage(todoList);
  renderingTodoList(todoList);
  console.log(Date.now());
  console.log(todoList);
});

//將資料存入localStorage
function saveTodoListToStorage(todoList) {
  const json = JSON.stringify(todoList);
  todoList.map((x) =>
    localStorage.setItem(
      x.timestamp,
      JSON.stringify({ date: x.date, time: x.time, content: x.content })
    )
  );
}

///待辦事項相關----------------------------------
//渲染todoList
function renderingTodoList(todoList) {
  todoListHtml.innerHTML = "";
  todoList.forEach((item, idx) => {
    const selectday = document.querySelector(".active");
    // console.log(selectday.innerText);
    if (
      item.date.toString().includes(selectday.innerText.replace(/\s+/g, ""))
    ) {
      const todoItem = document.createElement("button");
      todoItem.classList.add("list-group-item", "list-group-item-action");
      todoItem.setAttribute("type", "button");
      todoItem.setAttribute("data-bs-toggle", "modal");
      todoItem.setAttribute("data-bs-target", "#exampleModal");
      todoItem.setAttribute("onclick", "renderingModal(event)");
      //
      todoItem.setAttribute("data-timestamp", `${item.timestamp}`);
      todoItem.setAttribute("data-date", `${item.date}`);
      todoItem.setAttribute("data-time", `${item.time}`);
      todoItem.setAttribute("data-content", `${item.content}`);
      // console.log(`${item.content}`);
      todoItem.innerText = `開始時間：${item.time}，預定事項：${item.content}`;
      todoListHtml.innerHTML += todoItem.outerHTML;
    }
  });
}
//清除todoList
function clearTodoList() {
  todoListHtml.innerHTML = "";
  localStorage.clear();
  todoList = [];
  renderingTodoListArray();
  renderingTodoList(todoList);
}
//渲染總清單
function renderingAllTodoList() {
  allTodoListHtml.innerHTML = "";
  console.log(todoList);
  todoList.forEach((item, idx) => {
    const todoItem = document.createElement("button");
    todoItem.classList.add(
      "list-group-item",
      "list-group-item-action",
      "my-1",
      "border"
    );
    todoItem.setAttribute("type", "button");
    todoItem.setAttribute("data-bs-toggle", "modal");
    todoItem.setAttribute("data-bs-target", "#exampleModal");
    todoItem.setAttribute("onclick", "renderingModal(event)");
    //
    todoItem.setAttribute("data-timestamp", `${item.timestamp}`);
    todoItem.setAttribute("data-date", `${item.date}`);
    todoItem.setAttribute("data-time", `${item.time}`);
    todoItem.setAttribute("data-content", `${item.content}`);
    todoItem.innerText = `日期：${item.date}，開始時間：${item.time}，預定事項：${item.content}`;
    allTodoListHtml.innerHTML += todoItem.outerHTML;
  });
}
///Modal相關----------------------------------
//渲染Modal
function renderingModal(event) {
  // console.log(event.target.innerHTML.includes("日期"));
  let content = event.target.dataset.content;
  let timestamp = event.target.dataset.timestamp;
  let date = event.target.dataset.date;
  let time = event.target.dataset.time;

  document.querySelector("#modal1Label").innerText = `詳細資料(${timestamp})`;
  document
    .querySelector("#modal1Label")
    .setAttribute("data-timestamp", `${timestamp}`);
  document.querySelector(
    "#modal1-body"
  ).innerHTML = ` <div><span>日期:</span><input type="date" id="modalDateInput" disabled value="${date}"></input>&nbsp;<i class="fa-solid fa-pencil" onclick="editModal(event)"></i><br></div>
 <div><span>時間：</span><input type="time" id="modalTimeInput" disabled value="${time}"></input>&nbsp;
 <i class="fa-solid fa-pencil" onclick="editModal(event)"></i></div>
 <div><span>待辦事項:</span><input id="modalTodoInput" disabled value="${content}"></input>&nbsp;
 <i class="fa-solid fa-pencil" onclick="editModal(event)"></i></div>`;
}

//將資料庫提取的時間轉為標準格式
// function convertTo24HourFormat(event) {
//     let time = event.target.innerText.split("，")[0].split("：")[1];
//     let hour = parseInt(time.slice(2, 4), 10);
//     // console.log(hour, typeof hour);
//     if (time.slice(0, 2) == "上午") {
//         if (hour == 12) {
//             hour = "00";
//         } else if (hour < 10) {
//             hour = "0" + hour;
//         }
//     } else {
//         hour += 12;
//         if (hour == 24) {
//             hour = "12";
//         }
//     }
//     if (time.slice(4)[0].includes(":")) {
//         time = hour + ":" + time.slice(5);
//     } else {
//         time = hour + ":" + time.slice(4);
//     }
//     return time;
// }

//將頁面提取的日期改為標準格式
function formatDate(dateString) {
  const date = new Date(dateString); // 將字串轉為 Date 物件
  const year = date.getFullYear(); // 取得年份
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份補零 (getMonth() 從 0 開始)
  const day = date.getDate().toString().padStart(2, "0"); // 日期補零
  return `${year}-${month}-${day}`; // 格式化成 YYYY-MM-DD
}

//開啟輸入框
function editModal(event) {
  // console.log(event.target.parentElement);
  let vaild = event.target.parentElement
    .querySelector("input")
    .hasAttribute("disabled");
  if (vaild) {
    event.target.parentElement
      .querySelector("input")
      .removeAttribute("disabled");
    console.log("1", event.target.parentElement);
  } else {
    event.target.parentElement
      .querySelector("input")
      .setAttribute("disabled", "");
    console.log("1", event.target.parentElement);
  }
}

//刪除資料
function deleteModal(event) {
  const timestamp =
    event.target.parentElement.parentElement.querySelector(".modal-title")
      .dataset.timestamp;
  const content =
    event.target.parentElement.parentElement.querySelector(
      "#modalTodoInput"
    ).value;
  const time =
    event.target.parentElement.parentElement.querySelector(
      "#modalTimeInput"
    ).value;
  const date =
    event.target.parentElement.parentElement.querySelector(
      "#modalDateInput"
    ).value;
  const idx = todoList.findIndex(
    (x) =>
      x.content === content && x.date.includes(date) && x.date.includes(date)
  );
  todoList.splice(idx, 1);
  localStorage.removeItem(timestamp);
  renderingTodoListArray();
  renderingTodoList(todoList);
}

//儲存修改資料
function saveModal(event) {
  const timestamp =
    event.target.parentElement.parentElement.querySelector(".modal-title")
      .dataset.timestamp;
  const content =
    event.target.parentElement.parentElement.querySelector(
      "#modalTodoInput"
    ).value;
  const time =
    event.target.parentElement.parentElement.querySelector(
      "#modalTimeInput"
    ).value;
  const date =
    event.target.parentElement.parentElement.querySelector(
      "#modalDateInput"
    ).value;
  const idx = todoList.findIndex(
    (x) =>
      x.content === content && x.date.includes(date) && x.date.includes(date)
  );
  todoList.splice(idx, 1);
  todoList.push({
    timestamp: `${timestamp}`,
    date: `${date}`,
    time: `${time}`,
    content: `${content}`,
  });
  saveTodoListToStorage(todoList);
  renderingTodoListArray();
  renderingTodoList(todoList);
  console.log(date, time, content);
  console.log(todoList);
  // console.log(todoList.findIndex((x) => (x.content === content) && (x.date.includes(date)) && (x.date.includes(date))));
  // console.log(todoList.find((x) => (x.content === content) && (x.date.includes(date)) && (x.date.includes(date))));
}

///時間相關----------------------------------
//渲染DateList
function renderingDateList(date) {
  dateListHtml.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const dateItem = document.createElement("a");
    dateItem.setAttribute("onclick", "changeActiveDate(event)");
    dateItem.classList.add("list-group-item", "list-group-item-action");
    if (i === 0) {
      dateItem.setAttribute("aria-current", "true");
      dateItem.classList.add("active");
    }
    let displaydate = new Date(date);
    displaydate.setDate(date.getDate() + i);
    displaydate = Intl.DateTimeFormat("sv-SE").format(displaydate);
    dateItem.innerText = `${displaydate}`;
    dateListHtml.innerHTML += dateItem.outerHTML;
  }
}

//更換Datalist的active日期
function changeActiveDate(event) {
  // console.log(event.target);
  event.target.parentElement
    .querySelector(".active")
    .classList.remove("active");
  event.target.classList.add("active");
  renderingTodoList(todoList);
}

///更換Datalist顯示日期
//往前五天
function goPreviousDate() {
  hlDate.setDate(hlDate.getDate() - 5);
  // console.log(todayDate);
  renderingDateList(hlDate);
  renderingTodoList(todoList);
}
//往後五天
function goNextDate() {
  hlDate.setDate(hlDate.getDate() + 5);
  // console.log(todayDate);
  renderingDateList(hlDate);
  renderingTodoList(todoList);
}
//回到當天
function goTodayDate() {
  hlDate = new Date(todayDate);
  renderingDateList(hlDate);
  renderingTodoList(todoList);
}
