const mainScript = function(){

	// DOM cache
	let container = document.getElementsByClassName("container")[0];
	let searchLangInput = document.getElementById("search-language-input");

	// Self-invoked init function
	init = function(){
		render();
		keyBinding();
	}();

	function render(){
		for(let i=0; i<languages.length; i++){
			let langBox = document.createElement("div");
			let langUrl = document.createElement("a");
			let langImg = document.createElement("img");
			let langName = document.createElement("h1");

			langBox.className = "lang-box " + languages[i].color;

			langUrl.setAttribute("href", languages[i].url);
			langImg.setAttribute("src", languages[i].img);
			langUrl.appendChild(langImg);
			langName.appendChild(document.createTextNode(languages[i].name));
			langBox.appendChild(langName);
			langBox.appendChild(langUrl);

			container.appendChild(langBox);
		}
	}

	function keyBinding(){
		searchLangInput.addEventListener("keyup", searchLanguage);
	}

	function searchLanguage(){	
		let langBox = container.children;
		for(let i=0; i<langBox.length; i++){
			if(langBox[i].children[0].textContent.toLowerCase().indexOf(searchLangInput.value.toLowerCase()) > -1){
				langBox[i].style.display = "";
			} else {
				langBox[i].style.display = "none";
			}
		}
	}

}();