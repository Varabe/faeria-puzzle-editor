# from PIL import Image, ImageFont, ImageDraw
# from lib.properties import ImageProperty


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



