function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// На странице выбора уровней:

let levelPassedOne = getCookie('levelPassedOne');
let levelPassedTwo = getCookie('levelPassedTwo');
let levelPassedFree = getCookie('levelPassedTree');
let levelPassedFour = getCookie('levelPassedFour');
let levelPassedFive = getCookie('levelPassedFive');
let levelPassedSix = getCookie('levelPassedSix');
let levelPassedSeven = getCookie('levelPassedSeven');
let levelPassedEight = getCookie('levelPassedEight');
let levelPassedNine = getCookie('levelPassedNine');
// let levelPassedTen = getCookie('levelPassedTen');

// Если все уровни пройдены, удаляем класс "disable" у ссылки на второй уровень
if (levelPassedOne === 'true') {
    document.getElementById('level2link').classList.remove('disable');
}

if (levelPassedTwo === 'true') {
    document.getElementById('level3link').classList.remove('disable');
}

if (levelPassedFree === 'true') {
    document.getElementById('level4link').classList.remove('disable');
}

if (levelPassedFour === 'true') {
    document.getElementById('level5link').classList.remove('disable');
}

if (levelPassedFive === 'true') {
    document.getElementById('level6link').classList.remove('disable');
}

if (levelPassedSix === 'true') {
    document.getElementById('level7link').classList.remove('disable');
}

if (levelPassedSeven === 'true') {
    document.getElementById('level8link').classList.remove('disable');
}

if (levelPassedEight === 'true') {
    document.getElementById('level9link').classList.remove('disable');
}

if (levelPassedNine === 'true') {
    document.getElementById('level10link').classList.remove('disable');
}


