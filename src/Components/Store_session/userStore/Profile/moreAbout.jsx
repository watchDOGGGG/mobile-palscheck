import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { PhoneOutlined,GooglePlusOutlined} from '@ant-design/icons';
const MoreAbout = ({pagename,id,ProfileImage,about,address,websites,country,region}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <span class="f6 button-reset bg-washed-green ba b--near-white dim pointer pv1 blue b tc ml3" onClick={() => setVisible(true)}>..more</span>
      <Modal
        title={`About ${pagename}`}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
     <div className="flex">
         <div className="w-60">
         <article class=" mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <h1 class="f5 bg-near-white br3 br--top black-60 mv0 pv2 ph3 tc">intro</h1>
  <div class="pa3 bt b--black-10">
    <p class="f6 f5-ns lh-copy measure">
      {about}
    </p>
  </div>
</article>


<article class=" mw5 mw6-ns br3 hidden ba b--black-10 mv4">
<h1 class="f5 br3 br--top black-60 mv0 pv2 ph3 tc">External link</h1>
<ul>
  <li><a href={websites}>{websites}</a></li>
</ul>
</article>

{/* location */}
<article class=" mw5 mw6-ns br3 hidden ba b--black-10 mv4">
<h1 class="f5 br--top mv0 pv2 ph3 tc">Location</h1>
  <p className="ml1 f5">Contry: {
    country?
    country
    :
    ' none'
  }</p>
<p className="ml1 f5">State: {
    region?
    region
    :
    ' none'
  }</p>
<p className="ml1 f5">Address: {
    address?
    address
    :
    ' none'
  }</p>
{/* <Location/> */}
</article>
         </div>
         <div className="w-30">
         <article class="pa2 w-100 mw6-ns br3 hidden ba b--black-10 mv4">
<h1 class="f5 br--top mv0 pv2 ph3 tc">contact Info</h1>
<div class="tc bb b--black-10 mt2 mb2 f5"><PhoneOutlined/> &nbsp; phone:<a> +2345678907</a></div>
<div class="tc bb b--black-10 mt2 mb2 f5"><GooglePlusOutlined />&nbsp; Gmail: <a>user@gmail.com</a></div>
</article>
         </div>
     </div>

      </Modal>
    </>
  );
};
export default MoreAbout