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

		assets.classList.add(details.className);
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

		assets.classList.add(details.className);
		assets.id = `${id}-top`;

		this.root.appendChild(assets);

		return document.getElementById(`${id}-top`);
	};

	startMenu = (assets) => {
		let div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.padding = '20px';
		div.style.top = '25%';
		div.style.transform = 'translate(0,-50%)';
		div.style.left = '130px';

		let logo = assets.cloneNode(true);
		let start = assets.cloneNode(true);

		logo.style.backgroundPosition = '-702px -182px';
		logo.style.width = '178px';
		logo.style.height = '48px';

		start.style.backgroundPosition = '-584px -182px';
		start.style.width = '114px';
		start.style.height = '98px';
		start.style.top = '90px';

		div.appendChild(logo);
		div.appendChild(start);

		this.root.appendChild(div);
	};

	endMenu = (currentHighScore, currentActualScore) => {
		const div = document.createElement('div');

		div.style.position = 'absolute';
		div.style.padding = '20px';
		div.style.top = '25%';
		div.style.color = 'white';
		div.style.textAlign = 'center';
		div.style.left = '100px';

		const highScoreH1 = document.createElement('h1');
		highScoreH1.innerHTML = 'HighScore';
		const highScore = document.createElement('p');
		highScore.innerHTML = currentHighScore;

		div.appendChild(highScoreH1);
		div.appendChild(highScore);

		const currentScoreH1 = document.createElement('h1');
		currentScoreH1.innerHTML = 'Current Score';
		const currentScore = document.createElement('p');
		currentScore.innerHTML = currentActualScore;

		div.appendChild(currentScoreH1);
		div.appendChild(currentScore);

		this.root.appendChild(div);
	};
}

export { PlayArea };
