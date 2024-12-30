import {
  updateChartData,
  updateTodoStatus,
  updateElapsedTime,
  disableTodo,
} from "./index";
import Swal from "sweetalert2";

/**
 * Handles the checkbox change event of a todo item.
 * If the checkbox is checked, this function will update the todo status
 * to completed and update the chart data. If the checkbox is unchecked,
 * this function will update the todo status to uncompleted and update
 * the chart data. If the checkbox is disabled, this function will
 * show a warning message.
 *
 * @param {HTMLElement} checkboxElement The checkbox element that was changed.
 */
export function handleCheckboxChange(checkboxElement) {
  const todoElement = checkboxElement.closest(".todo");
  const todoId = parseInt(todoElement.id, 10);
  const isChecked = checkboxElement.checked;

  // If the checkbox is disabled, show a warning message
  if (checkboxElement.classList.contains("disabled")) {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "You can't uncheck this todo!",
    });
    return;
  }

  // Update the checkbox attribute to reflect the new state
  checkboxElement.setAttribute("data-check", isChecked ? "true" : "false");

  // Update the todo status to completed or uncompleted
  updateTodoStatus(todoId, isChecked);

  // Update the elapsed time for the todo
  updateElapsedTime();

  // Update the chart data
  updateChartData();

  // Disable the todo
  disableTodo(todoId);
}

