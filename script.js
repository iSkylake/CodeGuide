let container = document.getElementsByClassName("container");
let searchLangInput = document.getElementById("search-language-input");

function displayAll(){
	for(let i=0; i<languages.length; i++){
		let langBox = document.createElement("div");
		let langImg = document.createElement("img");

		langBox.classList.add("lang-box");
		langBox.classList.add(languages[i].color);

		langBox.setAttribute("id", languages[i].name);
		langImg.setAttribute("src", languages[i].url);
		langBox.appendChild(langImg);

		container[0].appendChild(langBox);
	}
}

displayAll();

searchLangInput.addEventListener("keyup", function(){
	let langElements = container[0].children;
	for(let i=0; i<langElements.length; i++){
		if(langElements[i].getAttribute("id").toLowerCase().indexOf(searchLangInput.value.toLowerCase()) > -1){
			langElements[i].style.display = "";
		} else {
			langElements[i].style.display = "none";
		}
	}
});