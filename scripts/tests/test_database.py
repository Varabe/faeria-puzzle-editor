from lib.database import Database



class TestDatabase:
	data = Database("data/cards/merlin_shortened.csv")

	def test_all_cards_have_images(self):
		id_list = []
		for card in self.data.getAll():
			card.openImage()
