const langScript = (function(){

	// DOM cache
	let scriptContainer = document.getElementsByClassName("script-container")[0];
	let copyIcon = document.getElementsByClassName("copy-icon");
	let tooltip = document.getElementsByClassName("tooltip");
	let scripts = document.getElementsByClassName("scripts");
	let titleName = document.getElementsByTagName("h1")[0];
	let iconTitle = document.getElementsByClassName("icon-title")[0];
	let scriptBlock = document.getElementsByClassName("script-block");
	let searchInputScript = document.getElementById("search-script");
	let notFound = document.getElementsByClassName("not-found")[0];

	let langIndex = window.location.href.indexOf('#');
	let language = window.location.href.slice(langIndex+2);

	init = function(){
		setTitle();
		render();
		keyBinding();
	}();

	function setTitle(){
		let titleTag = document.getElementsByTagName("title")[0];
		titleTag.textContent = this[language].title;
	}

	function render(){
		// Navbar title and icon
		titleName.textContent = this[language].title;
		iconTitle.className += " " + this[language].icon;

		// Render all scripts
		for(let i=0; i<this[language].script.length; i++){

			// Create script elements
			let scriptBlock = document.createElement("div");
			let scriptName = document.createElement("div");
			let scripts = document.createElement("code");

			// Add class to script elements
			scriptBlock.className = "script-block";
			scriptName.className += "script-name script-name-" + this[language].title.toLowerCase();
			scripts.className = 'scripts';

			// Append h3 node to script element
			scriptName.insertAdjacentHTML('beforeend', '<h3>' + this[language].script[i].name + '</h3>');

			// Append scripts
			for(let j=0; j<this[language].script[i].code.length; j++){
				scripts.insertAdjacentHTML('beforeend', this[language].script[i].code[j]);
			}
			scriptBlock.appendChild(scriptName);
			scriptBlock.appendChild(scripts);

			// Create copy icon		
			let newCopyIcon = document.createElement("i");
			let tooltip = document.createElement("span");
			tooltip.appendChild(document.createTextNode("Copy"));
			newCopyIcon.className += "far fa-copy copy-icon";
			tooltip.className = "tooltip";
			newCopyIcon.appendChild(tooltip);
			scriptBlock.appendChild(newCopyIcon);

			// Append script element to container
			scriptContainer.appendChild(scriptBlock);
		}

	}

	function keyBinding(){
		scriptContainer.addEventListener('mouseover', copyHover);
		scriptContainer.addEventListener('click', copyClick);
		searchInputScript.addEventListener("keyup", scriptSearch);
	}

	function copyHover(e){
		if(e.target && e.target.nodeName === 'I'){
			e.target.children[0].textContent = 'Copy';
			e.target.children[0].classList.remove('bounce-animation');
		}
	}

	function copyClick(e){
		if(e.target && e.target.nodeName === 'I'){
			e.target.children[0].textContent = 'Copied';
			e.target.children[0].classList.add('bounce-animation');
			let range = window.getSelection().getRangeAt(0);
			range.selectNode(e.target.previousSibling);
			window.getSelection(range);
			document.execCommand("copy");
			// window.getSelection().removeAllRanges();
		}
	}

	function scriptSearch(){
		let hiddenScript = 0;
		for(let i=0; i<scriptBlock.length; i++){
			if(scriptBlock[i].children[0].textContent.toLowerCase().indexOf(searchInputScript.value.toLowerCase()) > -1 || scriptBlock[i].children[1].textContent.toLowerCase().indexOf(searchInputScript.value.toLowerCase()) > -1){
				scriptBlock[i].style.display = "block";
			} else {
				scriptBlock[i].style.display = "none";
				hiddenScript++;
			}
		}
		if(scriptBlock.length === hiddenScript){
			notFound.style.display = "block";
		} else {
			notFound.style.display = "none";
		}
	}

})();