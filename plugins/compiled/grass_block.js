import { game, player } from "./lib.runtime.js"
import * as random from "./random.js"

export var thisBlock = 0

export class myBlock {
	title = "None"
	constructor(title) {
		this.title = title
	}

}
export const HAS_BEEN_PRESSED = false

export function place() {
	player.inventory.take("block/chest")
	game.block.setBlock("chest:unopened")
}

export function interact() {
	let amount = random.randint(1, 3)
	if(player.inventory.has("item/key") == false) return
	player.inventory.take("item/key")
	player.inventory.give("item/diamond", amount)
	game.block.setBlock("chest:unopened")

	return Math.abs(100)
}