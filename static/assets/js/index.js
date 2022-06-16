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
		let details = this.playableArea.getBoundingClientRect();

		this.bird = new Bird(
			this.root,
			this.assets.cloneNode(true),
			flappyBird,
			FPS_BIRD,
			{ ...flappyBirdInitialPosition }
		);

		this.movePipes(
			3,
			this.assets.cloneNode(true),
			details.top,
			details.right,
			pipeSpeed,
			relativeFPS
		);
	};

	/**
	 *  A function that moves the pipes.
	 * @param maxPipes - maximum pipes to be displayed at once
	 * @param assets - sprite loaded element
	 * @param xMin - minimum value of playing area
	 * @param xMax - maximum value of playing area
	 * @param speed - speed of the pipes moving
	 * @param FPS - fps at which the frams are loaded
	 * @returns setInterval pointer
	 */
	movePipes = async (maxPipes, assets, xMin, xMax, speed, FPS) => {
		let currentX = xMax;
		let checkingFactor = xMax;
		let pipes = document.getElementsByClassName('pipes');

		let id = await this.getPipeId(maxPipes, pipes);

		let elements = this.playArea.setPipes(id, assets.cloneNode(true), currentX);

		let movePipesInterval = setInterval(() => {
			currentX += speed;
			checkingFactor += speed;

			elements[0].style.left = `${currentX}px`;
			elements[1].style.left = `${currentX}px`;

			if (checkingFactor <= 250) {
				this.movePipes(
					maxPipes,
					assets.cloneNode(true),
					xMin,
					xMax,
					speed,
					FPS
				);
				checkingFactor = xMax;
			}

			if (currentX + elements[0].getBoundingClientRect().width <= xMin) {
				this.root.removeChild(elements[0]);
				this.root.removeChild(elements[1]);
				clearInterval(movePipesInterval);
			}
		}, FPS);

		return movePipesInterval;
	};

	/**
	 * A function that returns a id of the pipe to be displayed.
	 * @param maxPipes - max-number of pipes allowed
	 * @param pipeELement - class element of the pipes to check between them.
	 * @returns Promise of the next id of the pipe
	 */
	getPipeId = (maxPipes, pipeElement) => {
		return new Promise((resolve) => {
			for (let i = 0; i < maxPipes * 2; i++) {
				if (!pipeElement[i]) {
					if (pipeElement[i - 1]) {
						resolve(parseInt(pipeElement[i - 1].id) + 1);
						break;
					} else {
						resolve(i);
						break;
					}
				}
			}
		});
	};
}

new FlappyBird();
