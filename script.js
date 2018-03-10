let container = document.getElementsByClassName("container");
let searchLangInput = document.getElementById("search-language-input");

// CREATE HTML ELEMENTS TO APPEND FUNCTION

function displayAll(){
	for(let i=0; i<languages.length; i++){
		let langBox = document.createElement("div");
		let langUrl = document.createElement("a");
		let langImg = document.createElement("img");
		let langName = document.createElement("h1");

		langBox.classList.add("lang-box");
		langBox.classList.add(languages[i].color);

		langUrl.setAttribute("href", languages[i].url);
		langImg.setAttribute("src", languages[i].img);
		langUrl.appendChild(langImg);
		langName.appendChild(document.createTextNode(languages[i].name));
		langBox.appendChild(langName);
		langBox.appendChild(langUrl);

		container[0].appendChild(langBox);
	}
}

displayAll();

// DYNAMIC SEARCH FUNCTION

searchLangInput.addEventListener("keyup", function(){
	let langElements = container[0].children;
	for(let i=0; i<langElements.length; i++){
		if(langElements[i].children[0].textContent.toLowerCase().indexOf(searchLangInput.value.toLowerCase()) > -1){
			langElements[i].style.display = "";
		} else {
			langElements[i].style.display = "none";
		}
	}
});