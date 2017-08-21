import requests
import errno
import os


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
