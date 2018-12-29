import './css/style.css';
let logo = require('./images/1.jpg')
let img = new Image();
img.src = logo;
document.body.appendChild(img);
if(module.hot){
    module.hot.accept(); //都更新
}