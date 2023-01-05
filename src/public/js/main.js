const deleteBtn = document.querySelectorAll(".delete-btn");
const selectAll = $("#select-all");
const productItemCheckbox = $('input[name="productIds"]');
const actionSelect = $('select[name="action"]')
const submitBtnTrashForm = $('.submit-btn-trash-form')
const trashForm = $('.trash-form')

console.log(submitBtnTrashForm);


deleteBtn.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    if (!window.confirm("Bạn muốn xóa khóa học này ?")) {
      e.preventDefault();
    } else return;
  });
});


// check all when clicked
selectAll.change(function () {
  var isChecked = $(this).prop("checked");
  productItemCheckbox.prop("checked", isChecked);
  handleSubmitBtnTrashForm()
});


// handle when some one is selected
productItemCheckbox.change(function () {
  handleSubmitBtnTrashForm()
  const selectedCount = $('input[name="productIds"]:checked').length
  const allOfCheckboxesLength = productItemCheckbox.length

  const isCheckedAllItem = selectedCount === allOfCheckboxesLength
  selectAll.prop("checked", isCheckedAllItem);
});

actionSelect.change(function() {
  handleSubmitBtnTrashForm()
})


// handel submitbtn
const handleSubmitBtnTrashForm = function () {
  const selectedCount = $('input[name="productIds"]:checked').length
  const actionSelect = $('select[name="action"]')
  // console.log(selectedCount);
  if (selectedCount > 0 && actionSelect.prop('value') !== '') {
    submitBtnTrashForm.attr('disabled', false)
  } 
  // else if (actionSelect.prop("value") === '') {
  //   actionSelect.first().focus()
  //   e.preventDefault();

  // }
  else {
    submitBtnTrashForm.attr('disabled', true)

  }
}

//validator form
// trashForm.on('submit', function (e) {
//   const actionSelect = $('select[name="action"]')
//   actionSelect.focus()
//   // console.log(actionSelect.prop('value'));
//   if (actionSelect.prop('value') === '') {
//     actionSelect.focus()
//     e.preventDefault()
//   }
// }
// )
