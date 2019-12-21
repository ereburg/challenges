document.addEventListener("DOMContentLoaded", () => {
	// Плавный скролл
	window.scrollTo({
		behavior: "smooth"
	});



	// Общее количество challenges в шапке
	const challenge = document.querySelectorAll('.challenge');
	const totalCounter = document.querySelector('.counter__total');
	totalCounter.textContent = `Challenges total:  ${challenge.length}`;



	// Добавляем класс scroll в шапку
	const header = document.querySelector('.header');

	window.addEventListener('scroll', () => {
		let y = window.pageYOffset;

		if (y > 0) {
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	});



	// Меняем содержимое сайда при различных величинах ширины экрана
	let viewportWidth;

	// Set/update the viewportWidth value
	const setViewportWidth = function () {
		viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	};

	// Log the viewport width into the console
	const onWidthChange = function () {
		if (viewportWidth > 768) {
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




	// Переключение элементов
	const filterButton = document.querySelectorAll('.filter__button');

	filterButton.forEach(target => {
		target.addEventListener('click', () => {
			const ANIMATIONS = target.classList.contains('filter__button--animations');
			const JAVASCRIPT = target.classList.contains('filter__button--javascript');
			const ALL = target.classList.contains('filter__button--all');

			// Фильртуем среди элементов определенный класс
			const filterChallengeByClass = className => {
				challenge.forEach(target => {
					target.classList.add('challenge--hidden');
		
					if (target.classList.contains(className)) {
						target.classList.remove('challenge--hidden');
					}
				});
			};

			const changeTabClass = () => {
				filterButton.forEach(target => {
					target.classList.remove('active');
				});
			};

			// По нажатию на кнопку "анимаций"
			if (ANIMATIONS) {
				changeTabClass();
				target.classList.add('active');
				filterChallengeByClass('challenge--animations');
			}

			// По нажатию на кнопку "JS"
			else if (JAVASCRIPT) {
				changeTabClass();
				target.classList.add('active');
				filterChallengeByClass('challenge--javascript');
			}

			// По нажатию на кнопку "All"
			else if (ALL) {
				changeTabClass();
				target.classList.add('active');
				challenge.forEach(target => {
					target.classList.remove('challenge--hidden');
				});
			}
		});
	});



	// Фильтрация по ключевым словам в поиске
	const input = document.querySelector('#search');

	input.addEventListener('keyup', () => {
		let filter, challengeTitle, badges, isChallengeTitle, isBadge;
		filter = input.value.toUpperCase();
		
		for (let i = 0; i < challenge.length; i++) {
			challengeTitle = challenge[i].querySelectorAll(".challenge__title")[0];
			badges = challenge[i].querySelectorAll(".tag__badge")[0]; 
			isChallengeTitle = challengeTitle.textContent || challengeTitle.innerText;
			isBadge = badges.textContent || badges.innerText;

			if (isChallengeTitle.toUpperCase().indexOf(filter) > -1) {
				challenge[i].style.display = "";
			} else if (isBadge.toUpperCase().indexOf(filter) > -1) {
				challenge[i].style.display = "";
			} else {
				challenge[i].style.display = "none";
			}
		}
	});


	// 
	const searchButtonMobile = document.querySelector('.search__button--search');
	const closeButtonMobile = document.querySelector('.search__button--close');
	const searchWrapper = document.querySelector('.search__wrapper');
	const searchInput = document.querySelector('.menu__input');

	const searchWrapperToggler = () => {
		searchWrapper.classList.toggle('active');
	};

	searchButtonMobile.addEventListener('click', () => {
		searchWrapperToggler();
		searchInput.setAttribute('autofocus', true);
	});

	closeButtonMobile.addEventListener('click', () => {
		searchWrapperToggler();
		searchInput.removeAttribute('autofocus');
	});

	document.addEventListener('click', e => {
		let target = e.target;
		let its_header = target == header || header.contains(target);
		let its_wrapper = target == searchWrapper || searchWrapper.contains(target);
		let its_buttonClose = target == closeButtonMobile;
		let its_buttonSearch = target == searchButtonMobile;
		let wrapper_is_active = searchWrapper.classList.contains('active');

		if (!its_header && !its_wrapper && !its_buttonSearch && !its_buttonClose && wrapper_is_active) {
			searchWrapperToggler();
			
		}
	});
});