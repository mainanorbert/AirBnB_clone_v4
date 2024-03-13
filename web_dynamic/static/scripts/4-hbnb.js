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
  $.get('http://0.0.0.0:5001/api/v1/status/',
    function (data) {
      if (data.status === 'OK') {
        $('div#api_status').toggleClass('available', true);
      }
    });
	 $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: '{}',
    success: function (response) {
      for (const d of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${d.name}</h2>`,
        `<div class="price_by_night">$${d.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${d.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${d.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${d.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${d.description}`,
        '</div>',
        '</article>'];
        $('section.places').append(article.join(''));
      }
    },
    error: function (e) {
      console.log(e);
    }
  });

  $('button.btn').on('click', function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ amenities: Object.keys(checkedA) }),
      success: function (response) {
        $('section.places').empty();
        for (const d of response) {
          const article = ['<article>',
            '<div class="title_box">',
        `<h2>${d.name}</h2>`,
        `<div class="price_by_night">$${d.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${d.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${d.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${d.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${d.description}`,
        '</div>',
        '</article>'];
          $('section.places').append(article.join(''));
        }
      },
      error: function (e) {
        console.log(e);
      }
    });
  });
});
