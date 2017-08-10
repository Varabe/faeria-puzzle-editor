# from PIL import Image, ImageFont, ImageDraw
# from collections import namedtuple

# from lib.properties import ImageProperty
# from lib.errors import CardError


"""
	All the commonly-used fields are named same as in the game/wiki
	rename=True gives the always-empty fields "_" specific names in
	the form of "_index", for example "_4". Life and Power have an
	std_ prefix because in the actual cards user's going to change
	their values
"""
# card_font = ImageFont.truetype("/home/varabe/.fonts/truetype/Baskerville/LibreBaskerville-Bold.otf", 75)


# class CardProperty(ImageProperty):
# 	font = card_font
# 	color = (255, 255, 255)
# 	def getXOffset(self):
# 		value = self.value
# 		if 1 < value < 10:
# 			return -6
# 		elif value == 0:
# 			return -12
# 		elif value >= 10:
# 			return -26


# class Life(CardProperty):
# 	box = (655, 877)
# 	x, y = 38, -3
# 	image = Image.open("data/heart.png")


# class Power(CardProperty):
# 	box = (258, 834)
# 	x, y = 34, 43
# 	image = Image.open("data/power.png")


# class Faeria(CardProperty):
# 	box = (246, 181)
# 	x, y = 30, -1
# 	color = (0, 69, 96)
# 	image = Image.open("data/faeria.png")


# class Card(CardInfo):
# 	def __init__(self, *args):
# 		self.life = Life(self.std_life, parent=self)
# 		self.power = Power(self.std_power, parent=self)
# 		self.faeria = Faeria(self.std_faeria, parent=self)

# 	def openImage(self):
# 		id_ = formatId(self.id)
# 		try:
# 			self.image = Image.open(f"data/cards/English/{id_}.png")
# 		except FileNotFoundError as e:
# 			raise CardError(f"Card ID:{id_} image not found.") from e


def formatId(id_):
	id_ = str(id_)
	if len(id_) == 1:
		return "00%s" % id_
	elif len(id_) == 2:
		return "0%s" % id_
	else:
		return id_
