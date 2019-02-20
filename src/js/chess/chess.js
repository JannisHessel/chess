import {isEmpty} from "../utility.js";
import {Moves} from "./moves.js";

class Chessjs extends Moves{

    constructor () {
        super();
     
        this.dragged = null;
        this.turn = "white";
        this.enemy = "black";
        this.canDrop = false;
        this.promoteDrop = null;
        this.history = {
            white : [],
            black : []
        };
        this.turnEvent = new CustomEvent("turn" , {color : this.turn , claim : false});
    }

    eventBuilder (self) {
        
        document.querySelector("#chess-board").addEventListener("dragstart" , function(event) {
            if (event.target.className.indexOf(self.turn) > -1) {
                self.moves = self.createMove(event.target , self.turn);
                event.dataTransfer.setData('text/plain',null);
                self.dragged = event.target;
                self.showMoves();
            }
        },true);
        
        document.querySelector("#chess-board").addEventListener("dragend" , function(event) {
            self.resetColor();
            self.moves=[];
            self.passant="";
            self.passKill="";
            self.canDrop=false;
        });
        
        document.querySelector("#chess-board").addEventListener("dragenter" , function(event) {
            self.canDrop = self.checkMove(event.target);
        });
        
        document.querySelector("#chess-board").addEventListener("dragover" , function(event) {
                event.preventDefault();
        });
        
        document.querySelector("#chess-board").addEventListener("drop" , function(event) {
            event.preventDefault();
            if (self.canDrop) {
                self.dropFigure(event);
            }
        });
        
        document.querySelector(".choice#white").children[0].addEventListener("click" , function() {
            self.promote("rook");
        });
        
        document.querySelector(".choice#white").children[1].addEventListener("click" , function() {
            self.promote("knight");
        });
        
        document.querySelector(".choice#white").children[2].addEventListener("click" , function() {
            self.promote("bishop");
        });
        
        document.querySelector(".choice#white").children[3].addEventListener("click" , function() {
            self.promote("queen");
        });
        
        document.querySelector(".choice#black").children[0].addEventListener("click" , function() {
            self.promote("rook");
        });
        
        document.querySelector(".choice#black").children[1].addEventListener("click" , function() {
            self.promote("knight");
        });
        
        document.querySelector(".choice#black").children[2].addEventListener("click" , function() {
            self.promote("bishop");
        });
        
        document.querySelector(".choice#black").children[3].addEventListener("click" , function() {
            self.promote("queen");
        });
    }


    checkMove(field) {

        let id;

        if (field.nodeType === 3 || field.className.indexOf(this.enemy) > -1) {
                return this.checkMove(field.parentNode);
        } else if (field.className.indexOf("field") > -1) {
            id = field.id;
        } else {
            return false;
        }

        for (let i in this.moves) {
            if (id === this.moves[i]) {
                return true;
            }
        }
        return false;
    }

    showMoves() {

        let field;

        for (let i = 0 ; i < this.moves.length ; i++) {

            field = document.getElementById(this.moves[i]);
            field.classList.add("highlight");


                if (this.moves[i] === (Number(this.passKill.charAt(0)) - 1) + this.passKill.charAt(1) && this.turn === "black") {

                    field.innerHTML = "&#x2191;";

                } else if (this.moves[i] === (Number(this.passKill.charAt(0)) + 1) + this.passKill.charAt(1) && this.turn === "white") {

                    field.innerHTML = "&#x2193;";
                }

            if (!isEmpty(field)) {

                field.children[0].innerHTML = "&#9760;";
            }
            if (this.passKill !== "") {
                document.getElementById(this.passKill).children[0].innerHTML = "&#9760;";
            }
        }
        if (this.dragged.className.indexOf("king") > -1) {
            if (this.turn === "black") {
                if (this.leftCastle) {
                    document.getElementById(81).children[0].innerHTML = "&#x2B08;";
                    document.getElementById(83).innerHTML = "&#x2BA9;";
                    document.getElementById(84).classList.add("castle-black");
                }
                if (this.rightCastle) {
                    document.getElementById(88).children[0].innerHTML = "&#x2B09;";
                    document.getElementById(87).innerHTML = "&#x2BA8;";
                    document.getElementById(86).classList.add("castle-black");
                }
            } else {
                if (this.leftCastle) {
                    document.getElementById(11).children[0].innerHTML = "&#x2B08;";
                    document.getElementById(13).innerHTML = "&#x2BA9;";
                    document.getElementById(14).classList.add("castle-white");
                }
                if (this.rightCastle) {
                    document.getElementById(18).children[0].innerHTML = "&#x2B09;";
                    document.getElementById(17).innerHTML = "&#x2BA8;";
                    document.getElementById(16).classList.add("castle-white");
                }
            }
        }
    }

