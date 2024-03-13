$(document).ready(function () {
  const checkedA = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedA[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedA[$(this).data('id')];
    }
    const lst = Object.values(checkedA);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(checkedA).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
