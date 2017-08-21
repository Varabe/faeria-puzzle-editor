import errno
import os
import requests

from faeria_puzzle.settings import CARD_DIR
from faeria_puzzle.settings import CARD_LANGUAGES


def getAvailibleLanguageDirs():
	""" Names of dirs (their languages) that present on machine """
	return [dir_ for dir_ in os.listdir(CARD_DIR) if dir_ in CARD_LANGUAGES]


def makedirs(path):
	""" os.mkdirs(path, exist_ok=True) for python 2 """
	try:
		os.makedirs(path)
	except OSError as exc:  # Python >2.5
		if exc.errno == errno.EEXIST and os.path.isdir(path):
			pass
		else:
			raise exc


def downloadFile(url, path):
	response = requests.get(url, stream=True)
	with open(path, "wb") as f:
		for chunk in response:
			f.write(chunk)