    resetColor() {

        let field;

        for (let i = 0 ; i < this.moves.length ; i++) {
            field =document.getElementById(this.moves[i]);

            field.className = "field";

            if (!isEmpty(field.childNodes)) {
                if (field.childNodes[0].nodeType === 3) {
                    field.removeChild(field.childNodes[0]);
                }
            }
            if (!isEmpty(field)) {
                field.children[0].innerHTML = "";
            }
        }
        if (this.passKill !== "" && !isEmpty(document.getElementById(this.passKill))) {
                document.getElementById(this.passKill).children[0].innerHTML = "";
        }

        if (this.dragged.className.indexOf("king") > -1) {
            if (!isEmpty(document.getElementById(81))) {
                document.getElementById(81).children[0].innerHTML = "";
            }
            if (!isEmpty(document.getElementById(88))) {
                document.getElementById(88).children[0].innerHTML = "";
            }
            if (!isEmpty(document.getElementById(11))) {
                document.getElementById(11).children[0].innerHTML = "";
            }
            if (!isEmpty(document.getElementById(18))) {
                document.getElementById(18).children[0].innerHTML = "";
            }
        }
    }

    dropFigure(event) {
        let id;

        this.checkPassant(this.dragged , event , this.turn);

        if (this.leftCastle && this.dragged.className === "black king" && event.target.id === "83") {
            document.getElementById("81").innerHTML = "";
            document.getElementById("84").innerHTML = "<div class='black rook'></div>";
        }
        if (this.rightCastle && this.dragged.className === "black king" && event.target.id === "87") {
            document.getElementById("88").innerHTML = "";
            document.getElementById("86").innerHTML = "<div class='black rook'></div>";
        }
        if (this.leftCastle && this.dragged.className === "white king" && event.target.id === "13") {
            document.getElementById("11").innerHTML =  "";
            document.getElementById("14").innerHTML = "<div class='white rook'></div>";
        }
        if (this.rightCastle && this.dragged.className === "white king" && event.target.id === "17") {
            document.getElementById("18").innerHTML = "";
            document.getElementById("16").innerHTML = "<div class='white rook'></div>";
        }
        id = "nayy";

        if (!isEmpty(event.target.children)) {

            let remove = event.target.children[0];
            event.target.removeChild(remove);
            this.dragged.parentNode.removeChild(this.dragged);
            event.target.appendChild(this.dragged);
            id = event.target.id;
            if(remove.className.indexOf("king") > -1){
              this.winEvent.winner = this.turn;
              window.dispatchEvent(this.winEvent);
            }
            this.history[this.turn] = [];
            this.history[this.enemy] = [];

        } else if (event.target.className.indexOf(this.enemy) > -1) {
            id = event.target.parentNode.id;
            this.dragged.parentNode.removeChild(this.dragged);
            event.target.parentNode.appendChild(this.dragged);
            event.target.parentNode.removeChild(event.target);
            if(event.target.className.indexOf("king") > -1){
                this.winEvent.winner = this.turn;
                window.dispatchEvent(this.winEvent);
            }
            this.history[this.turn] = [];
            this.history[this.enemy] = [];

        } else {
            this.dragged.parentNode.removeChild(this.dragged);
            event.target.appendChild(this.dragged);
            id = event.target.id;
            if (this.dragged.className.indexOf("pawn") > -1){
                this.history[this.turn] = [];
                this.history[this.enemy] = [];
            }
        }


        if (this.dragged.className.indexOf("pawn") > -1) {
            if (id.charAt(0) === "8") {
                document.querySelector("#cover").style.display = "block";
                document.querySelector(".choice#white").style.display = "flex";
                this.promoteDrop = document.getElementById(id);
                return;
            }
            else if (id.charAt(0) === "1") {
                document.querySelector("#cover").style.display = "block";
                document.querySelector(".choice#black").style.display = "flex";
                this.promoteDrop = document.getElementById(id);
                return;
            }
        }

        this.changeCastle(this.dragged , id);


        this.canDrop = false;
        this.endTurn();
    }

