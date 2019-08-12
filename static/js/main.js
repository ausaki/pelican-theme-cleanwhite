/**
 * Targets special code or div blocks and converts them to UML.
 * @param {object} converter is the object that transforms the text to UML.
 * @param {string} className is the name of the class to target.
 * @param {object} settings is the settings for converter.
 * @return {void}
 */
var uml = function (converter, className, settings) {

    var getFromCode = function getFromCode(parent) {
        // Handles <pre><code>
        var text = "";
        for (var j = 0; j < parent.childNodes.length; j++) {
            var subEl = parent.childNodes[j];
            if (subEl.tagName.toLowerCase() === "code") {
                for (var k = 0; k < subEl.childNodes.length; k++) {
                    var child = subEl.childNodes[k];
                    var whitespace = /^\s*$/;
                    if (child.nodeName === "#text" && !whitespace.test(child.nodeValue)) {
                        text = child.nodeValue;
                        break;
                    }
                }
            }
        }
        return text;
    };

    var getFromDiv = function getFromDiv(parent) {
        // Handles <div>
        return parent.textContent || parent.innerText;
    };

    // Change body to whatever element your main Markdown content lives.
    var body = document.querySelectorAll("body");
    var blocks = document.querySelectorAll("pre." + className + ",div." + className

        // Is there a settings object?
    );
    var config = settings === void 0 ? {} : settings;

    // Find the UML source element and get the text
    for (var i = 0; i < blocks.length; i++) {
        var parentEl = blocks[i];
        var el = document.createElement("div");
        el.className = className;
        el.style.visibility = "hidden";
        el.style.position = "absolute";

        var text = parentEl.tagName.toLowerCase() === "pre" ? getFromCode(parentEl) : getFromDiv(parentEl);

        // Insert our new div at the end of our content to get general
        // typeset and page sizes as our parent might be `display:none`
        // keeping us from getting the right sizes for our SVG.
        // Our new div will be hidden via "visibility" and take no space
        // via `position: absolute`. When we are all done, use the
        // original node as a reference to insert our SVG back
        // into the proper place, and then make our SVG visible again.
        // Lastly, clean up the old node.
        body[0].appendChild(el);
        var diagram = converter.parse(text);
        diagram.drawSVG(el, config);
        el.style.visibility = "visible";
        el.style.position = "static";
        parentEl.parentNode.insertBefore(el, parentEl);
        parentEl.parentNode.removeChild(parentEl);
    }
}

var hlcode = function () {
    if (typeof hljs === "undefined") {
        console.log('highlight.js undefined');
        return;
    }
    $('pre.block-code-hl > code').each((i, el) => {
        console.log(el);
        hljs.highlightBlock(el);
    });
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    // textArea.remove();
    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

var addCopyBtnToCodeBlock = function(){
    let code_blocks = document.querySelectorAll('.block-code-hl')
    code_blocks.forEach((el) => {
        let btn = document.createElement("button");
        btn.classList.add("copy-code", "btn");
        btn.textContent = "Copy";
        btn.onclick = (e) => {
            let pre = el.childNodes[0];
            let text = pre.textContent;
            copyTextToClipboard(text);
            btn.textContent = 'Copied';
            setTimeout(()=> {
                btn.textContent = 'Copy';
            }, 2000)
        }
        el.appendChild(btn);
    })
}

var searchWithGoogle = function(){
    let form = document.forms.namedItem('search');
    let hostname = form.elements.namedItem('site').value;
    let search_btn = form.elements.namedItem('submit');
    search_btn.onclick = (e) => {
        let query = form.elements.namedItem('q').value;
        let keyword = 'site:' + hostname + ' ' + query;
        let url = 'https://www.google.com/search?q=' + encodeURIComponent(keyword)
        window.open(url, 'google');
        e.preventDefault();
    }
}

$(() => {
    // render code
    // hlcode();
    // render flowchart
    // if (typeof flowchart !== "undefined") {
    //     uml(flowchart, "uml-flowchart");
    // }
    // render sequence diagram
    // if (typeof Diagram !== "undefined") {
    //     uml(Diagram, "uml-sequence-diagram", {
    //         theme: "simple"
    //     });
    // }
    addCopyBtnToCodeBlock();
    searchWithGoogle();
})