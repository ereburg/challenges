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

	window.addEventListener('scroll', function () {
		let y = window.pageYOffset;

		if (y > 0) {
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	});

	// nav__brand
	window.addEventListener('resize', () => {
		const navBrand = document.querySelector('.nav__brand');
		let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
		if (viewportWidth > 599) {
			// console.log('Wide viewport');
			totalCounter.textContent = `Challenges total:  ${challenge.length}`;
			navBrand.textContent = 'Ereburg';
		} else {
			// console.log('Small viewport');
			totalCounter.textContent = `Total:  ${challenge.length}`;
			navBrand.textContent = '';
		}
	});

	
});