let scriptContainer = document.getElementsByClassName("script-container");
let copyIcon = document.getElementsByClassName("copy-icon");
let tooltip = document.getElementsByClassName("tooltip");
let scripts = document.getElementsByClassName("scripts");
let titleTag = document.getElementsByTagName("title");
let titleName = document.getElementsByTagName("h1");
let iconTitle = document.getElementsByClassName("icon-title");
let scriptBlock = document.getElementsByClassName("script-block");
let searchScript = document.getElementById("search-script");
let notFound = document.getElementsByClassName("not-found");

titleTag[0].textContent = languages.title;
titleName[0].textContent = languages.title;
iconTitle[0].classList += " " + languages.icon;

// Display all JS scripts
for(let i=0; i<languages.script.length; i++){
	let scriptBlock = document.createElement("div");
	let scriptName = document.createElement("div");
	let scripts = document.createElement("code");

	scriptBlock.className = "script-block";
	scriptName.className += "script-name script-name-" + languages.title.toLowerCase();
	scripts.className = 'scripts';

	scriptName.insertAdjacentHTML('beforeend', '<h3>' + languages.script[i].name + '</h3>');

	for(let j=0; j<languages.script[i].code.length; j++){
		scripts.insertAdjacentHTML('beforeend', languages.script[i].code[j]);
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

	scriptContainer[0].appendChild(scriptBlock);
}

// Copy functionality
for(let i=0; i<copyIcon.length; i++){
	copyIcon[i].addEventListener("click", function(){
		var range = window.getSelection().getRangeAt(0);
		range.selectNode(scripts[i]);
		window.getSelection(range);
		document.execCommand("copy");
		// window.getSelection().removeAllRanges();
	});
};

// Tooltip text change
for(let i=0; i<copyIcon.length; i++){
	copyIcon[i].addEventListener("mouseover", function(){
		tooltip[i].textContent = 'Copy';
		tooltip[i].classList.remove('bounce-animation');
	});
}

for(let i=0; i<copyIcon.length; i++){
	copyIcon[i].addEventListener("click", function(){
		tooltip[i].textContent = 'Copied';
		tooltip[i].classList.add('bounce-animation');
	});
}

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
	console.log(hiddenScript === scriptBlock.length);
	if(scriptBlock.length === hiddenScript){
		notFound[0].style.display = "block";
		console.log('DAFUQ');
	} else {
		notFound[0].style.display = "none";
	}
});