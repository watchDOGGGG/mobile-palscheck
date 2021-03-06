import React from 'react';
import './App.css';
import LayoutTemp from '../Components/Layout/layout'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      
    }
  }
 MobileRedirect = ()=>{
   window.location.href = "https://m.palscheck.com"
 }
 renderContent = () => {
  if (isMobile) {
    this.MobileRedirect()
  }
  return <LayoutTemp />
}

render() {
  return (
    <LayoutTemp />
  )
}

}

export default App;
