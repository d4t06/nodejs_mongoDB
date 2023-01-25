const deleteBtn = document.querySelectorAll(".delete-btn");
const selectAll = $("#select-all");
const productItemCheckbox = $('input[name="productIds"]');
const actionSelect = $('select[name="action"]')
const submitBtnTrashForm = $('.submit-btn-trash-form')
const trashForm = $('.trash-form')
const logoutBtn = $('.logout-btn');
// console.log(logoutBtn)

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

  if (selectedCount > 0 && actionSelect.prop('value') !== '') {
    submitBtnTrashForm.attr('disabled', false)
  } 
  else {
    submitBtnTrashForm.attr('disabled', true)

  }
}

logoutBtn.click(function (e) {
  // console.log('click')
  if (!window.confirm("Bạn muốn đăng xuất ?")) {
    e.preventDefault()
  } else return;

})

