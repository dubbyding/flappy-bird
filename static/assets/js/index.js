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
import { spaceEventListener } from './utils.js';

class FlappyBird {
	constructor() {
		this.playArea = new PlayArea(ROOT_ID, GAME_ASSETS, pipeDetails);

		this.gameStatus = 1;
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
		let detailsPipe = this.playableArea.getBoundingClientRect();

		this.playArea.setScore(this.assets.cloneNode(true));

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
			detailsPipe.top,
			detailsPipe.right,
			pipeSpeed,
			relativeFPS
		);

		this.birdMove(relativeFPS);

		this.collisionDetection(relativeFPS);
	};

	/**
	 *  A function that moves the pipes.
	 * @param maxPipes - maximum pipes to be displayed at once
	 * @param assets - sprite loaded element
	 * @param xMin - minimum value of playing area
	 * @param xMax - maximum value of playing area
	 * @param speed - speed of the pipes moving
	 * @param FPS - fps at which the frams are loaded
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

			if (!this.gameStatus) {
				clearInterval(movePipesInterval);
			}

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

	/**
	 * This function is responsible for the movement of the bird.
	 * @param FPS - FPS of the moving bird
	 * */
	birdMove = (FPS) => {
		const gravity = 0.1;
		const antiGravity = 2;
		const toMoveUp = 20;

		const birdElement = this.bird.birdElement;
		const birdBoundary = birdElement.getBoundingClientRect();

		const boundaryBottom = this.root.getBoundingClientRect().height;

		let velocity = 0;
		let birdTop = birdBoundary.top;

		let spaceStatus = 0;
		let upStatus = 0;

		let flyInterval = setInterval(() => {
			if (this.gameStatus) {
				/* Listening for the keypress and mousedown events. */
				document.addEventListener('keypress', (e) => {
					if (e.code == 'Space') spaceStatus = 1;
					upStatus = 0;
				});
				document.addEventListener('mousedown', () => {
					spaceStatus = 1;
					upStatus = 0;
				});

				if (boundaryBottom <= birdTop + birdBoundary.height) {
					this.gameStatus = 0;
					clearInterval(flyInterval);
					this.bird.clearFlappyAnimation();
				}

				if (!spaceStatus) {
					velocity += gravity;
					if (velocity > 5) velocity = 5;
					birdTop += velocity;

					birdElement.style.top = `${birdTop}px`;
				} else {
					upStatus++;

					if (upStatus > toMoveUp) {
						spaceStatus = 0;
						upStatus = 0;
					}
					velocity = 0;
					birdTop -= antiGravity;
					birdElement.style.top = `${birdTop}px`;
				}
			} else {
				if (boundaryBottom <= birdTop + birdBoundary.height) {
					clearInterval(flyInterval);
					this.bird.clearFlappyAnimation();
				}
				velocity += gravity;
				if (velocity > 5) velocity = 5;
				birdTop += velocity;

				birdElement.style.top = `${birdTop}px`;
			}
		}, FPS);
	};

	/**
	 * Checking for the collision between the bird and the pipes.
	 * @param FPS - frames per second by which everything moves
	 * */
	collisionDetection = (FPS) => {
		const pipesClassName = 'pipes';
		const birdElement = this.bird.birdElement;

		let collisionInterval = setInterval(() => {
			const pipes = document.getElementsByClassName(pipesClassName);
			const pipesElements = [pipes[0], pipes[1]];
			for (let i in pipesElements) {
				let birdBoundary = birdElement.getBoundingClientRect();
				let pipeBoundary = pipesElements[i].getBoundingClientRect();

				if (
					birdBoundary.bottom > pipeBoundary.top &&
					birdBoundary.top < pipeBoundary.bottom &&
					birdBoundary.right > pipeBoundary.left &&
					birdBoundary.left < pipeBoundary.right
				) {
					this.gameStatus = 0;
					clearInterval(collisionInterval);
					this.bird.clearFlappyAnimation();
				}
			}
		}, FPS);
	};
}

new FlappyBird();
