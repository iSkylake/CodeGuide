let scripts = document.getElementsByClassName("scripts");
let copyIcon = document.getElementsByClassName("copy-icon");
let scriptContainer = document.getElementsByClassName("script-container");

function displayHTML(){
	for(let i=0; i<html.length; i++){

		// Creates HTML elements
		let scriptBlock = document.createElement("div");
		let scriptName = document.createElement("div");
		let scriptNameH3 = document.createElement("H3");
		let scripts = document.createElement("code");

		// Add class to elements
		scriptBlock.className = "script-block";
		scriptName.className = "script-name script-name-html";
		scripts.className += "scripts script-container";

		// Creating and appending script name
		scriptNameH3.appendChild(document.createTextNode(html[i].name));
		scriptName.appendChild(scriptNameH3);
		scriptBlock.appendChild(scriptName);

		let codeLine = (html[i].code).split("\n");

		// Loop through every line
		for(let j=0; j<codeLine.length; j++){

			// Split string into an array
			let arr = stringSplit(codeLine[j]);

			// Loop through the array and assign syntax highlight
			for(let i=0; i<arr.length; i++){
				let equalIndex = arr[i].indexOf("=");
				let span;

				if(equalIndex > -1){
					let attribute = arr[i].substring(0, equalIndex);
					let atrValue = arr[i].substring(equalIndex+1);
					span = document.createElement("span");
					span.className = htmlHighlight(attribute);
					span.appendChild(document.createTextNode(" " + attribute));
					scripts.appendChild(span);

					span = document.createElement("span");
					span.className = htmlHighlight(atrValue);
					scripts.appendChild(document.createTextNode("="));
					span.appendChild(document.createTextNode(atrValue));
					scripts.appendChild(span);

				} else if (arr[i].length === 1){
					scripts.appendChild(document.createTextNode(arr[i]));

				} else if(arr[i].indexOf(" ") === 0){
					let blankSpace = "";
					for(let k=0; k<arr[i].indexOf("<"); k++){
						blankSpace += "\u00A0";
					}
					scripts.appendChild(document.createTextNode(blankSpace + "<"));

				} else {
					span = document.createElement("span");
					span.className = htmlHighlight(arr[i]);
					span.appendChild(document.createTextNode(arr[i]));
					scripts.appendChild(span);
				}
			};

			// Add break line if necessary
			if(j < codeLine.length-1){
				scripts.appendChild(document.createElement("br"));
			}
		}

		// Append code element to div block
		scriptBlock.appendChild(scripts);

		// Create copy icon		
		let newCopyIcon = document.createElement("i");
		let tooltip = document.createElement("span");
		tooltip.appendChild(document.createTextNode("Copy"));
		newCopyIcon.className += "far fa-copy copy-icon";
		tooltip.className = "tooltip";
		newCopyIcon.appendChild(tooltip);
		scriptBlock.appendChild(newCopyIcon);

		// Append div block to main container
		scriptContainer[0].appendChild(scriptBlock);
	}
};

// Split line code string into array
function stringSplit(strCodeLine){
	let arr = [];

	while(strCodeLine.length > 0){
		let quoteIndex = strCodeLine.indexOf('"');
		let spaceIndex = strCodeLine.indexOf(" ");

		if(strCodeLine.indexOf("<") === 0 || strCodeLine.indexOf(">") === 0 || strCodeLine.indexOf("/") === 0){
			arr.push(strCodeLine.substring(0, 1));
			strCodeLine = strCodeLine.substring(1, strCodeLine.length);
		
		} else if(spaceIndex === 0 && strCodeLine.substring(strCodeLine.indexOf("<")-1, strCodeLine.indexOf("<")) === " "){
			arr.push(strCodeLine.substring(0, strCodeLine.indexOf("<")+1));
			strCodeLine = strCodeLine.substring(strCodeLine.indexOf("<")+1, strCodeLine.length);
		
		} else if(spaceIndex === 0){
			strCodeLine = strCodeLine.trim();
		
		} else if(spaceIndex < quoteIndex && spaceIndex !== -1){
			arr.push(strCodeLine.substring(0, spaceIndex));
			strCodeLine = strCodeLine.substring(spaceIndex+1, strCodeLine.length);
		
		}	else if(quoteIndex === -1 || spaceIndex === -1){
			let leftBracketIndex = strCodeLine.indexOf("<");
			let rightBracketIndex = strCodeLine.indexOf(">");
			
			if(leftBracketIndex < rightBracketIndex && leftBracketIndex > -1){
				arr.push(strCodeLine.substring(0, leftBracketIndex));
				strCodeLine = strCodeLine.substring(leftBracketIndex, strCodeLine.length);						
			} else {
				arr.push(strCodeLine.substring(0, rightBracketIndex));
				strCodeLine = strCodeLine.substring(rightBracketIndex, strCodeLine.length);
			}
		} else {
			let nextQuoteIndex = strCodeLine.indexOf('"', quoteIndex+1);
			arr.push(strCodeLine.substring(0, nextQuoteIndex+1));
			strCodeLine = strCodeLine.substring(nextQuoteIndex+1, strCodeLine.length);
		};
	};

	return arr;
};

// Checks HTML tag and attribute and return syntax highlight class name
function htmlHighlight(str){
	switch(str){
		case "meta":
		case "link":
		case "input":
		case "script":
		case "form":
		case "button": return "tag-name";

		case "name":
		case "content":
		case "initial-scale":
		case "rel":
		case "type":
		case "href":
		case "autocomplete":
		case "src":
		case "onsubmit":
		case "placeholder": return "tag-atr";

		default: return "tag-string";
	}
};

displayHTML();

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