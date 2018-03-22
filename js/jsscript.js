let scriptContainer = document.getElementsByClassName("script-container");
let copyIcon = document.getElementsByClassName("copy-icon");
let scripts = document.getElementsByClassName("scripts");

// Display all JS scripts
for(let i=0; i<javascript.length; i++){
	let scriptBlock = document.createElement("div");
	let scriptName = document.createElement("div");
	let scripts = document.createElement("code");

	scriptBlock.className = "script-block";
	scriptName.className += "script-name script-name-js";
	scripts.className = 'scripts';

	scriptName.innerHTML = '<h3>' + javascript[i].name + '</h3>';

	for(let j=0; j<javascript[i].code.length; j++){
		scripts.innerHTML += javascript[i].code[j];
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
}