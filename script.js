// ============================
// ToDo List
// 15-09-2022 By Adnane Qassiri
// ============================

// Variables Declaration
let inputBtn = document.getElementById("tasks-input");
let submitBtn = document.getElementById("submit-btn");
let tasksList = document.getElementById("tasks-list");
let form = document.getElementById("form");
if (window.localStorage.data === undefined) {
  var data = {};
} else {
  var data = JSON.parse(window.localStorage.data);
  // calling the function on start
  function displayOld() {
    console.log(Object.values(data));
    Object.values(data).forEach((el) => {
      let divEl = document.createElement("div");
      let deleteBtn = document.createElement("button");
      let spanEl = document.createElement("span");
      deleteBtn.append("DELETE");
      deleteBtn.className = "delete-btn";
      spanEl.append(el);
      divEl.append(spanEl);
      divEl.append(deleteBtn);
      tasksList.appendChild(divEl);
    });
    // calling the delete btn
    deleteBtn();
  }
  displayOld();
}

// for blocking the submit event
form.addEventListener("submit", (el) => {
  el.preventDefault();
});

// onclick on submit btn
submitBtn.addEventListener("click", () => {
  // adding the input Value to the data
  if (inputBtn.value !== "") {
    data[`${inputBtn.value}`] = inputBtn.value;
    window.localStorage.setItem("data", JSON.stringify(data));
  }
  // calling the display function for displaying the new ele
  display(inputBtn.value);
  // calling the delete btn on any click
  deleteBtn();
  // initializing the input value after the click on submit button
  inputBtn.value = "";
});

// function responsable for displaying new elements
function display(inputV) {
  if (inputV !== "") {
    // creating the elements and pushing the values to them
    let divEl = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let spanEl = document.createElement("span");
    deleteBtn.append("DELETE");
    deleteBtn.className = "delete-btn";
    spanEl.append(inputBtn.value);
    divEl.append(spanEl);
    divEl.append(deleteBtn);
    tasksList.appendChild(divEl);
  }
}

// Function responsable for the delete button
function deleteBtn() {
  // calling the data object from local
  data = JSON.parse(window.localStorage.data);
  document.querySelectorAll(".delete-btn").forEach((el) => {
    el.addEventListener("click", () => {
      // deleting the div
      el.parentElement.remove();
      // deleting the ele from the object
      delete data[`${el.previousElementSibling.innerText}`];
      // turning back the object to the local
      window.localStorage.data = JSON.stringify(data);
    });
  });
}
