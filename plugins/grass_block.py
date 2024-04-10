from lib.runtime import game, player
import random

thisBlock = 0

class myBlock:
	title = "None"
	def __init__(self, title):
		self.title = title

HAS_BEEN_PRESSED = False

def place():
	player.inventory.take("block/chest")
	game.block.setBlock("chest:unopened")

def interact():
	amount = random.randint(1, 3)
	if(player.inventory.has("item/key") == False): return
	player.inventory.take("item/key")
	player.inventory.give("item/diamond", amount)
	game.block.setBlock("chest:unopened")

	return abs(100)