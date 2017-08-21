import os

from maker.scripts.cards import cropping
from faeria_puzzle.settings import CARD_DIR


CROP_MODES = ["thumbnail", "circle"]


def main(languages, mode):
	paths = [os.path.join(CARD_DIR, l) for l in languages]
	paths = [paths[0]] if mode == "circle" else paths
	for path in paths:
		cropping.cropImageDir(path, mode)
