"use strict";
//深度克隆对象
function __DeepCopy(obj) {
    let newObj = {};
    for (let i in obj) {
        if (typeof obj[i] === 'object'){        //判断对象的这条属性是否为对象
            newObj[i] = __DeepCopy(obj[i]);     //若是对象进行嵌套调用
        }else{
            newObj[i] = obj[i];
        }
    }
    return newObj;
}
//轮播图组件
function rotation_animation(options) {
    let getBox = document.querySelector('.kakarot_rotation')
    let getBtn = document.querySelectorAll('.rotation_btn>li');
    let getImagesBox = document.querySelector('.rotationBox_item');
    let getImages = document.querySelectorAll('.rotation_list');
    let getIdentifier = document.querySelector('.identifier_item');
    let createIdentifier = '';
    let getIdentifierChild  = getIdentifier.childNodes;
    let direct = '';
    let moveW = 0;
    let moveH = 0;
    let j = 0;

    if(options.isIdentifier == true){
        getIdentifier.style.visibility = 'visible';
    }else{
        getIdentifier.style.visibility = 'hidden';
    }

    //排他，用于下方的li圆点
    function notNode(arr,notIndex) {
        for(let i = 0; i < arr.length ; i++){
            if(i == notIndex) continue;
            arr[i].className = tempClassName;
        }
    };

    for(let i = 0; i < getImages.length; i++){
        createIdentifier += `<li class="identifier_list"></li>`;
    };

    getIdentifier.innerHTML = createIdentifier;
    let tempClassName = getIdentifierChild[0].className;
    getIdentifierChild[0].className += ' identifier_active';

    function move_animation(Switch = false) {
        Switch == true ? j-- : j++;
        moveH -= getImages[0].offsetHeight;
        if(j > getImages.length-1){
            j = 0;
            moveW =  moveH = 0;
        }else if( j < 0){
            j = getImages.length-1;
            moveH = getImages[0].offsetHeight * j
        }
        if(options.direction == '' || options.direction == 'default'){
            moveW = getImages[0].offsetWidth * j;
            moveH = 0;
            direct = 'flex-direction:row';
        }else if(options.direction == 'column'){
            moveH = getImages[0].offsetHeight * j;
            moveW = 0;
            direct = 'flex-direction:column';
        }
        notNode(getIdentifier.childNodes,j)
        getIdentifierChild[j].className += ' identifier_active';
        getImagesBox.style.cssText = `transform:translate(-${moveW}px,-${moveH}px);transition:transform ${options.delay};${direct};`;
    };

    for(let i = 0 ;i < getIdentifierChild.length ; i++){
        getIdentifierChild[i].onmouseover = function () {
            j = i-1;
            move_animation();
        }
    }

    let timer= setInterval(move_animation,options.autoPlayDelay);
    getBtn[0].onclick = function () {
        move_animation(true);
    };
    getBtn[1].onclick = function () {
        move_animation();
    };
    if(options.autoPlay == false){
        clearInterval(timer);
    }else{
        getBox.onmouseover = function () {
            clearInterval(timer);
        };
        getBox.onmouseout = function () {
            timer = setInterval(move_animation,options.autoPlayDelay);
        };
    };
}