import os

from maker.scripts.cards import cropping
from faeria_puzzle.settings import CARD_DIR

CROP_MODES = ["thumbnail", "circle"]


def main(languages, mode):
	paths = [os.path.join(CARD_DIR, l) for l in languages]
	if mode == "circle":
		paths = paths[:1]
		save_path = os.path.join(CARD_DIR, "circle")
	else:
		save_path = None
	for path in paths:
		cropping.crop_image_dir(path, save_path, mode)
