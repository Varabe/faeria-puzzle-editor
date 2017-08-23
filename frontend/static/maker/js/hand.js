var card_counter = 0;

function Card(id, image) {
	this.id = id;
	this.image = image;
	this.name = $('.card_list_item a[card_id=' + this.id + '] .text').text();
}

function addToHand(card) {
	var elem = $('<li class="list-group-item card_list_item"></li>'),
		text = $('<span></span>').text(card.name),
		icon = $('<i class="glyphicon glyphicon-remove"></i>'),
		button = $('<button onclick="removeFromHand(\'' + card_counter + '\')" type="button" class="btn pull-right mywell"></button>'),
		elem2 = $('<li class="list-inline-item"></li>'),
		div = $('<div class="card_in_hand container"></div>'),
		img = $('<img>'),
		overlay = $('<div class="overlay"></div>');
	
	elem.attr("card_counter", card_counter);
	elem2.attr("card_counter", card_counter);
	card_counter++;
	
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
	
	img.one("load", function() {
		handsize1.setText($('#img_list img').length); //+event elementChanged is dispatched
	});
}

function removeFromHand(number) {
	$('#cards_in_hand li[card_counter=' + number + ']').remove();
	$('#img_list li[card_counter=' + number + ']').remove();
	handsize1.setText($('#img_list img').length); //+event elementChanged is dispatched
}