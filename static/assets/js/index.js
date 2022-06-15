import { PlayArea } from './playAreaSet.js';
import { Bird } from './bird.js';
import {
	ROOT_ID,
	GAME_ASSETS,
	flappyBird,
	FPS,
	backgroundDetails,
} from './const.js';

class FlappyBird {
	constructor() {
		this.playArea = new PlayArea(ROOT_ID, GAME_ASSETS);

		this.loadAssets();
	}
	/**
	 *  This function loads all the required sprite and then actually plays the game
	 */
	loadAssets = async () => {
		this.root = this.playArea.root;
		this.assets = await this.playArea.assetsImporting();

		this.playArea.playAreaSet(this.assets.cloneNode(true), {
			...backgroundDetails,
		});

		this.bird = new Bird(
			this.root,
			this.assets.cloneNode(true),
			flappyBird,
			FPS
		);
	};
}

new FlappyBird();
