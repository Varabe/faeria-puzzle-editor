from PIL import Image
from PIL import ImageOps

MASK_PATH = "frontend/static/cards/mask.png"
""" Not safe to change numbers, they depend on each other """
STD_CROP_DIMENSIONS = 205, 0, 810, 1024
STD_THUMBNAIL_SIZE = 300, 507
STD_CIRCLE_SIZE = 512, 512


def editImage(path, save_path=None, mode="thumbnail"):
	save_path = save_path or path
	with Image.open(path) as img:
		if mode == "thumbnail":
			if img.size != STD_THUMBNAIL_SIZE:
				img = crop(img, STD_CROP_DIMENSIONS)
				thumbnail(img, STD_THUMBNAIL_SIZE)
		elif mode == "circle":
			if img.size != STD_CIRCLE_SIZE:
				img = cropToCircle(img)
		img.save(save_path)


def cropToCircle(img):
	with Image.open(MASK_PATH) as mask:
		mask = mask.convert('L')
		img = crop(img, (0, 0, 1024, 900))
		img = ImageOps.crop(img, 340)
		img = ImageOps.fit(img, mask.size)
		img.putalpha(mask)
		return img


def crop(img, dimensions):
	try:
		return img.crop(dimensions)
	except OSError:
		raise OSError(img.filename + " is damaged")


def thumbnail(img, size):
	img.thumbnail(size, Image.ANTIALIAS)
