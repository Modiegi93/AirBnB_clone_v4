$(document).ready(function) () {
	const amen = {}
	$('input:checkbox').click(function () {
		$(this).each(function () {
			if (this.checked) {
				amen[$(this).data('id')] = $(this).data('name');
			} else {
				delete amen[$(this).data('id')];
			}
		});
		if (Object.values(amen).length > 0) {
			$('.amenities h4').text(Object.values(amen).join(', '));
		} else {
			$('.amenities h4').html('&nbsp');
		}
	});
});
