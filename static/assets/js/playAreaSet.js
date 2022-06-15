import { randomNumberGenerator } from './utils.js';

class PlayArea {
	constructor(id, assetLocation, pipeDetails) {
		this.id = id;
		this.assetLocation = assetLocation;
		this.pipeDetails = pipeDetails;

		this.root = document.getElementById(this.id);
	}

	/**
	 *  Creating a promise that will resolve with the image element.
	 */
	assetsImporting = () => {
		return new Promise((resolve) => {
			const img = document.createElement('div');
			img.style.background = `url(${this.assetLocation})`;
			img.style.position = 'absolute';

			resolve(img);
		});
	};

	/**
	 *  Setting the style of the background assets.
	 * @param assets - loaded flappy bird sprite sheet
	 * @param details - details about where the background is with animationClass included
	 * @returns getElementById of the area set
	 */
	playAreaSet = (assets, details) => {
		assets.style.backgroundPosition = details.position;
		assets.style.width = details.width;
		assets.style.height = details.height;
		assets.style.transform = details.scale;
		assets.classList.add(details.animationClass);
		assets.id = details.id;

		this.root.appendChild(assets);

		return document.getElementById(details.id);
	};

	/**
	 *  Setting the pipes.
	 */
	setPipes = (id, assets, xPosition) => {
		/* Setting the position of the pipes. */
		let randomPosition = randomNumberGenerator(100, 320);
		let topPipePosition = 512 - randomPosition;
		let bottomPipePosition = 512 - (topPipePosition - 100);
		let actualInterval = {
			...this.pipeDetails,
			top: `${topPipePosition}px`,
			bottom: `${bottomPipePosition}px`,
			xPosition,
		};

		/* Cloning the assets and setting the top and bottom pipes. */
		let bottomPipe = this.setPipesBottom(
			id,
			assets.cloneNode(true),
			actualInterval
		);
		let topPipe = this.setPipesTop(id, assets.cloneNode(true), actualInterval);

		return [topPipe, bottomPipe];
	};

	/**
	 *  Setting the bottom pipe.
	 */
	setPipesBottom = (id, assets, details) => {
		assets.style.backgroundPosition = `${details[0].left} ${details[0].top}`;
		assets.style.width = details[0].width;
		assets.style.height = details[0].height;
		assets.style.top = details.bottom;
		assets.style.left = `${details.xPosition}px`;
		assets.id = `${id}-bottom`;
		this.root.appendChild(assets);

		return document.getElementById(`${id}-bottom`);
	};

	/**
	 *  Setting the top pipe.
	 */
	setPipesTop = (id, assets, details) => {
		assets.style.backgroundPosition = `${details[1].left} ${details[1].top}`;
		assets.style.width = details[1].width;
		assets.style.height = details[1].height;
		assets.style.bottom = details.top;
		assets.style.left = `${details.xPosition}px`;
		assets.id = `${id}-top`;
		this.root.appendChild(assets);

		return document.getElementById(`${id}-top`);
	};
}

export { PlayArea };
