import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  addBtnEl,
  todoInputEl,
  todoListEl,
  switchModeEl,
  addToDo,
  handleClick,
  loadTodos,
  createChart,
  updateChartData,
  disableCompletedAndExpiredTodosOnLoad,
} from "./modules";

// Execute functions when DOM is fully loaded
window.addEventListener("DOMContentLoaded", function () {
  disableCompletedAndExpiredTodosOnLoad();
  createChart(); // Set up the chart
  loadTodos(); // Load existing todos and refresh the chart
  todoInputEl.focus(); // Set focus on the input field
  initializeListeners(); // Set up event listeners for actions
});

// Set up event listeners for adding todos and handling interactions
function initializeListeners() {
  addBtnEl.addEventListener("click", addToDo);
  todoListEl.addEventListener("click", handleClick);
}

// Toggle Dark Mode
switchModeEl.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("light");
  updateChartData();
}

// Initialize the date picker with Flatpickr
const datePicker = flatpickr("#todoDeadline", {
  enableTime: true,
  dateFormat: "Y-m-dTH:i",
  minDate: "today",
  disableMobile: "true",
});

// Set up event to open the date picker when the calendar icon is clicked
document
  .querySelector("#calendarIcon")
  .addEventListener("click", openDatePicker);

// Open the date picker programmatically
function openDatePicker() {
  datePicker.open();
}
