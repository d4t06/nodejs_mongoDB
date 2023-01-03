const deleteBtn = document.querySelectorAll(".delete-btn");

deleteBtn.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    if (!window.confirm("are you sure")) {
      e.preventDefault();
    } else return;
  });
});
