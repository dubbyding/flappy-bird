import { PlayArea } from './playAreaSet.js';
import { Bird } from './bird.js';
import {
	ROOT_ID,
	GAME_ASSETS,
	flappyBird,
	FPS_BIRD,
	backgroundDetails,
	flappyBirdInitialPosition,
	pipeDetails,
	pipeSpeed,
	relativeFPS,
} from './const.js';

class FlappyBird {
	constructor() {
		this.playArea = new PlayArea(ROOT_ID, GAME_ASSETS, pipeDetails);

		this.loadAssets();
	}
	/**
	 *  This function loads all the required sprite and then actually plays the game
	 */
	loadAssets = async () => {
		this.root = this.playArea.root;

		this.assets = await this.playArea.assetsImporting();

		this.playableArea = this.playArea.playAreaSet(this.assets.cloneNode(true), {
			...backgroundDetails,
		});
		this.details = this.playableArea.getBoundingClientRect();
		console.log(this.details);

		this.bird = new Bird(
			this.root,
			this.assets.cloneNode(true),
			flappyBird,
			FPS_BIRD,
			{ ...flappyBirdInitialPosition }
		);

		this.movePipes(
			0,
			this.assets.cloneNode(true),
			this.details.top,
			this.details.right,
			pipeSpeed,
			relativeFPS
		);
	};

	movePipes = (id, assets, xMin, xMax, speed, FPS) => {
		let currentX = xMax;

		let elements = this.playArea.setPipes(id, assets, currentX);

		let movePipesInterval = setInterval(() => {
			currentX += speed;

			elements[0].style.left = `${currentX}px`;
			elements[1].style.left = `${currentX}px`;

			if (currentX + elements[0].getBoundingClientRect().width <= xMin) {
				this.root.removeChild(elements[0]);
				this.root.removeChild(elements[1]);
				clearInterval(movePipesInterval);
			}
		}, FPS);
	};
}

new FlappyBird();
