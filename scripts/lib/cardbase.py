from csv import reader as csv_reader
from collections import namedtuple
import os

from scripts.lib.errors import CardbaseError


USELESS_CARD_FIELDS = 15, 14, 13, 12, 4 
IMAGE_TEMPLATE = "/static/cards/English/%s.png"
IMAGE_NOT_FOUND = "/static/cards/notfound.png"
Card = namedtuple("Card", field_names="id color name type faeria lake mountain forest desert power life rarity image")


class Cardbase:
	def __init__(self, path):
		self.path = path
		self.contents = self._getContents()

	def getByField(self, field, value):
		for card in self.contents:
			if card.__getattribute__(field) == value:
				return card
		else:
			raise CardbaseError("Field '{}' with value '{}' not found".format(field, value))

	def getById(self, card_id):
		return self.getByField("id", card_id)

	def getByName(self, card_name):
		return self.getByField("name", card_name)

	def getAll(self, field=None, value=None):
		data = self.contents
		if field is not None and value is None:
			return [card.__getattribute__(field) for card in data]
		elif field is not None and value is not None:
			cards = [c for c in data if c.__getattribute__(field) == value]
			return cards
		else:
			return data

	def _getContents(self):
		with open(self.path) as csvfile:
			reader = csv_reader(csvfile, delimiter=';')
			return tuple(extractCard(row) for row in reader)


""" all_card_fields = "id color name type _ faeria lake mountain forest desert power life effects _ count_in_codex codex_id rarity" """
def extractCard(fields):
	for field in USELESS_CARD_FIELDS:
		fields.pop(field)
	card_id = formatId(fields[0])
	fields.append(getImage(card_id))
	return Card(*fields)


def formatId(card_id):
	card_id = str(card_id)
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
