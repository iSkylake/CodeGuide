let scriptContainer = document.getElementsByClassName("script-container");

let scriptBlock = document.createElement("div");
let scriptName = document.createElement("div");
let scripts = document.createElement("code");

scriptBlock.className = "script-block";
scriptName.className += "script-name script-name-js";
scripts.className = 'scripts';

scriptName.innerHTML = '<h3>ForEach</h3>'
scripts.innerHTML = '<span class="js-reserved">let</span> arr <span class="js-symbols">=</span> [<span class="js-numbers">1</span>, <span class="js-numbers">2</span>, <span class="js-numbers">3</span>]; <br> <br> arr.<span class="js-reserved">forEach</span>(<span class="js-reserved">function</span>(<i><span class="js-params">num</span></i>){ <br> &nbsp&nbsp<span class="js-reserved">console</span>.<span class="js-reserved">log</span>(num<span class="js-symbols">+</span><span class="js-numbers">2</span>); <br> });';

scriptBlock.appendChild(scriptName);
scriptBlock.appendChild(scripts);

scriptContainer[0].appendChild(scriptBlock);