    promote(figure) {

        document.querySelector(".choice#" + this.turn).style.display = "none";
        document.querySelector("#cover").style.display = "none";
        this.promoteDrop.innerHTML = "<div class='" + this.turn + " " + figure + "' ></div>";
        this.canDrop = false;
        this.endTurn();
    }

    endTurn () {
        let temp;
        let turnFigures = document.querySelectorAll("." + this.turn);
        let enemyFigures = document.querySelectorAll("." + this.enemy);
        this.turnEvent.claim = false;
        this.history[this.turn].push(this.makeHistory(turnFigures,  enemyFigures));
        

        this.materialDraw (turnFigures , enemyFigures);
        this.checkCastle(this.turn , this.enemy);

        for (let fig = 0 ; fig < turnFigures.length ; fig++) {
            turnFigures[fig].setAttribute('draggable', 'false');
        }
        for (let fig = 0 ; fig < enemyFigures.length ; fig++) {
            enemyFigures[fig].setAttribute('draggable', 'true');
        }
        temp = this.enemy;
        this.enemy = this.turn;
        this.turn = temp;
        this.stalemate(this.turn , enemyFigures);
        this.turnEvent.color = this.turn;
        window.dispatchEvent(this.turnEvent);
    }


    stalemate (turn , turnFigures) {
        let mv = [];
        for (let i = 0 ; i < turnFigures.length ; i++) {
            mv = mv.concat(this.createMove(turnFigures[i],turn));
        }
        if (isEmpty(mv)) {
            this.winEvent.winner="draw";
            window.dispatchEvent(this.winEvent);
        }
        
    }

    materialDraw (turnFigures , enemyFigures) {
        let draw = false
        if (turnFigures.length === 1 && enemyFigures.length === 2){
            for(let i = 0 ; i < enemyFigures.length ; i++){
                if(enemyFigures[i].className.indexOf("bishop") > -1 || enemyFigures[i].className.indexOf("knight") > -1){
                    draw = true;
                }
            }
        } else if (turnFigures.length === 2 && enemyFigures.length === 1){
            for(let i = 0 ; i < turnFigures.length ; i++){
                if(turnFigures[i].className.indexOf("bishop") > -1 || turnFigures[i].className.indexOf("knight") > -1){
                    draw = true;
                }
            }
        } else if (turnFigures.length === 1 && enemyFigures.length === 1){
            draw = true;
        } else if (turnFigures.length === 2 && enemyFigures.length === 2){
            for(let i = 0 ; i < turnFigures.length ; i++){
                if(turnFigures[i].className.indexOf("bishop") > -1){
                    let bisht = (Number(turnFigures[i].parentNode.id.charAt(0)) + Number(turnFigures[i].parentNode.id.charAt(1))) % 2;
                    for(let j = 0 ; j < enemyFigures.length ; j++){
                        if(enemyFigures[j].className.indexOf("bishop") > -1){
                            let bishe = (Number(enemyFigures[j].parentNode.id.charAt(0)) + Number(enemyFigures[j].parentNode.id.charAt(1))) % 2;
                            if ( bisht === bishe ) {
                                draw = true;
                            }
                        }
                    }
                }
            }
        }
        if (draw) {
            this.winEvent.winner = "draw";
            window.dispatchEvent(this.winEvent);
        }
    }

    makeHistory(turnFigures,  enemyFigures) {
        let position = [];

        for (let i = 0 ; i < turnFigures.length ; i++){
            position.push([turnFigures[i].parentNode.id , turnFigures[i].className.charAt(0) + turnFigures[i].className.charAt(6) + turnFigures[i].className.charAt(7)])
        }
        for (let i = 0 ; i < enemyFigures.length ; i++){
            position.push([enemyFigures[i].parentNode.id , enemyFigures[i].className.charAt(0) + enemyFigures[i].className.charAt(6) + enemyFigures[i].className.charAt(7)])
        }
        position.sort((a,b) => a[0] > b[0])
        for(let i in position){
            position[i] = position[i].toString();
        }
        let string = this.whiteCastle.toString() + this.blackCastle.toString() + position.toString();

        for (let i = 0 ; i < this.history[this.turn].length ; i++){

            if(this.history[this.turn][i] === string){
                for (let j = i + 1 ; j < this.history[this.turn].length ; j++) {

                    if(this.history[this.turn][j] === string){
                        this.turnEvent.claim = "threefold repetition"
                        break;
                    }
                }
                break;
            }
        }

        return string;
    }
};



export default Chessjs;