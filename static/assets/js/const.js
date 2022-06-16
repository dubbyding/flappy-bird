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
const flappyBirdInitialPosition = { top: '256px', left: '20px' };

// Frames
const FRAMES_BIRD = 12;
const SECOND = 1000;
const FPS_BIRD = SECOND / FRAMES_BIRD;

// Background Set
const backgroundDetails = {
	position: `0px 0px`,
	width: '250px',
	height: '512px',
	scale: 'scale(3, 1)',
	animationClass: 'slidingAnimation',
	id: 'background',
};

// Pipes Set
const pipeDetails = {
	0: {
		top: '-646px',
		left: '-168px',
		width: '52px',
		height: '320px',
	},
	1: {
		top: '-646px',
		left: '-112px',
		width: '52px',
		height: '320px',
	},
	className: 'pipes',
};

// Pipe Speed
const pipeSpeed = -2;
const gameFrames = 60;
const relativeFPS = SECOND / gameFrames;

//score location
const scoreDetails = {
	0: {
		left: '-276px ',
		top: '-646px',
		width: '12px',
		height: '14px',
	},
	1: { left: '-282px  ', top: '-664px', width: '6px', height: '14px' },
	2: { left: '-276px ', top: '-698px', width: '12px', height: '14px' },
	3: { left: '-276px ', top: '-716px', width: '12px', height: '14px' },
	4: { left: '-276px ', top: '-750px', width: '12px', height: '14px' },
	5: { left: '-276px ', top: '-768px', width: '12px', height: '14px' },
	6: { left: '-276px ', top: '-802px', width: '12px', height: '14px' },
	7: { left: '-276px ', top: '-820px', width: '12px', height: '14px' },
	8: { left: '-276px ', top: '-854px', width: '12px', height: '14px' },
	9: { left: '-276px ', top: '-872px', width: '12px', height: '14px' },
};

export {
	ROOT_ID,
	GAME_ASSETS,
	flappyBird,
	FPS_BIRD,
	backgroundDetails,
	flappyBirdInitialPosition,
	pipeDetails,
	pipeSpeed,
	relativeFPS,
	scoreDetails,
};
