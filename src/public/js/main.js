const deleteBtn = document.querySelectorAll(".delete-btn");
const selectAll = $("#select-all");
const productItemCheckbox = $('input[name="select-item"]');

deleteBtn.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    if (!window.confirm("are you sure")) {
      e.preventDefault();
    } else return;
  });
});


// check all when clicked
selectAll.change(function () {
  var isChecked = $(this).prop("checked");
  productItemCheckbox.prop("checked", isChecked);
});


//when select-item changed
productItemCheckbox.change(function () {
  const isCheckedAllItem = $('input[name="select-item"]:checked').length === productItemCheckbox.length
  selectAll.prop("checked", isCheckedAllItem);

});
