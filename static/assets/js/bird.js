class Bird {
	constructor(root, sprite, birdPosition, fps, initialPos) {
		this.root = root;
		this.sprite = sprite;
		this.birdPosition = birdPosition;
		this.fps = fps;
		this.initialPos = initialPos;

		let flapAnimate = this.flappingAnimation();

		this.flappyAnimationInterval = flapAnimate[0];
		this.birdElement = flapAnimate[1];
	}

	/**
	 *  A function that is called in the constructor. It is responsible for the initializing the bird.
	 * @param animationCounter - initial displaying sequence of bird
	 * */
	birdInitialize = (animationCounter) => {
		this.sprite.style.backgroundPosition = `${this.birdPosition[animationCounter].left} ${this.birdPosition[animationCounter].top}`;
		this.sprite.style.width = this.birdPosition[animationCounter].width;
		this.sprite.style.height = this.birdPosition[animationCounter].height;
		this.sprite.id = 'bird';
		this.sprite.style.top = this.initialPos.top;
		this.sprite.style.left = this.initialPos.left;

		this.root.appendChild(this.sprite);

		return document.getElementById('bird');
	};

	/**
     *  This is the function that is responsible for the animation of the bird. It is called in the
    constructor.
    * @returns interval Function to later clear
    */
	flappingAnimation = () => {
		let animationCounter = 1;
		let animationLimit = 2;
		let animationDirection = 1;

		let birdElement = this.birdInitialize(animationCounter);
		const setFlappyAnimation = setInterval(() => {
			if (animationCounter <= 0 || animationCounter >= animationLimit) {
				animationDirection *= -1;
			}
			animationCounter += animationDirection;
			birdElement.style.backgroundPosition = `${this.birdPosition[animationCounter].left} ${this.birdPosition[animationCounter].top}`;
		}, this.fps);

		return [setFlappyAnimation, birdElement];
	};

	clearFlappyAnimation = () => {
		clearInterval(this.flappyAnimationInterval);
	};
}

export { Bird };
