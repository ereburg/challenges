document.addEventListener("DOMContentLoaded", () => {

	// Добавляем класс scroll в шапку
	const header = document.querySelector('.header');
	// Общее количество challenges в шапке
	const wrapperChallenges = document.querySelector('.challenges__container');
	const challenge = document.querySelectorAll('.challenge');
	const totalCounter = document.querySelector('.counter__total');
	// Переключение элементов
	const filterButton = document.querySelectorAll('.filter__button');
	// Фильтрация по ключевым словам в поиске
	const input = document.querySelector('#search');
	// Поиск для мобильных устройств
	const searchButtonMobile = document.querySelector('.search__button--search');
	const closeButtonMobile = document.querySelector('.search__button--close');
	const searchWrapper = document.querySelector('.search__wrapper');
	const searchInput = document.querySelector('.menu__input');



	// Общее количество challenges в шапке
	totalCounter.textContent = `Challenges total:  ${challenge.length}`;



	// Добавляем класс scroll в шапку
	window.addEventListener('scroll', () => {
		let y = window.pageYOffset;

		if (y > 0) {
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	});

	// Плавный скролл
	window.scrollTo({
		behavior: "smooth"
	});


	// Меняем содержимое сайта при различных величинах ширины экрана
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
	function CheckSearchValidity() {
		let COUNTER = 0;
		let P = document.createElement('p');
		P.classList.add('search__text--invalid');
		P.textContent = `Hmm, probably you are looking for something that doesn't exist...  But you can ask <a class="search__link--invalid" href="mailto:eugene.kotsarev@gmail.com">@ereburg</a> about your question!`;

		challenge.forEach(e => {
			if (e.hasAttribute('hidden', '')) {
				COUNTER++;
			}
		});

		let newSearchElement = document.querySelector('.search__text--invalid');

		if (COUNTER < challenge.length && wrapperChallenges.contains(newSearchElement)) {
			newSearchElement.remove();
		}
		else if (COUNTER >= challenge.length && !wrapperChallenges.contains(newSearchElement)) {
			wrapperChallenges.append(P);
		}
	}

	input.addEventListener('keyup', () => {
		let filter, challengeTitle, badges, isChallengeTitle, isBadge, filterConditionChallenge;
		filter = input.value.trim().toUpperCase();

		for (let i = 0; i < challenge.length; i++) {
			challengeTitle = challenge[i].querySelector(".challenge__title");
			badges = challenge[i].querySelector(".tag__badge");
			isChallengeTitle = challengeTitle.textContent || challengeTitle.innerText;
			isBadge = badges.textContent || badges.innerText;
			filterConditionChallenge = isChallengeTitle.trim().toUpperCase().indexOf(filter) > -1;
			filterConditionBadge = isBadge.trim().toUpperCase().indexOf(filter) > -1;

			if (filterConditionChallenge || filterConditionBadge) {
				challenge[i].removeAttribute('hidden', '');
				CheckSearchValidity();
			} else {
				challenge[i].setAttribute('hidden', '');
				CheckSearchValidity();
			}
		}
	});


	// Поиск для мобильных устройств
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


	// FizzBuzz Challenge

	const buttonClose = document.querySelector('.close');
	const fizzbuzzChallengeContainer = document.querySelector('.fizzbuzz');
	const fizzbuzzChallengeBar = document.querySelector('.challenge--fizzbuzz .challenge__inner');
	const inputFizz = document.querySelector('#inputFizz');
	const inputBuzz = document.querySelector('#inputBuzz');
	const buttonFizzBuzz = document.querySelector('.button-fizzbuzz');
	const resultContainer = document.querySelector('.result__grid');

	const fizzbuzzChallengeContainerToggler = () => {
		fizzbuzzChallengeContainer.classList.toggle('active');
	};

	const fizzbuzzChallengeBarToggler = () => {
		fizzbuzzChallengeBar.classList.toggle('challenge__inner--hidden');
	};

	buttonClose.addEventListener('click', e => {
		fizzbuzzChallengeContainerToggler();
		fizzbuzzChallengeBarToggler();
	});

	fizzbuzzChallengeBar.addEventListener('click', e => {
		fizzbuzzChallengeBarToggler();
		fizzbuzzChallengeContainerToggler();
	});

	const FizzBuzz = (fizz, buzz) => {
		fizz = inputFizz.value;
		buzz = inputBuzz.value;

		if (fizz < 1 || buzz < 1) {
			return alert('Enter a number between 1 and 100');
		} else {
			const AddFizzBuzzHeader = () => {
				let create = document.createElement('h2');
				create.classList.add('result__header');
				create.textContent = `Results for FizzBuzz Challenge`;
				resultContainer.append(create);
			};

			AddFizzBuzzHeader();

			const AddFizzBuzzElement = (item) => {
				let create = document.createElement('p');
				create.classList.add('result__item');
				create.textContent = `${item}`;
				resultContainer.append(create);
			};

			let a;
			for (let i = 1; i <= 100; i++) {
				a = i;

				if ((i % fizz == 0) && (i % buzz == 0)) {
					a = 'fizzbuzz';
				} else if (i % fizz == 0) {
					a = 'fizz';
				} else if (i % buzz == 0) {
					a = 'buzz';
				}

				AddFizzBuzzElement(a);
			}

			const checkInnerContent = () => {
				const resultItem = document.querySelectorAll('.result__item');
				resultItem.forEach(item => {
					let itemContent = item.textContent.toLowerCase();
					if (itemContent == ('Fizz').toLowerCase()) {
						item.classList.add('result__item--fizz');
					} else if (itemContent == ('Buzz').toLowerCase()) {
						item.classList.add('result__item--buzz');
					} else if (itemContent == ('FizzBuzz').toLowerCase()) {
						item.classList.add('result__item--fizzbuzz');
					}
				});
			};
			checkInnerContent();
		}
	};

	const CleanResultContainer = () => {
		while (resultContainer.firstChild) {
			resultContainer.firstChild.remove();
		}
	};

	buttonFizzBuzz.addEventListener('click', e => {
		e.preventDefault();
		CleanResultContainer();
		FizzBuzz();
	}, false);











	// Создание анимаций для фильтрации элементов
	// получаем координаты элемента в контексте документа
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}

	// Текущие координаты элементов
	filterButton.forEach(item => {
		getCoords(item);
	});

	challenge.forEach(item => {
		getCoords(item);
	});
});