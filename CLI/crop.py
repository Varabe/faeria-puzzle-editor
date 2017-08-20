import os

from faeria_puzzle.settings import CARD_DIR
from maker.scripts import utils
from maker.scripts.cards import cardimages


CROP_MODES = ["thumbnail", "circle"]


def main(languages, mode):
	paths = [os.path.join(CARD_DIR, l) for l in languages]
	if mode == "thumbnail":
		makeThumbnails(paths, mode)
	elif mode == "circle":
		makeCircles(paths, mode)


def makeThumbnails(directories, mode):
	for directory in directories:
		directory = utils.getImagesFromDir(directory)
		for file in directory:
			cardimages.editImage(file, mode=mode)


def makeCircles(directories, mode):
	initial_directory = utils.getImagesFromDir(directories[0])
	new_dir = "circles"
	utils.makedirs(new_dir)
	for file in initial_directory:
		file_name = os.path.basename(file)
		save_path = os.path.join(new_dir, file_name)
		cardimages.editImage(file, save_path, mode)
