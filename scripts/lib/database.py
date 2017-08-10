from csv import reader as csv_reader
from collections import namedtuple

from scripts.lib.errors import DatabaseError


CardInfo = namedtuple("CardInformation", rename=True, field_names="id color name type _ std_faeria lake mountain forest desert std_power std_life effects _ count_in_codex codex_id rarity")

class Database:
	def __init__(self, path):
		self.path = path
		self.contents = self._getContents()

	def getByField(self, field, value):
		for card in self.contents:
			if card.__getattribute__(field) == value:
				return card
		else:
			raise DatabaseError("Field '{}' with value '{}' not found".format(field, value))

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
		with open(self.path, newline='') as csvfile:
			reader = csv_reader(csvfile, delimiter=';')
			return tuple(CardInfo(*row) for row in reader)