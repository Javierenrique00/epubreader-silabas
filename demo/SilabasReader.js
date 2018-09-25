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
        let re3 = /\s/
        this.wordArray = this.lineArray[this.lineCursor].split(re3)
    }
    
    showLine(){
        //-- hace la conversión a vector de palabras
        let re = /\s/
        this.wordArray = this.lineArray[this.lineCursor].split(re)
        this.setState({linea:this.lineArray[this.lineCursor]})
        this.setState({palabra:this.wordArray[this.wordCursor]})
    }



    //------ Tecla de avanzar
    nextKey(){
        //--mira si puede avanzar
        console.log("NEXT wcursor=",this.wordCursor)
        //--- avanza la palabra
        let wtam = this.wordArray.length
        if(this.wordCursor+1<wtam) {
            this.wordCursor++
        }else{
            //--- avanza la linea
            let tama = this.lineArray.length
            if(this.lineCursor+1<tama) this.lineCursor++
            this.wordCursor = 0;
        }
        //--muestra la linea
        this.showLine();

    }

    //------ Tecla de retroceder
    prevKey(){
        
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
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
        //this.showLine();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown.bind(this));
    }

    render(){
        return (
        <Div>
            <Linea linea={this.state.linea}/>
            <br/>
            <Linea linea={this.state.palabra}/>
        </Div>
        )}
}

export default SilabasReader