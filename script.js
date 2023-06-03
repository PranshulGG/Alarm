// Initial References
let timerRef = document.querySelector(".timer-display");
const hourSelect = document.getElementById("hourSelect");
const minuteSelect = document.getElementById("minuteSelect");
const periodSelect = document.getElementById("periodSelect");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("./idk.mp3");

let alarmIndex = 0;

// Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

// Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

// Display Time
function displayTimer() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Convert to 12-hour format
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  // Append leading zeroes if necessary
  hours = appendZero(hours);
  minutes = appendZero(minutes);
  seconds = appendZero(seconds);

  // Display time
  timerRef.innerHTML = `${hours}:${minutes}:${seconds} ${period}`;

  // Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (
        `${alarm.alarmHour}:${alarm.alarmMinute}` ===
        `${hours}:${minutes}`
      ) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

// Create alarm div
const createAlarm = (alarmObj) => {
  // Keys from object
  const { id, alarmHour, alarmMinute, period } = alarmObj;
  // Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute} ${period}</span>`;

  // Checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  // Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

// Set Alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  // Alarm object
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourSelect.value}_${minuteSelect.value}`;
  alarmObj.alarmHour = hourSelect.value;
  alarmObj.alarmMinute = minuteSelect.value;
  alarmObj.period = periodSelect.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
});

// Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

// Stop Alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

// Delete Alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  alarmIndex = 0;
};
// ...
setAlarm.addEventListener("click", () => {
    // ...
  
    // Reset hour and minute selects to 0
    hourSelect.selectedIndex = 0;
    minuteSelect.selectedIndex = 0;
  
    // ...
  });
  // ...
  