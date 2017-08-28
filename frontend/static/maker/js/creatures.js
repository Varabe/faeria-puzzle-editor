
	
function setCreature(card) {
	$.jCanvas.defaults.fromCenter = false;
	$('#creatureCanvas').drawImage({
		'source': card.image,
		'x': 0,
		'y': 0
	});
}