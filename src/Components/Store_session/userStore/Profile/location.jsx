
 import React from 'react'
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
      </div>
    );
  }
}
 
export default SimpleMap;