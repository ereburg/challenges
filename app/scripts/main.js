document.addEventListener("DOMContentLoaded", () => {
	// Custom JS
	window.scrollTo({
		behavior: "smooth"
	});

	// Total challenges
	const challenge = document.querySelectorAll('.challenge');
	const totalCounter = document.querySelector('.counter__total');
	totalCounter.textContent = `Challenges total:  ${challenge.length}`;

	// Add scroll class to header
	const header = document.querySelector('.header');

	window.addEventListener('scroll', () => {
		let y = window.pageYOffset;

		if (y > 0) {
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	});

	// Responsive nav
	let viewportWidth;

	// Set/update the viewportWidth value
	const setViewportWidth = function () {
		viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	};

	// Log the viewport width into the console
	const onWidthChange = function () {
		if (viewportWidth > 599) {
			totalCounter.textContent = `Challenges total:  ${challenge.length}`;
		} else {
			totalCounter.textContent = `${challenge.length}`;
		}
	};

	// Set our initial width and log it
	setViewportWidth();
	onWidthChange();

	// On resize events, recalculate and log
	window.addEventListener('resize', () => {
		setViewportWidth();
		onWidthChange();
	}, false);

});