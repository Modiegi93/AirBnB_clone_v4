$(document).ready(function) () {
	const amen = {};
	const states = {};
	const cities = {};

	$('input:checkbox').click(function () {
		if ($(this).hasClass('amenity')) {
			if (this.checked) {
				amen[$(this).data('id')] = $(this).data('name');
			} else {
				delete amen[$(this).data('id')];
			}
		}
	} else if ($(this).hasClass('state')) {
		if (this.checked) {
			states[$(this).data('id')] = $(this).data('name');
		} else {
			delete states[$(this).data('id')];
		}
	} else if ($(this).hasClass('city')) {
		if (this.checked) {
			cities[$(this).data('id')] = $(this).data('name')
		} else {
			delete cities [$(this).data('id')];
		}
	}
		const locs = [];
		for (const loc of Object.values(states).concat(Object.values(cities))) {
			locs.push(loc);
		}

		if (Object.values(amen).length > 0) || locs.length > 0) {
			$('.locations h4').text(locs.concat(Object.values(amen)).join(', '));
		} else {
			$('.locations h4').html('&nbsp');
		}
	});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
	console.log(data);
	if (data.status === 'OK') {
		$('DIV#api_status').addClass('available');
	} else {
		$('DIV#api_status').removeClass('available');
	}
});

const users = {};
$.getJSON('http://0.0.0.0:5001/api/v1/users', function (data) +{
	for (const user of data) {
		users[user.id] = user.first_name + ' ' + user.last_name;
	}
});

$('button').click(function () {
	console.log('clicked');
	const data = {
		amenities: Object.keys(amen),
		states: Object.keys(states),
		cities: Object.keys(cities)
	};

	$.ajax({
		type: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(),
		success: function (data) {
			$('section.places')empty();
			for (const place of Object.values(data)) {
				const user =users[place.user_id];
				$('section.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information">' + '<div class="max_guest">' + '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div>' + '<div class="number_rooms">' + '<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div>' + '<div class="number_bathrooms">' + '<i class="fa fa-bath fa-3x" aria-hidden+"true"></i><br />' + place.number_bathrooms + 'Bathrooms</div></div>' + '<div class="description">' + place.description + '</div></article>');
			}
		}
	});
});

$('div#show-reviews').click(function () {
	const id = $(this).data('id');
    	const showText = 'Show';
    	const hideText = 'Hide';
    	const reviews = $(`div[data-place-id="${id}"]`);
	if ($(this).text() === showText) {
		$(this).text(hideText);
$.ajax({
	type: 'GET',
        url: `http://0.0.0.0:5001/api/v1/places/${id}/reviews`,
        success: function (data) {
          reviews.empty();
          for (const review of data) {
            const date = new Date(review.created_at);
            const html = `<div class="review">
              <h3>${review.user.first_name} ${review.user.last_name}</h3>
              <div class="metadata">${date.toDateString()}</div>
              <div class="description">${review.text}</div>
            </div>`;
            reviews.append(html);
          }
        }
      });
    } else {
      $(this).text(showText);
      reviews.empty();
    }
  });
});

$.get('http://0.0.0.0:500
