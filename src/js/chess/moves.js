import {isEmpty} from "../utility.js";



class Moves{


    constructor () {
        this.moves = [];
        this.passant = "";
        this.passCheck = [];
        this.passKill = "";
        this.threat = [];
        
        this.whiteCastle = ["13" , "17"];
        this.blackCastle = ["83" , "87"];
        this.leftCastle = false;
        this.rightCastle = false;

        this.winEvent = new CustomEvent("win",{winner:null});
    }




    createMove(figure , turn) {
        let clas = figure.className;
        if (clas.indexOf("rook") > -1) {
            return this.rook(figure.parentNode.id , turn);
        }
        else if (clas.indexOf("pawn") > -1) {
            return this.pawn(figure.parentNode.id , turn);
        }
        else if (clas.indexOf("knight") > -1) {
            return this.knight(figure.parentNode.id , turn);
        }
        else if (clas.indexOf("bishop") > -1) {
            return this.bishop(figure.parentNode.id , turn);
        }
        else if (clas.indexOf("queen") > -1) {
            return this.queen(figure.parentNode.id , turn);
        }
        else if (clas.indexOf("king" , turn) > -1) {
            return this.king(figure.parentNode.id , turn);
        }
    }

    checkCastle(turn , enemy) {
        let turnFigures = document.querySelectorAll("." + turn);
        this.threat=[];
        for (let i = 0 ; i < turnFigures.length ; i++) {
            if(turnFigures[i].className.indexOf("pawn") === -1){
                this.threat = this.threat.concat(this.createMove(turnFigures[i] , enemy));
            } else {
                let x = Number(turnFigures[i].parentNode.id.charAt(0));
                let y = Number(turnFigures[i].parentNode.id.charAt(1));
                if (y < 8) { 
                    if (turn === "white") {
                        this.threat.push((x + 1) + "" + (y + 1))
                    } else {
                        this.threat.push((x - 1) + "" + (y + 1))
                    }
                }
                if (y > 1) {
                    if (turn === "white") {
                        this.threat.push((x + 1) + "" + (y - 1))
                    } else {
                        this.threat.push((x - 1) + "" + (y - 1))
                    }
                }
            }
        }

        if (turn === "white") {
            if (this.blackCastle.includes("83")) {
                if (isEmpty(document.getElementById("82").children) && isEmpty(document.getElementById("83").children) && isEmpty(document.getElementById("84").children)) {
                    if (this.threat.includes("83") || this.threat.includes("84") || this.threat.includes("85")) {
                        this.leftCastle = false;
                    } else {
                        this.leftCastle = true;
                    }
                } else {
                    this.leftCastle = false;
                }
            } else {
                this.leftCastle = false;
            } 

            if (this.blackCastle.includes("87")) {
                if (isEmpty(document.getElementById("86").children) && isEmpty(document.getElementById("87").children)) {
                    if (this.threat.includes("85") || this.threat.includes("86") || this.threat.includes("87")) {
                        this.rightCastle = false;
                    } else {
                        this.rightCastle = true;
                    }
                } else {
                    this.rightCastle = false;
                }
            } else {
                this.rightCastle = false;
            }
        }

        if (turn === "black") {

            if (this.whiteCastle.includes("13")) {
                if (isEmpty(document.getElementById("12").children) && isEmpty(document.getElementById("13").children) && isEmpty(document.getElementById("14").children)) {

                    if (this.threat.includes("13") || this.threat.includes("14") || this.threat.includes("15")) {
                        this.leftCastle = false;
                    } else {
                        this.leftCastle = true;
                    }     
                } else {
                    this.leftCastle = false;
                }
            } else {
                this.leftCastle = false;
            }

            if (this.whiteCastle.includes("17")) {

                if (isEmpty(document.getElementById("16").children) && isEmpty(document.getElementById("17").children)) {
                    if (this.threat.includes("15") || this.threat.includes("16") || this.threat.includes("17")) {
                        this.rightCastle = false;
                    } else {
                        this.rightCastle = true;
                    }         
                } else {
                this.rightCastle = false;
            }
            } else {
                this.rightCastle = false;
            }
        }
    }

