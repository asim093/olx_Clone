// import React from 'react'
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

// const CloudinaryImage = () => {
//   const cld = new Cloudinary({ cloud: { cloudName: 'dg5m042zm' } });
  
//   const img = cld
//         .image('cld-sample-5')
//         .format('auto') 
//         .quality('auto')
//         .resize(auto().gravity(autoGravity()).width(500).height(500)); 

//   return (<AdvancedImage cldImg={img}/>);
// };

// export default CloudinaryImage