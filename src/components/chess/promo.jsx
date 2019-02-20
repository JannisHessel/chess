import React from "react";





class Promo extends React.Component {


    render () {
        return (
            <div id="cover">
                <div id="promotion">
                    <h2>Which Figure should your pawn be promoted to?</h2>
                    <div className="choice" id="white">
                        <img src="../img/chess/WhiteRook.png" alt="Promote to Rook"/>
                        <img src="../img/chess/WhiteKnight.png" alt="Promote to Knight"/>
                        <img src="../img/chess/WhiteBishop.png" alt="Promote to Bishop"/>
                        <img src="../img/chess/WhiteQueen.png" alt="Promote to Queen"/>
                    </div>
                    <div className="choice" id="black">
                        <img src="../img/chess/BlackRook.png" alt="Promote to Rook"/>
                        <img src="../img/chess/BlackKnight.png" alt="Promote to Knight"/>
                        <img src="../img/chess/BlackBishop.png" alt="Promote to Bishop"/>
                        <img src="../img/chess/BlackQueen.png" alt="Promote to Queen"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Promo;