let copyIcon = document.getElementsByClassName("copy-icon");
let htmlScript = document.getElementsByClassName("html-script");

for(let i=0; i<copyIcon.length; i++){
	copyIcon[i].addEventListener("click", function(){
		var range = window.getSelection().getRangeAt(0);
		range.selectNode(htmlScript[i]);
		window.getSelection(range);
		document.execCommand("copy");
		// window.getSelection().removeAllRanges();
	});
}

