class PlayArea {
	constructor(id, assetLocation) {
		this.id = id;
		this.assetLocation = assetLocation;

		this.root = document.getElementById(this.id);
	}

	assetsImporting = () => {
		return new Promise((resolve) => {
			const img = document.createElement('div');
			img.style.background = `url(${this.assetLocation})`;
			img.style.position = 'absolute';

			resolve(img);
		});
	};

	playAreaSet = (assets, details) => {
		assets.style.backgroundPosition = details.position;
		assets.style.width = details.width;
		assets.style.height = details.height;
		assets.style.transform = details.scale;
		assets.classList.add(details.animationClass);
		assets.id = details.id;

		this.root.appendChild(assets);
	};
}

export { PlayArea };
