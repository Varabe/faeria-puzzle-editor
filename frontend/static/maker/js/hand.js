

function Card(name, cost) {
	this.name = name;
	this.cost = cost;
}

function addToHand(card) {
	var elem = $('<li class="list-group-item"></li>').text(card.name);
	$('#add_button').before(elem);
	$('.modal-footer button').click();
}