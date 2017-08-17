from PIL import Image

""" Not safe to change numbers, they depend on each other """
STD_CROP_DIMENSIONS = 208, 30, 805, 1005
STD_THUMBNAIL_SIZE = 282, 461


def resize(path, new_path=None, do_thumbnail=False):
	new_path = new_path or path
	image = Image.open(path)
	if (image.width, image.height) != STD_THUMBNAIL_SIZE:
		image = _crop(image)
		if do_thumbnail: _thumbnail(image)
		image.save(new_path)
	image.close()


def _crop(image, dims=STD_CROP_DIMENSIONS):
	try:
		return image.crop(dims)
	except OSError:
		raise OSError(image.filename + " is damaged")


def _thumbnail(image, size=STD_THUMBNAIL_SIZE):
	image.thumbnail(size, Image.ANTIALIAS)
