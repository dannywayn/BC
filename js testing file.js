// lightining the hovered element
var element = null;
var old = null;
var path = null;
var parent_old_style = null;


// get the xpath
var getXElementTreeXPath = function( element ) {
    if(element.hasAttribute("id")){
        return '//' + element.tagName + '[@id="' + element.id + '"]';
    }

    if(element.hasAttribute("name")){
        return '//' + element.tagName + '[@name="' + element.name + '"]';
    }
    
    var paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for ( ; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode )  {
        var index = 0;

        for ( var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling ) {
            // Ignore document type declaration.
            if ( sibling.nodeType == Node.DOCUMENT_TYPE_NODE ) {
                continue;
            }

            if ( sibling.nodeName == element.nodeName ) {
                ++index;
            }
        }

        var tagName = element.nodeName.toLowerCase();

        // *always* include the sibling index
        var pathIndex = "[" + (index+1) + "]";

        paths.unshift( tagName + pathIndex );
    }

    return paths.length ? "/" + paths.join( "/") : null;
};


// return the xpath
function return_data(){
    element.setAttribute('style',old);
    element.parentElement.setAttribute('style',parent_old_style);
    path = getXElementTreeXPath(element);
    reset_attribute();
    document.body.removeAttribute('onmousemove');
}


function coordinate(event){
    path = null;
    console.log(event)
    document.body.addEventListener('click',return_data);
    if (element){
        element.setAttribute('style',old);
        if (element.parentElement){
            element.parentElement.setAttribute('style',parent_old_style);
        }
        
    }
    element = document.elementFromPoint(event.clientX,event.clientY);
    old = element.getAttribute('style');
    parent_old_style = element.parentElement.getAttribute('style');
    
    if (document.elementFromPoint(event.clientX,event.clientY).tagName.toLowerCase() == 'body'){
        element.setAttribute('style', 'border: 3px solid #00ff7b');
    }else if (document.elementFromPoint(event.clientX,event.clientY).tagName.toLowerCase() == 'html'){
        element.setAttribute('style', 'border: 3px solid #00ff7b');
    }else{
        if (element.parentElement.tagName.toLowerCase() != 'body' && element.parentElement.tagName.toLowerCase() != 'html'){
            element.parentElement.setAttribute('style','pointer-events: none;');
        }
        element.setAttribute('style', 'border: 3px solid #00ff7b; pointer-events: none;');
    }
}


function reset_attribute(){
    if (document.body.hasAttribute('onmousemove')){
        document.body.removeAttribute('onmousemove');
    }
}


function path_requested(){
    return path;
}

document.body.setAttribute('onmousemove',"coordinate(event)");
document.body.addEventListener('click',return_data);