from PIL import Image, ImageDraw
from lib.errors import PropertyError


class ImageProperty:
	box = None
	x = y = None
	font = None
	color = None
	state = None
	image = None
	states = {}
	def __init__(self, value, parent):
		self.value = value
		self.parent = parent

	def get(self):
		return self.value

	def set(self, value=None, state="std"):
		self.state = state
		if value is not None:
			self.value = value
			image = self.getImage(state).copy()
			if self.font is not None is not self.color:
				self._putTextOnImage(image)
		else:
			image = self.getImage(state)
		self.parent.image.paste(image, self.box, mask=image)

	def getImage(self, state):
		if self.image is None:
			self._checkState(state)
			return self.states[state]
		else:
			return self.image

	def getXOffset(self): return 0
	def getYOffset(self): return 0

	def _checkState(self, state):
		if state not in self.states:
			raise PropertyError(f"Property state '{state}' not found.")

	def _putTextOnImage(self, image):
		x, y, = self.x, self.y
		x += self.getXOffset()
		y += self.getYOffset()
		draw = ImageDraw.Draw(image)
		draw.text((x, y), str(self.value), self.color, self.font)
		ImageDraw.Draw(image)
