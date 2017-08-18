from PIL import Image
from PIL import ImageOps

""" Not safe to change numbers, they depend on each other """
STD_CROP_DIMENSIONS = 205, 0, 810, 1024
STD_THUMBNAIL_SIZE = 300, 507
CIRCLE_MASK = Image.open('mask.png').convert('L')


def resize(path, new_path=None):
	new_path = new_path or path
	image = Image.open(path)
	if (image.width, image.height) != STD_THUMBNAIL_SIZE:
		image = crop(image)
		thumbnail(image)
		image.save(new_path)
	image.close()


def cropToCircle(img):
	img = img.crop((0, 0, 1024, 900))
	img = ImageOps.crop(img, 340)
	img = ImageOps.fit(img, CIRCLE_MASK.size)
	img.putalpha(CIRCLE_MASK)
	return img


def crop(image, dims=STD_CROP_DIMENSIONS):
	try:
		return image.crop(dims)
	except OSError:
		raise OSError(image.filename + " is damaged")


def thumbnail(image, size=STD_THUMBNAIL_SIZE):
	image.thumbnail(size, Image.ANTIALIAS)


cropToCircle()
