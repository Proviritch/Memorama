(() => {

    /* 
*********************************************
Código para ordenar las cartas aleatoriamente
*********************************************
*/
'use strict';

const characters = [['img/aatrox.jpg', 'Aatrox'],['img/ekko.jpg', 'Ekko'],['img/gwen.jpg', 'Gwen'],['img/hecarim.jpg', 'Hecarim'],['img/illaoi.jpg', 'Illaoi'],['img/lulu.jpg', 'Lulu'],['img/malphite.jpg', 'Malphite'],['img/orianna.jpg', 'Orianna'],['img/ornn.jpg', 'Ornn'],['img/rammus.jpg', 'Rammus'],['img/reksai.jpg', "Rek'sai"],['img/renata.jpg', 'Renata Glasc'],['img/sylas.jpg', 'Sylas'],['img/tahmkench.jpg', 'Tahm Kench'],['img/taliyah.jpg', 'Taliyah'],['img/veigar.jpg', 'Veigar'], ['img/velkoz.jpg', "Vel'koz"], ['img/vladimir.jpg', 'Vladimir']];
const page = window;
const mainDivs = document.getElementsByClassName('main-div');

let champions = [];
let positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
let points = document.getElementsByClassName('header-div2-p')[0];
let pRecord = document.querySelector('.record');


class Champion {
    constructor(a,b,c,d) {
        this.name = a;
        this.img = b;
        this.pos1 = c;
        this.pos2 = d;
    }
}

//Este sirve para mostrar lo máximo conseguido en las veces que se ha jugado
console.log(localStorage.record);
if(!localStorage.record) {
    localStorage.record = 0;
} else {
    console.log('Entré')
    pRecord.textContent = `Record: ${localStorage.record}`;
}



page.addEventListener('load', () => {

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

    for (let i = 0; i < characters.length; i++) {
        champions[i] = new Champion(characters[i][1], characters[i][0], arr.shift(), arr.shift())
    }

    //console.log(champions);

    for (let i = 0; i < 18; i++) {

        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        p1.classList.add("main-div-card-info-p");
        p2.classList.add("main-div-card-info-p");

        let mainDivsInfo1 = document.createElement('div');
        let mainDivsInfo2 = document.createElement('div');
        mainDivsInfo1.classList.add("main-div-card-info", `[${champions[i].pos1}]`);
        mainDivsInfo2.classList.add("main-div-card-info", `[${champions[i].pos2}]`);

        mainDivs[champions[i].pos1].prepend(mainDivsInfo1);
        mainDivs[champions[i].pos2].prepend(mainDivsInfo2);

        mainDivsInfo1 = mainDivs[champions[i].pos1].getElementsByTagName('div')[0];
        mainDivsInfo2 = mainDivs[champions[i].pos2].getElementsByTagName('div')[0];
        mainDivsInfo1.appendChild(p1);
        mainDivsInfo2.appendChild(p2);

    }

})

/* 
*************************************************
Fin Código para ordenar las cartas aleatoriamente
*************************************************
*/

/*
**********************************************************************
Inicio código para comprobar si el usuario encuentra ambas cartas o no
**********************************************************************
*/

const body = document.getElementsByTagName('body')[0];
const main = document.querySelector('.main');
let cards = [];
let cardId;
//let points = document.getElementsByClassName('.header-div2-p')[0];
sessionStorage.clicks = 0;
sessionStorage.numCards = 0;



/* let game = (e) => {
    console.log(e.target);
    main.removeEventListener('click', game);
    setTimeout(() => {
        main.addEventListener('click', game) 
    },2000)
    console.log('EL PEPE');
}

main.addEventListener('click', game)  */

let game = (e) => {

    let father = e.target.offsetParent;


    if (father.classList.contains('main-div')) {

        for (let i in champions) {

            if (main.getElementsByClassName(`main-div`)[champions[Number(i)].pos1] === father || main.getElementsByClassName(`main-div`)[champions[Number(i)].pos2] === father && cards.length < 2) {

                let divCardInfo = father.children[0];

                divCardInfo.style.background = `url(${champions[Number(i)].img})`;
                divCardInfo.style['background-size'] = `cover`;
                divCardInfo.children[0].textContent = champions[Number(i)].name;
                father.classList.add('turn-card');
                cards.push(father);
                break;

            }
        }

        ++sessionStorage.numCards;
        ++sessionStorage.clicks;

        if (sessionStorage.numCards === '2' && cards[0].id === cards[1].id) {
            sessionStorage.numCards = '1';
            cards.pop();
            return
        }

        if (sessionStorage.numCards === '2') main.removeEventListener('click', game)

    }
    else return





    if (cards[0].children[0].children[0].textContent === cards[1].children[0].children[0].textContent) {

        let pointsMarker = document.querySelector('.marcador');

        switch (sessionStorage.clicks) {
            case '2':
                points.textContent = Number(points.textContent) + 100;
                pointsMarker.textContent = `+${100}`;
                pointsMarker.classList.add('fade');
            break;
            case '4':
                points.textContent = Number(points.textContent) + 50;
                pointsMarker.textContent = `+${50}`;
                pointsMarker.classList.add('fade');
            break;
            case '6': 
                points.textContent = Number(points.textContent) + 25;
                pointsMarker.textContent = `+${25}`;
                pointsMarker.classList.add('fade');
            break;
            default:
                points.textContent = Number(points.textContent) + 10;
                pointsMarker.textContent = `+${10}`;
                pointsMarker.classList.add('fade');
        }
        sessionStorage.clicks = 0;
        sessionStorage.numCards = 0;
        cards[0].style['pointer-events'] = 'none';
        cards[1].style['pointer-events'] = 'none';
        cards = [];
        

        main.addEventListener('click', game)

        setTimeout(() => {
            pointsMarker.classList.remove('fade');
        },600)

        newGame();

    } else {

        const promise = () => {
            return new Promise ((resolve) => {
                setTimeout(() => {
                    resolve()
                },3000)
            })
        }

        const removeElements = () => {
            return new Promise ((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            })
        }


        

        promise()
            .then(() => {
                cards[0].classList.remove('turn-card');
                cards[1].classList.remove('turn-card');
                removeElements()
                    .then(() => {
                        cards[0].children[0].children[0].textContent = '';
                        cards[0].children[0].style.background = 'url("reverso_carta.png")';
                        cards[1].children[0].children[0].textContent = '';
                        cards[1].children[0].style.background = 'url("reverso_carta.png")';

                        cards = [];
                        sessionStorage.numCards = 0;
                        main.addEventListener('click', game)

                        //console.log("Adios");
                    })
                //console.log("Hola");
            })
               
    }
    
}

main.addEventListener('click', game)



const newGame = () => {
    for (let i = 0; i < main.children.length; i++) {
        if (!main.children[i].classList.contains('turn-card')) {
            return
        }
    }
    let playAgain = document.querySelector('.marcador');
    playAgain.classList.add('newgame');
    playAgain.textContent = 'New game';
    
    

    if (Number(points.textContent) > Number(localStorage.record)) {
        localStorage.record = points.textContent;
        pRecord.textContent = `Record: ${Number(points.textContent)}`
    }

    playAgain.addEventListener('click', () => {
        window.location.reload();
    })
    
}



/*
**********************************************************************
Fin código para comprobar si el usuario encuentra ambas cartas o no
**********************************************************************
*/

})();






