import os

from csv import reader as csv_reader

from maker.scripts.cards.cardinfo import Card
from maker.scripts.errors import CardbaseError


class Cardbase:
	def __init__(self, path):
		self.path = path
		self.contents = self._get_contents()

	def get_by_field(self, field, value):
		for card in self.contents:
			if card.__getattribute__(field) == value:
				return card
		else:
			raise CardbaseError("Field '{}' with value '{}' not found".format(field, value))

	def get_by_id(self, card_id):
		return self.get_by_field("id", card_id)

	def get_by_name(self, card_name):
		return self.get_by_field("name", card_name)

	def get_all(self, field=None, value=None):
		data = self.contents
		if field is not None and value is None:
			return [card.__getattribute__(field) for card in data]
		elif field is not None and value is not None:
			cards = [c for c in data if c.__getattribute__(field) == value]
			return cards
		else:
			return data

	def _get_contents(self):
		if os.path.exists(self.path):
			with open(self.path) as csvfile:
				reader = csv_reader(csvfile, delimiter=';')
				return tuple(Card(row) for row in reader)
		else:
			raise CardbaseError(
				"{} does not exist. Please, download it again through 'cli.py update'".format(self.path))
