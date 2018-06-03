let container = document.getElementsByClassName("container");
let searchLangInput = document.getElementById("search-language-input");

// CREATE HTML ELEMENTS TO APPEND FUNCTION

for(let i=0; i<languages.length; i++){
	let langBox = document.createElement("div");
	let langUrl = document.createElement("a");
	let langImg = document.createElement("img");
	let langName = document.createElement("h1");

	langBox.className = "lang-box " + languages[i].color;

	langUrl.setAttribute("href", languages[i].url);
	langImg.setAttribute("src", "../" + languages[i].img);
	langUrl.appendChild(langImg);
	langName.appendChild(document.createTextNode(languages[i].name));
	langBox.appendChild(langName);
	langBox.appendChild(langUrl);

	container[0].appendChild(langBox);
}

// DYNAMIC SEARCH FUNCTION

searchLangInput.addEventListener("keyup", function(){
	let langBox = document.getElementsByClassName('lang-box');
	for(let i=0; i<langBox.length; i++){
		if(langBox[i].children[0].textContent.toLowerCase().indexOf(searchLangInput.value.toLowerCase()) > -1){
			langBox[i].style.display = "block";
		} else {
			langBox[i].style.display = "none";
		}
	}
});