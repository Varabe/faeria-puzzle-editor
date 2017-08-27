import json
import os
import requests

from PIL import Image
from maker.scripts import utils

api_url = "https://api.github.com"


def download_folder(owner, repo, folder_path, folder_name, path="."):
	path = "{}/{}".format(path, folder_name)
	utils.makedirs(path)
	folder = get_repo_folder(owner, repo, folder_path, folder_name)
	files = ((f['name'], f['download_url']) for f in folder)
	_download_files(files, path)


def get_repo_folder(owner, repo, folder_path, folder_name):
	url = "{}/repos/{}/{}/contents/{}/{}".format(
		api_url, owner, repo, folder_path, folder_name)
	response = requests.get(url)
	text = json.loads(response.text)
	return text


def _download_files(files, path):
	for name, download_url in files:
		file_path = "{}/{}".format(path, name)
		if not name.endswith(".png") or not is_downloaded(file_path):
			utils.download_file(download_url, file_path)
			print("'{}' downloaded".format(name))
		else:
			print("'{}' already exists".format(name))


def is_downloaded(path):
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