    changeCastle (dragged , id) {
        if (dragged.className.indexOf("king") > -1) {
            if (this.turn === "black") {
                this.blackCastle = [];
            } else {
                this.whiteCastle = [];
            }
        }
        if (dragged.className.indexOf("rook") > -1) {
            let id = dragged.parentNode.id;
            if (id === "11") {
                this.whiteCastle = this.whiteCastle.filter(id => id === "17");
            }
            if (id === "18") {
                this.whiteCastle = this.whiteCastle.filter(id => id === "13");
            }
            if (id === "81") {
                this.blackCastle = this.blackCastle.filter(id => id === "87");
            }
            if (id === "88") {
                this.blackCastle = this.blackCastle.filter(id => id === "83");
            }
        }

        if (id === "11") {
            this.whiteCastle = this.whiteCastle.filter(id => id === "17");
        }
        if (id === "18") {
            this.whiteCastle = this.whiteCastle.filter(id => id === "13");
        }
        if (id === "81") {
            this.blackCastle = this.blackCastle.filter(id => id === "87");
        }
        if (id === "88") {
            this.blackCastle = this.blackCastle.filter(id => id === "83");
        }

    }

    checkPassant (dragged , event , turn) {
        if (event.target.id === this.passant && dragged.className.indexOf("pawn") > -1) {
            this.passCheck = [this.passant.charAt(0) + (Number(this.passant.charAt(1)) - 1) , this.passant.charAt(0) + (Number(this.passant.charAt(1)) + 1)];
        } else if (event.target.id === (Number(this.passKill.charAt(0)) + 1) + this.passKill.charAt(1) && turn === "white" && dragged.className.indexOf("pawn") > -1) {
            document.getElementById(this.passKill).innerHTML= "";
            this.passCheck = [];
        } else if (event.target.id === (Number(this.passKill.charAt(0)) - 1) + this.passKill.charAt(1) && turn === "black" && dragged.className.indexOf("pawn") > -1) {
            document.getElementById(this.passKill).innerHTML= "";
            this.passCheck = [];
        } else {
            this.passCheck = [];
        }
    }


    rook(fieldID , turn) {
        let mv = [];
        let i = fieldID.charAt(0);
        let j = fieldID.charAt(1);
        let count = i;


        while (count < 8) {
            let id = (1 + Number(count)) + j;
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {}
            else {
                if (location.children[0].className.indexOf(turn) > -1) {
                    break;
                } else {
                    mv.push(id);
                    break;
                }
            }
            mv.push(id);
            count++;
        }

        count =i;
        while (count > 1) {
            let id = (Number(count) - 1) + j;
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {}
            else {
                if (location.children[0].className.indexOf(turn) > -1) {
                    break;
                } else {
                    mv.push(id);
                    break;
                }
            }
            mv.push(id);
            count--;
        }

        count = j;
        while (count > 1) {
            let id = i + (Number(count) - 1);
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {}
            else {
                if (location.children[0].className.indexOf(turn) > -1) {
                    break;
                } else {
                    mv.push(id);
                    break;
                }
            }
            mv.push(id);
            count--;
        }

        count = j;
        while (count < 8) {
            let id = i + (1 + Number(count));
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {

            }
            else {
                if (location.children[0].className.indexOf(turn) > -1) {
                    break;
                } else {
                    mv.push(id);
                    break;
                }
            }
            mv.push(id);
            count++;
        }
        return mv;
    }

