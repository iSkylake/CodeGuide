const language = (function(){

	let scriptContainer = document.getElementsByClassName("script-container")[0];
	let copyIcon = document.getElementsByClassName("copy-icon");
	let tooltip = document.getElementsByClassName("tooltip");
	let scripts = document.getElementsByClassName("scripts");
	let titleTag = document.getElementsByTagName("title")[0];
	let titleName = document.getElementsByTagName("h1")[0];
	let iconTitle = document.getElementsByClassName("icon-title")[0];
	let scriptBlock = document.getElementsByClassName("script-block");
	let searchScript = document.getElementById("search-script");
	let notFound = document.getElementsByClassName("not-found")[0];

	let langIndex = window.location.href.indexOf('#');
	let languages = window.location.href.slice(langIndex+2);

	titleTag.textContent = this[languages].title;
	titleName.textContent = this[languages].title;
	iconTitle.classList += " " + this[languages].icon;

	// Display all JS scripts
	for(let i=0; i<this[languages].script.length; i++){
		let scriptBlock = document.createElement("div");
		let scriptName = document.createElement("div");
		let scripts = document.createElement("code");

		scriptBlock.className = "script-block";
		scriptName.className += "script-name script-name-" + this[languages].title.toLowerCase();
		scripts.className = 'scripts';

		scriptName.insertAdjacentHTML('beforeend', '<h3>' + this[languages].script[i].name + '</h3>');

		for(let j=0; j<this[languages].script[i].code.length; j++){
			scripts.insertAdjacentHTML('beforeend', this[languages].script[i].code[j]);
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

		scriptContainer.appendChild(scriptBlock);
	}

	// Tooltip text change
	scriptContainer.addEventListener('mouseover', function(e){
		if(e.target && e.target.nodeName === 'I'){
			e.target.children[0].textContent = 'Copy';
			e.target.children[0].classList.remove('bounce-animation');
		}
	});

	// Copy function and tooltip text change
	scriptContainer.addEventListener('click', function(e){
		if(e.target && e.target.nodeName === 'I'){
			e.target.children[0].textContent = 'Copied';
			e.target.children[0].classList.add('bounce-animation');
			let range = window.getSelection().getRangeAt(0);
			range.selectNode(e.target.previousSibling);
			window.getSelection(range);
			document.execCommand("copy");
			// window.getSelection().removeAllRanges();
		}
	});

	// Script Dynamic Search	
	searchScript.addEventListener("keyup", function(){
		let hiddenScript = 0;
		for(let i=0; i<scriptBlock.length; i++){
			if(scriptBlock[i].children[0].textContent.toLowerCase().indexOf(searchScript.value.toLowerCase()) > -1 || scriptBlock[i].children[1].textContent.toLowerCase().indexOf(searchScript.value.toLowerCase()) > -1){
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
	});

})();