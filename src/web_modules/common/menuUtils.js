let map= {};
let headMap = { air:"1" };
let menuMap = {
    skill:{ subKey:"sub1",key:"1",id:"SKILL_ID"},
    reading:{ subKey:"sub1",key:"2",id:"BOOK_ID"},
    life:{ subKey:"sub1",key:"3",id:"LIFE_ID"},
    travel:{ subKey:"sub1",key:"4",id:"TRAVEL_ID"}
};

export const getHeadKey = ()=> {
    const url = window.location.href;
    const head = url.split("/#/")[1].split("/")[0];
    return headMap[head];
};

export const getMenuKeys = ()=> {
    const url = window.location.href;
    const menu = url.split("/")[url.split("/").length-1];
    return menuMap[menu];
};