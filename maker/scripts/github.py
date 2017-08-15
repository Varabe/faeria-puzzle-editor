import requests
import errno
import json
import os

api_url = "https://api.github.com"


def downloadFolder(owner, repo, folder_path, folder_name, path="."):
	path = "{}/{}".format(path, folder_name)
	_makedirs(path)
	folder = getRepoFolder(owner, repo, folder_path, folder_name)
	files = _yieldFromFolder(folder)
	_downloadFiles(files, path)

def downloadFile(url, path):
	response = requests.get(url, stream=True)
	with open(path, "wb") as f:
		for chunk in response:
			f.write(chunk)

def getRepoFolder(owner, repo, folder_path, folder_name):
	url = "{}/repos/{}/{}/contents/{}/{}".format(
		api_url, owner, repo, folder_path, folder_name)
	response = requests.get(url)
	text = json.loads(response.text)
	return text


def _makedirs(path):
	""" os.mkdirs(path, exist_ok=True) for python 2 """
	try:
		os.makedirs(path)
	except OSError as exc:  # Python >2.5
		if exc.errno == errno.EEXIST and os.path.isdir(path):
			pass
		else:
			raise


def _yieldFromFolder(folder):
	for file in folder:
		yield file['name'], file['download_url']


def _downloadFiles(files, path):
	for name, download_url in files:
		file_path = "{}/{}".format(path, name)
		downloadFile(download_url, file_path)
		print(name + " downloaded")

