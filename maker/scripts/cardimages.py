from PIL import Image


STD_CROP_DIMENSIONS = 215, 105, 800, 1005
STD_THUMBNAIL_SIZE = 300, 461 # Not safe to change numbers, they depend on each other


def resize(path, new_path=None, do_thumbnail=False):
	new_path = new_path or path
	image = Image.open(path)
	if (image.width, image.height) != STD_THUMBNAIL_SIZE:
		image = _crop(image)
		if do_thumbnail: _thumbnail(image)
		image.save(new_path)
	image.close()


def _crop(image, dims=STD_CROP_DIMENSIONS):
	return image.crop(dims)


def _thumbnail(image, size=STD_THUMBNAIL_SIZE):
	image.thumbnail(size, Image.ANTIALIAS)
