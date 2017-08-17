function Card(name, image) {
	this.name = name;
	this.image = image
}

function addToHand(card) {
	var elem = $('<li class="list-group-item card_list_item"></li>'),
		text = $('<span></span>').text(card.name),
		icon = $('<i class="glyphicon glyphicon-remove"></i>'),
		button = $('<button onclick="removeFromHand(\'' + card.name + '\')" type="button" class="btn pull-right mywell"></button>'),
		elem2 = $('<li class="list-inline-item"></li>'),
		div = $('<div class="card_in_hand container"></div>'),
		img = $('<img name="' + card.name +'">'),
		overlay = $('<div class="overlay"></div>');
	
	button.append(icon);
	elem.append(button);
	button.before(text);
	
	img.attr('src', card.image);
	elem2.append(div);
	div.append(img);
	overlay.append(button.clone().removeClass("pull-right"));
	div.append(overlay);
	
	$('#add_button').before(elem);
	$('#img_list').append(elem2);
	$('.modal-footer button').click();
}

function removeFromHand(name) {
	$('#cards_in_hand .card_list_item:contains('+name+')').remove();
	$('#img_list .card_in_hand img[name="'+ name +'"]').parent().remove();
}