import os

from PIL import Image
from PIL import ImageOps

MASK_PATH = "frontend/static/cards/mask.png"
""" Not safe to change numbers, they depend on each other """
STD_CROP_DIMENSIONS = 205, 0, 810, 1024
STD_THUMBNAIL_SIZE = 300, 507
STD_CARD_SIZE = 1024, 1024


def cropImageDir(path, save_path=None, mode="thumbnail"):
	dir_save_path = save_path or path
	if os.path.exists(path) and os.path.isdir(path):
		for img in getImagesFromDir(path):
			img_name = os.path.basename(img)
			img_save_path = os.path.join(dir_save_path, img_name)
			cropImage(path, img_save_path, mode)


def getImagesFromDir(directory):
	""" Files must have id in their names

		ex: 2.png, 001.png, 234.png
	"""
	files = os.listdir(directory)
	files = [file for file in files if file.endswith(".png")]
	files.sort(key=lambda n:int(os.path.splitext(n)[0])) # file_name[0] extension[1]
	return [os.path.join(directory, file) for file in files]


def cropImage(path, save_path=None, mode="thumbnail"):
	save_path = save_path or path
	with Image.open(path) as img:
		if img.size == STD_CARD_SIZE:
			if mode == "thumbnail":
				img = cropToThumbnail(img)
			elif mode == "circle":
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


def cropToThumbnail(img):
	img = crop(img, STD_CROP_DIMENSIONS)
	img.thumbnail(STD_THUMBNAIL_SIZE, Image.ANTIALIAS)
	return img


def crop(img, dimensions):
	try:
		return img.crop(dimensions)
	except OSError:
		raise OSError(img.filename + " is damaged")
