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
			let langBoxHTML = `
				<div class="lang-box ${languages[i].color}">
					<h1>${languages[i].name}</h1>
					<a href="${languages[i].url}">
						<img src="${languages[i].img}">
					</a>
				</div>
			`;

			container.insertAdjacentHTML('beforeend', langBoxHTML);
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