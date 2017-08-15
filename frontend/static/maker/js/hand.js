function Card(name, image) {
	this.name = name;
	this.image = image
}

function addToHand(card) {
	var elem = $('<li class="list-group-item"></li>').text(card.name),
		elem2 = $('<li class="list-inline-item"></li>'),
		img = $('<img class="card_in_hand">');
	img.attr('src', card.image);
	elem2.append(img);
	$('#add_button').before(elem);
	$('#img_list').append(elem2);
	$('.modal-footer button').click();
}