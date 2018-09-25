import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
    margin-left: 30px;
    margin-right: 50%;
    font-size: large;
    color: black;
`


function Linea(props){
    return (<p>{props.linea}</p>)
}

function WordArray(props){
    let salida = []
    let tam=props.param.length
    for(let x=0;x<tam;x++){
        if(props.index==x){
            salida.push(<b>{props.param[x]}&nbsp;</b>)
        }
        else{
            salida.push(<span>{props.param[x]}&nbsp;</span>)
        }
    }
    return salida
}


class SilabasReader extends Component{
    constructor(props){
        super(props)
        this.lineArray = []
        this.lineCursor = 0;
        this.wordArray = [];
        this.wordCursor = 0;
        this.state = {
            linea: "",
            palabra: "",
            wordArray: [],
            wordCursor: 0,
        }   
    }


    componentWillReceiveProps(nextProps) {
        //--- filtra la entrada para dejar un vector de lineas de texto
        let re = /\n/;
        let re2 = /^\s*/;
        let tempArray = nextProps.sendText.split(re);
        tempArray.forEach(elemento=>{
            let salida=elemento.replace(re2, '')
            if(salida!="") this.lineArray.push(salida)
        })
        this.lineCursor = 0;
        this.wordCursor = 0;
        this.showLine()

    }
    
    divideLineArray(){
        let re = /\s/
        this.wordArray = this.lineArray[this.lineCursor].split(re)
    }

    showLine(){
        //-- hace la conversión a vector de palabras
        this.divideLineArray();
        // this.setState({linea:this.lineArray[this.lineCursor]})
        // this.setState({palabra:this.wordArray[this.wordCursor]})
        this.setState({wordArray:this.wordArray, wordCursor:this.wordCursor})

    }


    //------ Tecla de avanzar
    nextKey(){
        //--- avanza la palabra
        let wtam = this.wordArray.length
        if(this.wordCursor+1<wtam) {
            this.wordCursor++
        }else{
            //--- avanza la linea
            let tama = this.lineArray.length
            if(this.lineCursor+1<tama) this.lineCursor++
            this.wordCursor = 0
        }
        //--muestra la linea
        this.showLine();

    }

    //------ Tecla de retroceder
    prevKey(){
        if(this.wordCursor!=0){
            this.wordCursor--
        }
        else{
            //--- retrocede la linea
            if(this.lineCursor!=0){
                this.lineCursor--
                this.divideLineArray()
                this.wordCursor = this.wordArray.length - 1
            }

        }
        //--muestra la linea
        this.showLine();
    }


    _handleKeyDown = (event) => {
        //console.log("Tecla="+event.keyCode); //---88(x) y 90(z)
        switch(event.keyCode){
            case 88:
                this.nextKey();
            break
            
            case 90:
                this.prevKey();
            break
            default:
            break

        }
    }


    componentWillMount() {
        document.addEventListener("keydown", this._handleKeyDown.bind(this))
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown.bind(this))
    }

    render(){
        return (
        <Div>
            <WordArray param={this.state.wordArray} index={this.state.wordCursor}/>
        </Div>
        )}
}

export default SilabasReader
