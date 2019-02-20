import React from "react";
import Promo from "./promo";

class Board extends React.Component {
    render () {
        return (
            <React.Fragment>       
                <div className="con">
                    <div className="edge"></div>
                    <div className="edge">A</div>
                    <div className="edge">B</div>
                    <div className="edge">C</div>
                    <div className="edge">D</div>
                    <div className="edge">E</div>
                    <div className="edge">F</div>
                    <div className="edge">G</div>
                    <div className="edge">H</div>
                    <div className="edge"></div>
                    <div className="edge">8</div>
                    <div className="field" id="81">
                    </div>
                    <div className="field" id="82">
                    </div>
                    <div className="field" id="83">
                    </div>
                    <div className="field" id="84">
                    </div>
                    <div className="field" id="85">
                    </div>
                    <div className="field" id="86">
                    </div>
                    <div className="field" id="87">
                    </div>
                    <div className="field" id="88">
                    </div>
                    <div className="edge">8</div>
                    <div className="none"></div>
                    <div className="edge">7</div>
                    <div className="field" id="71">
                    </div>
                    <div className="field" id="72">
                    </div>
                    <div className="field" id="73">
                    </div>
                    <div className="field" id="74">
                    </div>
                    <div className="field" id="75">
                    </div>
                    <div className="field" id="76">
                    </div>
                    <div className="field" id="77">
                    </div>
                    <div className="field" id="78">
                    </div>
                    <div className="edge">7</div>
                    <div className="none"></div>

                    <div className="edge">6</div>
                    <div className="field" id="61"></div>
                    <div className="field" id="62"></div>
                    <div className="field" id="63"></div>
                    <div className="field" id="64"></div>
                    <div className="field" id="65"></div>
                    <div className="field" id="66"></div>
                    <div className="field" id="67"></div>
                    <div className="field" id="68"></div>
                    <div className="edge">6</div>
                    <div className="none"></div>
                    <div className="edge">5</div>
                    <div className="field" id="51"></div>
                    <div className="field" id="52"></div>
                    <div className="field" id="53"></div>
                    <div className="field" id="54"></div>
                    <div className="field" id="55"></div>
                    <div className="field" id="56"></div>
                    <div className="field" id="57"></div>
                    <div className="field" id="58"></div>
                    <div className="edge">5</div>
                    <div className="none"></div>
                    <div className="edge">4</div>
                    <div className="field" id="41"></div>
                    <div className="field" id="42"></div>
                    <div className="field" id="43"></div>
                    <div className="field" id="44"></div>
                    <div className="field" id="45"></div>
                    <div className="field" id="46"></div>
                    <div className="field" id="47"></div>
                    <div className="field" id="48"></div>
                    <div className="edge">4</div>
                    <div className="none"></div>
                    <div className="edge">3</div>
                    <div className="field" id="31"></div>
                    <div className="field" id="32"></div>
                    <div className="field" id="33"></div>
                    <div className="field" id="34"></div>
                    <div className="field" id="35"></div>
                    <div className="field" id="36"></div>
                    <div className="field" id="37"></div>
                    <div className="field" id="38"></div>
                    <div className="edge">3</div>
                    <div className="none"></div>
                    <div className="edge">2</div>
                    <div className="field" id="21">
                    </div>
                    <div className="field" id="22">
                    </div>
                    <div className="field" id="23">
                    </div>
                    <div className="field" id="24">
                    </div>
                    <div className="field" id="25">
                    </div>
                    <div className="field" id="26">
                    </div>
                    <div className="field" id="27">
                    </div>
                    <div className="field" id="28">
                    </div>
                    <div className="edge">2</div>
                    <div className="none"></div>

                    <div className="edge">1</div>
                    <div className="field" id="11">
                    </div>
                    <div className="field" id="12">
                    </div>
                    <div className="field" id="13">
                    </div>
                    <div className="field" id="14">
                    </div>
                    <div className="field" id="15">
                        <div className="white king" draggable="true"></div>
                    </div>
                    <div className="field" id="16">
                    </div>
                    <div className="field" id="17">
                    </div>
                    <div className="field" id="18">
                    </div>
                    <div className="edge">1</div>
                    <div className="edge"></div>
                    <div className="edge">A</div>
                    <div className="edge">B</div>
                    <div className="edge">C</div>
                    <div className="edge">D</div>
                    <div className="edge">E</div>
                    <div className="edge">F</div>
                    <div className="edge">G</div>
                    <div className="edge">H</div>
                    <div className="edge"></div>
                    <Promo />
                </div>
            </React.Fragment>
        )
    }
}

export default Board;
