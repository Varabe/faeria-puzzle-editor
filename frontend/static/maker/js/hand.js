


function Card(name, id, cost) {
	this.name = name;
	this.id = id;
	this.cost = cost;
	this.returnId = function() {
		if (this.id < 10) {
			return "00" + this.id;
		} else if (this.id < 100) {
			return "0" + this.id;
		} else {
			return this.id;
		}
	};
}

function addToHand(card) {
	var elem = $('<li class="list-group-item"></li>').text(card.name),
		elem2 = $('<li class="list-inline-item"></li>'),
		img = $('<img class="card_in_hand">');
	img.attr('src', '/static/cards/English/' + card.returnId() + '.png');
	elem2.append(img);
	$('#add_button').before(elem);
	$('#img_list').append(elem2);
	$('.modal-footer button').click();
}