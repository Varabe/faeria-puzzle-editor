from lib.database import Database
from lib.errors import CardError

data = Database("data/cards/merlin_shortened.csv")
card = data.getById(1)
card.openImage()
card.life.set(3)
card.faeria.set(6)
card.power.set(7)
card.life.set(4)
card.image.save("img.png")