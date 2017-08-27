import os


LAND_FIELDS = 4, 5, 6, 7, 8, 9
IMAGE_TEMPLATE = "/static/cards/English/{card_id}.png"
IMAGE_NOT_FOUND = "/static/cards/notfound.png"
CARD_KEYS = (
	"id", "color", "name", "type", "wild", "faeria",
	"lake", "forest", "mountain", "desert", "power", "life",
	"text", "codex", "count_in_codex", "codex_id", "rarity", "image"
)


def Card(card_values): # as if it was a class, lol
	for value_id in LAND_FIELDS:
		if not card_values[value_id]:
			card_values[value_id] = "0"
	card_id = format_id(card_values[0])
	card_values.append(get_image(card_id))
	return dict(zip(CARD_KEYS, card_values))


def format_id(raw_card_id):
	card_id = str(raw_card_id)
	size = len(card_id)
	if size == 1:
		return "00{}".format(card_id)
	elif size == 2:
		return "0{}".format(card_id)
	else:
		return card_id


def get_image(card_id):
	django_path = IMAGE_TEMPLATE.format(card_id=card_id)
	real_path = "frontend" + django_path
	if not os.path.exists(real_path):
		django_path = IMAGE_NOT_FOUND
	return django_path
