
export function isEmpty(obj) {
    if (obj instanceof Element){
        obj = obj.children;
    }
    return Object.keys(obj).length === 0;
}

export function query(string , nr = 0) {

    if(string.charAt(0) === "#"){
        return document.getElementById(string.slice(string.length - 1));
    }

    if (typeof(nr) ===  "number") {
        return document.querySelectorAll(string)[nr];
    } else {
        return document.querySelectorAll(string);
    }
}

export function nthChild(select , nr = 0) {

    if (typeof(select === "string")) {
        if (select.charAt(0) === "#"){
            select = document.getElementById(select.slice(select.length - 1));
        } else {
            select = document.querySelector(select);
        }
    }
    if(typeof(nr) === "number"){
        return select.children[nr];
    } else {
        return select.children;
    }
}

export function colorful (element) {
    let i = 0;
    return setInterval(() => {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let color = "rgb(" + r + "," + g + "," + b + ")";
        element.children[i].style.color = color;
        if(++i === element.children.length){
            i = 0;
        }
    },2)

}

