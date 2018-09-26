import React, { Component } from 'react'
import { ReactReader } from '../src'
import SilabasReader from './silabasReader'
import {
  Container,
  ReaderContainer,
  Bar,
  Logo,
  CloseButton,
  CloseIcon,
  FontSizeButton,
} from './Components'

const storage = global.localStorage || null

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullscreen: process.env.NODE_ENV !== 'production',
      location:
        storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2,
      largeText: false,
      sendText: "", // --Para enviar al control el texto que debe mostrar
    }
    this.rendition = null
    this.getSectionText = this.getSectionText.bind(this);
  }

  toggleFullscreen = () => {
    this.setState(
      {
        fullscreen: !this.state.fullscreen
      },
      () => {
        setTimeout(() => {
          const evt = document.createEvent('UIEvents')
          evt.initUIEvent('resize', true, false, global, 0)
        }, 1000)
      }
    )
  }

  onLocationChanged = location => {
    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem('epub-location', location)
      }
    )
  }

  onToggleFontSize = () => {
    const nextState = !this.state.largeText
    this.setState(
      {
        largeText: nextState
      },
      () => {
        this.rendition.themes.fontSize(nextState ? '140%' : '100%')
      }
    )
  }

  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    const { largeText } = this.state
    this.rendition = rendition
    rendition.themes.fontSize(largeText ? '140%' : '100%')
  }

  //--- Trae el texto de toda una sección en formato HTML
  getSectionText(contents,view){
    let stripedHtml = contents.replace(/<[^>]+>/g, ''); //--quita todo el HTML https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
    //console.log("Hook Funcionando OJOJOJOJO!!!",stripedHtml);
    this.setState({sendText:stripedHtml})
  }

  render() {
    const { fullscreen, location } = this.state
    return (
      <div>
      <Container>
        <SilabasReader sendText={this.state.sendText}/>
        <ReaderContainer>
          <ReactReader
            url={'https://f001.backblazeb2.com/file/orgpublicinfo99/general/alanpoe.epub'}
            locationChanged={this.onLocationChanged}
            title={'Alice in wonderland'}
            location={location}
            getRendition={this.getRendition}
            serializeSection={this.getSectionText}
          />
          <FontSizeButton onClick={this.onToggleFontSize}>
            Toggle font-size
          </FontSizeButton>
        </ReaderContainer>
      </Container>
      </div>

    )
  }
}

export default App

//---url={'https://s3-eu-west-1.amazonaws.com/react-reader/alice.epub'}
//---url={'https://f001.backblazeb2.com/file/orgpublicinfo99/general/alanpoe.epub'}