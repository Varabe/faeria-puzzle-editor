from collections import namedtuple
import os


LAND_FIELDS = 5, 6, 7, 8
USELESS_CARD_FIELDS = 15, 14, 13, 12, 4
IMAGE_TEMPLATE = "/static/cards/English/%s.png"
IMAGE_NOT_FOUND = "/static/cards/notfound.png"
Card_metaclass = namedtuple("Card", field_names="id color name type faeria lake forest mountain desert power life rarity image")
""" all_card_fields = "id color name type gold faeria lake forest mountain desert power life text codex count_in_codex codex_id rarity" """

def Card(card_fields):
	for field_id in LAND_FIELDS:
		card_fields[field_id] = card_fields[field_id] or "0"
	for field_id in USELESS_CARD_FIELDS:
		card_fields.pop(field_id)
	card_id = formatId(card_fields[0])
	card_fields.append(getImage(card_id))
	return Card_metaclass(*card_fields)


def formatId(raw_card_id):
	card_id = str(raw_card_id)
	size = len(card_id)
	if size == 1:
		return "00%s" % card_id
	elif size == 2:
		return "0%s" % card_id
	else:
		return card_id


def getImage(card_id):
	django_path = IMAGE_TEMPLATE % card_id
	real_path = "frontend" + django_path
	if not os.path.exists(real_path):
		django_path = IMAGE_NOT_FOUND
	return django_path