    pawn(fieldID , turn) {
        let mv = [];
        let i = fieldID.charAt(0);
        let j = fieldID.charAt(1);
        let location;
        if (turn === "white") {
            if (i < 8) {
                let id = (1 + Number(i)) + j;
                location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);

                    if (i === "2") {

                        let id = (2 + Number(i)) + j;
                        location = document.getElementById(id);

                        if (isEmpty(location.children)) {
                            this.passant=id;
                            mv.push(id);
                        }
                    }
                }
                if (j < 8) {
                    id = (1 + Number(i)) + "" + (1 + Number(j));
                    location = document.getElementById(id);

                    if (!isEmpty(location)) {
                        if (location.children[0].className.indexOf(turn) === -1) {
                            mv.push(id);
                        }
                    } else if (fieldID === this.passCheck[0]) {
                        mv.push(id);
                        this.passKill = (Number(id.charAt(0)) - 1) + id.charAt(1);
                    }
                }
                if (j > 1) {
                    id = (1 + Number(i)) + "" + (Number(j) - 1);
                    location = document.getElementById(id);

                    if (!isEmpty(location)) {
                        if (location.children[0].className.indexOf(turn) === -1) {
                            mv.push(id);
                        }
                    } else if (fieldID === this.passCheck[1]) {
                        mv.push(id);
                        this.passKill = (Number(id.charAt(0)) - 1) + id.charAt(1);
                    }
                }
            }            
        }
        if (turn === "black") {
            if (i >1) {
                let id = (Number(i) - 1) + j;
                location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);

                    if (i === "7") {

                        let id = (Number(i) - 2) + j;
                        location = document.getElementById(id);

                        if (isEmpty(location.children)) {
                            this.passant = id;
                            mv.push(id);
                        }
                    }
                }
                if (j < 8) {
                    id = (Number(i) - 1) + "" + (1 + Number(j));
                    location = document.getElementById(id);

                    if (!isEmpty(location.children)) {
                        if (location.children[0].className.indexOf(turn) === -1) {
                            mv.push(id);
                        }
                    } else if (fieldID === this.passCheck[0]) {
                        mv.push(id);
                        this.passKill = (Number(id.charAt(0)) + 1) + id.charAt(1);
                    }
                }
                if (j > 1) {
                    id = (Number(i) - 1) + "" + (Number(j) - 1);
                    location = document.getElementById(id);

                    if (!isEmpty(location.children)) {
                        if (location.children[0].className.indexOf(turn) === -1) {
                            mv.push(id);
                        }
                    } else if (fieldID === this.passCheck[1]) {
                        mv.push(id);
                        this.passKill = (Number(id.charAt(0)) + 1) + id.charAt(1);
                    }
                }
            }            
        }
        return mv;
    }

    knight(fieldID , turn) {
        let mv = [];
        let i = fieldID.charAt(0);
        let j = fieldID.charAt(1);
        if (i < 7) {
            if (j < 8) {
                let id = (Number(i) + 2) + "" + (Number(j) + 1);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
            if (j > 1) {
                let id = (Number(i) + 2) + "" + (Number(j) - 1);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
        }
        if (i < 8) {
            if (j < 7) {
                let id = (Number(i) + 1) + "" + (Number(j) + 2);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
            if (j > 2) {
                let id = (Number(i) + 1) + "" + (Number(j) - 2);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
        }
        if (i >1) {
            if (j < 7) {
                let id = (Number(i) - 1) + "" + (Number(j) + 2);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
            if (j > 2) {
                let id = (Number(i)-1) + "" + (Number(j) - 2);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
        }
        if (i > 2) {
            if (j < 8) {
                let id = (Number(i)-2) + "" + (Number(j) + 1);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
            if (j > 1) {
                let id = (Number(i)-2) + "" + (Number(j)-1);
                let location = document.getElementById(id);

                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }
        }
        return mv;
    }

    bishop(fieldID , turn) {
        let mv = [];
        let i = fieldID.charAt(0);
        let j = fieldID.charAt(1);
        let count = 1;
        let id;

        while (Number(i) + count < 9 && Number(j) + count < 9) {

            id = (Number(i) + count) + "" + (Number(j) + count);
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {}
            else {

                if (location.children[0].className.indexOf(turn) > -1) {

                break;

                } else {

                    mv.push(id);
                    break;
                }
            }

            mv.push(id);
            count++
        }

        count = 1;
        while (Number(i) + count < 9 && Number(j) - count > 0) {
            
            id = (Number(i) + count) + "" + (Number(j) - count);
            let location = document.getElementById(id);

                if (isEmpty(location.children)) {}
                else {

                    if (location.children[0].className.indexOf(turn) > -1) {

                    break;

                    } else {

                        mv.push(id);
                        break;
                    }
                }

            mv.push(id);
            count++;
        }
        count = 1;
        while (Number(i) - count > 0 && Number(j) + count < 9) {

            id = (Number(i) - count) + "" + (Number(j) + count);
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {}
            else {

                if (location.children[0].className.indexOf(turn) > -1) {

                break;

                } else {

                    mv.push(id);
                    break;
                }
            }

            mv.push(id);
            count++;
        }
        count = 1;
        while (Number(i) - count > 0 && Number(j) - count >0) {

            id = (Number(i) - count) + "" + (Number(j) - count);
            let location = document.getElementById(id);

            if (isEmpty(location.children)) {}
            else {

                if (location.children[0].className.indexOf(turn) > -1) {

                break;

                } else {

                    mv.push(id);
                    break;
                }
            }

            mv.push(id);
            count++;
        }
        return mv;
    }

    queen(fieldID , turn) {
        return this.rook(fieldID , turn).concat(this.bishop(fieldID , turn))  
    }

    king(fieldID , turn) {
        let mv = [];
        let i = fieldID.charAt(0);
        let j = fieldID.charAt(1);
        let id;

        if (turn === "black") {
            if (this.leftCastle) {
                mv.push("83");
            }
            if (this.rightCastle) {
                mv.push("87");
            }
        } else {
            if (this.leftCastle) {
                mv.push("13");
            }
            if (this.rightCastle) {
                mv.push("17");
            }
        }

            if (j < 8) {
                id = (Number(i)) + "" + (Number(j) + 1);
                let location = document.getElementById(id);
                if(!this.threat.includes(id)){
                    if (isEmpty(location.children)) {
                        mv.push(id);
                    } else if (location.children[0].className.indexOf(turn) === -1) {
                        mv.push(id);
                    }
                }
            }
            if (j > 1) {
                id = (Number(i)) + "" + (Number(j) - 1);
                let location = document.getElementById(id);
                if(!this.threat.includes(id)){
                    if (isEmpty(location.children)) {
                        mv.push(id);
                    } else if (location.children[0].className.indexOf(turn) === -1) {
                        mv.push(id);
                    }
                }
            }


        if (i < 8) {
            let id = (Number(i)+1) + "" + (Number(j));
            let location = document.getElementById(id);
            if(!this.threat.includes(id)){
                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }


            if (j < 8) {
                id = (Number(i)+1) + "" + (Number(j) + 1);
                let location = document.getElementById(id);
                if(!this.threat.includes(id)){
                    if (isEmpty(location.children)) {
                        mv.push(id);
                    } else if (location.children[0].className.indexOf(turn) === -1) {
                        mv.push(id);
                    }
                }
            }
            if (j > 1) {
                id = (Number(i) + 1) + "" + (Number(j) - 1);
                let location = document.getElementById(id);
                if(!this.threat.includes(id)){
                    if (isEmpty(location.children)) {
                        mv.push(id);
                    } else if (location.children[0].className.indexOf(turn) === -1) {
                        mv.push(id);
                    }
                }
            }
        }        
        if (i > 1) {
            let id = (Number(i) - 1) + "" + (Number(j));
            let location = document.getElementById(id);
            if(!this.threat.includes(id)){
                if (isEmpty(location.children)) {
                    mv.push(id);
                } else if (location.children[0].className.indexOf(turn) === -1) {
                    mv.push(id);
                }
            }


            if (j < 8) {
                id = (Number(i) - 1) + "" + (Number(j) + 1);
                let location = document.getElementById(id);
                if(!this.threat.includes(id)){
                    if (isEmpty(location.children)) {
                        mv.push(id);
                    } else if (location.children[0].className.indexOf(turn) === -1) {
                        mv.push(id);
                    }
                }
            }
            if (j > 1) {
                id = (Number(i) - 1) + "" + (Number(j) - 1);
                let location = document.getElementById(id);
                if(!this.threat.includes(id)){
                    if (isEmpty(location.children)) {
                        mv.push(id);
                    } else if (location.children[0].className.indexOf(turn) === -1) {
                        mv.push(id);
                    }
                }
            }
        }
        return mv;
    }
}

export {Moves};