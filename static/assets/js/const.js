// Root ID
const ROOT_ID = 'root';

// Image
// const GAME_ASSETS = 'https://i.stack.imgur.com/GLnwC.png';
const GAME_ASSETS = '/assets/images/GLnwC.png';

// Bird Positions
const flappyBird = {
	0: {
		left: '-6px',
		top: '-982px',
		width: '34px',
		height: '24px',
	},
	1: {
		left: '-62px',
		top: '-982px',
		width: '34px',
		height: '24px',
	},
	2: {
		left: '-118px',
		top: '-982px',
		width: '34px',
		height: '24px',
	},
};

// Frames
const FRAMES = 12;
const SECOND = 1000;
const FPS = SECOND / FRAMES;

// Background Set
const backgroundDetails = {
	position: `0px 0px`,
	width: '250px',
	height: '512px',
	scale: 'scale(3, 1)',
	animationClass: 'slidingAnimation',
	id: 'background',
};

export { ROOT_ID, GAME_ASSETS, flappyBird, FPS, backgroundDetails };
