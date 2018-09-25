import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
    margin-left: 30px;
    margin-right: 50%;
    font-size: large;
    color: black;
`

class SilabasReader extends Component{
    constructor(props){
        super(props)
        this.lineArray = []
        this.state = {
            miTexto: "",
        }   
    }


    componentWillReceiveProps(nextProps) {
        let re = /\n/;
        let re2 = /^\s*/;
        let tempArray = nextProps.sendText.split(re);
        tempArray.forEach(elemento=>{
            let salida=elemento.replace(re2, '')
            if(salida!="") this.lineArray.push(salida)
        })
       
        this.setState({miTexto:this.lineArray[0]})
    }
    
    componentWillMount() {

    }

    componentWillUnmount() {
    
    }

    render(){
        return (
        <Div>
            {this.state.miTexto}
        </Div>
        )}
}

export default SilabasReader