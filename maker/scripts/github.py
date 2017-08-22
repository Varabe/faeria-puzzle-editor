import json
import os
import requests

from PIL import Image
from maker.scripts import utils

api_url = "https://api.github.com"


def downloadFolder(owner, repo, folder_path, folder_name, path="."):
	path = "{}/{}".format(path, folder_name)
	utils.makedirs(path)
	folder = getRepoFolder(owner, repo, folder_path, folder_name)
	files = _yieldFromFolder(folder)
	_downloadFiles(files, path)


def getRepoFolder(owner, repo, folder_path, folder_name):
	url = "{}/repos/{}/{}/contents/{}/{}".format(
		api_url, owner, repo, folder_path, folder_name)
	response = requests.get(url)
	text = json.loads(response.text)
	return text


def _yieldFromFolder(folder):
	for file in folder:
		yield file['name'], file['download_url']


def _downloadFiles(files, path):
	for name, download_url in files:
		file_path = "{}/{}".format(path, name)
		if not name.endswith(".png") or not isDownloadedAlready(file_path):
			utils.downloadFile(download_url, file_path)
			print("'{}' downloaded".format(name))
		else:
			print("'{}' already exists".format(name))


def isDownloadedAlready(path):
	isimage = path.endswith(".png")
	if os.path.exists(path):
		if isimage:
			try:
				Image.open(path).verify()
			except:
				return False
	else:
		return False
	return True
