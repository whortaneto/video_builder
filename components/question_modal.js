var CourseBuilder = CourseBuilder || {};

CourseBuilder.questionModal = (function () {
	return function () {

		let container = null;
		let questionContainer = null;
		let answerContainer = null;
		let closeBtn = null;
		let value = null;

		const _buildModal = () => {
			if (!!container) {
				container.className = 'modal';
				container.style.display = "none";
				container.style.position = "fixed";
				container.style.zIndex = "1";
				container.style.paddingTop = "100px";
				container.style.left = "0";
				container.style.top = "0";
				container.style.width = "100%";
				container.style.height = "100%";
				container.style.overflow = "auto";
				container.style.backgroundColor = "rgb(0,0,0)";
				container.style.backgroundColor = "rgba(0,0,0,0.4)";

				const content = document.createElement('div');
				content.className = 'modal-content';
				content.style.backgroundColor = "#fefefe";
				content.style.margin = "auto";
				content.style.padding = "20px";
				content.style.border = "1px solid #888";
				content.style.width = "80%";



				closeBtn = document.createElement('span');
				closeBtn.addEventListener('click', () => container.style.display = "none");

				closeBtn.className = 'close';
				closeBtn.style.color = "#aaaaaa";
				closeBtn.style.float = "right";
				closeBtn.style.fontSize = "28px";
				closeBtn.style.fontWeight = "bold";

				closeBtn.appendChild(document.createTextNode('x'));

				questionContainer = document.createElement('p');
				answerContainer = document.createElement('div');
				answerContainer.style.display = "flex";
				answerContainer.style.flexDirection = "column";

				content.appendChild(closeBtn);
				content.appendChild(questionContainer);
				content.appendChild(answerContainer);

				container.appendChild(content);
			}

		}

		const _setValue = ({question, choices, index}, callback) => {
			if(!!questionContainer) {
				value  = {question, choices, index};

				_cleanQuestion();
				questionContainer.appendChild(document.createTextNode(question));

				const len = choices.length;
				let choiceRadio = null;
				let choiceLabel = null;
				for(let i = 0; i < len; i++) {
					choiceLabel = document.createElement("label");
					choiceLabel.innerText = choices[i].text;

					choiceRadio = document.createElement("input");
					choiceRadio.type = "radio";
					choiceRadio.name = "choices";
					choiceRadio.value = choices[i].text;

					if (choices[i].isCorrect && !!callback) {
						choiceRadio.addEventListener("change", () => {
							callback();
						})
					}
					choiceLabel.appendChild(choiceRadio);
					answerContainer.appendChild(choiceLabel);
				}
			}
		};

		const _getValue = () => value;

		const _cleanQuestion = () => {
			while (questionContainer.firstChild) {
				questionContainer.firstChild.remove();
			}
			while (answerContainer.firstChild) {
				answerContainer.firstChild.remove();
			}
		}

		const _show = () => container.style.display = "block";

		const _onClose = func => !!closeBtn ? closeBtn.addEventListener('click', func) : '';

		const _setQuestion = question => questions.push(question);

		const _setContainer = cont => container = cont;

		const _render = () => !!container ? _buildModal() : '';

		return {
			setValue: _setValue,
			getValue: _getValue,
			show: _show,
			onClose: _onClose,
			setContainer: _setContainer,
			render: _render,
		}

	}
})();