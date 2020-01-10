document.addEventListener("DOMContentLoaded", () => {

	// Добавляем класс scroll в шапку
	const page = document.querySelector('.page');
	const header = document.querySelector('.header');
	// Общее количество challenges в шапке
	const wrapperChallenges = document.querySelector('.challenges__container');
	const challenge = document.querySelectorAll('.challenge');
	const challengesLink = document.querySelectorAll('.challenges__link');
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

	// Остановить скролл при открытии модального окна
	function disableScrolling() {
		var x = window.scrollX;
		var y = window.scrollY;
		window.onscroll = function () { window.scrollTo(x, y); };
	}

	function enableScrolling() {
		window.onscroll = function () { };
	}



	// Меняем содержимое сайта при различных величинах ширины экрана
	let viewportWidth;

	// Set/update the viewportWidth value
	const setViewportWidth = function () {
		viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	};

	// Log the viewport width into the console
	const onWidthChange = function () {
		if (viewportWidth > 768) {
			totalCounter.textContent = `Challenges total:  ${challenge.length} units`;
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




	// Переключение элементов, табы (вкладки)
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
		P.classList.add('result-search__text');
		P.insertAdjacentHTML('beforeend', `Hmm, probably you are looking for something special, but it doesn't exists yet... Well, you can ask me <a class="result-search__link" href="mailto:eugene.kotsarev@gmail.com">(@ereburg)</a> about your question!`);

		challenge.forEach(e => {
			if (e.classList.contains('challenge--hidden')) {
				COUNTER++;
			}
		});

		let newSearchElement = document.querySelector('.result-search__text');

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

			// let disappear = () => {
			// 	challenge[i].style.display = "none";
			// };

			// let appear = () => {
			// 	challenge[i].style.display = "block";
			// };

			if (filterConditionChallenge || filterConditionBadge) {
				challenge[i].classList.remove('challenge--hidden');
				CheckSearchValidity();
				// setTimeout(() => appear(), 0);
			} else {
				challenge[i].classList.add('challenge--hidden');
				CheckSearchValidity();
				// setTimeout(() => disappear(), 0);

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


	// Event Challenge

	const challengesList = document.querySelector('.challenges__container');

	challengesList.addEventListener('click', e => {
		let target = e.target, LINK, MODAL, CLOSE, MODAL_CONTAINER;

		const pageToggler = () => {
			page.classList.toggle('scroll');
		};

		for (let i = 0; i < challenge.length; i++) {
			LINK = challenge[i].querySelector(".challenges__link");
			MODAL = challenge[i].querySelector(".challenge__code");
			MODAL_CONTAINER = challenge[i].querySelector('.code-container--content');
			CLOSE = MODAL.querySelector('.close');

			let its_link = target == LINK || LINK.contains(target),
				its_modal = target == MODAL.classList.contains('active') || MODAL.contains(target),
				its_modal_container = target == MODAL_CONTAINER || MODAL_CONTAINER.contains(target),
				its_close = target == CLOSE || CLOSE.contains(target);


			if (its_link) {
				MODAL.classList.add('active');
				pageToggler();
				disableScrolling();
			}

			if (its_close) {
				MODAL.classList.remove('active');
				pageToggler();
				enableScrolling();
			}

			if (its_modal && !its_modal_container) {
				MODAL.classList.remove('active');
				pageToggler();
				enableScrolling();
			}
		}
	});

	challengesLink.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
		});
	});


	// FizzBuzz challenge code
	const inputFizz = document.querySelector('#inputFizz');
	const inputBuzz = document.querySelector('#inputBuzz');
	const buttonFizzBuzz = document.querySelector('.button-fizzbuzz');
	const resultContainer = document.querySelector('.result__grid');


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




	// Canvas Clocks

	function setTime() {

		let canvas = document.getElementById("clock");
		let context = canvas.getContext("2d");
		let clockRadius = canvas.width / 2;

		context.beginPath();

		context.fillStyle = "#E3EDF7"; // * фоновый цвет
		context.arc(clockRadius, clockRadius, clockRadius, 0, 2 * Math.PI);
		context.fill();

		context.fillStyle = "#31456a"; // * цвет текста

		context.beginPath();
		context.arc(clockRadius, clockRadius, 5, 0, 2 * Math.PI); // * размер текста
		context.fill();

		context.font = clockRadius / 10 + "px ubuntu";
		context.textAlign = "center";
		context.textBaseline = "middle";

		for (let i = 1; i <= 12; i++) {

			context.fillText(i, clockRadius + clockRadius * 0.875 * Math.sin(i * 2 * Math.PI / 12), clockRadius - (clockRadius * 0.875 * Math.cos(i * 2 * Math.PI / 12)));

		}


		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getSeconds();

		let fullHours = hours % 12 + minutes / 60 + seconds / 3600;

		let hoursAngle = fullHours * 2 * Math.PI / 12;
		let minutesAngle = minutes * 2 * Math.PI / 60;
		let secondsAngle = seconds * 2 * Math.PI / 60;

		context.strokeStyle = "#31456a"; // * цвет стрелок
		// * Часовая стрелка
		context.moveTo(clockRadius, clockRadius);
		context.lineTo(clockRadius + clockRadius * 0.6 * Math.sin(hoursAngle), clockRadius - (clockRadius * 0.6 * Math.cos(hoursAngle)));
		context.lineWidth = 5;
		context.stroke();

		// * Минутная стрелка
		context.moveTo(clockRadius, clockRadius);
		context.lineTo(clockRadius + clockRadius * 0.8 * Math.sin(minutesAngle), clockRadius - (clockRadius * 0.8 * Math.cos(minutesAngle)));
		context.lineWidth = 3;
		context.stroke();

		// * Секундная стрелка
		context.moveTo(clockRadius, clockRadius);
		context.lineTo(clockRadius + clockRadius * 0.9 * Math.sin(secondsAngle), clockRadius - (clockRadius * 0.9 * Math.cos(secondsAngle)));
		context.lineWidth = 2;
		context.stroke();

	}

	setInterval(setTime, 1000);




	// Social Buttons Challenge
	const sbList = document.querySelector('.social-buttons__list');
	let sbListCloned = sbList.cloneNode(true);
	sbListCloned.classList.add('neumorph');
	sbListCloned.setAttribute('data-text', 'Neumorphism design');
	const sbContent = document.querySelector('.social-buttons .code__body .code__content');
	sbContent.append(sbListCloned);
	console.log(sbListCloned);
	console.log(sbList);




	// Canvas Ball Animation
	const canvasBall = document.querySelector('.challenge--canvas-ball');

	canvasBall.addEventListener('click', e => {
		let target = e.target;
		let its_container = canvasBall || canvasBall.contains(target);

		const canvas = document.getElementById('ball');
		const ctx = canvas.getContext('2d');

		const circle = {
			x: 200,
			y: 200,
			size: 20,
			dx: 5,
			dy: 4
		};

		function drawCircle() {
			ctx.beginPath();
			ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
			ctx.fillStyle = 'teal';
			ctx.fill();
		}

		function update() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			drawCircle();

			// change position
			circle.x += circle.dx;
			circle.y += circle.dy;

			// Detect side walls
			if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
				circle.dx *= -1;
			}

			// Detect top and bottom walls
			if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
				circle.dy *= -1;
			}

			requestAnimationFrame(update);
		}

		update();

		if (its_container) {
			return;
		}
	});

	// canvasBall.removeEventListener('click', e =>{});

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