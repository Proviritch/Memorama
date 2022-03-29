/* 
*********************************************
Código para ordenar las cartas aleatoriamente
*********************************************
*/
'use strict';

const champions = [['img/aatrox.jpg', 'Aatrox'],['img/ekko.jpg', 'Ekko'],['img/gwen.jpg', 'Gwen'],['img/hecarim.jpg', 'Hecarim'],['img/illaoi.jpg', 'Illaoi'],['img/lulu.jpg', 'Lulu'],['img/malphite.jpg', 'Malphite'],['img/orianna.jpg', 'Orianna'],['img/ornn.jpg', 'Ornn'],['img/rammus.jpg', 'Rammus'],['img/reksai.jpg', "Rek'sai"],['img/renata.jpg', 'Renata Glasc'],['img/sylas.jpg', 'Sylas'],['img/tahmkench.jpg', 'Tahm Kench'],['img/taliyah.jpg', 'Taliyah'],['img/veigar.jpg', 'Veigar'], ['img/velkoz.jpg', "Vel'koz"], ['img/vladimir.jpg', 'Vladimir']];

/*,*/

const page = window;
const body = document.querySelector('body');
const mainDivs = document.getElementsByClassName('main-div');
console.log(mainDivs);


page.addEventListener('load', () => {
    console.log('HOLA')
    let fragment = document.createDocumentFragment();
    let positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];



    const getRandomPosition = (positions) => {
        for (let i = positions.length; i > 0; i--) {
            let j = Math.floor(Math.random()*i);
            let k = positions[i];
            positions[i] = positions[j];
            positions[j] = k;
        }

        return positions.filter(x => x !== undefined);
    }

    let arr = getRandomPosition(positions);

    for (let i = 0; i < 18; i++) {

        let num1 = arr.shift();
        let num2 = arr.shift();      

        let champion1 = champions[i];


        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        p1.classList.add("main-div-card-info-p");
        p2.classList.add("main-div-card-info-p");
        p1.textContent = champion1[1];
        p2.textContent = champion1[1];

        let mainDivsInfo1 = document.createElement('div');
        let mainDivsInfo2 = document.createElement('div');
        mainDivsInfo1.classList.add("main-div-card-info");
        mainDivsInfo2.classList.add("main-div-card-info");
        mainDivsInfo1.style.background = `url(${champion1[0]})`;
        mainDivsInfo2.style.background = `url(${champion1[0]})`;
        mainDivsInfo1.style['background-size'] = `cover`;
        mainDivsInfo2.style['background-size'] = `cover`;

        mainDivs[num1].prepend(mainDivsInfo1);
        mainDivs[num2].prepend(mainDivsInfo2);

        mainDivsInfo1 = mainDivs[num1].getElementsByTagName('div')[0];
        mainDivsInfo2 = mainDivs[num2].getElementsByTagName('div')[0];
        mainDivsInfo1.appendChild(p1);
        mainDivsInfo2.appendChild(p2);

    }

})

/* 
*************************************************
Fin Código para ordenar las cartas aleatoriamente
*************************************************
*/

const main = document.querySelector('.main');
let cards = [];
//let points = document.getElementsByClassName('.header-div2-p')[0];
sessionStorage.clicks = 0;

main.addEventListener('click', e => {
    let father = e.target.offsetParent;
    if (father.classList.contains('main-div') && !father.classList.contains('turn-card')) {
        father.classList.add('turn-card');
        ++sessionStorage.clicks;
        cards.push(father);
    }
    else {
        return
    }
    
    console.log(cards)


    setTimeout(() => {
        if (cards.length === 2) {
            if (cards[0].children[0].children[0].textContent === cards[1].children[0].children[0].textContent) {
                let points = document.getElementsByClassName('header-div2-p')[0];
                console.log(document.getElementsByClassName('header-div2-p')[0]);
                switch (sessionStorage.clicks) {
                    case '2':
                        points.textContent = Number(points.textContent) + 100;
                    break;
                    case '4':
                        points.textContent = Number(points.textContent) + 50;
                    break;
                    case '6': 
                        points.textContent = Number(points.textContent) + 25;
                    break;
                    default:
                        points.textContent = Number(points.textContent) + 10;
                }
                sessionStorage.clicks = 0;
                
            } else {
                cards[0].classList.remove('turn-card');
                cards[1].classList.remove('turn-card');
            }
            cards = [];
        }
    },3000)

})

