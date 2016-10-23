var CourseBuilder = CourseBuilder || {};

CourseBuilder.questionModal = (function () {
	return function () {

		let container = null;
		let questionContainer = null;
		let answerContainer = null;
		let content = null;
		let sendBtn = null;
		let value = null;
		let errorDiv = null;

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

				content = document.createElement('div');
				content.className = 'modal-content';
				content.style.backgroundColor = "#fefefe";
				content.style.margin = "auto";
				content.style.padding = "20px";
				content.style.border = "1px solid #888";
				content.style.width = "80%";
				content.style.height = "15%";


				questionContainer = document.createElement('p');
				answerContainer = document.createElement('div');
				answerContainer.style.display = "flex";
				answerContainer.style.flexDirection = "column";

				sendBtn = document.createElement('span');

				sendBtn.className = 'send';
				sendBtn.style.color = "#aaaaaa";
				sendBtn.style.float = "right";
				sendBtn.style.fontSize = "28px";
				sendBtn.style.fontWeight = "bold";

				sendBtn.appendChild(document.createTextNode('Send'));

				content.appendChild(questionContainer);
				content.appendChild(answerContainer);
				content.appendChild(sendBtn);

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

		const _cleanQuestion = () => {
			while (questionContainer.firstChild) {
				questionContainer.firstChild.remove();
			}
			while (answerContainer.firstChild) {
				answerContainer.firstChild.remove();
			}
		}

		const _getAnswer = () => {
			const radios = answerContainer.querySelectorAll("input");
			const len = radios.length;
			for (let i = 0; i < len; i++) {
				if (!!radios[i].checked) {
					return radios[i].value;
				}
			}
		}

		const _addError = error => {
			debugger;
			if (!!errorDiv) {
				errorDiv.remove();
			}
			errorDiv = document.createElement('div');

			errorDiv.appendChild(document.createTextNode(error));
			content.insertBefore(errorDiv, content.firstChild);
		}

		const _getValue = () => value;

		const _show = () => container.style.display = "block";

		const _hide  = () => container.style.display = "none";

		const _onSend = func => !!sendBtn ? sendBtn.addEventListener('click', () => func(_getAnswer())) : '';

		const _setQuestion = question => questions.push(question);

		const _setContainer = cont => container = cont;

		const _render = () => !!container ? _buildModal() : '';

		return {
			setValue: _setValue,
			getValue: _getValue,
			show: _show,
			hide: _hide,
			onSend: _onSend,
			setContainer: _setContainer,
			render: _render,
			addError: _addError,
		}

	}
})();