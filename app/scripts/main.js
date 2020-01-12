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
		let filter, challengeTitle, badges, type, isChallengeTitle, isBadge, filterConditionChallenge;
		filter = input.value.trim().toUpperCase();

		for (let i = 0; i < challenge.length; i++) {
			challengeTitle = challenge[i].querySelector(".challenge__title");
			badges = challenge[i].querySelector(".tag__badge");
			type = challenge[i].querySelector(".type");
			isChallengeTitle = challengeTitle.textContent || challengeTitle.innerText;
			isBadge = badges.textContent || badges.innerText;
			isType = type.textContent || type.innerText;
			filterConditionChallenge = isChallengeTitle.trim().toUpperCase().indexOf(filter) > -1;
			filterConditionBadge = isBadge.trim().toUpperCase().indexOf(filter) > -1;
			filterConditionType = isType.trim().toUpperCase().indexOf(filter) > -1;

			// let disappear = () => {
			// 	challenge[i].style.display = "none";
			// };

			// let appear = () => {
			// 	challenge[i].style.display = "block";
			// };

			if (filterConditionChallenge || filterConditionBadge || filterConditionType) {
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




	// Canvas Ball Animation
	const challengeCanvas = document.querySelectorAll('.challenge--canvas');
	const challengeCB = document.querySelector('.challenge--canvas-ball');
	const cbContent = document.querySelector('.code__content--canvas-ball');
	const challengeWizard = document.querySelector('.challenge--canvas-wizard');
	const challengeWizardContent = document.querySelector('.code__content--canvas-wizard');

	function createCanvasTemplate(parent, id, classname) {
		let newCanvas = document.createElement('canvas');
		newCanvas.id = `${id}`;
		newCanvas.setAttribute('width', '600px');
		newCanvas.setAttribute('height', '400px');
		newCanvas.setAttribute('aria-label', `${id} animation built with canvas API.`);
		newCanvas.textContent = 'Please upgrade your browser.';
		let newButton = document.createElement('button');
		newButton.classList.add(`button--canvas`);
		newButton.setAttribute('type', 'button');
		newButton.textContent = 'Start animation';
		if (classname) {
			newButton.classList.add(`button--canvas-${classname}`);
		}
		if (id == 'wizard') {
			let newImage = document.createElement('img');
			newImage.setAttribute('src', 'https://i.ibb.co/HHBFJdH/char.png');
			newImage.setAttribute('alt', 'Little wizard');
			newImage.classList.add('wizard-image');
			newImage.style.display = 'none';
			parent.append(newImage);
		}
		parent.append(newCanvas);
		parent.append(newButton);
	}

	function removeCanvasTemplate(parent) {
		while (parent.firstChild) {
			parent.firstChild.remove();
		}
	}

	let counter = 0;
	let continueAnimating, isOpened;

	challengeCanvas.forEach(item => {
		item.addEventListener('click', e => {
			let target = e.target;
			let canvasContainer = item.querySelector('.container');
			let its_wrapper = target == canvasContainer || canvasContainer.contains(target);
			continueAnimating = true;
			isOpened = true;

			if (counter < 1) {
				if (challengeCB) {
					createCanvasTemplate(cbContent, 'ball', 'ball');
				}

				if (challengeWizard) {
					createCanvasTemplate(challengeWizardContent, 'wizard', 'wizard');
				}
				counter++;
			} else if (its_wrapper) {
				return;
			} else {
				continueAnimating = false;
				counter--;
				
				if (challengeCB) {
					removeCanvasTemplate(cbContent);
				}

				if (challengeWizard) {
					removeCanvasTemplate(challengeWizardContent);
				}
			}

			if (challengeCB) {
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

				drawCircle();

				function update() {
					ctx.clearRect(0, 0, canvas.width, canvas.height);

					drawCircle();

					// моеняем координаты
					circle.x += circle.dx;
					circle.y += circle.dy;

					// Определяем боковые границы
					if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
						circle.dx *= -1;
					}

					// Определяем нижнюю и верхнюю границу
					if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
						circle.dy *= -1;
					}

					if (continueAnimating) {
						animationBall = requestAnimationFrame(update);
					}
				}

				const buttonCanvas = document.querySelector('.button--canvas-ball');
				let i = 0;
				buttonCanvas.addEventListener('click', e => {
					continueAnimating = true;

					if (i < 1) {
						update();
						i++;
					}

				}, false);
			}

			if (challengeWizard) {
				const canvas = document.getElementById('wizard');
				const ctx = canvas.getContext('2d');


				const image = document.querySelector('.wizard-image');

				const player = {
					w: 50,
					h: 70,
					x: 20,
					y: 200,
					speed: 10,
					dx: 0,
					dy: 0
				};

				function drawPlayer() {
					ctx.drawImage(image, player.x, player.y, player.w, player.h);
				}

				function clear() {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				}

				function newPos() {
					player.x += player.dx;
					player.y += player.dy;

					detectWalls();
				}

				function detectWalls() {
					// Left wall
					if (player.x < 0) {
						player.x = 0;
					}

					// Right Wall
					if (player.x + player.w > canvas.width) {
						player.x = canvas.width - player.w;
					}

					// Top wall
					if (player.y < 0) {
						player.y = 0;
					}

					// Bottom Wall
					if (player.y + player.h > canvas.height) {
						player.y = canvas.height - player.h;
					}
				}

				function updateWizard() {
					clear();

					drawPlayer();

					newPos();

					requestAnimationFrame(update);
				}

				function moveUp() {
					player.dy = -player.speed;
				}

				function moveDown() {
					player.dy = player.speed;
				}

				function moveRight() {
					player.dx = player.speed;
				}

				function moveLeft() {
					player.dx = -player.speed;
				}

				function keyDown(e) {
					if (e.key === 'ArrowRight' || e.key === 'Right') {
						moveRight();
					} else if (e.key === 'ArrowLeft' || e.key === 'Left') {
						moveLeft();
					} else if (e.key === 'ArrowUp' || e.key === 'Up') {
						moveUp();
					} else if (e.key === 'ArrowDown' || e.key === 'Down') {
						moveDown();
					}
				}

				function keyUp(e) {
					if (
						e.key == 'Right' ||
						e.key == 'ArrowRight' ||
						e.key == 'Left' ||
						e.key == 'ArrowLeft' ||
						e.key == 'Up' ||
						e.key == 'ArrowUp' ||
						e.key == 'Down' ||
						e.key == 'ArrowDown'
					) {
						player.dx = 0;
						player.dy = 0;
					}
				}

				updateWizard();

				document.addEventListener('keydown', keyDown);
				document.addEventListener('keyup', keyUp);
			}

		}, false);
	});

	// challengeCB.addEventListener('click', e => {
	// 	let target = e.target;
	// 	let cbContainer = challengeCB.querySelector('.container');
	// 	let its_wrapper = target == cbContainer || cbContainer.contains(target);
	// 	continueAnimating = true;
	// 	isOpened = true;

	// 	if (counter < 1) {
	// 		createCanvasTemplate(cbContent, 'ball', 'ball');
	// 		counter++;
	// 	} else if (its_wrapper) {
	// 		return;
	// 	} else {
	// 		continueAnimating = false;
	// 		counter--;
	// 		removeCanvasTemplate(cbContent);
	// 	}

	// 	const canvas = document.getElementById('ball');
	// 	const ctx = canvas.getContext('2d');

	// 	const circle = {
	// 		x: 200,
	// 		y: 200,
	// 		size: 20,
	// 		dx: 5,
	// 		dy: 4
	// 	};

	// 	function drawCircle() {
	// 		ctx.beginPath();
	// 		ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
	// 		ctx.fillStyle = 'teal';
	// 		ctx.fill();
	// 	}

	// 	drawCircle();

	// 	function update() {
	// 		ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 		drawCircle();

	// 		// моеняем координаты
	// 		circle.x += circle.dx;
	// 		circle.y += circle.dy;

	// 		// Определяем боковые границы
	// 		if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
	// 			circle.dx *= -1;
	// 		}

	// 		// Определяем нижнюю и верхнюю границу
	// 		if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
	// 			circle.dy *= -1;
	// 		}

	// 		if (continueAnimating) {
	// 			animationBall = requestAnimationFrame(update);
	// 		}
	// 		console.log('ball');
	// 	}

	// 	const buttonCanvas = document.querySelector('.button--canvas-ball');
	// 	let i = 0;
	// 	buttonCanvas.addEventListener('click', e => {
	// 		continueAnimating = true;

	// 		if (i < 1) {
	// 			update();
	// 			i++;
	// 		}

	// 	}, false);

	// }, false);








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