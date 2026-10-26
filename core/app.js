import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* ============================================================
   CONFIGURACIÓN — pega aquí tus datos de Supabase (paso 3 de la guía)
   ============================================================ */
const SUPABASE_URL = "https://pwjntkkdhirlsgccnbfq.supabase.co";        // ej. https://abcd1234.supabase.co
const SUPABASE_KEY = "sb_publishable_SSS_exfh1BtxKWvEPU3fEg_iIofqAc7";   // la "publishable/anon key"
/* ============================================================ */

const configurado = SUPABASE_URL.indexOf("http") === 0 && SUPABASE_KEY.length > 20;
const sb = configurado ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
const SUPERADMIN = "alebarri22@hotmail.com";
const CORE_URL = "https://tiendasdebarrio.github.io/core/";
/* Comercio que se muestra: ?c=slug (pruebas y gestión) o el definido por el index.html de cada comercio */
const SLUG = (new URLSearchParams(location.search).get("c") || window.COMERCIO || "insha").toLowerCase();
var C = null;   // datos del comercio actual

/* ============ ILUSTRACIONES SVG (idéntico a la versión offline) ============ */
function svgURI(inner,bg){var fondo=bg||"#fafdf6";var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="bgg" cx="50%" cy="38%" r="75%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="'+fondo+'"/></radialGradient></defs><rect width="400" height="400" fill="url(#bgg)"/><ellipse cx="200" cy="330" rx="120" ry="22" fill="#000" opacity="0.07"/>'+inner+'</svg>';return "data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(svg)));}
function leaf(x,y,r,rot){return '<g transform="translate('+x+' '+y+') rotate('+(rot||0)+') scale('+(r||1)+')"><path d="M0 0 C 18 -22 50 -20 60 -2 C 40 8 14 12 0 0 Z" fill="#5aa83a"/><path d="M4 0 C 22 -12 42 -12 56 -3" stroke="#3f8a26" stroke-width="2" fill="none"/></g>';}
function gloss(cx,cy,rx,ry,rot){return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="#fff" opacity="0.45" transform="rotate('+(rot||-20)+' '+cx+' '+cy+')"/>';}
var ART={
 fresa:function(){var pips="";for(var i=0;i<24;i++){var a=(i*53)%360;var rx=(-70+(i*37)%150);var ry=(-50+(i*53)%160);pips+='<ellipse cx="'+rx+'" cy="'+ry+'" rx="5" ry="8" fill="#ffe169" transform="rotate('+a+' '+rx+' '+ry+')"/>';}return svgURI('<defs><radialGradient id="fr" cx="42%" cy="34%" r="70%"><stop offset="0%" stop-color="#ff6b6b"/><stop offset="60%" stop-color="#e23a3a"/><stop offset="100%" stop-color="#b71c2b"/></radialGradient></defs><g transform="translate(200 215)"><path d="M-95 -70 C -40 -120 40 -120 95 -70 C 120 -30 60 110 0 135 C -60 110 -120 -30 -95 -70 Z" fill="url(#fr)"/>'+pips+'<g transform="translate(-8 -88)">'+leaf(0,0,1.1,-30)+leaf(-6,4,1.1,40)+leaf(8,2,1,160)+'</g>'+gloss(-30,-30,26,40)+'</g>',"#fdeaea");},
 tomate:function(){return svgURI('<defs><radialGradient id="tm" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#ff5b4a"/><stop offset="70%" stop-color="#e23123"/><stop offset="100%" stop-color="#b21c12"/></radialGradient></defs><g transform="translate(200 215)"><ellipse cx="0" cy="10" rx="120" ry="108" fill="url(#tm)"/><g transform="translate(0 -86)"><path d="M0 14 L-22 4 L-8 0 L-18 -14 L-2 -4 L0 -14 L2 -4 L18 -14 L8 0 L22 4 Z" fill="#54a832"/></g>'+gloss(-40,-30,30,46)+'</g>',"#fdeaea");},
 platano:function(){return svgURI('<defs><linearGradient id="bn" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffe45e"/><stop offset="60%" stop-color="#ffd21a"/><stop offset="100%" stop-color="#e0a90b"/></linearGradient></defs><g transform="translate(200 210) rotate(8)"><path d="M-120 -40 C -60 60 80 80 130 0 C 120 -8 96 18 40 24 C -30 30 -80 -10 -96 -54 C -106 -52 -116 -48 -120 -40 Z" fill="url(#bn)"/><path d="M-120 -40 C -60 60 80 80 130 0" stroke="#c98f06" stroke-width="3" fill="none" opacity="0.5"/><rect x="120" y="-16" width="20" height="16" rx="5" fill="#7a5b12"/><path d="M-110 -46 C -64 44 70 60 116 -2" stroke="#fff3b0" stroke-width="5" fill="none" opacity="0.7"/></g>',"#fdf7d6");},
 aguacate:function(){return svgURI('<defs><radialGradient id="av" cx="45%" cy="40%" r="70%"><stop offset="0%" stop-color="#9ccf57"/><stop offset="70%" stop-color="#5f9e2e"/><stop offset="100%" stop-color="#3c6b1d"/></radialGradient><radialGradient id="hu" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#caa05a"/><stop offset="100%" stop-color="#9a6f2f"/></radialGradient></defs><g transform="translate(200 210)"><path d="M0 -120 C 70 -120 90 -30 70 40 C 52 100 -52 100 -70 40 C -90 -30 -70 -120 0 -120 Z" fill="url(#av)"/><path d="M0 -96 C 50 -96 66 -22 52 36 C 38 86 -38 86 -52 36 C -66 -22 -50 -96 0 -96 Z" fill="#e9f3d3"/><ellipse cx="0" cy="22" rx="40" ry="44" fill="url(#hu)"/>'+gloss(-22,-40,16,28)+'</g>',"#eef6df");},
 naranja:function(){var dots="";for(var i=0;i<50;i++){var x=((i*73)%200)-100;var y=((i*113)%200)-100;if(Math.sqrt(x*x+y*y)<104)dots+='<circle cx="'+x+'" cy="'+y+'" r="1.6" fill="#d96a00" opacity="0.45"/>';}return svgURI('<defs><radialGradient id="or" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#ffb24d"/><stop offset="65%" stop-color="#ff8c1a"/><stop offset="100%" stop-color="#e06f00"/></radialGradient></defs><g transform="translate(200 212)"><circle cx="0" cy="0" r="118" fill="url(#or)"/>'+dots+'<g transform="translate(-6 -104)"><circle r="9" fill="#4a9a2c"/>'+leaf(2,-2,0.9,-40)+'</g>'+gloss(-38,-34,30,44)+'</g>',"#fff0d9");},
 manzana:function(){return svgURI('<defs><radialGradient id="ap" cx="40%" cy="34%" r="70%"><stop offset="0%" stop-color="#ff6b5e"/><stop offset="60%" stop-color="#e23b30"/><stop offset="100%" stop-color="#a5201a"/></radialGradient></defs><g transform="translate(200 218)"><path d="M0 -78 C 40 -110 110 -86 110 -10 C 110 70 60 120 0 120 C -60 120 -110 70 -110 -10 C -110 -86 -40 -110 0 -78 Z" fill="url(#ap)"/><path d="M0 -78 C -6 -100 -4 -120 6 -132" stroke="#6b4a23" stroke-width="7" fill="none" stroke-linecap="round"/><g transform="translate(14 -118)">'+leaf(0,0,1.1,20)+'</g>'+gloss(-36,-40,26,42)+'</g>',"#fdeae8");},
 patata:function(){var eyes="";for(var i=0;i<8;i++){var x=-80+i*22;var y=-30+((i*37)%70);eyes+='<g><ellipse cx="'+x+'" cy="'+y+'" rx="6" ry="4" fill="#7c5a2a" opacity="0.5"/><circle cx="'+x+'" cy="'+y+'" r="2" fill="#5e4420"/></g>';}return svgURI('<defs><radialGradient id="pt" cx="42%" cy="38%" r="70%"><stop offset="0%" stop-color="#d8b67e"/><stop offset="70%" stop-color="#b9914f"/><stop offset="100%" stop-color="#8a6630"/></radialGradient></defs><g transform="translate(200 212)"><path d="M-110 -20 C -120 -70 -40 -96 30 -86 C 110 -74 124 -10 110 40 C 96 96 -20 104 -80 74 C -120 54 -102 18 -110 -20 Z" fill="url(#pt)"/>'+eyes+gloss(-40,-44,30,40)+'</g>',"#f3ead7");},
 cebolla:function(){return svgURI('<defs><radialGradient id="on" cx="42%" cy="36%" r="70%"><stop offset="0%" stop-color="#f6e6c8"/><stop offset="60%" stop-color="#e0b277"/><stop offset="100%" stop-color="#a9763c"/></radialGradient></defs><g transform="translate(200 214)"><path d="M0 -96 C 70 -96 110 -30 96 40 C 84 100 -84 100 -96 40 C -110 -30 -70 -96 0 -96 Z" fill="url(#on)"/><path d="M0 -96 C 0 0 0 60 0 96 M-46 -84 C -30 0 -30 60 -40 90 M46 -84 C 30 0 30 60 40 90" stroke="#b07b3f" stroke-width="2.5" fill="none" opacity="0.55"/><path d="M-10 -96 C -2 -120 2 -120 10 -96" stroke="#8a6a35" stroke-width="6" fill="none"/>'+gloss(-34,-40,22,34)+'</g>',"#f5ecdb");},
 pimiento:function(){return svgURI('<defs><radialGradient id="pp" cx="40%" cy="34%" r="70%"><stop offset="0%" stop-color="#ff6356"/><stop offset="65%" stop-color="#e02a1f"/><stop offset="100%" stop-color="#9c1812"/></radialGradient></defs><g transform="translate(200 220)"><path d="M-70 -60 C -90 0 -70 96 -20 110 C 0 114 0 80 6 80 C 14 80 12 116 40 108 C 90 92 96 -10 70 -64 C 50 -40 30 -40 16 -54 C 0 -68 -16 -64 -34 -54 C -50 -46 -60 -56 -70 -60 Z" fill="url(#pp)"/><path d="M-4 -64 C -6 -92 -2 -104 6 -116" stroke="#3f8a26" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-30 -50 C -28 -70 -20 -78 -10 -80" stroke="#4a9a2c" stroke-width="7" fill="none" stroke-linecap="round"/>'+gloss(-30,-10,18,46)+'</g>',"#fdeae8");},
 mango:function(){return svgURI('<defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffd24a"/><stop offset="45%" stop-color="#ff9d2e"/><stop offset="100%" stop-color="#e2502a"/></linearGradient></defs><g transform="translate(200 212) rotate(-12)"><path d="M-120 0 C -110 -80 -10 -110 70 -86 C 120 -70 124 0 88 50 C 50 100 -60 100 -100 50 C -116 30 -122 14 -120 0 Z" fill="url(#mg)"/><path d="M70 -86 C 84 -92 96 -90 104 -82" stroke="#6b4a23" stroke-width="6" fill="none" stroke-linecap="round"/>'+gloss(-40,-36,34,48)+'</g>',"#fff0d9");},
 cesta:function(){var weave="";for(var i=0;i<9;i++)weave+='<line x1="'+(-120+i*30)+'" y1="-66" x2="'+(-104+i*26)+'" y2="70" stroke="#8a5d28" stroke-width="3" opacity="0.6"/>';return svgURI('<defs><linearGradient id="bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d6a45e"/><stop offset="100%" stop-color="#a06f30"/></linearGradient></defs><g transform="translate(200 150)"><circle cx="-44" cy="0" r="40" fill="#e23b30"/><circle cx="40" cy="-6" r="42" fill="#ff8c1a"/><circle cx="-4" cy="-34" r="38" fill="#ffd21a"/><circle cx="-70" cy="-26" r="30" fill="#7cbf3f"/><circle cx="64" cy="30" r="30" fill="#9c54c4"/><circle cx="6" cy="22" r="34" fill="#5f9e2e"/></g><g transform="translate(200 250)"><path d="M-130 -70 Q 0 -120 130 -70 L 104 70 Q 0 96 -104 70 Z" fill="url(#bk)"/>'+weave+'<path d="M-130 -70 Q 0 -120 130 -70" stroke="#7a4f22" stroke-width="10" fill="none"/></g>',"#f4ecdc");},
 caja:function(){return svgURI('<g transform="translate(200 160)"><circle cx="-40" cy="0" r="34" fill="#e23b30"/><circle cx="36" cy="-4" r="36" fill="#ff8c1a"/><circle cx="-2" cy="-28" r="32" fill="#ffd21a"/><circle cx="0" cy="20" r="30" fill="#5f9e2e"/></g><g transform="translate(200 250)"><path d="M-130 -60 L 130 -60 L 110 80 L -110 80 Z" fill="#c98a4a"/><path d="M-130 -60 L 130 -60 L 150 -30 L -150 -30 Z" fill="#dca866"/><path d="M-150 -30 L -110 80 L -130 -60 Z" fill="#b3793c"/><line x1="0" y1="-30" x2="0" y2="80" stroke="#a06d34" stroke-width="3" opacity="0.5"/></g>',"#f4ecdc");},
 auto:function(spec){var c=spec.color;var gradId="ag"+Math.floor(Math.random()*100000);var grad='<radialGradient id="'+gradId+'" cx="40%" cy="34%" r="72%"><stop offset="0%" stop-color="'+c.lit+'"/><stop offset="62%" stop-color="'+c.base+'"/><stop offset="100%" stop-color="'+c.dark+'"/></radialGradient>';var fill='url(#'+gradId+')';var body="";
  if(spec.shape==="racimo"){var berries="";var pos=[[0,-40],[-30,-10],[30,-10],[-58,22],[0,18],[58,22],[-30,52],[30,52],[0,86]];for(var i=0;i<pos.length;i++){berries+='<circle cx="'+pos[i][0]+'" cy="'+pos[i][1]+'" r="30" fill="'+fill+'"/>';berries+='<ellipse cx="'+(pos[i][0]-10)+'" cy="'+(pos[i][1]-12)+'" rx="7" ry="10" fill="#fff" opacity="0.4"/>';}body='<g transform="translate(200 200)"><g transform="translate(0 -96)">'+leaf(0,0,1,30)+leaf(-8,2,0.9,150)+'</g>'+berries+'</g>';}
  else if(spec.shape==="alargada"){body='<g transform="translate(200 210) rotate(-18)"><rect x="-130" y="-46" width="260" height="92" rx="46" fill="'+fill+'"/>'+(spec.leafTop?'<g transform="translate(120 0)">'+leaf(0,-6,1,-40)+leaf(0,6,1,40)+'</g>':'')+gloss(-60,-16,60,16,0)+'</g>';}
  else if(spec.shape==="hoja"){var leaves="";for(var k=0;k<7;k++){var ang=-90+k*30;leaves+='<g transform="rotate('+ang+')"><path d="M0 0 C 40 -30 70 -10 86 -40 C 70 -76 24 -70 0 0 Z" fill="'+(k%2?c.base:c.lit)+'"/></g>';}body='<g transform="translate(200 220)">'+leaves+'<circle r="22" fill="'+c.dark+'"/></g>';}
  else if(spec.shape==="pera"){body='<g transform="translate(200 214)"><path d="M0 -96 C 26 -96 34 -64 38 -40 C 70 -10 80 40 40 76 C 0 110 -40 110 -60 70 C -84 26 -40 -8 -32 -36 C -28 -62 -22 -96 0 -96 Z" fill="'+fill+'"/><path d="M0 -96 C 2 -112 6 -120 14 -126" stroke="#6b4a23" stroke-width="6" fill="none" stroke-linecap="round"/>'+gloss(-30,-30,20,32)+'</g>';}
  else{body='<g transform="translate(200 212)"><circle r="116" fill="'+fill+'"/>'+(spec.leafTop?'<g transform="translate(-4 -106)"><circle r="8" fill="#4a9a2c"/>'+leaf(2,-2,0.9,-40)+'</g>':'<path d="M-8 -116 C -2 -134 2 -134 8 -116" stroke="#6b4a23" stroke-width="6" fill="none" stroke-linecap="round"/>')+gloss(-38,-36,30,44)+'</g>';}
  return svgURI('<defs>'+grad+'</defs>'+body,c.bg);}
};
var PALETAS={rojo:{base:"#e23b30",lit:"#ff6b5e",dark:"#a5201a",bg:"#fdeae8"},verde:{base:"#5f9e2e",lit:"#9ccf57",dark:"#3c6b1d",bg:"#eef6df"},amarillo:{base:"#ffd21a",lit:"#ffe45e",dark:"#e0a90b",bg:"#fdf7d6"},naranja:{base:"#ff8c1a",lit:"#ffb24d",dark:"#e06f00",bg:"#fff0d9"},morado:{base:"#7d3ca6",lit:"#a85fce",dark:"#54206f",bg:"#f0e6f6"},marron:{base:"#9a6f3a",lit:"#caa05a",dark:"#6b4a23",bg:"#f3ead7"},rosa:{base:"#e8638f",lit:"#ff96b6",dark:"#b03d65",bg:"#fdeaf0"},blanco:{base:"#e6dcc4",lit:"#f6efdd",dark:"#b8a878",bg:"#f7f3e8"}};
function deducirSpec(nombre,desc,cat,override){override=override||{};var t=((nombre||"")+" "+(desc||"")).toLowerCase();var shape="redonda",leafTop=false;
 if(/(uva|ar[áa]ndan|racimo|grosell|\bmoras?\b|piñ[íi]n|pinin)/.test(t))shape="racimo";
 else if(/(pepino|calabac[íi]n|zanahoria|esp[áa]rrag|puerro|alargad|pl[áa]tano|platano|jud[íi]a|haba|berenjena|calabaza|chirim|guindilla|chile)/.test(t)){shape="alargada";leafTop=/(zanahoria|puerro|esp[áa]rrag)/.test(t);}
 else if(/(lechuga|acelga|espinac|\bcol\b|escarola|r[úu]cula|berza|kale|hoja verde|can[óo]nig)/.test(t))shape="hoja";
 else if(/(pera)/.test(t))shape="pera";
 var color=null;
 if(/\broj[ao]s?\b|granate|carmes/.test(t))color="rojo";else if(/\bverdes?\b/.test(t))color="verde";else if(/\bamarill[ao]s?\b|dorad/.test(t))color="amarillo";else if(/\bnaranjas?\b|anaranj/.test(t))color="naranja";else if(/\bmorad[ao]s?\b|violet|p[úu]rpur|lila/.test(t))color="morado";else if(/\bmarr[óo]n\b|marrones/.test(t))color="marron";else if(/\brosas?\b|rosad/.test(t))color="rosa";else if(/\bblanc[ao]s?\b/.test(t))color="blanco";
 if(!color){if(/(zanahoria|naranja|mandarin|calabaza|caqui|n[íi]spero|mango|albaricoque|melocot[óo]n|nectarina|papaya)/.test(t))color="naranja";else if(/(berenjena|uva negra|ar[áa]ndan|ciruela|higo|remolacha|grosella negra)/.test(t))color="morado";else if(/(lim[óo]n|pl[áa]tano|platano|ma[íi]z|pi[ñn]a|membrillo)/.test(t))color="amarillo";else if(/(pera|kiwi|aguacate|lima|calabac[íi]n|pepino|lechuga|br[óo]coli|espinac|acelga|jud[íi]a|pimiento verde|uva blanca|chirim|alcachofa|apio|guisante|can[óo]nig)/.test(t))color="verde";else if(/(patata|papa|cebolla|champi|seta|nuez|almendra|d[áa]til|castaña|jengibre)/.test(t))color="marron";else if(/(fresa|cereza|tomate|sand[íi]a|granada|frambuesa|pimiento roj|piñ[íi]n|pinin|reineta|guinda|rabanito|cerez)/.test(t))color="rojo";}
 if(!color)color=cat==="verdura"?"verde":(cat==="cesta"||cat==="secos")?"marron":"rojo";
 if(/(manzana|cereza|tomate|guinda|mandarin|piñ[íi]n|pinin|reineta)/.test(t))leafTop=true;
 if(override.shape&&override.shape!=="auto")shape=override.shape;if(override.color&&override.color!=="auto")color=override.color;
 return {color:PALETAS[color],shape:shape,leafTop:leafTop};}
function artFor(nombre,cat,desc,override){override=override||{};var manual=(override.shape&&override.shape!=="auto")||(override.color&&override.color!=="auto");if(!manual){var n=(nombre||"").toLowerCase();if(n.indexOf("fresa")>=0)return ART.fresa();if(n.indexOf("tomate")>=0)return ART.tomate();if(n.indexOf("plátano")>=0||n.indexOf("platano")>=0||n.indexOf("banana")>=0)return ART.platano();if(n.indexOf("aguacate")>=0)return ART.aguacate();if(n.indexOf("naranja")>=0)return ART.naranja();if(n.indexOf("manzana")>=0)return ART.manzana();if(n.indexOf("patata")>=0||n.indexOf("papa")>=0)return ART.patata();if(n.indexOf("cebolla")>=0)return ART.cebolla();if(n.indexOf("pimiento")>=0)return ART.pimiento();if(n.indexOf("mango")>=0)return ART.mango();if(n.indexOf("cesta")>=0)return ART.cesta();if(n.indexOf("caja")>=0)return ART.caja();}return ART.auto(deducirSpec(nombre,desc,cat,override));}
function imgFor(p){return p.img||artFor(p.nombre,p.cat,p.desc,{shape:p.forma,color:p.color});}
window.__fbImg=function(el){el.onerror=null;var p=find(el.getAttribute("data-pid"));el.src=p?artFor(p.nombre,p.cat,p.desc,{shape:p.forma,color:p.color}):"";};


/* ============ DATOS SEMILLA (solo si la BD está vacía o sin configurar) ============ */
var SEED=[
 {"id": "f1", "nombre": "Plátano de Canarias", "cat": "fruta", "precio": 3.85, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ripe_bananas.jpg/500px-Ripe_bananas.jpg", "desc": "Producto nacional"},
 {"id": "f2", "nombre": "Banana (plátano americano)", "cat": "fruta", "precio": 1.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Bunch_of_bananas_on_sale.jpg/500px-Bunch_of_bananas_on_sale.jpg", "desc": "Producto de importación"},
 {"id": "f3", "nombre": "Plátano macho", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ripe_plantains.jpg/500px-Ripe_plantains.jpg", "desc": "Maduro o verde, para cocinar"},
 {"id": "f4", "nombre": "Aguacate", "cat": "fruta", "precio": 2.1, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Avocado_Hass_-_single_and_halved.jpg/500px-Avocado_Hass_-_single_and_halved.jpg", "desc": "1 pieza, producto de importación"},
 {"id": "f5", "nombre": "Naranjas para zumo", "cat": "fruta", "precio": 2.15, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/500px-Oranges_-_whole-halved-segment.jpg", "desc": "Jugosas, ideales para exprimir"},
 {"id": "f6", "nombre": "Naranjas de mesa", "cat": "fruta", "precio": 2.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Liat_Portal_for_Foodie_Disorder_-_Oranges_%28Different_Sizes%29.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Oranges_%28Different_Sizes%29.jpg", "desc": "Para comer, fáciles de pelar"},
 {"id": "f7", "nombre": "Naranjas sanguinas", "cat": "fruta", "precio": 2.8, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Blood_orange_%28DSCF7480%29.jpg/500px-Blood_orange_%28DSCF7480%29.jpg", "desc": "Pulpa roja, sabor intenso"},
 {"id": "f8", "nombre": "Mandarina clementina", "cat": "fruta", "precio": 3.15, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Clementines_%2801014%29s.jpg/500px-Clementines_%2801014%29s.jpg", "desc": "Producto local"},
 {"id": "f9", "nombre": "Mandarinas Orri", "cat": "fruta", "precio": 3.45, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mandarin_Oranges_%28Citrus_Reticulata%29.jpg/500px-Mandarin_Oranges_%28Citrus_Reticulata%29.jpg", "desc": "Muy dulces, sin pepitas"},
 {"id": "f10", "nombre": "Limón", "cat": "fruta", "precio": 2.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lemon.jpg/500px-Lemon.jpg", "desc": "Producto nacional"},
 {"id": "f11", "nombre": "Lima", "cat": "fruta", "precio": 2.19, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Lime_-_whole_and_halved.jpg/500px-Lime_-_whole_and_halved.jpg", "desc": "Bolsa de 500 g, producto de importación"},
 {"id": "f12", "nombre": "Pomelo rojo", "cat": "fruta", "precio": 2.7, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Citrus_paradisi_%28Grapefruit%2C_pink%29_white_bg.jpg/500px-Citrus_paradisi_%28Grapefruit%2C_pink%29_white_bg.jpg", "desc": "Producto de importación"},
 {"id": "f13", "nombre": "Pomelo chino", "cat": "fruta", "precio": 2.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pomelo_fruit.jpg/500px-Pomelo_fruit.jpg", "desc": "1 pieza, aprox. 1,1 kg"},
 {"id": "f14", "nombre": "Manzana Golden Lérida", "cat": "fruta", "precio": 1.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Golden_Delicious_apples.jpg/500px-Golden_Delicious_apples.jpg", "desc": "Granel, producto nacional"},
 {"id": "f15", "nombre": "Manzana Fuji Lérida", "cat": "fruta", "precio": 2.45, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Apfel-Fuji.jpg/500px-Apfel-Fuji.jpg", "desc": "Producto nacional"},
 {"id": "f16", "nombre": "Manzana Fuji", "cat": "fruta", "precio": 3.4, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Apfel-Fuji.jpg/500px-Apfel-Fuji.jpg", "desc": "Producto de importación"},
 {"id": "f17", "nombre": "Manzana Royal Gala", "cat": "fruta", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Golden_Delicious%2C_SweeTango%2C_Granny_Smith%2C_and_Gala_apples_3.JPG/500px-Golden_Delicious%2C_SweeTango%2C_Granny_Smith%2C_and_Gala_apples_3.JPG", "desc": "Producto de importación"},
 {"id": "f18", "nombre": "Manzana Pink Lady", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Apple_Pink_Lady.jpg/500px-Apple_Pink_Lady.jpg", "desc": "Producto de importación"},
 {"id": "f19", "nombre": "Manzana Golden Alpes", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Golden_Delicious_apples.jpg/500px-Golden_Delicious_apples.jpg", "desc": "Producto de importación"},
 {"id": "f20", "nombre": "Manzana Granny Smith", "cat": "fruta", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Granny_smith_and_cross_section.jpg/500px-Granny_smith_and_cross_section.jpg", "desc": "Ácida y crujiente"},
 {"id": "f21", "nombre": "Manzana Reineta", "cat": "fruta", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Reinette_Grise_du_Canada_apples_2017_A2.jpg/500px-Reinette_Grise_du_Canada_apples_2017_A2.jpg", "desc": "Ideal para asar y repostería"},
 {"id": "f22", "nombre": "Manzanas rojas", "cat": "fruta", "precio": 2.75, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/500px-Red_Apple.jpg", "desc": "Producto de importación"},
 {"id": "f23", "nombre": "Manzana verde Doncella", "cat": "fruta", "precio": 4.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Reinette_d%27Anjou_-_OPL_Peillac.jpg/500px-Reinette_d%27Anjou_-_OPL_Peillac.jpg", "desc": "Variedad tradicional"},
 {"id": "f24", "nombre": "Pera Conferencia", "cat": "fruta", "precio": 2.75, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Conference_pear_2017_A1.jpg/500px-Conference_pear_2017_A1.jpg", "desc": "Producto nacional"},
 {"id": "f25", "nombre": "Pera Conferencia Rincón de Soto", "cat": "fruta", "precio": 3.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Conference_pear_2017_B1.jpg/500px-Conference_pear_2017_B1.jpg", "desc": "Denominación de origen"},
 {"id": "f26", "nombre": "Pera de agua o blanquilla", "cat": "fruta", "precio": 3.35, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Peras_Blanquilla_2017_A1.jpg/500px-Peras_Blanquilla_2017_A1.jpg", "desc": "Producto nacional"},
 {"id": "f27", "nombre": "Pera Ercolina", "cat": "fruta", "precio": 3.35, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ercolini_%28pear%29_jm178248.jpg/500px-Ercolini_%28pear%29_jm178248.jpg", "desc": "Producto nacional"},
 {"id": "f28", "nombre": "Pera Alejandrina", "cat": "fruta", "precio": 2.45, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/D%27anjou_pear.jpg/500px-D%27anjou_pear.jpg", "desc": "Jugosa y aromática"},
 {"id": "f29", "nombre": "Kiwi Gold", "cat": "fruta", "precio": 9.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kiwifruit_%27Gold%27_cross_section.jpg/500px-Kiwifruit_%27Gold%27_cross_section.jpg", "desc": "Pulpa amarilla, muy dulce"},
 {"id": "f30", "nombre": "Kiwi Zespri", "cat": "fruta", "precio": 6.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg/500px-Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg", "desc": "Producto de importación"},
 {"id": "f31", "nombre": "Kiwi nacional", "cat": "fruta", "precio": 5.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kiwi_aka.jpg/500px-Kiwi_aka.jpg", "desc": "Producto nacional"},
 {"id": "f32", "nombre": "Mangos", "cat": "fruta", "precio": 3.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/500px-Mangos_-_single_and_halved.jpg", "desc": "Producto nacional"},
 {"id": "f33", "nombre": "Mango avión", "cat": "fruta", "precio": 6.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Mango_fruit_Nam_Dok_Mai.jpg/500px-Mango_fruit_Nam_Dok_Mai.jpg", "desc": "1 pieza de 550-600 g, madurado en árbol"},
 {"id": "f34", "nombre": "Melocotón", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Autumn_Red_peaches.jpg/500px-Autumn_Red_peaches.jpg", "desc": "Producto nacional"},
 {"id": "f35", "nombre": "Nectarina", "cat": "fruta", "precio": 2.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nectarine_on_white.jpg/500px-Nectarine_on_white.jpg", "desc": "Producto nacional"},
 {"id": "f36", "nombre": "Paraguayo", "cat": "fruta", "precio": 3.35, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Donut_peaches.jpeg/500px-Donut_peaches.jpeg", "desc": "Producto nacional"},
 {"id": "f37", "nombre": "Albaricoque", "cat": "fruta", "precio": 4.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Apricots.jpg/500px-Apricots.jpg", "desc": "Producto nacional"},
 {"id": "f38", "nombre": "Ciruela roja", "cat": "fruta", "precio": 3.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Plums_African_Rose_-_whole%2C_halved_and_slice.jpg/500px-Plums_African_Rose_-_whole%2C_halved_and_slice.jpg", "desc": "Producto local"},
 {"id": "f39", "nombre": "Ciruela amarilla", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Golden_%28yellow%29_Plums.jpg/500px-Golden_%28yellow%29_Plums.jpg", "desc": "Producto de importación"},
 {"id": "f40", "nombre": "Ciruela President", "cat": "fruta", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Plums.jpg/500px-Plums.jpg", "desc": "Producto nacional"},
 {"id": "f41", "nombre": "Ciruela Stanley", "cat": "fruta", "precio": 2.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/7/78/Dacryodes_edulis_-_ripe_fruit_Nsafu%2C_Safoutier%2CAfrican_pears.jpg", "desc": "Producto local"},
 {"id": "f42", "nombre": "Ciruela Claudia", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Mareuil-Caubert_80%2C_prunes_Reine-Claude.jpg", "desc": "Variedades Reina y Tolosa"},
 {"id": "f43", "nombre": "Ciruela de fresa", "cat": "fruta", "precio": 3.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Red_plums_%2820240724%29.jpg/500px-Red_plums_%2820240724%29.jpg", "desc": "Producto local"},
 {"id": "f44", "nombre": "Cerezas del terreno", "cat": "fruta", "precio": 3.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Cherry_Stella444.jpg/500px-Cherry_Stella444.jpg", "desc": "Bandeja 500 g, producto local"},
 {"id": "f45", "nombre": "Cerezas", "cat": "fruta", "precio": 7.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sweet_cherries_in_basket_2018_G1.jpg/500px-Sweet_cherries_in_basket_2018_G1.jpg", "desc": "Bandeja 500 g, producto de importación"},
 {"id": "f46", "nombre": "Picota", "cat": "fruta", "precio": 3.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cherries_cerezas_Valle_del_Jerte_01.JPG/500px-Cherries_cerezas_Valle_del_Jerte_01.JPG", "desc": "Bandeja 500 g, producto nacional"},
 {"id": "f47", "nombre": "Fresón", "cat": "fruta", "precio": 4.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/500px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg", "desc": "Bandeja 500 g, primera calidad"},
 {"id": "f48", "nombre": "Arándanos frescos", "cat": "fruta", "precio": 4.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Dish_of_blueberries.jpg/500px-Dish_of_blueberries.jpg", "desc": "Tarrina 250 g, producto de importación"},
 {"id": "f49", "nombre": "Granada", "cat": "fruta", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Pomegranate02_edit.jpg/500px-Pomegranate02_edit.jpg", "desc": "Producto nacional"},
 {"id": "f50", "nombre": "Caqui Persimón", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Fuyu_persimmon_fruits%2C_one_cut_open.jpg/500px-Fuyu_persimmon_fruits%2C_one_cut_open.jpg", "desc": "Producto local"},
 {"id": "f51", "nombre": "Piña Golden de Costa Rica", "cat": "fruta", "precio": 6.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sa%C3%BAde_food_street_market%2C_S%C3%A3o_Paulo%2C_Brazil.jpg/500px-Sa%C3%BAde_food_street_market%2C_S%C3%A3o_Paulo%2C_Brazil.jpg", "desc": "Pieza entera"},
 {"id": "f52", "nombre": "Piña del Monte", "cat": "fruta", "precio": 6.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Owoce_Ananas.jpg/500px-Owoce_Ananas.jpg", "desc": "Pieza de 1,75-2 kg"},
 {"id": "f53", "nombre": "Melón piel de sapo", "cat": "fruta", "precio": 8.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Piel_De_Sapo_Melon.jpg", "desc": "Pieza de 2,5-3 kg"},
 {"id": "f54", "nombre": "Melón Bollo", "cat": "fruta", "precio": 11.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Honeydew.jpg/500px-Honeydew.jpg", "desc": "Pieza de 2,5-3 kg"},
 {"id": "f55", "nombre": "Melón Cantalupo", "cat": "fruta", "precio": 3.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Canteloupe_and_cross_section.jpg/500px-Canteloupe_and_cross_section.jpg", "desc": "Pieza aprox. 1,5 kg"},
 {"id": "f56", "nombre": "Melón Galia", "cat": "fruta", "precio": 3.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Galia_melon.jpg/500px-Galia_melon.jpg", "desc": "Pieza aprox. 1,5 kg"},
 {"id": "f57", "nombre": "Sandía negra", "cat": "fruta", "precio": 4.3, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Liat_Portal_for_Foodie_Disorder_-_Two_whole_watermelons_on_dark_surface.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Two_whole_watermelons_on_dark_surface.jpg", "desc": "Media pieza, 3-3,3 kg"},
 {"id": "f58", "nombre": "Sandía rayada", "cat": "fruta", "precio": 3.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Liat_Portal_for_Foodie_Disorder_-_Whole_watermelon_before_cutting.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Whole_watermelon_before_cutting.jpg", "desc": "Media pieza, 3,5-4 kg"},
 {"id": "f59", "nombre": "Uva blanca sin semillas", "cat": "fruta", "precio": 5.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/A_bunch_of_grapes_a.jpg/500px-A_bunch_of_grapes_a.jpg", "desc": "Dulce y crujiente"},
 {"id": "f60", "nombre": "Uva negra sin pepitas", "cat": "fruta", "precio": 2.45, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Wine_grapes03.jpg/500px-Wine_grapes03.jpg", "desc": "Bandeja 500 g, producto nacional"},
 {"id": "f61", "nombre": "Uva negra (morada)", "cat": "fruta", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2019-10-11_00_15_02_A_bunch_of_Dayka_Hackett_Flavor_Grown_Fresh_and_Delicious_Red_Seedless_Table_Grapes_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/500px-2019-10-11_00_15_02_A_bunch_of_Dayka_Hackett_Flavor_Grown_Fresh_and_Delicious_Red_Seedless_Table_Grapes_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg", "desc": "Producto local"},
 {"id": "f62", "nombre": "Uva blanca de mesa", "cat": "fruta", "precio": 3.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%22Bunch_of_Green_Grapes_in_Salem%22.jpg/500px-%22Bunch_of_Green_Grapes_in_Salem%22.jpg", "desc": "Producto nacional"},
 {"id": "f63", "nombre": "Uva moscatel", "cat": "fruta", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Muscat_blanc_et_Muscat_noir_by_JM_Rosier.jpg/500px-Muscat_blanc_et_Muscat_noir_by_JM_Rosier.jpg", "desc": "Italiana o del terreno"},
 {"id": "v64", "nombre": "Patata del terreno", "cat": "verdura", "precio": 1.45, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Potato_tubers_in_pail.jpg/500px-Potato_tubers_in_pail.jpg", "desc": "Producto local"},
 {"id": "v65", "nombre": "Patatas lavadas", "cat": "verdura", "precio": 1.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ingredients_New_Potatoes%2C_Washed_%284748996147%29.jpg/500px-Ingredients_New_Potatoes%2C_Washed_%284748996147%29.jpg", "desc": "Producto nacional"},
 {"id": "v66", "nombre": "Patata agria (para freír)", "cat": "verdura", "precio": 1.75, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Potatoes-5785_-_Hans_Braxmeier.jpg/500px-Potatoes-5785_-_Hans_Braxmeier.jpg", "desc": "Producto nacional"},
 {"id": "v67", "nombre": "Patatas pequeñas", "cat": "verdura", "precio": 1.45, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ingredients_New_Potatoes%2C_Washed_%284748996147%29.jpg/500px-Ingredients_New_Potatoes%2C_Washed_%284748996147%29.jpg", "desc": "Ideales para guarnición"},
 {"id": "v68", "nombre": "Patata roja", "cat": "verdura", "precio": 1.85, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Solanum_tuberosum_Red_Scarlett20170523_7825.jpg/500px-Solanum_tuberosum_Red_Scarlett20170523_7825.jpg", "desc": "Producto nacional"},
 {"id": "v69", "nombre": "Patata Monalisa", "cat": "verdura", "precio": 1.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Irish_potatoes_in_a_sack_in_a_market.jpg/500px-Irish_potatoes_in_a_sack_in_a_market.jpg", "desc": "Para cocer y guisar"},
 {"id": "v70", "nombre": "Patata morada o violeta", "cat": "verdura", "precio": 29.0, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Vitelotte.jpg/500px-Vitelotte.jpg", "desc": "Caja de 5 kg"},
 {"id": "v71", "nombre": "Cachelos (patata gallega)", "cat": "verdura", "precio": 4.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Two_irish_potatoes_in_a_sack_in_a_market.jpg/500px-Two_irish_potatoes_in_a_sack_in_a_market.jpg", "desc": "Bolsa de papel aprox. 3 kg"},
 {"id": "v72", "nombre": "Calabacín verde", "cat": "verdura", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Starr-070730-7874-Cucurbita_pepo-green_zucchini-Foodland_Pukalani-Maui_%2824797124241%29.jpg/500px-Starr-070730-7874-Cucurbita_pepo-green_zucchini-Foodland_Pukalani-Maui_%2824797124241%29.jpg", "desc": "Producto nacional"},
 {"id": "v73", "nombre": "Calabacín blanco", "cat": "verdura", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/CSA-Striped-Zucchini.jpg/500px-CSA-Striped-Zucchini.jpg", "desc": "Piel fina y suave"},
 {"id": "v74", "nombre": "Zanahorias a granel", "cat": "verdura", "precio": 1.1, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Carrots_at_Ljubljana_Central_Market.JPG/500px-Carrots_at_Ljubljana_Central_Market.JPG", "desc": "Bolsa 500 g, producto local"},
 {"id": "v75", "nombre": "Zanahoria en rama", "cat": "verdura", "precio": 2.15, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bunch_of_carrot.jpg/500px-Bunch_of_carrot.jpg", "desc": "Manojo"},
 {"id": "v76", "nombre": "Zanahoria morada", "cat": "verdura", "precio": 2.25, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Carrots_of_many_colors.jpg/500px-Carrots_of_many_colors.jpg", "desc": "Manojo"},
 {"id": "v77", "nombre": "Tomate de pera", "cat": "verdura", "precio": 3.85, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Roma_tomatoes_%28509115549%29.jpg/500px-Roma_tomatoes_%28509115549%29.jpg", "desc": "Producto nacional"},
 {"id": "v78", "nombre": "Tomate de ensalada", "cat": "verdura", "precio": 3.65, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/500px-Tomato_je.jpg", "desc": "Producto local"},
 {"id": "v79", "nombre": "Tomate cherry", "cat": "verdura", "precio": 3.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tomates_cerises_Luc_Viatour.jpg/500px-Tomates_cerises_Luc_Viatour.jpg", "desc": "Bandeja 500 g"},
 {"id": "v80", "nombre": "Tomate cherry pera", "cat": "verdura", "precio": 6.25, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Grape_tomatoes_on_the_vine_at_Ljubljana_Central_Market.JPG/500px-Grape_tomatoes_on_the_vine_at_Ljubljana_Central_Market.JPG", "desc": "Bandeja 500 g"},
 {"id": "v81", "nombre": "Tomate rosa", "cat": "verdura", "precio": 5.85, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pale_pink_tomatoes_in_Rome%2C_Italy.jpg/500px-Pale_pink_tomatoes_in_Rome%2C_Italy.jpg", "desc": "Carnoso y muy sabroso"},
 {"id": "v82", "nombre": "Tomate Daniela", "cat": "verdura", "precio": 3.85, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Grape_tomatoes_on_the_vine_at_Ljubljana_Central_Market.JPG/500px-Grape_tomatoes_on_the_vine_at_Ljubljana_Central_Market.JPG", "desc": "Producto nacional"},
 {"id": "v83", "nombre": "Tomate valenciano", "cat": "verdura", "precio": 4.45, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Organic_home-grown_tomatoes_-_unripe_to_ripe.jpg/500px-Organic_home-grown_tomatoes_-_unripe_to_ripe.jpg", "desc": "Producto local"},
 {"id": "v84", "nombre": "Tomate RAF", "cat": "verdura", "precio": 8.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Tomata_Raf_2015-12-29-1543.jpg/500px-Tomata_Raf_2015-12-29-1543.jpg", "desc": "Producto nacional, sabor intenso"},
 {"id": "v85", "nombre": "Pimiento rojo", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Red_bell_pepper.jpg/500px-Red_bell_pepper.jpg", "desc": "1 pieza 300-350 g"},
 {"id": "v86", "nombre": "Pimiento verde", "cat": "verdura", "precio": 1.3, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Green_peppers_03.jpg/500px-Green_peppers_03.jpg", "desc": "1 pieza 300-350 g"},
 {"id": "v87", "nombre": "Pimiento italiano", "cat": "verdura", "precio": 1.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cubanelle_peppers%2C_green_-_Massachusetts.jpg/500px-Cubanelle_peppers%2C_green_-_Massachusetts.jpg", "desc": "Bolsa 500 g"},
 {"id": "v88", "nombre": "Pimiento amarillo", "cat": "verdura", "precio": 2.15, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Yellow_and_Red_bell_peppers.jpg/500px-Yellow_and_Red_bell_peppers.jpg", "desc": "Bolsa 500 g, producto nacional"},
 {"id": "v89", "nombre": "Pimientos de Padrón", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pementos_de_Padron.jpg/500px-Pementos_de_Padron.jpg", "desc": "Bandeja 250 g, producto nacional"},
 {"id": "v90", "nombre": "Ñoras", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_chili_peppers_drying_on_a_footbridge.jpg/500px-Red_chili_peppers_drying_on_a_footbridge.jpg", "desc": "50 g (unas 6 unidades)"},
 {"id": "v91", "nombre": "Berenjena negra", "cat": "verdura", "precio": 1.1, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Starr-130312-2414-Solanum_melongena-fruit_black_globe_and_striped_mauve_and_white-Pali_o_Waipio_Huelo-Maui_%2825207292225%29.jpg/500px-Starr-130312-2414-Solanum_melongena-fruit_black_globe_and_striped_mauve_and_white-Pali_o_Waipio_Huelo-Maui_%2825207292225%29.jpg", "desc": "1 pieza aprox. 350 g"},
 {"id": "v92", "nombre": "Berenjena jaspeada", "cat": "verdura", "precio": 1.1, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Solanum_melongena-yercaud-salem-India.JPG/500px-Solanum_melongena-yercaud-salem-India.JPG", "desc": "1 pieza aprox. 350 g"},
 {"id": "v93", "nombre": "Cebolla amarilla", "cat": "verdura", "precio": 1.35, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/500px-Onion_on_White.JPG", "desc": "Producto local"},
 {"id": "v94", "nombre": "Cebolla dulce", "cat": "verdura", "precio": 2.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sweet_onions_in_a_pile.jpg/500px-Sweet_onions_in_a_pile.jpg", "desc": "Producto nacional"},
 {"id": "v95", "nombre": "Cebolla roja o morada", "cat": "verdura", "precio": 1.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Red_Onion_on_White.JPG/500px-Red_Onion_on_White.JPG", "desc": "Ideal para ensaladas"},
 {"id": "v96", "nombre": "Cebollas tiernas", "cat": "verdura", "precio": 1.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Food_Market_in_Bizerte_03.jpg/500px-Food_Market_in_Bizerte_03.jpg", "desc": "Manojo de 3 unidades"},
 {"id": "v97", "nombre": "Cebolla china", "cat": "verdura", "precio": 1.6, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/CSA-Red-Spring-Onions.jpg/500px-CSA-Red-Spring-Onions.jpg", "desc": "Manojo"},
 {"id": "v98", "nombre": "Chalota o escalonia", "cat": "verdura", "precio": 1.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Shallots-Whole.jpg/500px-Shallots-Whole.jpg", "desc": "Malla"},
 {"id": "v99", "nombre": "Calçots", "cat": "verdura", "precio": 6.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Paret_de_cal%C3%A7ots.jpg/500px-Paret_de_cal%C3%A7ots.jpg", "desc": "Manojo de 25 unidades"},
 {"id": "v100", "nombre": "Cebolla francesa", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Yellow_onions_vegetables.jpg/500px-Yellow_onions_vegetables.jpg", "desc": "Bolsa 500 g"},
 {"id": "v101", "nombre": "Ajo seco", "cat": "verdura", "precio": 3.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Garlic_bulbs_and_cloves.jpg/500px-Garlic_bulbs_and_cloves.jpg", "desc": "Malla 500 g"},
 {"id": "v102", "nombre": "Ajos tiernos", "cat": "verdura", "precio": 1.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/2/29/Green_garlic_2.jpg", "desc": "Manojo"},
 {"id": "v103", "nombre": "Puerro", "cat": "verdura", "precio": 0.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Leeks_on_shelf.jpg/500px-Leeks_on_shelf.jpg", "desc": "1 unidad, producto local"},
 {"id": "v104", "nombre": "Brócoli", "cat": "verdura", "precio": 2.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_and_cross_section_edit.jpg/500px-Broccoli_and_cross_section_edit.jpg", "desc": "Pieza aprox. 500 g"},
 {"id": "v105", "nombre": "Pepino", "cat": "verdura", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Ryerson_Market_cucumbers_on_sale.jpg/500px-Ryerson_Market_cucumbers_on_sale.jpg", "desc": "Producto local"},
 {"id": "v106", "nombre": "Espárragos verdes", "cat": "verdura", "precio": 3.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Asparagus_%285661403316%29.jpg/500px-Asparagus_%285661403316%29.jpg", "desc": "Manojo"},
 {"id": "v107", "nombre": "Chirivía", "cat": "verdura", "precio": 0.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Parsnips_on_a_shelf.jpg/500px-Parsnips_on_a_shelf.jpg", "desc": "250 g, producto local"},
 {"id": "v108", "nombre": "Alcachofas", "cat": "verdura", "precio": 2.95, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Artichoke_ready_to_cook.jpg/500px-Artichoke_ready_to_cook.jpg", "desc": "Producto local"},
 {"id": "v109", "nombre": "Apio verde", "cat": "verdura", "precio": 2.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Celery_1.jpg/500px-Celery_1.jpg", "desc": "Manojo, producto local"},
 {"id": "v110", "nombre": "Apio amarillo", "cat": "verdura", "precio": 2.1, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Celery_%28177029685%29.jpeg/500px-Celery_%28177029685%29.jpeg", "desc": "Manojo"},
 {"id": "v111", "nombre": "Cardo", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Celery_bunches_stacked.jpg/500px-Celery_bunches_stacked.jpg", "desc": "500 g, producto local"},
 {"id": "v112", "nombre": "Acelgas", "cat": "verdura", "precio": 1.45, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/M%C3%BCnster%2C_Botanischer_Garten%2C_Mangold_--_2019_--_7369.jpg/500px-M%C3%BCnster%2C_Botanischer_Garten%2C_Mangold_--_2019_--_7369.jpg", "desc": "Manojo"},
 {"id": "v113", "nombre": "Espinacas", "cat": "verdura", "precio": 1.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Liat_Portal_for_Foodie_Disorder_-_Fresh_spinach_from_San_Francisco_farmers_market.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Fresh_spinach_from_San_Francisco_farmers_market.jpg", "desc": "Manojo"},
 {"id": "v114", "nombre": "Col lisa", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Cabbage_in_a_stack.jpg/500px-Cabbage_in_a_stack.jpg", "desc": "Media pieza"},
 {"id": "v115", "nombre": "Repollo / col del país", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/500px-Cabbage_and_cross_section_on_white.jpg", "desc": "Media pieza, producto local"},
 {"id": "v116", "nombre": "Col rizada kale", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Boerenkool.jpg/500px-Boerenkool.jpg", "desc": "Manojo 400-450 g"},
 {"id": "v117", "nombre": "Col lombarda", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Rotkohl_%28Brassica_oleracea_convar%29.JPG/500px-Rotkohl_%28Brassica_oleracea_convar%29.JPG", "desc": "Media pieza, producto nacional"},
 {"id": "v118", "nombre": "Coles de Bruselas", "cat": "verdura", "precio": 2.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Brussels_sprout_closeup.jpg/500px-Brussels_sprout_closeup.jpg", "desc": "Bolsa 500 g"},
 {"id": "v119", "nombre": "Col china", "cat": "verdura", "precio": 3.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Napa_cabbages.png/500px-Napa_cabbages.png", "desc": "1 pieza de 1,25-1,5 kg"},
 {"id": "v120", "nombre": "Pak choi", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Brassica_rapa_var._chinensis_%28leaf%29.jpg/500px-Brassica_rapa_var._chinensis_%28leaf%29.jpg", "desc": "Bolsa 500 g"},
 {"id": "v121", "nombre": "Col romanesco", "cat": "verdura", "precio": 2.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Romanesco_broccoli_2025_G2.jpg/500px-Romanesco_broccoli_2025_G2.jpg", "desc": "1 pieza"},
 {"id": "v122", "nombre": "Lechuga romana", "cat": "verdura", "precio": 1.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Romaine_lettuce.jpg/500px-Romaine_lettuce.jpg", "desc": "1 unidad"},
 {"id": "v123", "nombre": "Lechuga iceberg", "cat": "verdura", "precio": 2.35, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Iceberg_lettuce_%28IJssla_krop%29.jpg/500px-Iceberg_lettuce_%28IJssla_krop%29.jpg", "desc": "1 unidad"},
 {"id": "v124", "nombre": "Lechuga valenciana", "cat": "verdura", "precio": 1.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lactuca_sativa_%27Ashbrook%27.jpg/500px-Lactuca_sativa_%27Ashbrook%27.jpg", "desc": "1 unidad, producto local"},
 {"id": "v125", "nombre": "Lechuga hoja de roble", "cat": "verdura", "precio": 1.35, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green_Oak_Leaf_lettuce_J1.jpg/500px-Green_Oak_Leaf_lettuce_J1.jpg", "desc": "1 unidad"},
 {"id": "v126", "nombre": "Lechuga lollo rosso", "cat": "verdura", "precio": 1.25, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Red_leaf_lettuce_J1.JPG/500px-Red_leaf_lettuce_J1.JPG", "desc": "1 unidad"},
 {"id": "v127", "nombre": "Cogollos", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Romaine_lettuce.jpg/500px-Romaine_lettuce.jpg", "desc": "Bandeja de 3 unidades"},
 {"id": "v128", "nombre": "Corazones de lechuga", "cat": "verdura", "precio": 2.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Romaine_Lettuce_Heart_Cross_Section.jpg/500px-Romaine_Lettuce_Heart_Cross_Section.jpg", "desc": "Bandeja de 6 unidades"},
 {"id": "v129", "nombre": "Rúcula", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Eruca_sativa.jpg", "desc": "1 unidad"},
 {"id": "v130", "nombre": "Canónigos", "cat": "verdura", "precio": 1.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Corn_salad%2C_spring%2C_close_up.JPG/500px-Corn_salad%2C_spring%2C_close_up.JPG", "desc": "Tarrina"},
 {"id": "v131", "nombre": "Berros", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Watercress_%282%29.JPG/500px-Watercress_%282%29.JPG", "desc": "1 unidad"},
 {"id": "v132", "nombre": "Endibias belgas", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Endive_p1160063.jpg/500px-Endive_p1160063.jpg", "desc": "Bandeja"},
 {"id": "v133", "nombre": "Escarola", "cat": "verdura", "precio": 2.25, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Cichorium_endivia_-_Botanischer_Garten_Mainz_IMG_5453.JPG/500px-Cichorium_endivia_-_Botanischer_Garten_Mainz_IMG_5453.JPG", "desc": "1 unidad"},
 {"id": "v134", "nombre": "Brotes tiernos", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/SEILunchMesclunMix.jpg/500px-SEILunchMesclunMix.jpg", "desc": "Bolsa 150 g"},
 {"id": "v135", "nombre": "Germinado de soja", "cat": "verdura", "precio": 1.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mung_bean_sprouts%2C_close-up.jpg/500px-Mung_bean_sprouts%2C_close-up.jpg", "desc": "Bolsa 200 g"},
 {"id": "v136", "nombre": "Germinado de alfalfa", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Medicago_sativa_%28alfalfa%29.jpg/500px-Medicago_sativa_%28alfalfa%29.jpg", "desc": "Tarrina"},
 {"id": "v137", "nombre": "Judía perona", "cat": "verdura", "precio": 4.25, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bachoqueta_o_ferraura.jpg/500px-Bachoqueta_o_ferraura.jpg", "desc": "Bolsa 500 g, producto nacional"},
 {"id": "v138", "nombre": "Judía verde Bobby", "cat": "verdura", "precio": 5.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Four_Different_Varieties_of_Green_Beans_%28Phaseolus_vulgaris%29.jpg/500px-Four_Different_Varieties_of_Green_Beans_%28Phaseolus_vulgaris%29.jpg", "desc": "Bolsa 500 g"},
 {"id": "v139", "nombre": "Garrofón fresco", "cat": "verdura", "precio": 8.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Lima_beans_fresh.jpg/500px-Lima_beans_fresh.jpg", "desc": "Bolsa 500 g"},
 {"id": "v140", "nombre": "Judía roget", "cat": "verdura", "precio": 6.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Green_beans_169clue.jpg/500px-Green_beans_169clue.jpg", "desc": "Bolsa 500 g"},
 {"id": "v141", "nombre": "Habas valencianas", "cat": "verdura", "precio": 3.25, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/FavaBeanInPod_%288305001217%29.jpg/500px-FavaBeanInPod_%288305001217%29.jpg", "desc": "Producto local"},
 {"id": "v142", "nombre": "Habas peladas", "cat": "verdura", "precio": 2.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Broad-beans-after-cooking.jpg/500px-Broad-beans-after-cooking.jpg", "desc": "Tarrina 300 g"},
 {"id": "v143", "nombre": "Remolacha cruda", "cat": "verdura", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Detroitdarkredbeets.png/500px-Detroitdarkredbeets.png", "desc": "Manojo, producto local"},
 {"id": "v144", "nombre": "Remolacha cocida", "cat": "verdura", "precio": 1.95, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Liat_Portal_for_Foodie_Disorder_-_Cooked_Boiled_Beetroot.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Cooked_Boiled_Beetroot.jpg", "desc": "Paquete de 3 unidades"},
 {"id": "v145", "nombre": "Calabaza redonda", "cat": "verdura", "precio": 8.5, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cucurbita_2011_G1.jpg/500px-Cucurbita_2011_G1.jpg", "desc": "1 pieza, aprox. 3 kg"},
 {"id": "v146", "nombre": "Calabaza violín", "cat": "verdura", "precio": 2.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Cucurbita_moschata_Butternut_2012_G2.jpg/500px-Cucurbita_moschata_Butternut_2012_G2.jpg", "desc": "Pieza entera 1,5-2 kg"},
 {"id": "v147", "nombre": "Nabo amarillo", "cat": "verdura", "precio": 0.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Turnip-ja202211-1.jpg/500px-Turnip-ja202211-1.jpg", "desc": "250 g"},
 {"id": "v148", "nombre": "Nabo blanco", "cat": "verdura", "precio": 0.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Turnip-ja202211-1.jpg/500px-Turnip-ja202211-1.jpg", "desc": "250 g"},
 {"id": "v149", "nombre": "Nabo daikon", "cat": "verdura", "precio": 2.85, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Daikon_radish_-_Minowase.jpg/500px-Daikon_radish_-_Minowase.jpg", "desc": "1 pieza, aprox. 1,1 kg"},
 {"id": "s150", "nombre": "Champiñón blanco", "cat": "setas", "precio": 1.4, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/2016-01_Agaricus_bisporus_03.jpg/500px-2016-01_Agaricus_bisporus_03.jpg", "desc": "Bandeja 250 g, producto nacional"},
 {"id": "s151", "nombre": "Champiñón Portobello", "cat": "setas", "precio": 1.45, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/2016-01_Agaricus_bisporus_01.jpg/500px-2016-01_Agaricus_bisporus_01.jpg", "desc": "Bandeja 250 g"},
 {"id": "s152", "nombre": "Champiñón laminado", "cat": "setas", "precio": 1.45, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Sliced_Mushrooms_1_2018-06-17.JPG/500px-Sliced_Mushrooms_1_2018-06-17.JPG", "desc": "Bandeja 250 g"},
 {"id": "s153", "nombre": "Setas shiitake", "cat": "setas", "precio": 3.25, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Shiitakegrowing.jpg/500px-Shiitakegrowing.jpg", "desc": "Bandeja 250 g"},
 {"id": "s154", "nombre": "Mix de setas frescas", "cat": "setas", "precio": 3.45, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Shiitake_%28Lentinula_edodes%29.jpg/500px-Shiitake_%28Lentinula_edodes%29.jpg", "desc": "Bandeja 200 g"},
 {"id": "s155", "nombre": "Setas de cardo", "cat": "setas", "precio": 1.75, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Seta_de_cardo_%28Pleurotus_eryngii%29%2C_2012-10-03%2C_DD_01.JPG/500px-Seta_de_cardo_%28Pleurotus_eryngii%29%2C_2012-10-03%2C_DD_01.JPG", "desc": "Bandeja 250 g"},
 {"id": "s156", "nombre": "Seta enoki", "cat": "setas", "precio": 1.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Enoki_mushrooms_%2850313211173%29.jpg/500px-Enoki_mushrooms_%2850313211173%29.jpg", "desc": "Producto de importación"},
 {"id": "s157", "nombre": "Seta shimeji", "cat": "setas", "precio": 2.35, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hon-shimeji_mushrooms_-_Cambridge%2C_MA.jpg/500px-Hon-shimeji_mushrooms_-_Cambridge%2C_MA.jpg", "desc": "Bolsa 150 g"},
 {"id": "s158", "nombre": "Níscalo o robellón", "cat": "setas", "precio": 3.65, "unidad": "unidad", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lactarius_deliciosus_2010_G1.jpg/500px-Lactarius_deliciosus_2010_G1.jpg", "desc": "Bandeja 250 g"},
 {"id": "n1", "nombre": "Pistachos tostados con sal", "cat": "secos", "precio": 22.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Salted_pistachios_photographed_in_West_Bengal%2C_India%2C_by_Yogabrata_Chakraborty%2C_March_7%2C_2023.jpg/500px-Salted_pistachios_photographed_in_West_Bengal%2C_India%2C_by_Yogabrata_Chakraborty%2C_March_7%2C_2023.jpg", "desc": "Con cáscara, tostados"},
 {"id": "n2", "nombre": "Almendra marcona frita con sal", "cat": "secos", "precio": 24.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Marcona_Almonds_%286331879168%29.jpg/500px-Marcona_Almonds_%286331879168%29.jpg", "desc": "Variedad marcona, producto nacional"},
 {"id": "n3", "nombre": "Almendra cruda natural", "cat": "secos", "precio": 13.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Liat_Portal_for_Foodie_Disorder_-_Raw_almonds_in_a_bowl.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Raw_almonds_in_a_bowl.jpg", "desc": "Con piel, sin tostar"},
 {"id": "n4", "nombre": "Nueces con cáscara", "cat": "secos", "precio": 6.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Walnuts_-_whole_and_open_with_halved_kernel.jpg/500px-Walnuts_-_whole_and_open_with_halved_kernel.jpg", "desc": "Ideales para cascar en casa"},
 {"id": "n5", "nombre": "Nueces peladas", "cat": "secos", "precio": 15.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shelled_English_Walnuts_2331px.jpg/500px-Shelled_English_Walnuts_2331px.jpg", "desc": "Mitades de nuez, listas para tomar"},
 {"id": "n6", "nombre": "Anacardos tostados con sal", "cat": "secos", "precio": 19.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2020-06-10_16_37_34_Roasted_salted_jumbo_cashews_from_Giant_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/500px-2020-06-10_16_37_34_Roasted_salted_jumbo_cashews_from_Giant_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg", "desc": "Tamaño jumbo"},
 {"id": "n7", "nombre": "Avellanas tostadas", "cat": "secos", "precio": 15.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hazelnuts.jpg/500px-Hazelnuts.jpg", "desc": "Con piel, sin sal"},
 {"id": "n8", "nombre": "Cacahuetes tostados con cáscara", "cat": "secos", "precio": 5.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Roasted_Peanuts_with_shell.jpg/500px-Roasted_Peanuts_with_shell.jpg", "desc": "Tostados, sin sal"},
 {"id": "n9", "nombre": "Pipas de girasol tostadas", "cat": "secos", "precio": 6.5, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Sunflower_seeds._img_004.jpg/500px-Sunflower_seeds._img_004.jpg", "desc": "Con sal"},
 {"id": "n10", "nombre": "Nueces de macadamia", "cat": "secos", "precio": 32.0, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Macadamia_nuts.jpg/500px-Macadamia_nuts.jpg", "desc": "Con cáscara"},
 {"id": "n11", "nombre": "Nueces de Brasil", "cat": "secos", "precio": 24.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Bertholletia_excelsa_seeds_closeup.jpg/500px-Bertholletia_excelsa_seeds_closeup.jpg", "desc": "Peladas, crudas"},
 {"id": "n12", "nombre": "Cóctel de frutos secos", "cat": "secos", "precio": 15.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mixed_nuts_bowl.jpg/500px-Mixed_nuts_bowl.jpg", "desc": "Mezcla de almendra, anacardo, avellana y cacahuete"},
 {"id": "n13", "nombre": "Pasas sultanas", "cat": "secos", "precio": 8.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Raisins_01.jpg/500px-Raisins_01.jpg", "desc": "Sin semillas"},
 {"id": "n14", "nombre": "Dátiles Medjool", "cat": "secos", "precio": 14.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/DATES_MEDJOOL.jpg/500px-DATES_MEDJOOL.jpg", "desc": "Grandes y jugosos"},
 {"id": "n15", "nombre": "Orejones de albaricoque", "cat": "secos", "precio": 12.9, "unidad": "kg", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ab_food_04.jpg/500px-Ab_food_04.jpg", "desc": "Albaricoque seco, tierno"},
 {"id": "c1", "nombre": "Cesta de fruta variada", "cat": "cesta", "precio": 29.9, "unidad": "unidad", "img": "", "desc": "Aprox. 5 kg de fruta de temporada"},
 {"id": "c2", "nombre": "Caja de fruta y verdura", "cat": "cesta", "precio": 24.5, "unidad": "unidad", "img": "", "desc": "Aprox. 8 kg para la semana"}
];
var CATS_BASE=[{id:"fruta",nombre:"Fruta",emoji:"🍓",orden:1},{id:"verdura",nombre:"Verdura",emoji:"🥬",orden:2},{id:"setas",nombre:"Setas",emoji:"🍄",orden:3},{id:"secos",nombre:"Frutos secos",emoji:"🥜",orden:4},{id:"cesta",nombre:"Cestas",emoji:"🎁",orden:5}];
function getCats(){return (S&&S.cats)?S.cats:(configurado?[]:CATS_BASE);}
function catInfo(id){var c=getCats().filter(function(x){return x.id===id;})[0];return c||{id:id,nombre:id||"Sin categoría",emoji:"🧺"};}
/* Icono automático según el nombre de la categoría */
var EMOJI_REGLAS=[["desayuno","🥣"],["avena","🥣"],["muesli","🥣"],["granola","🥣"],["copos","🥣"],["cereal","🌾"],["trigo","🌾"],["quinoa","🌾"],["cuscus","🌾"],["maiz","🌽"],["palomita","🍿"],["fideo","🍜"],["noodle","🍜"],["ramen","🍜"],["ravioli","🥟"],["tortellini","🥟"],["gnocchi","🥟"],["espagueti","🍝"],["macarron","🍝"],["pasta","🍝"],["curry","🍛"],["pimenton","🌶️"],["pimienta","🧂"],["jengibre","🫚"],["canela","🫚"],["especia","🌶️"],["infusion","🫖"],["tisana","🫖"],["rooibos","🫖"],["manzanilla","🌼"],["tila","🌼"],["poleo","🍃"],["menta","🍃"],[" mate","🧉"],[" te ","🍵"],["fruta","🍎"],["verdura","🥬"],["hortaliza","🥕"],["seta","🍄"],["champi","🍄"],["hongo","🍄"],["seco","🥜"],["nuez","🥜"],["almendra","🥜"],["cesta","🎁"],["caja","📦"],["regalo","🎁"],["huevo","🥚"],["pan","🥖"],["bolleria","🥐"],["queso","🧀"],["lact","🥛"],["leche","🥛"],["yogur","🥛"],["aceitun","🫒"],["aceite","🫒"],["legumbre","🫘"],["garbanzo","🫘"],["lenteja","🫘"],["alubia","🫘"],["especia","🌶️"],["picante","🌶️"],["guindilla","🌶️"],["condimento","🧂"],["sal","🧂"],["hierba","🌿"],["aromatic","🌿"],["hoja","🌿"],["zumo","🧃"],["bebida","🧃"],["refresco","🥤"],["agua","💧"],["vino","🍷"],["cerveza","🍺"],["miel","🍯"],["mermelada","🍯"],["conserva","🥫"],["lata","🥫"],["chocolate","🍫"],["dulce","🍬"],["golosina","🍬"],["galleta","🍪"],["tropical","🥭"],["exotic","🥥"],["citric","🍋"],["naranja","🍊"],["limon","🍋"],["platano","🍌"],["uva","🍇"],["melon","🍈"],["sandia","🍉"],["fresa","🍓"],["frutos rojos","🫐"],["baya","🫐"],["ensalada","🥗"],["preparad","🥗"],["patata","🥔"],["tuberculo","🥔"],["tomate","🍅"],["pimiento","🫑"],["ajo","🧄"],["cebolla","🧅"],["ecolog","🌱"],["bio","🌱"],["organic","🌱"],["congelad","🧊"],["carne","🥩"],["pollo","🍗"],["pescado","🐟"],["marisco","🦐"],["arroz","🍚"],["pasta","🍝"],["cereal","🌾"],["harina","🌾"],["cafe","☕"],["flor","💐"],["planta","🪴"],["oferta","🏷️"],["promo","🏷️"],["temporada","📅"],["novedad","✨"],["halal","🌙"],["drogueria","🧴"],["limpieza","🧽"]];
var EMOJI_LISTA=["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🍆","🥔","🥕","🌽","🌶️","🫑","🥒","🥬","🥦","🧄","🧅","🍄","🥜","🌰","🫘","🫒","🌿","🌱","🌾","🥣","🍙","🫓","🥯","🍿","🍜","🥟","🍲","🍛","🫚","🍃","🌼","🌸","🫖","🧉","🥚","🧀","🥛","🥖","🥐","🍞","🍯","🫙","🥫","🧂","🍫","🍬","🍪","🧃","🥤","💧","🍷","🍺","☕","🍵","🥩","🍗","🐟","🦐","🍚","🍝","🥗","🧊","🎁","📦","🧺","🛍️","💐","🪴","🏷️","✨","⭐","🌙","🧴","🧽"];
function emojiSugerido(nombre){var n=" "+norm(nombre)+" ";for(var i=0;i<EMOJI_REGLAS.length;i++)if(n.indexOf(EMOJI_REGLAS[i][0])>=0)return EMOJI_REGLAS[i][1];return "🧺";}
function slugCat(nombre){var b=norm(nombre).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"cat";var id=b,i=2;var ids=getCats().map(function(c){return c.id;});while(ids.indexOf(id)>=0||id==="todos"){id=b+"-"+i;i++;}return id;}

/* ============ ESTADO ============ */
var S={products:[],view:"tienda",cat:"todos",search:"",cart:{},screen:"shop",detailId:null,editId:null,adding:false,user:null,pedidos:[],_qty:null,_f:null};
var app=document.getElementById("app");
app.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-inc],[data-dec]");if(!b||!app.contains(b))return;
  e.stopPropagation();var inc=b.getAttribute("data-inc");if(inc)changeQty(inc,1);else changeQty(b.getAttribute("data-dec"),-1);});
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function money(n){return Number(n).toFixed(2)+" €";}
function find(id){for(var i=0;i<S.products.length;i++)if(S.products[i].id===id)return S.products[i];return null;}
function cartCount(){return Object.keys(S.cart).length;}
function cartItems(){var a=[];for(var k in S.cart){var p=find(k);if(p&&p.activo!==false)a.push(Object.assign({},p,{qty:S.cart[k]}));}return a;}
function cartTotal(){return cartItems().reduce(function(a,p){return a+p.precio*p.qty;},0);}
function toast(m){var t=document.createElement("div");t.className="fi-toast";t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove();},m.length>60?5000:1900);}

/* ============ SUPABASE: carga y operaciones ============ */
async function cargarCategorias(){
  if(!configurado){S.cats=CATS_BASE.slice();return;}
  var r=await sb.from("categorias").select("id,nombre,emoji,orden").eq("comercio_id",C.id).order("orden",{ascending:true}).order("nombre",{ascending:true});
  if(r.error){console.error(r.error);S.cats=[];return;}
  S.cats=r.data||[];
}
async function guardarCategoria(c,esNueva){
  var row={nombre:c.nombre,emoji:c.emoji};var q;
  if(esNueva){row.id=c.id;row.comercio_id=C.id;row.orden=getCats().reduce(function(m,x){return Math.max(m,x.orden||0);},0)+1;q=sb.from("categorias").insert(row).select();}
  else q=sb.from("categorias").update(row).eq("comercio_id",C.id).eq("id",c.id).select();
  var r=await q;
  if(r.error||!r.data||!r.data.length){console.error(r.error);toast("No se ha guardado la categoría"+(r.error?": "+r.error.message:" (sin permiso)"));return false;}
  return true;
}
async function borrarCategoria(id){
  var r=await sb.from("categorias").delete().eq("comercio_id",C.id).eq("id",id).select();
  if(r.error||!r.data||!r.data.length){console.error(r.error);toast("No se ha podido borrar la categoría");return false;}
  return true;
}
async function cargarProductos(){
  if(!configurado){S.products=SEED.slice();return;}
  var r=await sb.from("productos").select("id,nombre,cat,precio,unidad,img,descripcion,forma,color,orden,creado,activo").eq("comercio_id",C.id).order("orden",{ascending:true,nullsFirst:false}).order("creado",{ascending:true}).order("nombre",{ascending:true});
  if(r.error){console.error(r.error);toast("Error cargando productos");S.products=SEED.slice();return;}
  S.products=(r.data||[]).map(function(p){return {activo:p.activo!==false,id:p.id,nombre:p.nombre,cat:p.cat,precio:Number(p.precio),unidad:p.unidad,img:p.img||"",desc:p.descripcion||"",forma:p.forma||"auto",color:p.color||"auto"};});
}
async function cargarPedidos(){
  if(!configurado||!S.user)return;
  var r=await sb.from("pedidos").select("*").eq("comercio_id",C.id).order("creado",{ascending:false}).limit(100);
  if(!r.error)S.pedidos=r.data||[];
}
async function guardarProducto(prod,esNuevo){
  if(!configurado){toast("Configura Supabase para guardar");return false;}
  var row={comercio_id:C.id,fotos:prod.fotos||[],nombre:prod.nombre,cat:prod.cat,precio:prod.precio,unidad:prod.unidad,img:prod.img,descripcion:prod.desc,forma:prod.forma,color:prod.color};
  var r= esNuevo ? await sb.from("productos").insert(row).select() : await sb.from("productos").update(row).eq("id",prod.id).select();
  if(r.error){console.error(r.error);toast(/row-level security|permission/i.test(r.error.message)?"No se ha guardado: tu usuario ("+((S.user&&S.user.email)||"?")+") no tiene permiso en esta tienda":"Error: "+r.error.message);return false;}
  if(!r.data||!r.data.length){toast("No se ha guardado: tu usuario ("+((S.user&&S.user.email)||"?")+") no tiene permiso en esta tienda");return false;}
  return true;
}
async function borrarProducto(id){
  if(!configurado)return;
  var r=await sb.from("productos").delete().eq("id",id).select();
  if(r.error){toast("Error al borrar: "+r.error.message);return false;}
  if(!r.data||!r.data.length){toast("No se ha guardado: tu usuario ("+((S.user&&S.user.email)||"?")+") no tiene permiso en esta tienda");return false;}
  return true;
}
async function enviarPedido(datos,items,total,envio){
  var row={comercio_id:C.id,acepta_condiciones:new Date().toISOString(),cliente:datos.nombre,telefono:datos.tel,direccion:datos.dir,pago:datos.pago,notas:datos.notas||null,total:total+envio,items:items.map(function(p){return {id:p.id,nombre:p.nombre,qty:p.qty,unidad:p.unidad,precio:p.precio};})};
  if(!configurado)return genCodigo(); // demo
  var r;for(var intento=0;intento<4;intento++){row.codigo=genCodigo();r=await sb.from("pedidos").insert(row);if(!r.error||!/codigo|duplicate|23505/i.test((r.error.code||"")+r.error.message))break;}
  if(r.error){console.error(r.error);toast("Error al enviar el pedido");return false;}
  guardarCodigoLocal(row.codigo);
  // Aviso por email vía Edge Function (si está desplegada)
  try{ await sb.functions.invoke("nuevo-pedido",{body:row}); }catch(e){ /* opcional */ }
  return row.codigo;
}
/* ============ CÓDIGO DE PEDIDO (para repetir compras) ============ */
var ALFA_COD="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function genCodigo(){var v=new Uint32Array(6);crypto.getRandomValues(v);var c="";for(var i=0;i<6;i++)c+=ALFA_COD[v[i]%ALFA_COD.length];return c;}
function claveLocal(){return "fi_codigos_"+(C?C.slug:"");}
function codigosLocales(){try{return JSON.parse(localStorage.getItem(claveLocal())||"[]");}catch(e){return [];}}
function guardarCodigoLocal(c){try{var l=codigosLocales().filter(function(x){return x!==c;});l.unshift(c);localStorage.setItem(claveLocal(),JSON.stringify(l.slice(0,5)));}catch(e){}}
async function repetirPedido(codigo){
  var cod=String(codigo||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(!/^[A-Z2-9]{6}$/.test(cod)){toast("El código tiene 6 letras y números, por ejemplo K7M2QX");return false;}
  var r=await sb.rpc("repetir_pedido",{p_comercio:C.id,p_codigo:cod});
  if(r.error){console.error(r.error);toast("No se pudo consultar el código");return false;}
  var items=r.data||[];if(!items.length){toast("No hay ningún pedido con el código "+cod+" en esta tienda");return false;}
  var ok=0,fuera=[];
  items.forEach(function(it){var p=(it.id&&find(it.id))||S.products.filter(function(x){return norm(x.nombre)===norm(it.nombre);})[0];
    if(p&&p.activo!==false&&Number(it.qty)>0){S.cart[p.id]=+((S.cart[p.id]||0)+Number(it.qty)).toFixed(2);ok++;}else fuera.push(it.nombre);});
  if(!ok){toast("Ninguno de los productos de ese pedido está disponible ahora");return false;}
  guardarCodigoLocal(cod);
  toast(ok+" producto"+(ok===1?"":"s")+" añadido"+(ok===1?"":"s")+" al carrito"+(fuera.length?". No disponible"+(fuera.length===1?"":"s")+": "+fuera.join(", "):""));
  return true;
}
function showRepetir(){var rec=codigosLocales();
  var m=document.createElement("div");m.className="fi-modal";
  m.innerHTML='<div class="fi-modal-card fi-catmodal"><h2>🔁 Repetir un pedido</h2><p class="fi-hint" style="margin:0 0 10px">Escribe el código que recibiste al terminar tu pedido y añadiremos al carrito los mismos productos y cantidades. Luego podrás añadir o quitar lo que quieras antes de tramitarlo.</p>'+
    '<input id="rp_cod" class="fi-codin" maxlength="7" autocomplete="off" autocapitalize="characters" placeholder="Ej. K7M2QX">'+
    (rec.length?'<p class="fi-hint" style="margin:4px 0 8px">Tus últimos códigos en este dispositivo:</p><div class="fi-btnrow">'+rec.map(function(c){return '<button class="fi-edit fi-codchip" data-rc="'+esc(c)+'">'+esc(c)+'</button>';}).join("")+'</div>':'')+
    '<div class="acts" style="margin-top:14px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="rp_c">Cancelar</button><button class="fi-newbtn" id="rp_ok">Añadir al carrito</button></div></div></div>';
  document.body.appendChild(m);var inp=m.querySelector("#rp_cod");
  inp.oninput=function(){inp.value=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);};
  m.onclick=function(e){if(e.target===m)m.remove();var c=e.target.closest&&e.target.closest("[data-rc]");if(c){inp.value=c.getAttribute("data-rc");}};
  m.querySelector("#rp_c").onclick=function(){m.remove();};
  var go=async function(){var b=m.querySelector("#rp_ok");b.disabled=true;if(await repetirPedido(inp.value)){m.remove();S.screen="shop";S.view="tienda";S.cat="todos";S.search="";render();window.scrollTo(0,0);}else b.disabled=false;};
  m.querySelector("#rp_ok").onclick=go;inp.onkeydown=function(e){if(e.key==="Enter")go();};
  setTimeout(function(){inp.focus();},50);}

/* ============ COMERCIO ============ */
async function cargarComercio(){
  if(!configurado){C={id:null,slug:"demo",nombre:"Tienda de ejemplo",localidad:"Madrid",color:"#2f7d22",activo:true,envio:2.5,envio_gratis:25,pedido_minimo:0};aplicarTema();return;}
  var r=await sb.from("comercios").select("*").eq("slug",SLUG).maybeSingle();
  if(r.error)console.error(r.error);
  C=r.data||null;if(C)aplicarTema();
}
async function cargarPermisos(){
  S.esSuper=!!(S.user&&String(S.user.email||"").toLowerCase()===SUPERADMIN);
  S.esMiembro=S.esSuper;
  if(!S.user||!C||S.esSuper)return;
  var r=await sb.from("comercio_usuarios").select("comercio_id").eq("comercio_id",C.id);
  S.esMiembro=!r.error&&r.data&&r.data.length>0;
}
function hexRgb(h){h=String(h||"#2f7d22").replace("#","");if(h.length===3)h=h.split("").map(function(x){return x+x;}).join("");var n=parseInt(h,16);if(isNaN(n))n=0x2f7d22;return [n>>16&255,n>>8&255,n&255];}
function mezcla(h,con,k){var a=hexRgb(h),b=hexRgb(con);return "#"+a.map(function(v,i){var x=Math.round(v*(1-k)+b[i]*k);return ("0"+x.toString(16)).slice(-2);}).join("");}
function aplicarTema(){
  var col=(C&&C.color)||"#2f7d22",r=document.documentElement.style;
  r.setProperty("--verde",col);r.setProperty("--verde-osc",mezcla(col,"#000000",0.28));r.setProperty("--verde-claro",mezcla(col,"#ffffff",0.88));r.setProperty("--fondo",mezcla(col,"#ffffff",0.975));
  document.title=(C?C.nombre:"Tienda")+" — Tienda online";
  var fav=document.querySelector('link[rel="icon"]');if(!fav){fav=document.createElement("link");fav.rel="icon";document.head.appendChild(fav);}
  fav.href=(C&&C.logo)||"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text y="52" font-size="52">🧺</text></svg>');
  var mt=document.querySelector('meta[name="theme-color"]');if(!mt){mt=document.createElement("meta");mt.name="theme-color";document.head.appendChild(mt);}mt.content=col;
}
function envioDe(total){var e=Number(C&&C.envio!=null?C.envio:2.5),g=Number(C&&C.envio_gratis!=null?C.envio_gratis:0);return (g>0&&total>=g)?0:e;}
function fmtEur(n){return Number(n||0).toFixed(2).replace(".",",")+" €";}

/* ============ AUTH ============ */
async function initAuth(){
  if(!configurado)return;
  var s=await sb.auth.getSession();
  S.user=s.data.session?s.data.session.user:null;
  sb.auth.onAuthStateChange(function(_e,session){S.user=session?session.user:null;});
}

/* ============ RENDER ============ */
function fijarAltoCabecera(){var hd=document.querySelector(".fi-header");if(hd)document.documentElement.style.setProperty("--hh",hd.offsetHeight+"px");}
window.addEventListener("resize",fijarAltoCabecera);
function render(){setTimeout(fijarAltoCabecera,0);
  var h=header();
  if(!configurado)h+='<div class="fi-banner">⚙️ Falta configurar Supabase: edita SUPABASE_URL y SUPABASE_KEY en el archivo. Mientras tanto ves datos de ejemplo y los cambios no se guardan.</div>';
  if(!C){app.innerHTML='<div class="fi-cerrada"><h2>Tienda no encontrada</h2><p>No existe ninguna tienda con la dirección «'+esc(SLUG)+'».</p></div>';return;}
  if(S.view==="tienda"){ if(!C.activo&&!S.esMiembro)h+='<div class="fi-cerrada"><h2>Tienda cerrada temporalmente</h2><p>Disculpa las molestias. Vuelve a intentarlo más tarde.</p></div>'; else if(S.screen==="shop")h+=shop(); else if(S.screen==="detail")h+=detail(); else if(S.screen==="checkout")h+=checkout(); }
  else { if(!S.user)h+=login(); else if(!S.esMiembro)h+=sinAcceso(); else if(S.editId||S.adding)h+=form(); else h+=admin(); }
  h+=footer();
  if(S.view==="tienda"&&cartCount()>0&&S.screen==="shop")h+=cartbar();
  app.innerHTML=h;bind();
}
function header(){return '<div class="fi-header"><div class="fi-brand" data-act="home"><div class="fi-mark"'+(C&&!C.logo&&C.slug!=="insha"?' style="background:var(--verde);color:#fff;font-weight:800"':'')+'>'+(C&&C.logo?'<img src="'+esc(C.logo)+'" alt="">':C&&C.slug!=="insha"?inicial(C.nombre):'<svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true"><circle cx="21" cy="27" r="9" fill="#e23b30"/><circle cx="33" cy="22" r="10" fill="#ffd21a"/><circle cx="45" cy="27" r="9" fill="#ff8c1a"/><circle cx="27" cy="32" r="7" fill="#7cbf3f"/><circle cx="40" cy="33" r="7" fill="#9c54c4"/><path d="M31 12c2-4 6-5 9-4-1 3-5 5-9 4z" fill="#5aa83a"/><path d="M8 33h48l-5 21a3 3 0 0 1-3 2H16a3 3 0 0 1-3-2z" fill="#d6a45e"/><path d="M8 33h48v5H8z" fill="#b07b3f"/><path d="M22 40v13M32 40v13M42 40v13" stroke="#a06f30" stroke-width="2.4" stroke-linecap="round"/></svg>')+'</div><div><b>'+esc(C?C.nombre:"")+'</b><span>'+esc((C&&C.localidad)||"")+'</span></div></div><div class="fi-switch"><button data-view="tienda" class="'+(S.view==="tienda"?"on":"")+'">Comprar</button><button data-view="admin" class="'+(S.view==="admin"?"on":"")+'">Mi tienda</button></div></div>';}
function shop(){
  var qn=norm(S.search);var list=S.products.filter(function(p){return p.activo!==false&&(S.cat==="todos"||p.cat===S.cat)&&(!qn||textoBusqueda(p).indexOf(qn)>=0);});
  var conProd={};S.products.forEach(function(p){if(p.activo!==false)conProd[p.cat]=1;});
  var cats=[{id:"todos",nombre:"Todos",emoji:"🛒"}].concat(getCats().filter(function(c){return conProd[c.id]||S.cat===c.id;})).map(function(c){return '<button data-cat="'+c.id+'" class="'+(S.cat===c.id?"on":"")+'"><span>'+c.emoji+'</span>'+c.nombre+'</button>';}).join("");
  var cards=list.map(function(p){return '<div class="fi-card" data-open="'+p.id+'"><div class="fi-thumb"><img loading="lazy" src="'+imgFor(p)+'" data-pid="'+p.id+'" onerror="__fbImg(this)" alt="'+esc(p.nombre)+'"></div><div class="fi-cbody"><h3>'+esc(p.nombre)+'</h3><p class="fi-desc">'+esc(p.desc)+'</p><div class="fi-price">'+money(p.precio)+' <small>/ '+p.unidad+'</small></div><div class="fi-stepwrap" data-sw="'+p.id+'">'+stepperInner(p)+'</div></div></div>';}).join("");
  return '<div class="fi-hero"><h1>'+esc((C&&C.portada_titulo)||"Bienvenido a "+(C?C.nombre:"nuestra tienda"))+'</h1><p>'+esc((C&&C.portada_sub)||"Pide online y recibe en casa.")+'</p></div><div class="fi-sticky"><div class="fi-search fi-searchrow"><input id="q" placeholder="🔍 Buscar producto…" value="'+esc(S.search)+'"><button class="fi-repbtn" data-repetir="1" title="Repetir un pedido anterior con su código">🔁<span> Repetir pedido</span></button></div><div class="fi-cats">'+cats+'</div></div>'+(list.length?'':'<p class="fi-empty">'+(S.products.some(function(p){return p.activo!==false;})?'No hay productos en esta categoría todavía.':'Esta tienda todavía no tiene productos publicados.')+'</p>')+'<div class="fi-grid">'+cards+'</div>';
}
function detail(){var p=find(S.detailId);if(!p){S.screen="shop";return shop();}var step=pasoQty(p);if(S._qty==null)S._qty=1;return '<div class="fi-view"><button class="fi-back" data-back="shop">← Volver</button><div class="fi-detail-img"><img loading="lazy" src="'+imgFor(p)+'" data-pid="'+p.id+'" onerror="__fbImg(this)" alt="'+esc(p.nombre)+'"></div><h2 class="fi-t">'+esc(p.nombre)+'</h2><p class="fi-desc-big">'+esc(p.desc)+'</p><div class="fi-price-big">'+money(p.precio)+' <small>/ '+p.unidad+'</small></div><div class="fi-qty"><button data-q="-">−</button><span id="qv">'+S._qty+' '+p.unidad+'</span><button data-q="+">+</button></div><div class="fi-subtotal">Subtotal: <b id="sub">'+money(p.precio*S._qty)+'</b></div><button class="fi-bigbtn" data-addq="'+p.id+'">Añadir al carrito</button></div>';}
function checkout(){var items=cartItems();var total=cartTotal();var envio=envioDe(total);var minimo=Number((C&&C.pedido_minimo)||0);var rows=items.map(function(p){return '<div class="fi-order-row"><img loading="lazy" src="'+imgFor(p)+'" data-pid="'+p.id+'" onerror="__fbImg(this)" alt=""><div class="fi-or-info"><b>'+esc(p.nombre)+'</b><small>'+p.qty+' '+p.unidad+' × '+money(p.precio)+'</small></div><span>'+money(p.precio*p.qty)+'</span><button class="fi-or-del" data-rmcart="'+p.id+'" title="Eliminar del pedido" aria-label="Eliminar '+esc(p.nombre)+' del pedido">🗑</button></div>';}).join("");return '<div class="fi-view"><button class="fi-back" data-back="shop">← Seguir comprando</button><h2 class="fi-t">Tu pedido</h2>'+rows+'<div class="fi-totals"><div><span>Subtotal</span><span>'+money(total)+'</span></div><div><span>Envío '+(envio===0&&Number(C&&C.envio)>0?"(gratis desde "+fmtEur(C.envio_gratis)+")":"")+'</span><span>'+money(envio)+'</span></div><div class="fi-grand"><span>Total</span><span>'+money(total+envio)+'</span></div></div><h3>Datos de entrega</h3><input id="c_nombre" placeholder="Nombre y apellidos"><input id="c_tel" type="tel" inputmode="tel" autocomplete="tel" maxlength="22" placeholder="Teléfono (ej. +34 600 123 456)"><small id="c_tel_err" class="fi-err"></small><input id="c_dir" placeholder="Dirección de entrega" autocomplete="street-address"><textarea id="c_notas" maxlength="500" rows="3" placeholder="Notas para la tienda (opcional): horario de entrega preferente, piso, portero, sustituciones…"></textarea><select id="c_pago"><option value="tarjeta">Pago con tarjeta (al recibir)</option><option value="efectivo">Efectivo al recibir</option></select><p class="fi-legalinfo">Precios con IVA incluido. En productos perecederos (fruta, verdura y similares) no se aplica el derecho de desistimiento (art. 103.d del TRLGDCU); en productos no perecederos dispones de 14 días si están sin abrir. Si algún producto llega en mal estado, te lo cambiamos o reembolsamos.</p>'+(minimo>0&&total<minimo?'<p class="fi-err" style="display:block">Pedido mínimo: '+fmtEur(minimo)+'. Te faltan '+fmtEur(minimo-total)+'.</p>':'')+'<label class="fi-legalchk"><input type="checkbox" id="c_ok"><span>He leído y acepto las <a href="#" data-legal="condiciones">Condiciones generales de contratación</a> y la <a href="#" data-legal="privacidad">Política de privacidad</a>.</span></label><button class="fi-bigbtn" data-confirm="1" data-min="'+(minimo>0&&total<minimo?1:0)+'" disabled>Confirmar pedido · '+money(total+envio)+'</button><p class="fi-hint" id="c_hint">Completa nombre, un teléfono válido y dirección, y acepta las condiciones para continuar.</p></div>';}
function sinAcceso(){return '<div class="fi-view"><h2 class="fi-t">Sin acceso a esta tienda</h2><p class="fi-desc-big">La cuenta <b>'+esc(S.user.email)+'</b> no pertenece a <b>'+esc(C.nombre)+'</b>. Entra con la cuenta de esta tienda.</p><button class="fi-bigbtn" data-logout="1">Salir</button></div>';}
function login(){return '<div class="fi-view"><h2 class="fi-t">Acceso tienda</h2><p class="fi-desc-big">Introduce tu email y contraseña para gestionar productos y ver pedidos.</p><input id="l_email" type="email" placeholder="Email"><input id="l_pass" type="password" placeholder="Contraseña"><button class="fi-bigbtn" data-login="1">Entrar</button><p class="fi-hint" id="l_msg"></p></div>';}
function admin(){
  var tab=S.adminTab||"pedidos", np=S.products.length, no=(S.pedidos||[]).filter(function(o){return !o.enviado_at;}).length;
  var head='<div class="fi-admin-head"><div><h2>Mi tienda</h2><p>'+esc(C.nombre)+' · '+esc((S.user&&S.user.email)||"")+'</p></div><div><button class="fi-edit" data-logout="1">Salir</button></div></div>'+
    '<div class="fi-tabs"><button data-atab="pedidos" class="'+(tab==="pedidos"?"on":"")+'">Pedidos <span>'+no+'</span></button>'+
    '<button data-atab="productos" class="'+(tab==="productos"?"on":"")+'">Productos <span>'+np+'</span></button>'+
    '<button data-atab="comercio" class="'+(tab==="comercio"?"on":"")+'">Mi comercio</button>'+
    (S.esSuper?'<button data-atab="comercios" class="'+(tab==="comercios"?"on":"")+'">Comercios <span>'+(S.comercios||[]).length+'</span></button><button data-atab="prospeccion" class="'+(tab==="prospeccion"?"on":"")+'">Prospección</button>':'')+'</div>';
  var body;
  if(tab==="pedidos"&&S.pedidoId){body=pedidoDetalle();}
  else if(tab==="pedidos"){
    var srt=S.pedSort||"fecha_desc";
    var pf=S.pedFiltro||"pend", todos=S.pedidos||[];
    var nPend=todos.filter(function(o){return !o.enviado_at;}).length, nEnv=todos.length-nPend;
    var arr=todos.filter(function(o){return pf==="todos"||(pf==="env"?!!o.enviado_at:!o.enviado_at);}).sort(function(x,y){
      if(srt==="imp_desc")return Number(y.total)-Number(x.total);
      if(srt==="imp_asc")return Number(x.total)-Number(y.total);
      var dx=new Date(x.creado),dy=new Date(y.creado);return srt==="fecha_asc"?dx-dy:dy-dx;});
    var list=arr.map(function(o){
      var n=(o.items||[]).length, env=!!o.enviado_at;
      return '<div class="fi-swipe'+(env?' undo':'')+'"><div class="fi-swipe-bg">'+(env?'↺ Pendiente':'✓ Enviado')+'</div>'+
        '<div class="fi-pedido'+(env?' sent':'')+'" data-ped="'+o.id+'"><div class="fi-ped-top"><b>'+esc(o.cliente)+(o.codigo?' <span class="fi-codtag">#'+esc(o.codigo)+'</span>':'')+'</b><b>'+money(o.total)+'</b></div>'+
        '<small>'+fmtFecha(o.creado)+' · '+n+' producto'+(n===1?'':'s')+' · Pago: '+esc(o.pago||"")+'</small><br><small>'+enlaceMapa(o.direccion)+'</small>'+(o.notas?'<div class="fi-notaprev">📝 '+esc(o.notas)+'</div>':'')+
        '<div class="fi-ped-foot">'+badgeEnvio(o)+'<button class="fi-sendbtn'+(env?' on':'')+'" data-send="'+o.id+'">'+(env?'✓ Enviado':'Marcar enviado')+'</button></div></div></div>';
    }).join("");
    body='<div class="fi-tabbar"><select class="fi-sortsel" id="psort">'+
      opt("fecha_desc","Fecha: más recientes",srt)+opt("fecha_asc","Fecha: más antiguos",srt)+
      opt("imp_desc","Importe: mayor a menor",srt)+opt("imp_asc","Importe: menor a mayor",srt)+
      '</select><button class="fi-edit" data-refresh="1">↻ Actualizar</button></div>'+
      '<div class="fi-pfilter"><button data-pf="pend" class="'+(pf==="pend"?"on":"")+'">Pendientes ('+nPend+')</button><button data-pf="env" class="'+(pf==="env"?"on":"")+'">Enviados ('+nEnv+')</button><button data-pf="todos" class="'+(pf==="todos"?"on":"")+'">Todos ('+todos.length+')</button></div>'+
      (list?'<p class="fi-swipehint">Desliza un pedido hacia la izquierda para marcarlo como enviado.</p>'+list:'<p class="fi-empty">'+(todos.length?(pf==="env"?'No hay pedidos enviados.':pf==="pend"?'No hay pedidos pendientes. 🎉':'Todavía no hay pedidos.'):'Todavía no hay pedidos.')+'</p>');
  }else if(tab==="comercio"){body=miComercioHTML();
  }else if(tab==="prospeccion"&&S.esSuper){if(!S.prosp){S.prosp={filtro:{sin:true,no:true,pend:true},est:"todos",cargando:true};cargarProspectos().then(render);}body=prospeccionHTML();
  }else if(tab==="comercios"&&S.esSuper){body=S.doc?documentosHTML():S.eco?ecoHTML():comerciosHTML();
  }else{
    var q=norm(S.adminQ);
    var vis=S.products.filter(function(p){return !q||textoBusqueda(p).indexOf(q)>=0;});
    var rowHTML=function(p){var on=p.activo!==false;return '<div class="fi-admin-row'+(on?'':' fi-off')+'"><img loading="lazy" src="'+imgFor(p)+'" data-pid="'+p.id+'" onerror="__fbImg(this)" alt=""><div class="fi-ar-info"><b>'+esc(p.nombre)+'</b><small>'+money(p.precio)+' / '+p.unidad+' · '+p.cat+(on?'':' · <b class="fi-offtag">Oculto</b>')+'</small></div><div class="fi-ar-actions"><button class="fi-vis'+(on?' on':'')+'" data-vis="'+p.id+'" title="'+(on?'Visible en Comprar: pulsa para ocultar':'Oculto en Comprar: pulsa para mostrar')+'"><span></span>'+(on?'Visible':'Oculto')+'</button><button class="fi-edit" data-edit="'+p.id+'">Editar</button><button class="fi-del" data-del="'+p.id+'">🗑</button></div></div>';};
    S.openCats=S.openCats||{};
    var grupos=getCats().map(function(c){return c;});
    var conocidas={};grupos.forEach(function(c){conocidas[c.id]=1;});
    var huerf=S.products.filter(function(p){return !conocidas[p.cat];});
    if(huerf.length)grupos=grupos.concat([{id:"__sin",nombre:"Sin categoría",emoji:"❔",_sin:1}]);
    var gHTML=grupos.map(function(c){
      var todos=S.products.filter(function(p){return c._sin?!conocidas[p.cat]:p.cat===c.id;});
      var mios=vis.filter(function(p){return c._sin?!conocidas[p.cat]:p.cat===c.id;});
      if(q&&!mios.length)return "";
      var nVis=todos.filter(function(p){return p.activo!==false;}).length;
      var abierta=q?true:!!S.openCats[c.id];
      return '<div class="fi-catgrp'+(abierta?' open':'')+'"><div class="fi-cathead" data-tcat="'+esc(c.id)+'"><span class="em">'+c.emoji+'</span><div class="nm"><b>'+esc(c.nombre)+'</b><small>'+(q?mios.length+' coincidencia'+(mios.length===1?'':'s'):(todos.length?nVis+' visibles de '+todos.length+' producto'+(todos.length===1?'':'s'):'Sin productos todavía'))+'</small></div>'+
        (c._sin?'':'<button class="fi-catedit" data-ecat="'+esc(c.id)+'" title="Editar categoría">✏️</button>')+'<span class="chev">▶</span></div>'+
        (abierta?'<div class="fi-catbody">'+mios.map(rowHTML).join("")+(c._sin?'':'<button class="fi-catadd" data-newin="'+esc(c.id)+'">+ Añadir producto en '+esc(c.nombre)+'</button>')+'</div>':'')+'</div>';
    }).join("");
    body='<input class="fi-asearch" id="aq" placeholder="🔍 Buscar producto…" value="'+esc(S.adminQ||"")+'">'+
      '<div class="fi-tabbar"><span>'+(q?vis.length+' de '+np+' productos':S.products.filter(function(p){return p.activo!==false;}).length+' visibles de '+np+' productos')+'</span><div class="fi-btnrow"><button class="fi-newcat" data-newcat="1">+ Categoría</button><button class="fi-newbtn" data-new="1">+ Nuevo producto</button></div></div>'+
      (gHTML||'<p class="fi-empty">Ningún producto coincide con la búsqueda.</p>');
  }
  return '<div class="fi-view">'+head+body+'</div>';
}
function badgeEnvio(o){return o.enviado_at?'<span class="fi-badge ok">Enviado · '+fmtFecha(o.enviado_at)+'</span>':'<span class="fi-badge pend">Pendiente de envío</span>';}
async function marcarEnviado(id,valor){
  var r=await sb.from("pedidos").update({enviado_at:valor?new Date().toISOString():null}).eq("id",id).select("id,enviado_at");
  if(r.error||!r.data||!r.data.length){console.error(r.error);toast("No se ha podido actualizar el pedido"+(r.error?": "+r.error.message:""));return false;}
  (S.pedidos||[]).forEach(function(o){if(o.id===id)o.enviado_at=r.data[0].enviado_at;});
  toast(valor?"Pedido marcado como enviado":"Pedido marcado como pendiente");return true;
}
function enlaceMapa(dir){var d=String(dir||"").trim();if(!d)return "📍 —";var loc=(C&&C.localidad)||"";var q=d+(loc&&norm(d).indexOf(norm(loc))<0?", "+loc:"");
  return '<a class="fi-maplink" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)+'" target="_blank" rel="noopener" title="Abrir en Google Maps">📍 '+esc(d)+'</a>';}
function fmtFecha(d){return d?new Date(d).toLocaleString("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}):"";}
function pedidoDetalle(){
  var o=(S.pedidos||[]).filter(function(x){return x.id===S.pedidoId;})[0];
  if(!o){S.pedidoId=null;return '<p class="fi-empty">Pedido no encontrado.</p>';}
  var its=o.items||[];
  var filas=desglosePedido(o);
  return '<button class="fi-back" data-pback="1">← Volver a pedidos</button>'+
    '<div class="fi-pedido" style="cursor:default"><div class="fi-ped-top"><b>'+esc(o.cliente)+(o.codigo?' <span class="fi-codtag">#'+esc(o.codigo)+'</span>':'')+'</b><b>'+money(o.total)+'</b></div>'+
    '<small>'+fmtFecha(o.creado)+' · Pago: '+esc(o.pago||"")+'</small><br><small>📞 <a href="tel:'+esc(String(o.telefono||"").replace(/[^\d+]/g,""))+'">'+esc(o.telefono)+'</a> · '+enlaceMapa(o.direccion)+'</small>'+
    '<div class="fi-ped-foot">'+badgeEnvio(o)+'<button class="fi-sendbtn'+(o.enviado_at?' on':'')+'" data-send="'+o.id+'">'+(o.enviado_at?'Marcar pendiente':'Marcar enviado')+'</button></div></div>'+
    '<div class="fi-notabox"><label class="fi-l" for="p_notas">📝 Notas del pedido</label><textarea id="p_notas" maxlength="1000" rows="3" placeholder="Sin notas. Puedes añadir horario de entrega, avisos, etc.">'+esc(o.notas||'')+'</textarea><button class="fi-edit" data-savenota="'+o.id+'">Guardar notas</button></div>'+filas;
}
/* ---- Desglose del pedido con precios, y edición por el comercio ---- */
function uds(u){return u==="kg"?"kg":"ud";}
function qtyTxt(q){return String(+Number(q).toFixed(3)).replace(".",",");}
function subtotalItems(items){return (items||[]).reduce(function(a,it){return a+Number(it.precio||0)*Number(it.qty||0);},0);}
function envioPedido(o){var e=Number(o.total||0)-subtotalItems(o.items);return e>0.004?+e.toFixed(2):0;}
function desglosePedido(o){var ed=S.editPed&&S.editPed.id===o.id?S.editPed:null,items=ed?ed.items:(o.items||[]);
  var filas=items.map(function(it,i){var imp=Number(it.precio||0)*Number(it.qty||0);
    return '<tr><td>'+esc(it.nombre)+(it.nuevo?' <span class="fi-tag on">añadido</span>':'')+'</td>'+
      '<td class="fi-num">'+(ed?'<input class="fi-qtyin" type="number" min="0" step="'+(it.unidad==="kg"?"0.05":"1")+'" value="'+(+Number(it.qty).toFixed(3))+'" data-eq="'+i+'"> '+uds(it.unidad)+'<button class="fi-rowdel" data-edel="'+i+'" title="Quitar">✕</button>':'<b>'+qtyTxt(it.qty)+' '+uds(it.unidad)+'</b>')+'</td>'+
      '<td class="fi-num">'+(it.precio!=null?money(it.precio)+'<small>/'+uds(it.unidad)+'</small>':'—')+'</td><td class="fi-num"><b>'+(it.precio!=null?money(imp):'—')+'</b></td></tr>';}).join("");
  var sub=subtotalItems(items),env=ed?ed.envio:envioPedido(o),tot=sub+env;
  var pie='<tfoot><tr><td colspan="3">Subtotal</td><td class="fi-num">'+money(sub)+'</td></tr><tr><td colspan="3">Envío</td><td class="fi-num">'+(ed?'<input class="fi-qtyin" type="number" min="0" step="0.01" value="'+env+'" id="ep_envio"> €':money(env))+'</td></tr><tr class="fi-totrow"><td colspan="3">Total</td><td class="fi-num">'+money(tot)+'</td></tr></tfoot>';
  var cab='<div class="fi-deshead"><h3>Desglose del pedido</h3>'+(ed?'':'<button class="fi-edit" data-pedit="'+o.id+'">✏️ Editar pedido</button>')+'</div>'+
    (o.editado&&!ed?'<p class="fi-hint" style="margin:-4px 0 8px">✏️ Modificado por la tienda el '+fmtFecha(o.editado)+(o.items_original?' · <a href="#" data-porig="'+o.id+'">ver pedido original</a>':'')+'</p>':'');
  var tabla='<div class="fi-tablewrap"><table class="fi-ptable fi-vtable fi-destable"><thead><tr><th>Producto</th><th class="fi-num">Cantidad</th><th class="fi-num">Precio</th><th class="fi-num">Importe</th></tr></thead><tbody>'+(filas||'<tr><td colspan="4" class="fi-empty">Sin productos</td></tr>')+'</tbody>'+pie+'</table></div>';
  var add='';
  if(ed){var ops=S.products.slice().sort(function(a,b){return a.nombre.localeCompare(b.nombre,"es");}).map(function(p){return '<option value="'+esc(p.id)+'">'+esc(p.nombre)+' · '+money(p.precio)+'/'+uds(p.unidad)+(p.activo===false?' (oculto)':'')+'</option>';}).join("");
    add='<div class="fi-addprod"><label class="fi-l">Añadir producto</label><div class="fi-addrow"><select id="ep_prod"><option value="">Elige un producto…</option>'+ops+'</select><input id="ep_qty" class="fi-qtyin" type="number" min="0" step="0.05" value="1"><button class="fi-edit" data-eadd="1">+ Añadir</button></div></div>'+
      '<div class="fi-btnrow" style="justify-content:flex-end;margin:6px 0 14px"><button class="fi-edit" data-ecancel="1">Cancelar</button><button class="fi-newbtn" data-esave="1">Guardar cambios · '+money(tot)+'</button></div>';}
  return cab+tabla+add;}
function leerEdicion(){var ed=S.editPed;if(!ed)return;app.querySelectorAll("[data-eq]").forEach(function(inp){var i=+inp.getAttribute("data-eq"),v=parseFloat(String(inp.value).replace(",","."));if(ed.items[i])ed.items[i].qty=isNaN(v)||v<0?0:v;});
  var e=document.getElementById("ep_envio");if(e){var v=parseFloat(String(e.value).replace(",","."));ed.envio=isNaN(v)||v<0?0:v;}}
async function guardarEdicion(){leerEdicion();var ed=S.editPed,o=(S.pedidos||[]).filter(function(x){return x.id===ed.id;})[0];if(!o)return;
  var items=ed.items.filter(function(it){return Number(it.qty)>0;}).map(function(it){return {id:it.id||null,nombre:it.nombre,qty:+Number(it.qty).toFixed(3),unidad:it.unidad,precio:Number(it.precio||0)};});
  if(!items.length){toast("El pedido debe tener al menos un producto. Si se anula, márcalo en las notas.");return false;}
  var total=+(subtotalItems(items)+ed.envio).toFixed(2);
  var row={items:items,total:total,editado:new Date().toISOString()};if(!o.items_original)row.items_original=o.items;
  var r=await sb.from("pedidos").update(row).eq("id",o.id).eq("comercio_id",C.id).select().single();
  if(r.error||!r.data){toast("No se ha guardado el pedido"+(r.error?": "+r.error.message:""));return false;}
  Object.assign(o,r.data);S.editPed=null;return true;}
function verOriginal(id){var o=(S.pedidos||[]).filter(function(x){return x.id===id;})[0];if(!o||!o.items_original)return;
  var f=o.items_original.map(function(it){return '<tr><td>'+esc(it.nombre)+'</td><td class="fi-num">'+qtyTxt(it.qty)+' '+uds(it.unidad)+'</td><td class="fi-num">'+(it.precio!=null?money(Number(it.precio)*Number(it.qty)):'—')+'</td></tr>';}).join("");
  var m=modal('<h2>Pedido original</h2><p class="fi-hint">Tal como lo hizo el cliente, antes de las modificaciones de la tienda.</p><div class="fi-tablewrap"><table class="fi-ptable fi-vtable"><thead><tr><th>Producto</th><th class="fi-num">Cantidad</th><th class="fi-num">Importe</th></tr></thead><tbody>'+f+'</tbody></table></div><div class="acts"><span></span><button class="fi-newbtn" id="vo_c">Cerrar</button></div>');
  m.querySelector("#vo_c").onclick=function(){m.remove();};}
function bindEdicion(){
  var pe=app.querySelector("[data-pedit]");if(pe)pe.onclick=function(){var o=(S.pedidos||[]).filter(function(x){return x.id===pe.getAttribute("data-pedit");})[0];if(!o)return;
    S.editPed={id:o.id,envio:envioPedido(o),items:(o.items||[]).map(function(it){var p=it.id&&find(it.id);return Object.assign({},it,{precio:it.precio!=null?Number(it.precio):(p?p.precio:0)});})};render();};
  var po=app.querySelector("[data-porig]");if(po)po.onclick=function(e){e.preventDefault();verOriginal(po.getAttribute("data-porig"));};
  if(!S.editPed)return;
  app.querySelectorAll("[data-eq]").forEach(function(inp){inp.onchange=function(){leerEdicion();render();};});
  var en=document.getElementById("ep_envio");if(en)en.onchange=function(){leerEdicion();render();};
  app.querySelectorAll("[data-edel]").forEach(function(b){b.onclick=function(){leerEdicion();S.editPed.items.splice(+b.getAttribute("data-edel"),1);render();};});
  var sel=document.getElementById("ep_prod"),q=document.getElementById("ep_qty");
  if(sel)sel.onchange=function(){var p=find(sel.value);if(p)q.step=p.unidad==="kg"?"0.05":"1";};
  var ad=app.querySelector("[data-eadd]");if(ad)ad.onclick=function(){leerEdicion();var p=find(sel.value),n=parseFloat(String(q.value).replace(",","."));
    if(!p){toast("Elige un producto");return;}if(!(n>0)){toast("Indica una cantidad");return;}
    var ex=S.editPed.items.filter(function(it){return it.id===p.id;})[0];
    if(ex)ex.qty=+(Number(ex.qty)+n).toFixed(3);else S.editPed.items.push({id:p.id,nombre:p.nombre,qty:n,unidad:p.unidad,precio:p.precio,nuevo:true});render();};
  var ca=app.querySelector("[data-ecancel]");if(ca)ca.onclick=function(){S.editPed=null;render();};
  var sv=app.querySelector("[data-esave]");if(sv)sv.onclick=async function(){sv.disabled=true;sv.textContent="Guardando…";if(await guardarEdicion()){render();toast("Pedido actualizado");}else{sv.disabled=false;sv.textContent="Guardar cambios";}};
}
function opt(v,label,sel){return '<option value="'+v+'"'+(sel===v?' selected':'')+'>'+label+'</option>';}
function form(){
  var p=S.editId?find(S.editId):{nombre:"",desc:"",precio:"",unidad:"kg",cat:S._newCat||(getCats()[0]||{}).id||"fruta",img:"",forma:"auto",color:"auto"};
  if(!S._f)S._f={nombre:p.nombre||"",desc:p.desc||"",precio:(p.precio||p.precio===0?p.precio:""),unidad:p.unidad||"kg",cat:p.cat||"fruta",img:p.img||"",forma:p.forma||"auto",color:p.color||"auto"};
  var f=S._f;var preview=f.img||artFor(f.nombre,f.cat,f.desc,{shape:f.forma,color:f.color});
  var shapeSel=!f.img?('<div class="fi-form-row2" style="margin-top:4px"><div><label class="fi-l">Forma de la ilustración</label><select id="f_forma">'+opt("auto","Automática (según el texto)",f.forma)+opt("redonda","Redonda",f.forma)+opt("alargada","Alargada",f.forma)+opt("racimo","Racimo / bayas",f.forma)+opt("hoja","De hoja",f.forma)+opt("pera","Tipo pera",f.forma)+'</select></div><div><label class="fi-l">Color de la ilustración</label><select id="f_color">'+opt("auto","Automático",f.color)+opt("rojo","Rojo",f.color)+opt("verde","Verde",f.color)+opt("amarillo","Amarillo",f.color)+opt("naranja","Naranja",f.color)+opt("morado","Morado",f.color)+opt("marron","Marrón",f.color)+opt("rosa","Rosa",f.color)+opt("blanco","Blanco / crema",f.color)+'</select></div></div>'):'';
  return '<div class="fi-view"><button class="fi-back" data-back="admin">← Cancelar</button><h2 class="fi-t">'+(S.editId?"Editar producto":"Nuevo producto")+'</h2><label class="fi-l">Nombre</label><input id="f_nombre" value="'+esc(f.nombre)+'" placeholder="Ej. Cerezas"><label class="fi-l">Descripción</label><input id="f_desc" value="'+esc(f.desc)+'" placeholder="Ej. Producto nacional, dulces"><div class="fi-form-row"><div><label class="fi-l">Precio (€)</label><input id="f_precio" type="number" step="0.01" value="'+esc(f.precio)+'" placeholder="0.00"></div><div><label class="fi-l">Se vende por</label><select id="f_unidad">'+opt("kg","Kilo",f.unidad)+opt("unidad","Unidad",f.unidad)+'</select></div><div><label class="fi-l">Categoría</label><select id="f_cat">'+getCats().map(function(c){return opt(c.id,c.emoji+" "+c.nombre,f.cat);}).join("")+(getCats().some(function(c){return c.id===f.cat;})?"":opt(f.cat,f.cat,f.cat))+'</select></div></div><label class="fi-l">Foto del producto</label><div class="fi-imgbox"><img id="f_prev" src="'+preview+'" alt="preview"></div><div class="fi-img-actions"><button class="fi-edit" data-upload="1">📷 Subir foto</button>'+(f.img?'<button class="fi-del" data-clearimg="1">Usar ilustración</button>':'')+'<input id="f_file" type="file" accept="image/*" style="display:none"></div>'+galeriaHTML(f)+shapeSel+'<p class="fi-hint">Si no subes foto, se usa una ilustración. Déjala en «Automática» o ajústala a mano.</p><button class="fi-bigbtn" data-save="1">'+(S.editId?"Guardar cambios":"Publicar producto")+'</button></div>';
}

function pasoQty(p){return p.unidad==="kg"?(p.cat==="secos"?0.25:0.5):1;}
function fmtQty(p,q){return (p.unidad==="kg"?String(q).replace(".",",")+" kg":q+" ud");}
function stepperInner(p){var q=S.cart[p.id]||0;
  if(!q)return '<button class="fi-add" data-inc="'+p.id+'">Añadir 🛒</button>';
  return '<div class="fi-step"><button data-dec="'+p.id+'" aria-label="Quitar">−</button><span>'+fmtQty(p,q)+'</span><button data-inc="'+p.id+'" aria-label="Añadir">+</button></div>';}
function changeQty(id,dir){var p=find(id);if(!p)return;var step=pasoQty(p);var q=+((S.cart[id]||0)+dir*step).toFixed(2);
  if(q<=0)delete S.cart[id];else S.cart[id]=q;
  var el=app.querySelector('[data-sw="'+id+'"]');if(el)el.innerHTML=stepperInner(p);refreshCartbar();}
function refreshCartbar(){var old=document.querySelector(".fi-cartbar");if(old)old.remove();
  if(S.view==="tienda"&&S.screen==="shop"&&cartCount()>0){app.insertAdjacentHTML("beforeend",cartbar());
    var cb=app.querySelector("[data-checkout]");if(cb)cb.onclick=function(){S.screen="checkout";render();};}}

/* ============ TEXTOS LEGALES ============ */
/* Rellena aquí los datos reales del titular de la tienda */
function dato(v,ph){return v?esc(v):'<span class="fi-pend">['+ph+']</span>';}
function T(){var c=C||{};return {nombre:dato(c.titular,"NOMBRE Y APELLIDOS O RAZÓN SOCIAL"),nif:dato(c.nif,"NIF/CIF"),domicilio:dato(c.domicilio,"DIRECCIÓN COMPLETA DEL LOCAL"),email:dato(c.email,"EMAIL DE CONTACTO"),telefono:dato(c.telefono,"TELÉFONO"),registro:c.registro?esc(c.registro):"",comercial:esc(c.nombre||""),zona:esc(c.zona||c.localidad||"la zona indicada por la tienda")};}
var FECHA_LEGAL="23 de octubre de 2026";
function titularHTML(){var t=T();return '<p><b>Titular:</b> '+t.nombre+'<br><b>Nombre comercial:</b> '+t.comercial+'<br><b>NIF/CIF:</b> '+t.nif+'<br><b>Domicilio:</b> '+t.domicilio+'<br><b>Email:</b> '+t.email+'<br><b>Teléfono:</b> '+t.telefono+(t.registro?'<br>'+t.registro:'')+'</p>';}
function creditosHTML(){
  var seen={};var li=S.products.filter(function(p){return p.img&&p.img.indexOf("wikimedia.org")>=0;}).map(function(p){
    var file=decodeURIComponent(p.img.split("/").pop().replace(/^\d+px-/,""));if(seen[file])return "";seen[file]=1;
    return '<li>'+esc(p.nombre)+': <a href="https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file)+'" target="_blank" rel="noopener">'+esc(file)+'</a></li>';}).join("");
  return li?'<ul class="fi-credits">'+li+'</ul>':'';}
var LEGAL={
 aviso:{t:"Aviso legal",h:function(){return ''+
  '<h4>1. Datos identificativos</h4><p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>'+titularHTML()+
  '<h4>2. Objeto</h4><p>Este sitio web permite consultar el catálogo de productos de '+T().comercial+' y realizar pedidos para su entrega a domicilio en '+T().zona+'.</p>'+
  '<h4>3. Condiciones de uso</h4><p>El usuario se compromete a hacer un uso adecuado del sitio, a facilitar datos veraces en sus pedidos y a no emplearlo para actividades ilícitas o que puedan dañar el servicio.</p>'+
  '<h4>4. Propiedad intelectual e industrial</h4><p>El diseño, los textos y el nombre comercial pertenecen al titular. Las fotografías de producto proceden de Wikimedia Commons y se usan conforme a sus licencias libres (en su mayoría Creative Commons); la autoría y la licencia de cada imagen figuran en su ficha, enlazada en el apartado de créditos.</p>'+
  '<h4>5. Responsabilidad</h4><p>El titular procura que la información sea exacta y esté actualizada, pero no garantiza la ausencia de errores tipográficos en precios o descripciones; si se detecta alguno, se comunicará al cliente antes de la entrega para que decida si mantiene el pedido. No se responsabiliza de los contenidos de sitios de terceros enlazados.</p>'+
  '<h4>6. Legislación aplicable</h4><p>Este aviso se rige por la legislación española.</p>'+
  '<h4>Créditos de imágenes</h4>'+creditosHTML();}},
 condiciones:{t:"Condiciones generales de contratación",h:function(){return ''+
  '<p>Estas condiciones regulan la compra de productos a través de este sitio web y se aplican conforme al Real Decreto Legislativo 1/2007 (Texto Refundido de la Ley General para la Defensa de los Consumidores y Usuarios, TRLGDCU) y la LSSI-CE. Para realizar un pedido es necesario aceptarlas expresamente.</p>'+
  '<h4>1. Vendedor</h4>'+titularHTML()+
  '<h4>2. Productos y precios</h4><p>Los precios se muestran en euros con el IVA incluido. Los productos vendidos por kilo se preparan al peso más próximo posible a la cantidad pedida; si el peso real difiere de forma apreciable, se informará al cliente del importe final antes de la entrega. La disponibilidad depende del género de temporada; si algún producto no está disponible, se avisará al cliente para sustituirlo o retirarlo del pedido.</p>'+
  '<h4>3. Proceso de compra</h4><p>1) Añade los productos al carrito. 2) Pulsa «Tramitar pedido». 3) Indica nombre, teléfono, dirección y forma de pago. 4) Acepta estas condiciones y la política de privacidad. 5) Pulsa «Confirmar pedido». El contrato se perfecciona con la confirmación telefónica del pedido por parte de la tienda. El pedido queda registrado; puedes solicitar una copia por email o teléfono. Idioma del contrato: español.</p>'+
  '<h4>4. Gastos y zona de entrega</h4><p>Reparto a domicilio en '+T().zona+'. '+textoEnvio()+' La franja de entrega se acuerda por teléfono al confirmar el pedido.</p>'+
  '<h4>5. Forma de pago</h4><p>El pago se realiza en el momento de la entrega, con tarjeta o en efectivo. No se cobra ningún importe a través de la web.</p>'+
  '<h4>6. Derecho de desistimiento</h4><p>De acuerdo con el artículo 103.d) del TRLGDCU, el derecho de desistimiento no es aplicable a la fruta, verdura, setas y demás bienes que puedan deteriorarse o caducar con rapidez.</p><p>Para los productos no perecederos, dispones de 14 días naturales desde la entrega para desistir sin indicar el motivo, comunicándolo por email o teléfono. El producto debe devolverse sin abrir ni consumir y en su estado original; te reembolsaremos el importe en un plazo máximo de 14 días por el mismo medio de pago. Los gastos de devolución corren a tu cargo, salvo que lo recojamos en un próximo reparto.</p>'+
  '<h4>7. Garantía y productos en mal estado</h4><p>El cliente puede revisar el pedido en el momento de la entrega. Si algún producto no está en buen estado o no corresponde con lo pedido, comunícalo en la entrega o, como máximo, en las 24 horas siguientes por teléfono o email, y se sustituirá o se reembolsará su importe, sin perjuicio de los derechos legales de garantía del consumidor.</p>'+
  '<h4>8. Atención al cliente y reclamaciones</h4><p>Puedes contactar en '+T().email+' o en el '+T().telefono+'. La tienda dispone de hojas de reclamaciones a disposición de los consumidores. También puedes acudir a la Oficina Municipal de Información al Consumidor (OMIC) de tu ayuntamiento o al organismo de consumo de tu comunidad autónoma.</p>'+
  '<h4>9. Legislación y jurisdicción</h4><p>Estas condiciones se rigen por la legislación española. En caso de controversia, serán competentes los juzgados y tribunales del domicilio del consumidor.</p>'+
  '<p class="fi-muted">Última actualización: '+FECHA_LEGAL+'.</p>';}},
 privacidad:{t:"Política de privacidad",h:function(){return ''+
  '<p>Conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos del tratamiento de tus datos personales.</p>'+
  '<h4>1. Responsable</h4>'+titularHTML()+
  '<h4>2. Datos que tratamos</h4><p>Nombre y apellidos, teléfono, dirección de entrega, forma de pago elegida, productos pedidos y fecha y hora de aceptación de las condiciones. No tratamos datos de tarjetas: el pago se realiza en la entrega.</p>'+
  '<h4>3. Finalidad</h4><p>Gestionar, confirmar y entregar tu pedido, contactarte sobre él y atender incidencias o reclamaciones. No enviamos publicidad ni elaboramos perfiles.</p>'+
  '<h4>4. Base legal</h4><p>La ejecución del contrato de compraventa (art. 6.1.b RGPD) y el cumplimiento de obligaciones legales fiscales y mercantiles (art. 6.1.c RGPD).</p>'+
  '<h4>5. Conservación</h4><p>Durante la relación comercial y, después, durante los plazos legales de prescripción (hasta 6 años por obligaciones mercantiles, art. 30 del Código de Comercio, y 4 años por obligaciones tributarias). Después se suprimen.</p>'+
  '<h4>6. Destinatarios y encargados del tratamiento</h4><p>No cedemos tus datos a terceros salvo obligación legal. La plataforma web la presta un encargado del tratamiento con contrato conforme al art. 28 RGPD, que utiliza a su vez estos proveedores: Supabase (base de datos, servidores en la Unión Europea, Irlanda) y GitHub Pages (alojamiento de la web). Las fotografías se cargan desde Wikimedia Commons, que recibe la dirección IP del visitante al servirlas. Cuando algún proveedor pueda acceder a datos desde fuera del Espacio Económico Europeo, se hace con las garantías del RGPD (cláusulas contractuales tipo o Marco de Privacidad de Datos UE-EE. UU.).</p>'+
  '<h4>7. Tus derechos</h4><p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a '+T().email+', indicando qué derecho ejerces. Si consideras que no se han atendido correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>'+
  '<h4>8. Seguridad</h4><p>Los datos de los pedidos solo son accesibles para las cuentas de esta tienda y para el administrador de la plataforma, con conexión cifrada (HTTPS) y control de acceso en la base de datos que separa los datos de cada comercio.</p>'+
  '<p class="fi-muted">Última actualización: '+FECHA_LEGAL+'.</p>';}},
 cookies:{t:"Política de cookies",h:function(){return ''+
  '<p>Conforme al artículo 22.2 de la LSSI-CE, te informamos de que este sitio <b>no utiliza cookies publicitarias, analíticas ni de seguimiento</b>.</p>'+
  '<p>Solo se usa almacenamiento técnico estrictamente necesario: el carrito mientras navegas y, únicamente para el personal de la tienda, la sesión de acceso a «Mi tienda» (guardada en el almacenamiento local del navegador). Este almacenamiento técnico está exento de consentimiento, por lo que no se muestra un banner de cookies.</p>'+
  '<p>Al cargar las fotografías, Wikimedia Commons recibe la dirección IP del visitante para servirlas, sin instalar cookies de seguimiento en este sitio.</p>'+
  '<p>Puedes borrar el almacenamiento local en cualquier momento desde la configuración de tu navegador.</p>'+
  '<p class="fi-muted">Última actualización: '+FECHA_LEGAL+'.</p>';}}
};
function textoEnvio(){var e=Number(C&&C.envio!=null?C.envio:0),g=Number(C&&C.envio_gratis||0),m=Number(C&&C.pedido_minimo||0);
  var t=e>0?("Gastos de envío: "+fmtEur(e)+(g>0?" en pedidos inferiores a "+fmtEur(g)+"; gratis a partir de "+fmtEur(g)+".":".")):"Envío gratuito.";
  if(m>0)t+=" Pedido mínimo: "+fmtEur(m)+".";return t;}
function footer(){return '<footer class="fi-footer"><div><b>'+esc(C?C.nombre:"")+'</b>'+(C&&C.localidad?' · '+esc(C.localidad):'')+' · Precios con IVA incluido</div>'+
  '<div class="fi-flinks"><a href="#" data-legal="aviso">Aviso legal</a><a href="#" data-legal="condiciones">Condiciones de contratación</a><a href="#" data-legal="privacidad">Privacidad</a><a href="#" data-legal="cookies">Cookies</a></div>'+
  '<div class="fi-muted">© '+new Date().getFullYear()+' '+(C&&C.titular?esc(C.titular):esc(C?C.nombre:""))+'</div></footer>';}
function showLegal(k){var d=LEGAL[k];if(!d)return;var m=document.createElement("div");m.className="fi-modal";
  m.innerHTML='<div class="fi-legalcard" role="dialog" aria-label="'+d.t+'"><div class="fi-legalhead"><h2>'+d.t+'</h2><button class="fi-legalx" aria-label="Cerrar">✕</button></div><div class="fi-legalbody">'+d.h()+'</div></div>';
  m.onclick=function(e){if(e.target===m||e.target.classList.contains("fi-legalx"))m.remove();};document.body.appendChild(m);}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-legal]");if(!a)return;e.preventDefault();e.stopPropagation();showLegal(a.getAttribute("data-legal"));},true);

function reducirFoto(file,max,q){return new Promise(function(ok,ko){var u=URL.createObjectURL(file);var im=new Image();
  im.onload=function(){var w=im.naturalWidth,h=im.naturalHeight,k=Math.min(1,max/Math.max(w,h));var c=document.createElement("canvas");
    c.width=Math.round(w*k);c.height=Math.round(h*k);var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
    URL.revokeObjectURL(u);ok(c.toDataURL("image/jpeg",q));};
  im.onerror=function(){URL.revokeObjectURL(u);ko();};im.src=u;});}

var CAT_NOMBRE={fruta:"fruta frutas",verdura:"verdura verduras hortalizas",setas:"setas seta champiñones hongos",secos:"frutos secos fruto seco frutossecos nueces almendras pistachos anacardos avellanas cacahuetes pipas pasas datiles orejones snack",cesta:"cestas cesta cajas caja regalo"};
function norm(t){return String(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();}
function textoBusqueda(p){return norm(p.nombre+" "+(p.desc||"")+" "+(CAT_NOMBRE[p.cat]||"")+" "+catInfo(p.cat).nombre);}

function fotoOriginal(nombre){for(var i=0;i<SEED.length;i++)if(SEED[i].nombre===nombre)return SEED[i].img||"";return "";}
function uniq(a){var o=[];a.forEach(function(x){if(x&&o.indexOf(x)<0)o.push(x);});return o;}
async function cargarFotos(id){
  if(!configurado)return;var r=await sb.from("productos").select("fotos").eq("id",id).single();
  if(S.editId!==id)return;S._fotos=(!r.error&&r.data&&Array.isArray(r.data.fotos))?r.data.fotos:[];render();}
function galeriaLista(){var p=S.editId?find(S.editId):null;
  return uniq([p?fotoOriginal(p.nombre):""].concat(S._fotos||[],[p?p.img:"",S._f?S._f.img:""]));}
function fotosParaGuardar(nueva){var p=S.editId?find(S.editId):null;var l=uniq((S._fotos||[]).concat([p?p.img:"",nueva]));
  if(l.length>8)l=[l[0]].concat(l.slice(-7));return l;}
function galeriaHTML(f){var g=galeriaLista();S._gal=g;
  var tiles=g.map(function(u,i){return '<button type="button" class="fi-gtile'+(u===f.img?' on':'')+'" data-pick="'+i+'" title="Usar esta foto"><img src="'+u+'" alt=""></button>';}).join("");
  var ilu='<button type="button" class="fi-gtile'+(!f.img?' on':'')+'" data-pick="-1" title="Usar ilustración"><img src="'+artFor(f.nombre,f.cat,f.desc,{shape:f.forma,color:f.color})+'" alt=""><span>Ilustración</span></button>';
  var cargando=(S.editId&&S._fotos===null)?'<span class="fi-hint">Cargando fotos anteriores…</span>':'';
  return '<label class="fi-l">Fotos guardadas de este producto <small style="font-weight:400;color:#888">(pulsa una para usarla)</small></label><div class="fi-gal">'+tiles+ilu+'</div>'+cargando;}

/* Teléfono: formato internacional E.164 (+código país y número). Los móviles/fijos españoles de 9 cifras se completan con +34 */
function normTel(v){var t=String(v||"").replace(/[\s().\-]/g,"");if(t.indexOf("00")===0)t="+"+t.slice(2);
  if(/^[6789]\d{8}$/.test(t))t="+34"+t;
  if(!/^\+[1-9]\d{6,14}$/.test(t))return {ok:false};
  if(t.indexOf("+34")===0&&!/^\+34[6789]\d{8}$/.test(t))return {ok:false};
  var pretty=t.indexOf("+34")===0?"+34 "+t.slice(3,6)+" "+t.slice(6,9)+" "+t.slice(9):t;
  return {ok:true,e164:t,pretty:pretty};}
function cartbar(){return '<button class="fi-cartbar" data-checkout="1"><span>🛒 '+cartCount()+' producto'+(cartCount()>1?"s":"")+'</span><span>'+money(cartTotal())+' · Tramitar pedido →</span></button>';}


/* ============ MI COMERCIO (cada tienda edita sus datos) ============ */
var COLORES=["#2f7d22","#1b7f5b","#0f766e","#1565c0","#283593","#6a1b9a","#ad1457","#c62828","#d84315","#ef6c00","#8d6e63","#37474f"];
function urlComercio(c){c=c||C;return (c&&c.url)||(location.origin+location.pathname+"?c="+(c?c.slug:""));}
function campo(id,label,val,ph,tipo){return '<label class="fi-l" for="'+id+'">'+label+'</label><input id="'+id+'" '+(tipo?'type="'+tipo+'" step="0.01" min="0"':'')+' value="'+esc(val==null?"":val)+'" placeholder="'+esc(ph||"")+'">';}
function miComercioHTML(){
  var f=S._mc||(S._mc={nombre:C.nombre||"",localidad:C.localidad||"",logo:C.logo||"",color:C.color||"#2f7d22",portada_titulo:C.portada_titulo||"",portada_sub:C.portada_sub||"",zona:C.zona||"",envio:C.envio,envio_gratis:C.envio_gratis,pedido_minimo:C.pedido_minimo,titular:C.titular||"",nif:C.nif||"",domicilio:C.domicilio||"",email:C.email||"",telefono:C.telefono||"",registro:C.registro||""});
  var colores=COLORES.map(function(c){return '<button type="button" data-mccol="'+c+'" class="'+(f.color.toLowerCase()===c?"on":"")+'" style="background:'+c+'" aria-label="Color '+c+'"></button>';}).join("")+'<input type="color" id="mc_color" value="'+esc(f.color)+'" title="Otro color">';
  return '<div class="fi-card2"><h3>Imagen de la tienda</h3><p class="fi-sub">Así te ven tus clientes en la cabecera y en la portada.</p>'+
    '<div class="fi-logoedit"><div class="lg">'+(f.logo?'<img src="'+esc(f.logo)+'" alt="">':'🧺')+'</div><div class="fi-btnrow"><button class="fi-edit" data-mclogo="1">📷 '+(f.logo?'Cambiar logo':'Subir logo')+'</button>'+(f.logo?'<button class="fi-del" data-mcnologo="1">Quitar</button>':'')+'<input id="mc_logo_file" type="file" accept="image/*" style="display:none"></div></div>'+
    campo("mc_nombre","Nombre de la tienda",f.nombre,"Ej. Panadería Pepe")+campo("mc_localidad","Localidad (aparece bajo el nombre)",f.localidad,"Ej. Madrid")+
    '<label class="fi-l">Color principal</label><div class="fi-colors">'+colores+'</div>'+
    campo("mc_ptit","Título de portada",f.portada_titulo,"Ej. Pan recién hecho cada mañana")+campo("mc_psub","Subtítulo de portada",f.portada_sub,"Ej. Pide online y recibe en casa.")+'</div>'+
    '<div class="fi-card2"><h3>Reparto</h3><p class="fi-sub">Se aplica en el carrito y en las condiciones de compra.</p>'+
    campo("mc_zona","Zona de reparto",f.zona,"Ej. Tetuán (Madrid) y alrededores")+
    '<div class="fi-form-row2"><div>'+campo("mc_envio","Gastos de envío (€)",f.envio,"0","number")+'</div><div>'+campo("mc_gratis","Envío gratis desde (€, 0 = nunca)",f.envio_gratis,"0","number")+'</div></div>'+
    campo("mc_minimo","Pedido mínimo (€, 0 = sin mínimo)",f.pedido_minimo,"0","number")+'</div>'+
    '<div class="fi-card2"><h3>Datos legales</h3><p class="fi-sub">Obligatorios por ley (LSSI). Aparecen en el aviso legal, las condiciones y la privacidad.</p>'+
    campo("mc_titular","Titular (nombre y apellidos o razón social)",f.titular,"")+campo("mc_nif","NIF / CIF",f.nif,"")+campo("mc_dom","Dirección completa del local",f.domicilio,"Calle, número, CP, ciudad")+
    '<div class="fi-form-row2"><div>'+campo("mc_email","Email de contacto",f.email,"")+'</div><div>'+campo("mc_tel","Teléfono",f.telefono,"")+'</div></div>'+
    campo("mc_reg","Registro Mercantil (solo sociedades)",f.registro,"Tomo, folio y hoja")+'</div>'+
    '<button class="fi-bigbtn" data-mcsave="1">Guardar cambios</button>'+
    '<div class="fi-card2" style="margin-top:14px"><h3>Tu código QR</h3><p class="fi-sub">Imprímelo y ponlo en el mostrador: al escanearlo, el cliente abre tu tienda.</p>'+
    '<div class="fi-qrbox"><canvas id="qr_mc" data-qr="'+esc(urlComercio())+'" width="300" height="300"></canvas><div class="acts"><code>'+esc(urlComercio())+'</code><button class="fi-edit" data-dlqr="'+esc(C.slug)+'">⬇ Descargar QR</button><button class="fi-edit" data-dlcartel="'+esc(C.slug)+'">⬇ Descargar cartel</button></div></div></div>';
}
function leerMiComercio(){var f=S._mc;if(!f)return;var g=function(id){var e=document.getElementById(id);return e?e.value:null;};
  var m={mc_nombre:"nombre",mc_localidad:"localidad",mc_ptit:"portada_titulo",mc_psub:"portada_sub",mc_zona:"zona",mc_envio:"envio",mc_gratis:"envio_gratis",mc_minimo:"pedido_minimo",mc_titular:"titular",mc_nif:"nif",mc_dom:"domicilio",mc_email:"email",mc_tel:"telefono",mc_reg:"registro",mc_color:"color"};
  for(var k in m){var v=g(k);if(v!=null)f[m[k]]=v;}}
function reducirLogo(file){return new Promise(function(ok,ko){var u=URL.createObjectURL(file);var im=new Image();
  im.onload=function(){var t=256,c=document.createElement("canvas");c.width=t;c.height=t;var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,t,t);
    var k=Math.max(t/im.naturalWidth,t/im.naturalHeight),w=im.naturalWidth*k,h=im.naturalHeight*k;x.drawImage(im,(t-w)/2,(t-h)/2,w,h);URL.revokeObjectURL(u);ok(c.toDataURL("image/jpeg",0.86));};
  im.onerror=function(){URL.revokeObjectURL(u);ko();};im.src=u;});}
async function guardarMiComercio(){leerMiComercio();var f=S._mc;
  var num=function(v){var n=parseFloat(String(v==null?"":v).replace(",","."));return isNaN(n)||n<0?0:n;};
  if(!String(f.nombre||"").trim()){toast("El nombre de la tienda no puede estar vacío");return false;}
  var row={nombre:f.nombre.trim(),localidad:f.localidad.trim(),logo:f.logo||null,color:f.color,portada_titulo:f.portada_titulo.trim(),portada_sub:f.portada_sub.trim(),zona:f.zona.trim(),envio:num(f.envio),envio_gratis:num(f.envio_gratis),pedido_minimo:num(f.pedido_minimo),titular:f.titular.trim(),nif:f.nif.trim(),domicilio:f.domicilio.trim(),email:f.email.trim(),telefono:f.telefono.trim(),registro:f.registro.trim()};
  var r=await sb.from("comercios").update(row).eq("id",C.id).select().maybeSingle();
  if(r.error||!r.data){toast("No se ha guardado"+(r.error?": "+r.error.message:" (sin permiso)"));return false;}
  C=r.data;S._mc=null;aplicarTema();return true;}

/* ============ QR (código QR de cada tienda) ============ */
var _qrLib=null;
function cargarQRLib(){if(window.qrcode)return Promise.resolve(window.qrcode);if(_qrLib)return _qrLib;
  _qrLib=new Promise(function(ok,ko){var sc=document.createElement("script");sc.src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js";sc.onload=function(){ok(window.qrcode);};sc.onerror=function(){_qrLib=null;ko(new Error("No se pudo cargar el generador de QR"));};document.head.appendChild(sc);});return _qrLib;}
async function matrizQR(texto){var lib=await cargarQRLib();var q=lib(0,"Q");q.addData(texto);q.make();var n=q.getModuleCount(),m=[];for(var r=0;r<n;r++){m.push([]);for(var c=0;c<n;c++)m[r].push(q.isDark(r,c));}return m;}
async function pintarQR(cv,texto,px,x0,y0,color){var m=await matrizQR(texto),n=m.length,ctx=cv.getContext("2d");px=px||cv.width;x0=x0||0;y0=y0||0;var tam=Math.floor(px/(n+8)),off=Math.floor((px-tam*n)/2);
  ctx.fillStyle="#fff";ctx.fillRect(x0,y0,px,px);ctx.fillStyle=color||"#000";for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(m[r][c])ctx.fillRect(x0+off+c*tam,y0+off+r*tam,tam,tam);}
function cargarImg(src){return new Promise(function(ok){if(!src)return ok(null);var im=new Image();im.onload=function(){ok(im);};im.onerror=function(){ok(null);};im.src=src;});}
function descargarCanvas(cv,nombre){cv.toBlob(function(b){var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=nombre;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);},"image/png");}
function comercioPorSlug(slug){if(C&&C.slug===slug)return C;return (S.comercios||[]).filter(function(c){return c.slug===slug;})[0]||null;}
async function descargarQR(slug){var c=comercioPorSlug(slug);if(!c)return;try{var cv=document.createElement("canvas");cv.width=cv.height=1200;await pintarQR(cv,urlComercio(c),1200);descargarCanvas(cv,"qr-"+c.slug+".png");}catch(e){toast(e.message);}}
function textoAjustado(ctx,t,maxW,size,peso){var s=size;do{ctx.font=(peso||"700")+" "+s+"px system-ui,-apple-system,Segoe UI,sans-serif";s-=4;}while(ctx.measureText(t).width>maxW&&s>20);}
async function descargarCartel(slug){var c=comercioPorSlug(slug);if(!c)return;try{
  var W=1240,H=1754,cv=document.createElement("canvas");cv.width=W;cv.height=H;var x=cv.getContext("2d"),col=c.color||"#2f7d22",url=urlComercio(c);
  x.fillStyle="#fff";x.fillRect(0,0,W,H);x.fillStyle=col;x.fillRect(0,0,W,420);
  var lg=await cargarImg(c.logo);var ty=lg?300:250;
  if(lg){x.save();x.beginPath();x.arc(W/2,150,95,0,Math.PI*2);x.closePath();x.fillStyle="#fff";x.fill();x.clip();x.drawImage(lg,W/2-95,55,190,190);x.restore();}
  x.fillStyle="#fff";x.textAlign="center";textoAjustado(x,c.nombre,W-140,92);x.fillText(c.nombre,W/2,ty+(lg?40:0));
  x.font="500 46px system-ui,-apple-system,Segoe UI,sans-serif";x.fillText(lg?"":"Haz tu pedido online",W/2,ty+90);
  x.fillStyle="#222";x.font="700 60px system-ui,-apple-system,Segoe UI,sans-serif";x.fillText("Haz tu pedido online",W/2,540);
  await pintarQR(x.canvas,url,860,(W-860)/2,600,"#111");
  x.strokeStyle=col;x.lineWidth=10;x.strokeRect((W-860)/2,600,860,860);
  x.fillStyle="#333";x.font="500 44px system-ui,-apple-system,Segoe UI,sans-serif";x.fillText("Escanea con la cámara del móvil",W/2,1550);
  x.fillStyle=col;textoAjustado(x,url.replace(/^https?:\/\//,""),W-120,50,"700");x.fillText(url.replace(/^https?:\/\//,""),W/2,1630);
  descargarCanvas(cv,"cartel-qr-"+c.slug+".png");}catch(e){toast(e.message);}}
function pintarQRsPagina(){app.querySelectorAll("canvas[data-qr]").forEach(function(cv){pintarQR(cv,cv.getAttribute("data-qr"),cv.width).catch(function(){});});}

/* ============ SUPERADMINISTRADOR: todos los comercios ============ */
async function cargarComercios(){if(!S.esSuper)return;
  var r=await sb.from("comercios").select("id,slug,nombre,url,logo,color,activo,creado").order("creado");if(!r.error)S.comercios=r.data||[];
  var u=await sb.from("comercio_usuarios").select("comercio_id,email");S.cuUsers={};(u.data||[]).forEach(function(x){(S.cuUsers[x.comercio_id]=S.cuUsers[x.comercio_id]||[]).push(x.email);});
  try{await cargarResumenEco();}catch(e){console.error(e);}}
function superBar(){if(!S.esSuper||!(S.comercios||[]).length)return "";
  return '<div class="fi-view-inner fi-superbar">🛡️ Superadministrador · gestionando<select id="sw_com">'+S.comercios.map(function(c){return '<option value="'+esc(c.slug)+'"'+(c.slug===C.slug?' selected':'')+'>'+esc(c.nombre)+'</option>';}).join("")+'</select></div>';}
function ecoLinea(c){var l=S.ecoRes&&S.ecoRes[c.id];if(!l)return "";return '<div class="fi-ecoline">💶 Este mes: <b>'+money(l.fact)+'</b> facturados ('+l.n+' ped.) · para ti <b>'+money(l.total)+'</b>'+(l.cuota==null?' <small>(cuota fija pendiente)</small>':'')+'</div>';}
function inicial(n){return esc(String(n||"?").trim().charAt(0).toUpperCase());}
function comerciosHTML(){var l=(S.comercios||[]).map(function(c){var us=(S.cuUsers||{})[c.id]||[];
  return '<div class="fi-card2"><div class="fi-com"><div class="lg" style="background:'+esc(c.color||"#2f7d22")+'">'+(c.logo?'<img src="'+esc(c.logo)+'" alt="">':inicial(c.nombre))+'</div><div class="inf"><b>'+esc(c.nombre)+'</b><span class="fi-tag '+(c.activo?'on">Activa':'off">Desactivada')+'</span>'+
    '<small><a href="'+esc(urlComercio(c))+'" target="_blank" rel="noopener">'+esc(urlComercio(c))+'</a></small>'+
    '<div class="users">Accesos: '+(us.length?us.map(function(e){return '<span>'+esc(e)+'<button data-cupass="'+esc(c.id)+'|'+esc(e)+'" title="Cambiar contraseña">🔑</button><button data-cudel="'+esc(c.id)+'|'+esc(e)+'" title="Quitar acceso">✕</button></span>';}).join(""):'<i>ninguno</i>')+'</div>'+ecoLinea(c)+'</div></div>'+
    '<div class="fi-comacts"><button class="fi-newbtn" data-docs="'+esc(c.id)+'">📄 Documentos</button><button class="fi-newbtn" data-eco="'+esc(c.id)+'">💶 Economía</button><a class="fi-edit" href="?c='+encodeURIComponent(c.slug)+'#admin">⚙️ Gestionar</a><button class="fi-edit" data-cuadd="'+esc(c.id)+'">+ Acceso</button><button class="fi-edit" data-dlindex="'+esc(c.slug)+'">⬇ index.html</button><button class="fi-edit" data-dlqr="'+esc(c.slug)+'">⬇ QR</button><button class="fi-edit" data-dlcartel="'+esc(c.slug)+'">⬇ Cartel</button><button class="fi-edit" data-curl="'+esc(c.id)+'">🔗 Dirección</button><button class="'+(c.activo?'fi-del':'fi-edit')+'" data-cuact="'+esc(c.id)+'">'+(c.activo?'Desactivar':'Activar')+'</button></div></div>';}).join("");
  return '<div class="fi-tabbar"><span>'+(S.comercios||[]).length+' comercios en la plataforma</span><div class="fi-btnrow"><button class="fi-edit" data-prest="1">🧾 Mis datos de prestador</button><button class="fi-newbtn" data-newcom="1">+ Nuevo comercio</button></div></div>'+l;}
function indexHTML(c){return '<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">\n<title>'+esc(c.nombre)+' — Tienda online</title>\n<style>.fi-load{font-family:system-ui,sans-serif;text-align:center;color:#999;padding:40px}</style>\n</head>\n<body>\n<div id="app"><div class="fi-load">Cargando tienda…</div></div>\n<script>\nwindow.COMERCIO = "'+c.slug+'";\n(function () {\n  var B = "'+CORE_URL+'";\n  fetch(B + "version.json?t=" + Date.now(), { cache: "no-store" })\n    .then(function (r) { return r.json(); })\n    .catch(function () { return { v: Date.now() }; })\n    .then(function (j) {\n      var l = document.createElement("link"); l.rel = "stylesheet"; l.href = B + "app.css?v=" + j.v; document.head.appendChild(l);\n      var s = document.createElement("script"); s.type = "module"; s.src = B + "app.js?v=" + j.v; document.body.appendChild(s);\n    });\n})();\n<\/script>\n</body>\n</html>\n';}
function descargarTexto(txt,nombre,tipo){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:tipo||"text/html"}));a.download=nombre;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);}
async function llamarGestionUsuarios(body){var r=await sb.functions.invoke("gestion-usuarios",{body:body});
  if(r.error){var m=r.error.message;try{var j=await r.error.context.json();m=j.error||m;}catch(e){}return {error:m};}return r.data||{};}
function claveAleatoria(){var a="abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789",s="";var v=new Uint32Array(12);crypto.getRandomValues(v);for(var i=0;i<12;i++)s+=a[v[i]%a.length];return s;}
function slugGithub(n){return norm(n).replace(/[^a-z0-9]+/g,"").slice(0,39)||"tienda";}
function modal(html){var m=document.createElement("div");m.className="fi-modal";m.innerHTML='<div class="fi-modal-card fi-catmodal">'+html+'</div>';m.onclick=function(e){if(e.target===m)m.remove();};document.body.appendChild(m);return m;}
function showNuevoComercio(){var origen=(S.comercios||[]).map(function(c){return '<option value="'+esc(c.id)+'">'+esc(c.nombre)+'</option>';}).join("");
  var m=modal('<h2>Nuevo comercio</h2>'+
    '<label class="fi-l">Nombre de la tienda</label><input id="nc_nom" placeholder="Ej. Panadería Pepe">'+
    '<label class="fi-l">Nombre en GitHub (será su dirección web)</label><input id="nc_slug" placeholder="panaderiapepe"><p class="fi-hint" id="nc_url" style="margin:-6px 0 10px">https://….github.io</p>'+
    '<label class="fi-l">Email de acceso del comercio</label><input id="nc_mail" type="email" placeholder="tienda@ejemplo.com">'+
    '<label class="fi-l">Contraseña inicial</label><input id="nc_pass" value="'+claveAleatoria()+'">'+
    '<label class="fi-l">Color principal</label><div class="fi-colors" id="nc_cols">'+COLORES.map(function(c,i){return '<button type="button" data-c="'+c+'" class="'+(i===0?"on":"")+'" style="background:'+c+'"></button>';}).join("")+'</div>'+
    '<label class="fi-l">Empezar con el catálogo de</label><select id="nc_copy"><option value="">Ninguno (catálogo vacío)</option>'+origen+'</select>'+
    '<div class="acts" style="margin-top:12px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="nc_cancel">Cancelar</button><button class="fi-newbtn" id="nc_ok">Crear comercio</button></div></div>');
  var nom=m.querySelector("#nc_nom"),sl=m.querySelector("#nc_slug"),urlp=m.querySelector("#nc_url"),manual=false,color=COLORES[0];
  function pu(){urlp.textContent="https://"+(sl.value||"…")+".github.io";}
  nom.oninput=function(){if(!manual)sl.value=slugGithub(nom.value);pu();};
  sl.oninput=function(){manual=true;sl.value=sl.value.toLowerCase().replace(/[^a-z0-9-]/g,"");pu();};
  m.querySelector("#nc_cols").onclick=function(e){var b=e.target.closest("[data-c]");if(!b)return;color=b.getAttribute("data-c");m.querySelectorAll("#nc_cols button").forEach(function(x){x.classList.toggle("on",x===b);});};
  m.querySelector("#nc_cancel").onclick=function(){m.remove();};
  m.querySelector("#nc_ok").onclick=async function(){var b=this,n=nom.value.trim(),slug=sl.value.trim(),mail=m.querySelector("#nc_mail").value.trim().toLowerCase(),pass=m.querySelector("#nc_pass").value,copia=m.querySelector("#nc_copy").value;
    if(!n||!slug){toast("Pon nombre y dirección");return;}
    if(!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(slug)){toast("La dirección solo admite letras, números y guiones");return;}
    if(mail&&(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)||pass.length<8)){toast("Revisa el email y usa una contraseña de 8 caracteres o más");return;}
    if(mail===SUPERADMIN){toast("Usa un email distinto al del superadministrador");return;}
    b.disabled=true;b.textContent="Creando…";
    var r=await sb.from("comercios").insert({slug:slug,nombre:n,url:"https://"+slug+".github.io",color:color,localidad:"Madrid",portada_sub:"Pide online y recibe en casa.",envio:2.5,envio_gratis:25}).select().single();
    if(r.error){toast(/duplicate|unique/i.test(r.error.message)?"Ya existe un comercio con esa dirección":"Error: "+r.error.message);b.disabled=false;b.textContent="Crear comercio";return;}
    var nc=r.data,avisos=[];
    if(mail){var u=await llamarGestionUsuarios({accion:"crear",email:mail,password:pass});
      if(u.error)avisos.push("No se pudo crear el usuario: "+u.error);else{if(u.existia)avisos.push("El email ya tenía cuenta: conserva su contraseña anterior.");
        var cu=await sb.from("comercio_usuarios").insert({comercio_id:nc.id,email:mail});if(cu.error)avisos.push("No se pudo dar acceso: "+cu.error.message);}}
    if(copia){b.textContent="Copiando catálogo…";var e=await copiarCatalogo(copia,nc.id);if(e)avisos.push(e);}
    m.remove();await cargarComercios();render();mostrarAltaHecha(nc,mail,u&&!u.error&&!u.existia?pass:"",avisos);};
  setTimeout(function(){nom.focus();},50);}
async function copiarCatalogo(desde,hacia){
  var k=await sb.from("categorias").select("id,nombre,emoji,orden").eq("comercio_id",desde);
  if(k.error)return "No se pudieron copiar las categorías";
  if(k.data.length){var ins=await sb.from("categorias").insert(k.data.map(function(x){return Object.assign({},x,{comercio_id:hacia});}));if(ins.error)return "Error copiando categorías: "+ins.error.message;}
  var p=await sb.from("productos").select("nombre,cat,precio,unidad,img,descripcion,forma,color,orden,activo").eq("comercio_id",desde);
  if(p.error)return "No se pudieron copiar los productos";
  for(var i=0;i<p.data.length;i+=40){var lote=p.data.slice(i,i+40).map(function(x){return Object.assign({},x,{comercio_id:hacia});});var r=await sb.from("productos").insert(lote);if(r.error)return "Error copiando productos: "+r.error.message;}
  return "";}
function mostrarAltaHecha(c,mail,pass,avisos){var m=modal('<h2>✅ '+esc(c.nombre)+' creado</h2>'+
    (avisos.length?'<p class="fi-err" style="display:block">'+avisos.map(esc).join("<br>")+'</p>':'')+
    (mail?'<p><b>Acceso a «Mi tienda»:</b><br>'+esc(mail)+(pass?'<br>Contraseña: <code>'+esc(pass)+'</code> <small>(apúntala, no se vuelve a mostrar)</small>':'')+'</p>':'')+
    '<p>Ya puedes verla y prepararla aquí: <a href="?c='+encodeURIComponent(c.slug)+'#admin">'+esc(location.host)+'/?c='+esc(c.slug)+'</a></p>'+
    '<p><b>Para publicarla en '+esc(c.url)+':</b></p><ol class="fi-steps"><li>En GitHub, crea una organización gratuita llamada <code>'+esc(c.slug)+'</code>.</li><li>Dentro, crea un repositorio público llamado <code>'+esc(c.slug)+'.github.io</code>.</li><li>Sube el archivo <code>index.html</code> (botón de abajo).</li><li>En 1–2 minutos la tienda estará en su dirección.</li></ol>'+
    '<div class="fi-btnrow"><button class="fi-edit" data-x="index">⬇ index.html</button><button class="fi-edit" data-x="qr">⬇ QR</button><button class="fi-edit" data-x="cartel">⬇ Cartel</button><button class="fi-newbtn" data-x="cerrar">Hecho</button></div>');
  m.querySelector(".fi-catmodal").onclick=function(e){var b=e.target.closest("[data-x]");if(!b)return;var x=b.getAttribute("data-x");
    if(x==="index")descargarTexto(indexHTML(c),"index.html");else if(x==="qr")descargarQR(c.slug);else if(x==="cartel")descargarCartel(c.slug);else m.remove();};}
function showAccesoNuevo(cid){var c=(S.comercios||[]).filter(function(x){return x.id===cid;})[0];if(!c)return;
  var m=modal('<h2>Nuevo acceso · '+esc(c.nombre)+'</h2><label class="fi-l">Email</label><input id="na_mail" type="email"><label class="fi-l">Contraseña</label><input id="na_pass" value="'+claveAleatoria()+'"><div class="acts" style="margin-top:12px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="na_c">Cancelar</button><button class="fi-newbtn" id="na_ok">Dar acceso</button></div></div>');
  m.querySelector("#na_c").onclick=function(){m.remove();};
  m.querySelector("#na_ok").onclick=async function(){var b=this,mail=m.querySelector("#na_mail").value.trim().toLowerCase(),pass=m.querySelector("#na_pass").value;
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)||pass.length<8||mail===SUPERADMIN){toast("Revisa el email y usa 8 caracteres o más");return;}
    b.disabled=true;var u=await llamarGestionUsuarios({accion:"crear",email:mail,password:pass});
    if(u.error){toast(u.error);b.disabled=false;return;}
    var cu=await sb.from("comercio_usuarios").insert({comercio_id:cid,email:mail});if(cu.error&&!/duplicate/i.test(cu.error.message)){toast(cu.error.message);b.disabled=false;return;}
    m.remove();await cargarComercios();render();toast(u.existia?"Acceso dado (la cuenta ya existía y conserva su contraseña)":"Acceso creado. Contraseña: "+pass);};}
function showCambiarClave(email){var m=modal('<h2>Cambiar contraseña</h2><p>'+esc(email)+'</p><label class="fi-l">Nueva contraseña</label><input id="cp_pass" value="'+claveAleatoria()+'"><div class="acts" style="margin-top:12px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="cp_c">Cancelar</button><button class="fi-newbtn" id="cp_ok">Cambiar</button></div></div>');
  m.querySelector("#cp_c").onclick=function(){m.remove();};
  m.querySelector("#cp_ok").onclick=async function(){var b=this,pass=m.querySelector("#cp_pass").value;if(pass.length<8){toast("Usa 8 caracteres o más");return;}b.disabled=true;
    var u=await llamarGestionUsuarios({accion:"password",email:email,password:pass});if(u.error){toast(u.error);b.disabled=false;return;}m.remove();toast("Contraseña cambiada: "+pass);};}
function bindSuper(){
  var sw=document.getElementById("sw_com");if(sw)sw.onchange=function(){location.href="?c="+encodeURIComponent(sw.value)+"#admin";};
  var nc=app.querySelector("[data-newcom]");if(nc)nc.onclick=showNuevoComercio;
  app.querySelectorAll("[data-cuadd]").forEach(function(b){b.onclick=function(){showAccesoNuevo(b.getAttribute("data-cuadd"));};});
  app.querySelectorAll("[data-cupass]").forEach(function(b){b.onclick=function(){showCambiarClave(b.getAttribute("data-cupass").split("|")[1]);};});
  app.querySelectorAll("[data-cudel]").forEach(function(b){b.onclick=async function(){var p=b.getAttribute("data-cudel").split("|");
    var r=await sb.from("comercio_usuarios").delete().eq("comercio_id",p[0]).eq("email",p[1]).select();if(r.error||!r.data.length){toast("No se pudo quitar el acceso");return;}await cargarComercios();render();toast("Acceso retirado a "+p[1]);};});
  app.querySelectorAll("[data-cuact]").forEach(function(b){b.onclick=async function(){var id=b.getAttribute("data-cuact"),c=(S.comercios||[]).filter(function(x){return x.id===id;})[0];if(!c)return;
    var r=await sb.from("comercios").update({activo:!c.activo}).eq("id",id).select();if(r.error||!r.data.length){toast("No se pudo cambiar");return;}if(C.id===id)C.activo=!c.activo;await cargarComercios();render();toast(c.activo?"Tienda desactivada: ya no acepta pedidos":"Tienda activada");};});
  app.querySelectorAll("[data-curl]").forEach(function(b){b.onclick=function(){var id=b.getAttribute("data-curl"),c=(S.comercios||[]).filter(function(x){return x.id===id;})[0];if(!c)return;
    var m=modal('<h2>Dirección web</h2><p class="fi-hint">La que abre el QR. Por defecto https://'+esc(c.slug)+'.github.io; cámbiala si el comercio usa otro nombre en GitHub o un dominio propio.</p><input id="du_url" value="'+esc(c.url||"")+'"><div class="acts" style="margin-top:12px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="du_c">Cancelar</button><button class="fi-newbtn" id="du_ok">Guardar</button></div></div>');
    m.querySelector("#du_c").onclick=function(){m.remove();};
    m.querySelector("#du_ok").onclick=async function(){var u=m.querySelector("#du_url").value.trim().replace(/\/+$/,"");if(!/^https:\/\/[^\s]+$/.test(u)){toast("Debe empezar por https://");return;}
      var r=await sb.from("comercios").update({url:u}).eq("id",id).select();if(r.error||!r.data.length){toast("No se pudo guardar");return;}if(C.id===id)C.url=u;m.remove();await cargarComercios();render();toast("Dirección actualizada");};};});
  app.querySelectorAll("[data-dlindex]").forEach(function(b){b.onclick=function(){var c=comercioPorSlug(b.getAttribute("data-dlindex"));if(c)descargarTexto(indexHTML(c),"index.html");};});
}
function bindMiComercio(){
  app.querySelectorAll("[data-dlqr]").forEach(function(b){b.onclick=function(){descargarQR(b.getAttribute("data-dlqr"));};});
  app.querySelectorAll("[data-dlcartel]").forEach(function(b){b.onclick=function(){descargarCartel(b.getAttribute("data-dlcartel"));};});
  if(!S._mc)return;
  app.querySelectorAll("[data-mccol]").forEach(function(b){b.onclick=function(){leerMiComercio();S._mc.color=b.getAttribute("data-mccol");render();};});
  var mcol=document.getElementById("mc_color");if(mcol)mcol.onchange=function(){leerMiComercio();S._mc.color=mcol.value;render();};
  var lb=app.querySelector("[data-mclogo]");if(lb)lb.onclick=function(){document.getElementById("mc_logo_file").click();};
  var lf=document.getElementById("mc_logo_file");if(lf)lf.onchange=function(e){var fl=e.target.files[0];if(!fl)return;leerMiComercio();reducirLogo(fl).then(function(u){S._mc.logo=u;render();}).catch(function(){toast("No se pudo leer la imagen");});};
  var nl=app.querySelector("[data-mcnologo]");if(nl)nl.onclick=function(){leerMiComercio();S._mc.logo="";render();};
  var sv=app.querySelector("[data-mcsave]");if(sv)sv.onclick=async function(){sv.disabled=true;sv.textContent="Guardando…";if(await guardarMiComercio()){if(S.esSuper)await cargarComercios();render();toast("Datos de la tienda guardados");}else{sv.disabled=false;sv.textContent="Guardar cambios";}};
}


/* ============ DOCUMENTACIÓN LEGAL DE CADA COMERCIO (solo superadministrador) ============ */
var DOC_TIPOS=[
  {id:"servicio",t:"Contrato de prestación de servicios",d:"Relación comercial entre la plataforma y el comercio: servicio, precio, duración y responsabilidades.",firma:true},
  {id:"encargado",t:"Contrato de encargado del tratamiento",d:"Obligatorio por el art. 28 del RGPD: tú tratas los datos de los clientes del comercio por su cuenta.",firma:true},
  {id:"registro",t:"Registro de actividades de tratamiento",d:"Documento interno del comercio (art. 30 RGPD) que describe el tratamiento de los datos de los pedidos.",firma:false},
  {id:"legales",t:"Textos legales de la tienda online",d:"Aviso legal, condiciones de contratación, privacidad y cookies tal y como se publican en su web.",firma:false}
];
function hoyISO(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function fechaLarga(iso){if(!iso)return "";var d=new Date(iso+"T12:00:00");return d.toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"});}
function V(v,ph){return (v!=null&&String(v).trim()!=="")?esc(v):'<span class="pend">['+ph+']</span>';}
function numES(n){return String(Number(n)).replace(".",",");}

async function abrirDocs(cid){
  S.doc={cargando:true,cid:cid};render();
  var r=await Promise.all([
    sb.from("comercios").select("*").eq("id",cid).maybeSingle(),
    sb.from("acuerdos").select("*").eq("comercio_id",cid).maybeSingle(),
    sb.from("plataforma").select("*").eq("id",1).maybeSingle(),
    sb.from("documentos").select("*").eq("comercio_id",cid)
  ]);
  if(r[0].error||!r[0].data){toast("No se pudo cargar el comercio");S.doc=null;render();return;}
  var docs={};(r[3].data||[]).forEach(function(d){docs[d.tipo]=d;});
  S.doc={cid:cid,com:r[0].data,acuerdo:r[1].data||{comercio_id:cid},plat:r[2].data||{id:1},docs:docs};
  render();window.scrollTo(0,0);
}
function condicionesEconomicas(a,p){
  var tr=tramosDe(a,p),cuo=cuotaDe(a,p),partes=[];
  partes.push(cuo==null?'una cuota fija mensual de <span class="pend">[IMPORTE PENDIENTE DE DEFINIR]</span> €':(cuo>0?"una cuota fija de <b>"+fmtEur(cuo)+" al mes</b>":null));
  partes=partes.filter(Boolean);
  var tx="";
  if(tr.length===1&&tr[0].desde===0&&tr[0].hasta==null){if(tr[0].pct>0)partes.push("una comisión del <b>"+numES(tr[0].pct)+" %</b> sobre la facturación mensual");}
  else if(tr.length){partes.push("una comisión sobre la facturación mensual calculada por tramos según la tabla siguiente");
    tx='<table style="border-collapse:collapse;margin:6px 0 10px"><tr><th style="border:1px solid #999;padding:4px 8px;background:#f2f2f2">Facturación mensual</th><th style="border:1px solid #999;padding:4px 8px;background:#f2f2f2">Comisión</th></tr>'+tr.map(function(t){return '<tr><td style="border:1px solid #999;padding:4px 8px">'+txtTramo(t)+'</td><td style="border:1px solid #999;padding:4px 8px;text-align:right">'+numES(t.pct)+' %</td></tr>';}).join("")+'</table>'+
      '<p>'+(((a&&a.modo_tramos)||"marginal")==="global"?"El porcentaje del tramo alcanzado en el mes se aplica a la totalidad de la facturación de ese mes.":"Los tramos son escalonados: cada parte de la facturación mensual tributa al porcentaje de su tramo, de forma que el porcentaje de un tramo superior solo se aplica a la parte que lo excede.")+'</p>';}
  if(!partes.length)return "El servicio se presta <b>sin coste</b> para el CLIENTE mientras las partes no acuerden otra cosa por escrito.";
  var baseTxt=((a&&a.base)==="enviados")?"los pedidos recibidos a través de la tienda online, entregados al cliente y no anulados":"los pedidos recibidos a través de la tienda online y no anulados";
  return "Como contraprestación, el CLIENTE abonará al PRESTADOR "+partes.join(" más ")+". Se entiende por facturación mensual la suma de los importes totales (IVA incluido) de "+baseTxt+" en cada mes natural. Estos importes no incluyen el IVA ni otros impuestos aplicables a la factura del PRESTADOR, que se añadirán en ella."+(tx?"</p>"+tx+"<p>":"");
}
function firmasHTML(izq,der,nomIzq,nomDer){return '<p style="margin-top:28px">Y en prueba de conformidad, ambas partes firman el presente documento por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento.</p>'+
  '<table class="firmas" style="width:100%;margin-top:30px"><tr><td style="width:50%;vertical-align:bottom;padding-top:70px">______________________________<br><b>'+izq+'</b><br>'+nomIzq+'</td><td style="width:50%;vertical-align:bottom;padding-top:70px">______________________________<br><b>'+der+'</b><br>'+nomDer+'</td></tr></table>';}
function encabezado(titulo){return '<h1>'+titulo+'</h1><p style="text-align:center">En Madrid, a ____ de ______________ de ______</p>';}
function partesHTML(p,c,rolP,rolC){return '<h2>REUNIDOS</h2>'+
  '<p>De una parte, <b>'+V(p.titular,"NOMBRE DEL PRESTADOR")+'</b>, con NIF '+V(p.nif,"NIF DEL PRESTADOR")+' y domicilio en '+V(p.domicilio,"DOMICILIO DEL PRESTADOR")+', correo electrónico '+V(p.email,"EMAIL")+', en adelante, el <b>'+rolP+'</b>.</p>'+
  '<p>De otra parte, <b>'+V(c.titular,"TITULAR DEL COMERCIO")+'</b>, con NIF/CIF '+V(c.nif,"NIF/CIF DEL COMERCIO")+' y domicilio en '+V(c.domicilio,"DOMICILIO DEL COMERCIO")+', que actúa bajo el nombre comercial «'+V(c.nombre,"NOMBRE COMERCIAL")+'», correo electrónico '+V(c.email,"EMAIL")+' y teléfono '+V(c.telefono,"TELÉFONO")+(c.registro?', '+esc(c.registro):'')+', en adelante, el <b>'+rolC+'</b>.</p>'+
  '<p>Ambas partes se reconocen mutuamente la capacidad legal necesaria para obligarse en este acto y, a tal efecto,</p>';}

function docServicio(c,a,p){var url=esc(c.url||"");return encabezado("CONTRATO DE PRESTACIÓN DE SERVICIOS DE TIENDA ONLINE")+partesHTML(p,c,"PRESTADOR","CLIENTE")+
  '<h2>EXPONEN</h2><p>I. Que el PRESTADOR ha desarrollado y gestiona una plataforma de tiendas online para comercios de proximidad, que permite publicar un catálogo de productos y recibir pedidos de clientes a través de internet.</p><p>II. Que el CLIENTE está interesado en disponer de una tienda online en dicha plataforma para su establecimiento, por lo que ambas partes acuerdan celebrar el presente contrato con arreglo a las siguientes</p>'+
  '<h2>CLÁUSULAS</h2>'+
  '<h3>Primera. Objeto</h3><p>El PRESTADOR pone a disposición del CLIENTE, en régimen de servicio, una tienda online accesible en la dirección '+(url||'<span class="pend">[DIRECCIÓN WEB]</span>')+', que incluye: (a) la publicación del catálogo de productos con precios, categorías y fotografías; (b) la recepción de pedidos de sus clientes; (c) un panel de gestión («Mi tienda») para administrar productos, categorías, pedidos y datos del comercio; (d) un código QR y un cartel para dar a conocer la tienda; y (e) el alojamiento, mantenimiento y actualización técnica de la plataforma.</p>'+
  '<h3>Segunda. Obligaciones del PRESTADOR</h3><p>El PRESTADOR se compromete a: mantener la plataforma operativa con la diligencia de un profesional del sector; corregir en un plazo razonable los fallos técnicos que le sean comunicados; facilitar al CLIENTE las credenciales de acceso a su panel de gestión; aplicar las medidas de seguridad descritas en el contrato de encargado del tratamiento; y prestar soporte por correo electrónico en días laborables.</p>'+
  '<h3>Tercera. Obligaciones del CLIENTE</h3><p>El CLIENTE es el único vendedor de los productos ofrecidos en su tienda y responsable de la relación de compraventa con sus clientes. En particular, se obliga a: mantener actualizados y veraces el catálogo, los precios (con IVA incluido), la disponibilidad y los datos legales de su comercio; atender, preparar y entregar los pedidos recibidos; cumplir la normativa de consumo, comercio electrónico (LSSI-CE), higiene alimentaria y fiscal que le resulte aplicable; custodiar sus credenciales de acceso; y no utilizar la plataforma para fines ilícitos.</p>'+
  '<h3>Cuarta. Precio y forma de pago</h3><p>'+condicionesEconomicas(a,p)+'</p><p>El PRESTADOR emitirá una factura mensual dentro de los primeros cinco días de cada mes, referida al mes anterior, con el detalle de los pedidos computables. El CLIENTE la abonará en un plazo de quince días mediante transferencia bancaria a la cuenta que indique el PRESTADOR. El PRESTADOR podrá actualizar el precio comunicándolo con un mes de antelación; si el CLIENTE no estuviera de acuerdo, podrá resolver el contrato sin penalización.</p>'+(a&&a.observaciones?'<p>Condiciones particulares: '+esc(a.observaciones)+'</p>':'')+
  '<h3>Quinta. Duración</h3><p>El presente contrato entra en vigor el '+(a&&a.inicio?'<b>'+fechaLarga(a.inicio)+'</b>':'<span class="pend">[FECHA DE INICIO]</span>')+' y tiene una duración indefinida. Cualquiera de las partes podrá darlo por terminado en cualquier momento comunicándolo a la otra por escrito (incluido el correo electrónico) con al menos quince días de antelación.</p>'+
  '<h3>Sexta. Propiedad intelectual</h3><p>El software, el diseño y el código de la plataforma pertenecen al PRESTADOR, que concede al CLIENTE un derecho de uso no exclusivo e intransferible mientras dure el contrato. Los textos, fotografías propias, logotipos y marcas del CLIENTE siguen siendo de su titularidad, y este autoriza al PRESTADOR a utilizarlos solo para prestar el servicio.</p>'+
  '<h3>Séptima. Protección de datos</h3><p>Para prestar el servicio, el PRESTADOR trata datos personales de los clientes del CLIENTE en calidad de encargado del tratamiento. Dicho tratamiento se regula en el contrato de encargado del tratamiento firmado entre las partes conforme al artículo 28 del Reglamento (UE) 2016/679, que forma parte inseparable de este contrato.</p>'+
  '<h3>Octava. Disponibilidad y responsabilidad</h3><p>La plataforma se apoya en servicios de terceros (alojamiento web y base de datos en la nube), por lo que el PRESTADOR no garantiza una disponibilidad ininterrumpida, aunque hará lo razonable para restablecer el servicio cuanto antes. El PRESTADOR no responde de la relación de compraventa entre el CLIENTE y sus clientes, ni de los errores en precios o productos introducidos por el CLIENTE. Salvo dolo o culpa grave, la responsabilidad total del PRESTADOR frente al CLIENTE se limita al importe abonado por este en los doce meses anteriores al hecho que la origine.</p>'+
  '<h3>Novena. Confidencialidad</h3><p>Las partes guardarán confidencialidad sobre la información de la otra a la que tengan acceso con motivo del contrato, durante su vigencia y después de su terminación.</p>'+
  '<h3>Décima. Terminación</h3><p>Además del preaviso de la cláusula quinta, cualquiera de las partes podrá resolver el contrato de forma inmediata si la otra incumple gravemente sus obligaciones y no lo corrige en diez días desde que se le requiera por escrito. A la terminación, el PRESTADOR desactivará la tienda, entregará al CLIENTE, si lo solicita, una copia de su catálogo y pedidos, y procederá con los datos personales según lo previsto en el contrato de encargado del tratamiento.</p>'+
  '<h3>Undécima. Comunicaciones</h3><p>Las comunicaciones entre las partes se realizarán por escrito a los correos electrónicos indicados en el encabezamiento, que se consideran válidos a todos los efectos.</p>'+
  '<h3>Duodécima. Ley aplicable y jurisdicción</h3><p>Este contrato se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid capital.</p>'+
  firmasHTML("EL PRESTADOR","EL CLIENTE",V(p.titular,"NOMBRE"),V(c.titular,"NOMBRE O RAZÓN SOCIAL"));}

function docEncargado(c,a,p){return encabezado("CONTRATO DE ENCARGADO DEL TRATAMIENTO<br><small>(artículo 28 del Reglamento (UE) 2016/679)</small>")+partesHTML(p,c,"ENCARGADO","RESPONSABLE")+
  '<h2>EXPONEN</h2><p>Que las partes han suscrito un contrato de prestación de servicios de tienda online para el comercio «'+V(c.nombre,"NOMBRE COMERCIAL")+'», cuya ejecución exige que el ENCARGADO trate datos personales por cuenta del RESPONSABLE, por lo que acuerdan las siguientes</p>'+
  '<h2>CLÁUSULAS</h2>'+
  '<h3>1. Objeto, naturaleza y finalidad</h3><p>El ENCARGADO tratará por cuenta del RESPONSABLE los datos personales necesarios para prestar el servicio de tienda online ('+esc(c.url||"")+'): alojamiento, conservación y puesta a disposición del RESPONSABLE de los pedidos realizados por sus clientes, así como el soporte técnico y el mantenimiento de la plataforma. Las operaciones de tratamiento son: recogida, registro, conservación, consulta, modificación por instrucción del RESPONSABLE y supresión.</p>'+
  '<h3>2. Datos y personas afectadas</h3><p><b>Categorías de interesados:</b> clientes y potenciales clientes del RESPONSABLE que realizan pedidos en su tienda online; usuarios con acceso al panel de gestión del comercio.<br><b>Categorías de datos:</b> nombre y apellidos, teléfono, dirección de entrega, forma de pago elegida, productos pedidos e importes, notas del pedido, fecha y hora de aceptación de las condiciones y, para los usuarios del panel, su dirección de correo electrónico. No se tratan datos bancarios ni categorías especiales de datos.</p>'+
  '<h3>3. Duración</h3><p>Este contrato tiene la misma duración que el contrato de prestación de servicios del que trae causa.</p>'+
  '<h3>4. Obligaciones del ENCARGADO</h3><p>El ENCARGADO se obliga a: (a) tratar los datos únicamente siguiendo las instrucciones documentadas del RESPONSABLE y para la finalidad indicada, informándole si considera que alguna instrucción infringe la normativa; (b) garantizar que las personas autorizadas para tratar los datos se han comprometido a respetar su confidencialidad; (c) aplicar las medidas técnicas y organizativas del artículo 32 RGPD descritas en el Anexo; (d) no comunicar los datos a terceros salvo a los subencargados autorizados en la cláusula 5 o por obligación legal; (e) asistir al RESPONSABLE en la atención de los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, trasladándole en un plazo máximo de cinco días hábiles cualquier solicitud que reciba; (f) notificar al RESPONSABLE, sin dilación indebida y en un plazo máximo de 48 horas desde que tenga conocimiento, cualquier violación de la seguridad de los datos, con la información necesaria para que este pueda, en su caso, notificarla a la autoridad de control; (g) ayudar al RESPONSABLE en las evaluaciones de impacto y consultas previas cuando proceda; (h) poner a su disposición la información necesaria para demostrar el cumplimiento de estas obligaciones y permitir auditorías razonables, con preaviso; y (i) llevar, cuando sea obligatorio, un registro de las actividades de tratamiento efectuadas por cuenta del RESPONSABLE.</p>'+
  '<h3>5. Subencargados</h3><p>El RESPONSABLE autoriza al ENCARGADO a recurrir a los siguientes subencargados, que ofrecen garantías suficientes conforme al RGPD:</p><ul><li><b>Supabase, Inc.</b>: base de datos y autenticación, con los datos alojados en servidores de la Unión Europea (Irlanda). Sus condiciones de tratamiento incluyen las cláusulas contractuales tipo de la Comisión Europea para posibles accesos desde fuera del EEE.</li><li><b>GitHub, Inc.</b> (GitHub Pages): alojamiento de los archivos de la web. No almacena los datos de los pedidos, pero recibe la dirección IP de los visitantes al servir la página. Se acoge al Marco de Privacidad de Datos UE-EE. UU. y a cláusulas contractuales tipo.</li></ul><p>El ENCARGADO informará al RESPONSABLE de cualquier cambio de subencargado con al menos quince días de antelación, para que pueda oponerse. El ENCARGADO impondrá a los subencargados las mismas obligaciones de protección de datos que asume en este contrato.</p>'+
  '<h3>6. Obligaciones del RESPONSABLE</h3><p>Corresponde al RESPONSABLE: informar a sus clientes del tratamiento mediante la política de privacidad de su tienda; disponer de base legal para tratar los datos; facilitar al ENCARGADO las instrucciones necesarias; custodiar las credenciales de acceso de sus usuarios; y supervisar el tratamiento.</p>'+
  '<h3>7. Destino de los datos al terminar</h3><p>Al finalizar la prestación del servicio, el ENCARGADO, a elección del RESPONSABLE, le devolverá los datos personales en un formato estructurado y de uso común y/o los suprimirá en un plazo de treinta días, incluidas las copias existentes, salvo que deban conservarse bloqueados por obligación legal mientras puedan derivarse responsabilidades.</p>'+
  '<h3>8. Responsabilidad</h3><p>Si el ENCARGADO destina los datos a otra finalidad, los comunica o los utiliza incumpliendo este contrato, será considerado también responsable del tratamiento y responderá de las infracciones en que hubiera incurrido personalmente.</p>'+
  '<h3>9. Ley aplicable</h3><p>Este contrato se rige por el RGPD, la Ley Orgánica 3/2018 (LOPDGDD) y demás legislación española aplicable.</p>'+
  '<h2>ANEXO. MEDIDAS DE SEGURIDAD</h2><ul><li>Conexiones cifradas (HTTPS/TLS) entre la web, el panel y la base de datos.</li><li>Control de acceso a nivel de fila en la base de datos: cada comercio solo puede leer y modificar sus propios datos, y los visitantes anónimos no pueden leer pedidos.</li><li>Registro de nuevas cuentas desactivado: solo el ENCARGADO puede dar de alta usuarios, con contraseña de al menos 8 caracteres.</li><li>Verificación en dos pasos en las cuentas de administración de los proveedores (alojamiento y base de datos).</li><li>Mínimo acceso: solo el ENCARGADO, como administrador de la plataforma, y los usuarios autorizados del RESPONSABLE acceden a los pedidos.</li><li>Copias de seguridad automáticas del proveedor de base de datos.</li><li>No se almacenan datos de tarjetas bancarias: el pago se realiza en la entrega.</li></ul>'+
  firmasHTML("EL ENCARGADO","EL RESPONSABLE",V(p.titular,"NOMBRE"),V(c.titular,"NOMBRE O RAZÓN SOCIAL"));}

function docRegistro(c,a,p){var fila=function(k,v){return '<tr><th style="text-align:left;vertical-align:top;width:32%;padding:6px;border:1px solid #999;background:#f2f2f2">'+k+'</th><td style="padding:6px;border:1px solid #999">'+v+'</td></tr>';};
  return '<h1>REGISTRO DE ACTIVIDADES DE TRATAMIENTO</h1><p style="text-align:center">Artículo 30 del Reglamento (UE) 2016/679 · Actualizado a '+fechaLarga(hoyISO())+'</p>'+
  '<h2>Responsable del tratamiento</h2><table style="width:100%;border-collapse:collapse">'+fila("Titular",V(c.titular,"TITULAR"))+fila("NIF/CIF",V(c.nif,"NIF/CIF"))+fila("Nombre comercial",V(c.nombre,"NOMBRE COMERCIAL"))+fila("Domicilio",V(c.domicilio,"DOMICILIO"))+fila("Contacto",V(c.email,"EMAIL")+' · '+V(c.telefono,"TELÉFONO"))+fila("Delegado de protección de datos","No designado (no obligatorio por volumen y tipo de datos)")+'</table>'+
  '<h2>Actividad: gestión de pedidos de la tienda online</h2><table style="width:100%;border-collapse:collapse">'+
  fila("Finalidad","Gestionar, confirmar, preparar y entregar los pedidos realizados en la tienda online "+esc(c.url||"")+", contactar con el cliente sobre su pedido y atender incidencias y reclamaciones.")+
  fila("Base legal","Ejecución de un contrato (art. 6.1.b RGPD) y cumplimiento de obligaciones legales fiscales y mercantiles (art. 6.1.c RGPD).")+
  fila("Categorías de interesados","Clientes que realizan pedidos en la tienda online.")+
  fila("Categorías de datos","Identificativos (nombre y apellidos), de contacto (teléfono), dirección de entrega, detalle del pedido (productos, cantidades, importe, forma de pago, notas) y fecha de aceptación de las condiciones. No se tratan categorías especiales ni datos bancarios.")+
  fila("Destinatarios","No se ceden datos a terceros salvo obligación legal. Encargado del tratamiento: "+V(p.titular,"PRESTADOR DE LA PLATAFORMA")+" (plataforma de tienda online), con los subencargados Supabase, Inc. (base de datos, UE-Irlanda) y GitHub, Inc. (alojamiento web).")+
  fila("Transferencias internacionales","No previstas. Si algún proveedor accede desde fuera del EEE, se ampara en cláusulas contractuales tipo o en el Marco de Privacidad de Datos UE-EE. UU.")+
  fila("Plazo de conservación","Durante la relación comercial y, después, durante los plazos de prescripción legales: 6 años (art. 30 Código de Comercio) y 4 años (obligaciones tributarias). Después se suprimen.")+
  fila("Medidas de seguridad","Las descritas en el Anexo del contrato de encargado del tratamiento: cifrado HTTPS, control de acceso por comercio en la base de datos, cuentas creadas solo por el administrador, verificación en dos pasos y copias de seguridad.")+
  '</table>'+
  '<h2>Actividad: usuarios del panel de gestión</h2><table style="width:100%;border-collapse:collapse">'+
  fila("Finalidad","Permitir el acceso del personal del comercio al panel «Mi tienda».")+fila("Base legal","Interés legítimo en la gestión del negocio (art. 6.1.f RGPD).")+
  fila("Datos","Correo electrónico y contraseña (cifrada).")+fila("Conservación","Mientras el usuario tenga acceso; se suprime al retirarlo.")+'</table>';}

function docLegales(c){var Cprev=C,Pprev=S.products;C=c;S.products=[];var h='<h1>TEXTOS LEGALES DE LA TIENDA ONLINE</h1><p style="text-align:center">'+esc(c.nombre||"")+' · '+esc(c.url||"")+' · Versión publicada a '+fechaLarga(hoyISO())+'</p>';
  try{["aviso","condiciones","privacidad","cookies"].forEach(function(k){h+='<h2>'+LEGAL[k].t+'</h2>'+LEGAL[k].h().replace(/<h4>/g,"<h3>").replace(/<\/h4>/g,"</h3>").replace(/class="fi-pend"/g,'class="pend"');});}finally{C=Cprev;S.products=Pprev;}
  return h;}
function htmlDoc(tipo){var d=S.doc,c=d.com,a=d.acuerdo,p=d.plat;
  return tipo==="servicio"?docServicio(c,a,p):tipo==="encargado"?docEncargado(c,a,p):tipo==="registro"?docRegistro(c,a,p):docLegales(c);}
var DOC_CSS='body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.45;color:#111;max-width:760px;margin:0 auto;padding:24px}h1{font-size:15pt;text-align:center;margin:0 0 6px}h1 small{font-size:10pt;font-weight:normal}h2{font-size:12pt;margin:18px 0 6px;border-bottom:1px solid #ccc;padding-bottom:2px}h3{font-size:11pt;margin:12px 0 4px}p{text-align:justify;margin:0 0 8px}ul{margin:0 0 8px}.pend{background:#ffeb3b;font-weight:bold}@media print{body{padding:0}.pend{background:#ffeb3b !important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function nombreDoc(tipo){var t=DOC_TIPOS.filter(function(x){return x.id===tipo;})[0];return (t?t.t:tipo)+" - "+(S.doc.com.nombre||"");}
function descargarWord(tipo){var titulo=nombreDoc(tipo);
  var html='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>'+esc(titulo)+'</title><style>'+DOC_CSS+'</style></head><body>'+htmlDoc(tipo)+'</body></html>';
  descargarTexto("﻿"+html,titulo.replace(/[\\/:*?"<>|]/g,"")+".doc","application/msword");}
function imprimirDoc(tipo){var w=window.open("","_blank");if(!w){toast("Permite las ventanas emergentes para imprimir");return;}
  w.document.write('<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>'+esc(nombreDoc(tipo))+'</title><style>'+DOC_CSS+'</style></head><body>'+htmlDoc(tipo)+'<script>setTimeout(function(){window.print();},300);<\/script></body></html>');w.document.close();}
function verDoc(tipo){var m=document.createElement("div");m.className="fi-modal fi-docmodal";
  m.innerHTML='<div class="fi-docwrap"><div class="fi-docbar"><b>'+esc(nombreDoc(tipo))+'</b><div class="fi-btnrow"><button class="fi-edit" data-dw="1">⬇ Word</button><button class="fi-edit" data-dp="1">🖨 PDF / Imprimir</button><button class="fi-edit" data-dx="1">✕</button></div></div><div class="fi-docpaper">'+htmlDoc(tipo)+'</div></div>';
  m.onclick=function(e){if(e.target===m||e.target.closest("[data-dx]"))m.remove();else if(e.target.closest("[data-dw]"))descargarWord(tipo);else if(e.target.closest("[data-dp]"))imprimirDoc(tipo);};
  document.body.appendChild(m);}
async function verFirmado(tipo){var d=S.doc.docs[tipo];if(!d||!d.archivo)return;
  var w=window.open("","_blank");var r=await sb.storage.from("documentos").createSignedUrl(d.archivo,600);
  if(r.error){if(w)w.close();toast("No se pudo abrir el PDF: "+r.error.message);return;}
  if(w)w.location.href=r.data.signedUrl;else location.href=r.data.signedUrl;}
function subirFirmado(tipo){var t=DOC_TIPOS.filter(function(x){return x.id===tipo;})[0];var prev=S.doc.docs[tipo];
  var m=modal('<h2>Subir versión firmada</h2><p class="fi-hint" style="margin:0 0 10px">'+esc(t.t)+'<br>'+esc(S.doc.com.nombre)+'</p>'+
    (prev&&prev.archivo?'<p class="fi-err" style="display:block">Sustituirá al PDF firmado actual ('+esc(prev.nombre_archivo||"")+'). El anterior se conserva como copia interna.</p>':'')+
    '<label class="fi-l">Documento definitivo en PDF (máx. 10 MB)</label><input id="sf_file" type="file" accept="application/pdf">'+
    '<label class="fi-l">Fecha de firma</label><input id="sf_fecha" type="date" value="'+hoyISO()+'">'+
    '<div class="acts" style="margin-top:12px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="sf_c">Cancelar</button><button class="fi-newbtn" id="sf_ok">Subir PDF</button></div></div>');
  m.querySelector("#sf_c").onclick=function(){m.remove();};
  m.querySelector("#sf_ok").onclick=async function(){var b=this,f=m.querySelector("#sf_file").files[0],fecha=m.querySelector("#sf_fecha").value||null;
    if(!f){toast("Elige el PDF firmado");return;}if(f.type!=="application/pdf"&&!/\.pdf$/i.test(f.name)){toast("El archivo debe ser un PDF");return;}if(f.size>10485760){toast("El PDF supera los 10 MB");return;}
    b.disabled=true;b.textContent="Subiendo…";var ruta=S.doc.cid+"/"+tipo+"-"+Date.now()+".pdf";
    var up=await sb.storage.from("documentos").upload(ruta,f,{contentType:"application/pdf",upsert:false});
    if(up.error){toast("Error al subir: "+up.error.message);b.disabled=false;b.textContent="Subir PDF";return;}
    var row={comercio_id:S.doc.cid,tipo:tipo,archivo:ruta,nombre_archivo:f.name,firmado:fecha,subido:new Date().toISOString()};
    var r=await sb.from("documentos").upsert(row).select().single();
    if(r.error){toast("Error al registrar el documento: "+r.error.message);b.disabled=false;b.textContent="Subir PDF";return;}
    S.doc.docs[tipo]=r.data;m.remove();render();toast("Versión firmada guardada");};}
async function volverPlantilla(tipo){if(!confirmarSuave("¿Volver a mostrar este documento como plantilla? El PDF firmado se conserva guardado."))return;
  var r=await sb.from("documentos").delete().eq("comercio_id",S.doc.cid).eq("tipo",tipo).select();if(r.error){toast("No se pudo cambiar");return;}delete S.doc.docs[tipo];render();}
function confirmarSuave(t){return window.confirm(t);}
function pendientes(c,p){var f=[];if(!c.titular)f.push("titular");if(!c.nif)f.push("NIF/CIF");if(!c.domicilio)f.push("domicilio");if(!c.email)f.push("email");if(!c.telefono)f.push("teléfono");
  var g=[];if(!p.titular)g.push("tu nombre");if(!p.nif)g.push("tu NIF");if(!p.domicilio)g.push("tu domicilio");return {com:f,plat:g};}
function documentosHTML(){var d=S.doc;if(d.cargando)return '<p class="fi-empty">Cargando documentación…</p>';
  var c=d.com,a=d.acuerdo||{},p=d.plat||{},pd=pendientes(c,p);
  var aviso=(pd.com.length||pd.plat.length)?'<div class="fi-card2" style="background:#fff8e1"><b>⚠️ Faltan datos</b><p class="fi-sub" style="margin:4px 0 0">'+(pd.com.length?'Del comercio: '+pd.com.join(", ")+' (se rellenan en su «Mi comercio»). ':'')+(pd.plat.length?'Tuyos: '+pd.plat.join(", ")+' (botón «Mis datos de prestador»).':'')+' Mientras tanto aparecen resaltados en amarillo en los documentos.</p></div>':'';
  var econ='<div class="fi-card2"><h3>Condiciones económicas</h3><p class="fi-sub" style="margin-bottom:8px">'+(function(){var tr=tramosDe(a,p),cu=cuotaDe(a,p);return 'Cuota fija: '+(cu==null?'pendiente':money(cu)+'/mes')+' · Comisión: '+(tr.length?tr.map(function(t){return txtTramo(t)+' → '+numES(t.pct)+' %';}).join("; "):'sin definir')+(a.inicio?' · Inicio: '+fechaLarga(a.inicio):'');})()+'</p><button class="fi-edit" data-eco="'+esc(c.id)+'">💶 Editar en Economía</button></div>';
  var lista=DOC_TIPOS.map(function(t){var f=d.docs[t.id],firm=f&&f.archivo;
    return '<div class="fi-card2 fi-docitem"><div class="fi-docicon">'+(firm?'✅':'📄')+'</div><div class="inf"><b>'+esc(t.t)+'</b><span class="fi-tag '+(firm?'on">'+(t.firma?'Firmado':'Definitivo')+(f.firmado?' · '+fechaLarga(f.firmado):''):'off" style="background:#fff3e0;color:#c26a00">Plantilla')+'</span><small>'+esc(t.d)+'</small>'+(firm?'<small>PDF: '+esc(f.nombre_archivo||"")+'</small>':'')+'</div>'+
      '<div class="fi-comacts">'+(firm?'<button class="fi-newbtn" data-dvf="'+t.id+'">👁 Ver PDF firmado</button><button class="fi-edit" data-dup="'+t.id+'">⬆ Sustituir PDF</button><button class="fi-edit" data-dview="'+t.id+'">Plantilla</button><button class="fi-del" data-dback="'+t.id+'">Volver a plantilla</button>':
        '<button class="fi-edit" data-dview="'+t.id+'">👁 Ver</button><button class="fi-edit" data-dword="'+t.id+'">⬇ Word</button><button class="fi-edit" data-dprint="'+t.id+'">🖨 PDF</button><button class="fi-newbtn" data-dup="'+t.id+'">⬆ Subir '+(t.firma?'firmado':'definitivo')+' (PDF)</button>')+'</div></div>';}).join("");
  return '<button class="fi-back" data-docsback="1">← Volver a comercios</button><h2 class="fi-t">📄 Documentación · '+esc(c.nombre)+'</h2>'+aviso+lista+econ;}
function showPrestador(){var p=(S.doc&&S.doc.plat)||S._plat||{};
  var m=modal('<h2>Mis datos de prestador</h2><p class="fi-hint" style="margin:0 0 10px">Aparecen como PRESTADOR / ENCARGADO en los contratos de todos los comercios.</p>'+
    '<label class="fi-l">Nombre y apellidos o razón social</label><input id="pr_tit" value="'+esc(p.titular||"")+'"><label class="fi-l">NIF</label><input id="pr_nif" value="'+esc(p.nif||"")+'">'+
    '<label class="fi-l">Domicilio</label><input id="pr_dom" value="'+esc(p.domicilio||"")+'"><div class="fi-form-row2"><div><label class="fi-l">Email</label><input id="pr_mail" value="'+esc(p.email||"")+'"></div><div><label class="fi-l">Teléfono</label><input id="pr_tel" value="'+esc(p.telefono||"")+'"></div></div>'+
    '<div class="fi-form-row2"><div><label class="fi-l">Comisión por defecto (%)</label><input id="pr_com" type="number" step="0.1" min="0" value="'+(p.comision==null?"":p.comision)+'"></div><div><label class="fi-l">Cuota por defecto (€/mes)</label><input id="pr_cuo" type="number" step="0.01" min="0" value="'+(p.cuota==null?"":p.cuota)+'"></div></div>'+
    '<div class="acts" style="margin-top:12px"><span></span><div class="fi-btnrow"><button class="fi-edit" id="pr_c">Cancelar</button><button class="fi-newbtn" id="pr_ok">Guardar</button></div></div>');
  var g=function(id){return m.querySelector(id).value.trim();},n=function(id){var v=g(id);return v===""?null:Number(v.replace(",","."));};
  if(!S.doc&&!S._plat)sb.from("plataforma").select("*").eq("id",1).maybeSingle().then(function(r){if(r.data){S._plat=r.data;m.remove();showPrestador();}});
  m.querySelector("#pr_c").onclick=function(){m.remove();};
  m.querySelector("#pr_ok").onclick=async function(){var b=this;b.disabled=true;
    var row={id:1,titular:g("#pr_tit"),nif:g("#pr_nif"),domicilio:g("#pr_dom"),email:g("#pr_mail"),telefono:g("#pr_tel"),comision:n("#pr_com"),cuota:n("#pr_cuo"),actualizado:new Date().toISOString()};
    var r=await sb.from("plataforma").upsert(row).select().single();if(r.error){toast("No se pudo guardar: "+r.error.message);b.disabled=false;return;}
    S._plat=r.data;if(S.doc)S.doc.plat=r.data;m.remove();render();toast("Datos de prestador guardados");};}
function bindDocs(){
  app.querySelectorAll("[data-docs]").forEach(function(b){b.onclick=function(){abrirDocs(b.getAttribute("data-docs"));};});
  var pb=app.querySelector("[data-prest]");if(pb)pb.onclick=showPrestador;
  var bk=app.querySelector("[data-docsback]");if(bk)bk.onclick=function(){S.doc=null;render();};
  if(!S.doc||S.doc.cargando)return;
  var on=function(sel,fn){app.querySelectorAll("["+sel+"]").forEach(function(b){b.onclick=function(){fn(b.getAttribute(sel));};});};
  on("data-dview",verDoc);on("data-dword",descargarWord);on("data-dprint",imprimirDoc);on("data-dup",subirFirmado);on("data-dvf",verFirmado);on("data-dback",volverPlantilla);
  var as=app.querySelector("[data-acsave]");if(as)as.onclick=async function(){var v=function(id){var x=document.getElementById(id).value.trim();return x;},n=function(id){var x=v(id);return x===""?null:Number(x.replace(",","."));};
    as.disabled=true;var row={comercio_id:S.doc.cid,comision:n("ac_com"),cuota:n("ac_cuo"),inicio:v("ac_ini")||null,observaciones:v("ac_obs")||null,actualizado:new Date().toISOString()};
    var r=await sb.from("acuerdos").upsert(row).select().single();if(r.error){toast("No se pudo guardar: "+r.error.message);as.disabled=false;return;}S.doc.acuerdo=r.data;render();toast("Condiciones guardadas");};
}


/* ============ ECONOMÍA: facturación de cada comercio y comisión del prestador (solo superadministrador) ============ */
function tramosDe(a,p){var t=(a&&Array.isArray(a.tramos)&&a.tramos.length)?a.tramos:null;
  if(t)return t.map(function(x){return {desde:Number(x.desde||0),hasta:(x.hasta===null||x.hasta===""||x.hasta==null)?null:Number(x.hasta),pct:Number(x.pct||0)};}).sort(function(x,y){return x.desde-y.desde;});
  var com=(a&&a.comision!=null)?Number(a.comision):(p&&p.comision!=null?Number(p.comision):null);
  return com!=null?[{desde:0,hasta:null,pct:com}]:[];}
function cuotaDe(a,p){return (a&&a.cuota!=null)?Number(a.cuota):(p&&p.cuota!=null?Number(p.cuota):null);}
/* modo "marginal": cada euro paga el % de su tramo · modo "global": toda la facturación paga el % del tramo alcanzado */
function calcComision(base,tramos,modo){var det=[],total=0;base=Math.max(0,Number(base)||0);
  if(!tramos.length)return {total:0,det:det};
  if(modo==="global"){var t=tramos[0];tramos.forEach(function(x){if(base>=x.desde)t=x;});total=base*t.pct/100;det.push({t:t,parte:base,imp:total,activo:true});return {total:total,det:det};}
  tramos.forEach(function(x){var tope=x.hasta==null?Infinity:x.hasta,parte=Math.max(0,Math.min(base,tope)-x.desde),imp=parte*x.pct/100;total+=imp;det.push({t:x,parte:parte,imp:imp,activo:parte>0});});
  return {total:total,det:det};}
function txtTramo(t){return t.hasta==null?"Más de "+fmtEur(t.desde):(t.desde>0?"De "+fmtEur(t.desde)+" a "+fmtEur(t.hasta):"Hasta "+fmtEur(t.hasta));}
function huecosTramos(tr){var av=[];for(var i=1;i<tr.length;i++){var prev=tr[i-1];if(prev.hasta==null)av.push("hay un tramo sin límite antes de otro");else if(tr[i].desde>prev.hasta)av.push("hueco entre "+fmtEur(prev.hasta)+" y "+fmtEur(tr[i].desde)+" (al 0 %)");else if(tr[i].desde<prev.hasta)av.push("tramos solapados en "+fmtEur(tr[i].desde));}
  if(tr.length&&tr[0].desde>0)av.push("de 0 € a "+fmtEur(tr[0].desde)+" no hay comisión");if(tr.length&&tr[tr.length-1].hasta!=null)av.push("por encima de "+fmtEur(tr[tr.length-1].hasta)+" no hay comisión");return av;}
function mesDe(iso){var d=new Date(iso);return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2);}
function nombreMes(m){var p=m.split("-");var t=new Date(+p[0],+p[1]-1,15).toLocaleDateString("es-ES",{month:"long",year:"numeric"});return t.charAt(0).toUpperCase()+t.slice(1);}
function mesesAtras(n){var r=[],d=new Date();d.setDate(1);for(var i=0;i<n;i++){r.push(d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2));d.setMonth(d.getMonth()-1);}return r;}
function liquidacion(pedidos,a,p,mes){var base=(a&&a.base)||"todos";
  var ps=pedidos.filter(function(o){return mesDe(o.creado)===mes&&(base!=="enviados"||o.enviado_at);});
  var fact=ps.reduce(function(s,o){return s+Number(o.total||0);},0),tr=tramosDe(a,p),c=calcComision(fact,tr,(a&&a.modo_tramos)||"marginal"),cuo=cuotaDe(a,p);
  return {mes:mes,n:ps.length,fact:fact,com:c.total,det:c.det,cuota:cuo,total:c.total+(cuo||0)};}

async function abrirEco(cid){S.eco={cargando:true,cid:cid};S.doc=null;render();
  var desde=new Date();desde.setDate(1);desde.setMonth(desde.getMonth()-11);desde.setHours(0,0,0,0);
  var r=await Promise.all([sb.from("comercios").select("id,nombre,url").eq("id",cid).maybeSingle(),sb.from("acuerdos").select("*").eq("comercio_id",cid).maybeSingle(),sb.from("plataforma").select("*").eq("id",1).maybeSingle(),
    sb.from("pedidos").select("total,creado,enviado_at").eq("comercio_id",cid).gte("creado",desde.toISOString())]);
  if(r[0].error||!r[0].data){toast("No se pudo cargar el comercio");S.eco=null;render();return;}
  var a=r[1].data||{comercio_id:cid};S.eco={cid:cid,com:r[0].data,acuerdo:a,plat:r[2].data||{},pedidos:r[3].data||[],mes:mesesAtras(1)[0],
    form:{cuota:a.cuota==null?"":a.cuota,modo:a.modo_tramos||"marginal",base:a.base||"todos",inicio:a.inicio||"",obs:a.observaciones||"",tramos:(Array.isArray(a.tramos)?a.tramos:[]).map(function(t){return {desde:t.desde,hasta:t.hasta==null?"":t.hasta,pct:t.pct};})}};
  render();window.scrollTo(0,0);}
function ecoHTML(){var e=S.eco;if(e.cargando)return '<p class="fi-empty">Cargando datos económicos…</p>';
  var a=e.acuerdo,p=e.plat,f=e.form,meses=mesesAtras(12);
  var liqs=meses.map(function(m){return liquidacion(e.pedidos,a,p,m);}),sel=liquidacion(e.pedidos,a,p,e.mes);
  var tr=tramosDe(a,p),av=huecosTramos(tr),cuo=cuotaDe(a,p);
  var resumen='<div class="fi-ecokpis"><div><small>Facturación '+esc(nombreMes(e.mes).toLowerCase())+'</small><b>'+money(sel.fact)+'</b><span>'+sel.n+' pedido'+(sel.n===1?'':'s')+'</span></div><div><small>Comisión por ventas</small><b>'+money(sel.com)+'</b><span>'+(sel.fact>0?numES((sel.com/sel.fact*100).toFixed(2))+' % efectivo':'—')+'</span></div><div><small>Cuota fija</small><b>'+(cuo==null?'<span class="fi-pend">pendiente</span>':money(cuo))+'</b><span>al mes</span></div><div class="tot"><small>Total a facturar</small><b>'+money(sel.total)+'</b><span>+ IVA</span></div></div>';
  var det='<div class="fi-tablewrap"><table class="fi-ptable fi-vtable fi-destable"><thead><tr><th>Tramo</th><th class="fi-num">%</th><th class="fi-num">Base</th><th class="fi-num">Comisión</th></tr></thead><tbody>'+
    (sel.det.length?sel.det.map(function(d){return '<tr'+(d.activo?'':' class="fi-off"')+'><td>'+txtTramo(d.t)+'</td><td class="fi-num">'+numES(d.t.pct)+' %</td><td class="fi-num">'+money(d.parte)+'</td><td class="fi-num"><b>'+money(d.imp)+'</b></td></tr>';}).join(""):'<tr><td colspan="4" class="fi-empty">Sin tramos definidos: no se calcula comisión.</td></tr>')+
    '</tbody><tfoot><tr><td colspan="3">Comisión</td><td class="fi-num">'+money(sel.com)+'</td></tr><tr><td colspan="3">Cuota fija</td><td class="fi-num">'+(cuo==null?'pendiente':money(cuo))+'</td></tr><tr class="fi-totrow"><td colspan="3">Total (sin IVA)</td><td class="fi-num">'+money(sel.total)+'</td></tr></tfoot></table></div>';
  var hist='<div class="fi-tablewrap"><table class="fi-ptable fi-vtable fi-destable fi-histo"><thead><tr><th>Mes</th><th class="fi-num">Pedidos</th><th class="fi-num">Facturación</th><th class="fi-num">Tu comisión</th><th class="fi-num">Total</th></tr></thead><tbody>'+
    liqs.map(function(l){return '<tr data-emes="'+l.mes+'" class="'+(l.mes===e.mes?'sel':'')+'"><td>'+esc(nombreMes(l.mes))+'</td><td class="fi-num">'+l.n+'</td><td class="fi-num">'+money(l.fact)+'</td><td class="fi-num">'+money(l.com)+'</td><td class="fi-num"><b>'+money(l.total)+'</b></td></tr>';}).join("")+
    '</tbody><tfoot><tr class="fi-totrow"><td>Últimos 12 meses</td><td class="fi-num">'+liqs.reduce(function(s,l){return s+l.n;},0)+'</td><td class="fi-num">'+money(liqs.reduce(function(s,l){return s+l.fact;},0))+'</td><td class="fi-num">'+money(liqs.reduce(function(s,l){return s+l.com;},0))+'</td><td class="fi-num">'+money(liqs.reduce(function(s,l){return s+l.total;},0))+'</td></tr></tfoot></table></div>';
  var filas=f.tramos.map(function(t,i){return '<div class="fi-tramo"><span>De</span><input data-tr="'+i+'" data-k="desde" type="number" min="0" step="0.01" value="'+esc(t.desde)+'"><span>€ a</span><input data-tr="'+i+'" data-k="hasta" type="number" min="0" step="0.01" placeholder="sin límite" value="'+esc(t.hasta)+'"><span>€ →</span><input data-tr="'+i+'" data-k="pct" type="number" min="0" step="0.01" value="'+esc(t.pct)+'"><span>%</span><button class="fi-rowdel" data-trdel="'+i+'" title="Quitar tramo">✕</button></div>';}).join("");
  var cond='<div class="fi-card2"><h3>Condiciones pactadas</h3><p class="fi-sub">Se aplican al cálculo y al contrato de prestación de servicios.</p>'+
    '<div class="fi-form-row2"><div><label class="fi-l">Cuota fija mensual (€)</label><input id="ec_cuota" type="number" min="0" step="0.01" placeholder="Pendiente de definir" value="'+esc(f.cuota)+'"></div><div><label class="fi-l">Inicio del servicio</label><input id="ec_ini" type="date" value="'+esc(f.inicio)+'"></div></div>'+
    '<label class="fi-l">Comisión por tramos de facturación mensual</label>'+(filas||'<p class="fi-hint" style="margin:0 0 6px">Sin tramos. Ejemplo: de 0 a 1.000 € → 1 %; de 1.000 a 3.000 € → 2 %; más de 3.000 € (sin límite) → 3 %.</p>')+
    '<button class="fi-edit" data-tradd="1">+ Añadir tramo</button>'+
    '<label class="fi-l" style="margin-top:12px">Cómo se aplican los tramos</label><select id="ec_modo">'+opt("marginal","Escalonado: cada parte de la facturación paga el % de su tramo",f.modo)+opt("global","Global: toda la facturación paga el % del tramo alcanzado",f.modo)+'</select>'+
    '<label class="fi-l">Pedidos que cuentan</label><select id="ec_base">'+opt("todos","Todos los pedidos recibidos",f.base)+opt("enviados","Solo los pedidos marcados como enviados",f.base)+'</select>'+
    '<label class="fi-l">Condiciones particulares (opcional)</label><input id="ec_obs" value="'+esc(f.obs)+'" placeholder="Ej. Primer mes sin cuota">'+
    (av.length?'<p class="fi-err" style="display:block">Revisa los tramos guardados: '+av.join("; ")+'.</p>':'')+
    '<button class="fi-newbtn" data-ecsave="1">Guardar condiciones</button></div>';
  return '<button class="fi-back" data-ecoback="1">← Volver a comercios</button><h2 class="fi-t">💶 Economía · '+esc(e.com.nombre)+'</h2>'+
    '<div class="fi-tabbar"><span>Mes</span><select id="ec_mes" class="fi-sortsel">'+meses.map(function(m){return opt(m,nombreMes(m),e.mes);}).join("")+'</select></div>'+
    resumen+'<h3 class="fi-h3">Cálculo de '+esc(nombreMes(e.mes).toLowerCase())+'</h3>'+det+'<h3 class="fi-h3">Últimos 12 meses</h3>'+hist+cond;}
function leerEco(){var f=S.eco&&S.eco.form;if(!f)return;var g=function(id){var x=document.getElementById(id);return x?x.value:null;};
  if(g("ec_cuota")!=null)f.cuota=g("ec_cuota");if(g("ec_ini")!=null)f.inicio=g("ec_ini");if(g("ec_modo")!=null)f.modo=g("ec_modo");if(g("ec_base")!=null)f.base=g("ec_base");if(g("ec_obs")!=null)f.obs=g("ec_obs");
  app.querySelectorAll("[data-tr]").forEach(function(inp){var i=+inp.getAttribute("data-tr");if(f.tramos[i])f.tramos[i][inp.getAttribute("data-k")]=inp.value;});}
async function guardarEco(){leerEco();var f=S.eco.form,n=function(v){v=String(v==null?"":v).replace(",",".").trim();return v===""?null:Number(v);};
  var tr=f.tramos.map(function(t){return {desde:n(t.desde)||0,hasta:n(t.hasta),pct:n(t.pct)||0};}).filter(function(t){return t.pct>0||t.desde>0||t.hasta!=null;}).sort(function(a,b){return a.desde-b.desde;});
  for(var i=0;i<tr.length;i++){if(tr[i].hasta!=null&&tr[i].hasta<=tr[i].desde){toast("En cada tramo, el «hasta» debe ser mayor que el «desde»");return false;}}
  var row={comercio_id:S.eco.cid,cuota:n(f.cuota),tramos:tr,modo_tramos:f.modo,base:f.base,inicio:f.inicio||null,observaciones:f.obs.trim()||null,comision:tr.length===1&&tr[0].desde===0&&tr[0].hasta==null?tr[0].pct:null,actualizado:new Date().toISOString()};
  var r=await sb.from("acuerdos").upsert(row).select().single();if(r.error){toast("No se pudo guardar: "+r.error.message);return false;}
  S.eco.acuerdo=r.data;f.tramos=tr.map(function(t){return {desde:t.desde,hasta:t.hasta==null?"":t.hasta,pct:t.pct};});return true;}
function bindEco(){
  app.querySelectorAll("[data-eco]").forEach(function(b){b.onclick=function(){abrirEco(b.getAttribute("data-eco"));};});
  var bk=app.querySelector("[data-ecoback]");if(bk)bk.onclick=function(){S.eco=null;render();};
  if(!S.eco||S.eco.cargando)return;
  var ms=document.getElementById("ec_mes");if(ms)ms.onchange=function(){leerEco();S.eco.mes=ms.value;render();};
  app.querySelectorAll("[data-emes]").forEach(function(r){r.onclick=function(){leerEco();S.eco.mes=r.getAttribute("data-emes");render();window.scrollTo(0,0);};});
  var ad=app.querySelector("[data-tradd]");if(ad)ad.onclick=function(){leerEco();var t=S.eco.form.tramos,last=t[t.length-1];t.push({desde:last&&last.hasta!==""?last.hasta:(t.length?"":0),hasta:"",pct:""});render();};
  app.querySelectorAll("[data-trdel]").forEach(function(b){b.onclick=function(){leerEco();S.eco.form.tramos.splice(+b.getAttribute("data-trdel"),1);render();};});
  var sv=app.querySelector("[data-ecsave]");if(sv)sv.onclick=async function(){sv.disabled=true;sv.textContent="Guardando…";if(await guardarEco()){render();toast("Condiciones guardadas");if(S.esSuper)cargarComercios().then(render);}else{sv.disabled=false;sv.textContent="Guardar condiciones";}};
}
async function cargarResumenEco(){var mes=mesesAtras(1)[0],ini=new Date();ini.setDate(1);ini.setHours(0,0,0,0);
  var r=await Promise.all([sb.from("pedidos").select("comercio_id,total,creado,enviado_at").gte("creado",ini.toISOString()),sb.from("acuerdos").select("*"),sb.from("plataforma").select("*").eq("id",1).maybeSingle()]);
  var ac={};(r[1].data||[]).forEach(function(a){ac[a.comercio_id]=a;});var plat=r[2].data||{};S.ecoRes={};
  (S.comercios||[]).forEach(function(c){var ps=(r[0].data||[]).filter(function(o){return o.comercio_id===c.id;});S.ecoRes[c.id]=liquidacion(ps,ac[c.id],plat,mes);});}


/* ============ PROSPECCIÓN: plano privado de comercios candidatos (solo superadministrador) ============ */
var PROSP_METRO=[40.43945,-3.66297];
var PROSP_HEX={sin:"#2f7d22",no:"#d98a00",pend:"#8a94a0"};
var PROSP_TXT={sin:"Sin web",no:"Web o redes, sin pedidos online",pend:"Web sin comprobar"};
var PROSP_ESTADOS=["Pendiente","Visitada","Interesada","No interesada","Cliente"];
var PROSP_EST_CLASE={"Pendiente":"pe","Visitada":"vi","Interesada":"in","No interesada":"ni","Cliente":"cl"};
var _leaflet=null;
function cargarLeaflet(){if(window.L&&window.L.map)return Promise.resolve(window.L);if(_leaflet)return _leaflet;
  _leaflet=new Promise(function(ok,ko){var css=document.createElement("link");css.rel="stylesheet";css.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(css);
    var sc=document.createElement("script");sc.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";sc.onload=function(){ok(window.L);};sc.onerror=function(){_leaflet=null;ko(new Error("No se pudo cargar el plano"));};document.head.appendChild(sc);});
  return _leaflet;}
async function cargarProspectos(){S.prosp=S.prosp||{filtro:{sin:true,no:true,pend:true},est:"todos"};S.prosp.cargando=true;
  var r=await sb.from("prospectos").select("*").order("km",{ascending:true});
  S.prosp.cargando=false;if(r.error){toast("No se pudieron cargar los prospectos: "+r.error.message);S.prosp.items=[];return;}S.prosp.items=r.data||[];}
function urlMaps(p){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.nombre+", "+(p.direccion||""))+(p.place_id?"&query_place_id="+encodeURIComponent(p.place_id):"");}
function prospVisibles(){var P=S.prosp;return (P.items||[]).filter(function(p){return P.filtro[p.tipo_web||"sin"]&&(P.est==="todos"||p.estado===P.est);});}
function prospeccionHTML(){var P=S.prosp;if(!P||P.cargando||!P.items)return '<p class="fi-empty">Cargando prospección…</p>';
  var it=P.items,vis=prospVisibles();
  var cuenta=function(f){return it.filter(f).length;};
  var chips=["sin","no","pend"].map(function(k){return '<button class="fi-pchip'+(P.filtro[k]?' on':'')+'" data-pf2="'+k+'"><span class="dot" style="background:'+PROSP_HEX[k]+'"></span>'+PROSP_TXT[k]+' ('+cuenta(function(p){return p.tipo_web===k;})+')</button>';}).join("");
  var est='<select id="pr_est" class="fi-sortsel">'+opt("todos","Todos los estados ("+it.length+")",P.est)+PROSP_ESTADOS.map(function(e){return opt(e,e+" ("+cuenta(function(p){return p.estado===e;})+")",P.est);}).join("")+'</select>';
  var lista=vis.map(function(p){var sel=P.sel===p.id;
    return '<div class="fi-pitem'+(sel?' sel':'')+'" data-pid2="'+p.id+'"><span class="fi-pnum" style="background:'+PROSP_HEX[p.tipo_web||"sin"]+'">'+(p.num||"")+'</span><div class="inf"><b>'+esc(p.nombre)+'</b><small>'+esc(p.direccion||"")+' · '+String(Number(p.km).toFixed(2)).replace(".",",")+' km</small><small>'+esc(p.pedidos||"")+(p.telefono?' · '+esc(p.telefono):'')+'</small>'+
      (sel?'<div class="fi-pdet">'+(p.observaciones?'<p>'+esc(p.observaciones)+'</p>':'')+(p.web?'<p>Web: '+esc(p.web)+'</p>':'')+(p.valoracion?'<p>Google: '+String(p.valoracion).replace(".",",")+' ★</p>':'')+
        '<label class="fi-l">Estado</label><select id="pr_estado_'+p.id+'" data-pest="'+p.id+'">'+PROSP_ESTADOS.map(function(e){return opt(e,e,p.estado);}).join("")+'</select>'+
        '<label class="fi-l">Notas</label><textarea id="pr_nota_'+p.id+'" rows="3" placeholder="Con quién hablaste, qué respondió, cuándo volver…">'+esc(p.notas||"")+'</textarea>'+
        '<div class="fi-btnrow"><button class="fi-newbtn" data-psave="'+p.id+'">Guardar</button><a class="fi-edit" href="'+urlMaps(p)+'" target="_blank" rel="noopener">Abrir en Google Maps ↗</a></div></div>':'')+
      '</div><span class="fi-pest '+PROSP_EST_CLASE[p.estado]+'">'+esc(p.estado)+'</span></div>';}).join("");
  return '<div class="fi-tabbar"><span>Fruterías a menos de 3 km del metro Parque de las Avenidas</span>'+est+'</div>'+
    '<div class="fi-pchips">'+chips+'</div>'+
    '<div id="pmap" class="fi-pmap"></div>'+
    '<div class="fi-plist">'+(lista||'<p class="fi-empty">Ningún comercio con estos filtros.</p>')+'</div>';}
function pintarPlanoProsp(){var el=document.getElementById("pmap");if(!el||!S.prosp||!S.prosp.items)return;
  cargarLeaflet().then(function(L){if(!document.body.contains(el))return;var P=S.prosp;
    var map=L.map(el,{scrollWheelZoom:false}).setView(P.vista?P.vista.c:PROSP_METRO,P.vista?P.vista.z:14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(map);
    [1,2,3].forEach(function(k){L.circle(PROSP_METRO,{radius:k*1000,color:"#1f5fbf",weight:1,opacity:.5,fill:false,dashArray:"4 6",interactive:false}).addTo(map);});
    L.marker(PROSP_METRO,{icon:L.divIcon({className:"",html:'<div class="fi-ppin" style="width:28px;height:28px;background:#1f5fbf">M</div>',iconSize:[28,28],iconAnchor:[14,14]})}).addTo(map).bindTooltip("Metro Parque de las Avenidas");
    prospVisibles().forEach(function(p){var dup=prospVisibles().filter(function(q){return q.lat===p.lat&&q.lng===p.lng&&(q.num||0)<(p.num||0);}).length;
      var m=L.marker([p.lat+dup*0.00012,p.lng+dup*0.00018],{icon:L.divIcon({className:"",html:'<div class="fi-ppin" style="width:24px;height:24px;background:'+PROSP_HEX[p.tipo_web||"sin"]+(P.sel===p.id?';outline:3px solid #1f5fbf':'')+'">'+(p.num||"")+'</div>',iconSize:[24,24],iconAnchor:[12,12]})}).addTo(map);
      m.bindTooltip(esc(p.nombre)+" · "+esc(p.estado));
      m.on("click",function(){P.vista={c:[map.getCenter().lat,map.getCenter().lng],z:map.getZoom()};P.sel=p.id;render();var li=app.querySelector('[data-pid2="'+p.id+'"]');if(li)li.scrollIntoView({block:"nearest",behavior:"smooth"});});});
    map.on("moveend",function(){P.vista={c:[map.getCenter().lat,map.getCenter().lng],z:map.getZoom()};});
  }).catch(function(e){el.innerHTML='<p class="fi-empty">'+esc(e.message)+'</p>';});}
function bindProsp(){if(!S.prosp)return;var P=S.prosp;
  app.querySelectorAll("[data-pf2]").forEach(function(b){b.onclick=function(){var k=b.getAttribute("data-pf2");P.filtro[k]=!P.filtro[k];render();};});
  var es=document.getElementById("pr_est");if(es)es.onchange=function(){P.est=es.value;render();};
  app.querySelectorAll("[data-pid2]").forEach(function(d){d.onclick=function(e){if(e.target.closest("select,textarea,button,a,label"))return;var id=d.getAttribute("data-pid2");P.sel=P.sel===id?null:id;
    var p=(P.items||[]).filter(function(x){return x.id===id;})[0];if(p&&P.sel)P.vista={c:[p.lat,p.lng],z:16};render();};});
  app.querySelectorAll("[data-psave]").forEach(function(b){b.onclick=async function(){var id=b.getAttribute("data-psave");
    var row={estado:document.getElementById("pr_estado_"+id).value,notas:document.getElementById("pr_nota_"+id).value.trim()||null,actualizado:new Date().toISOString()};
    b.disabled=true;b.textContent="Guardando…";var r=await sb.from("prospectos").update(row).eq("id",id).select().single();
    if(r.error){toast("No se pudo guardar: "+r.error.message);b.disabled=false;b.textContent="Guardar";return;}
    P.items=P.items.map(function(x){return x.id===id?r.data:x;});render();toast("Guardado");};});
  pintarPlanoProsp();}

/* ============ EVENTOS ============ */
function syncForm(){var f=S._f;if(!f)return;var g=function(id){return document.getElementById(id);};if(g("f_nombre"))f.nombre=g("f_nombre").value;if(g("f_desc"))f.desc=g("f_desc").value;if(g("f_precio"))f.precio=g("f_precio").value;if(g("f_unidad"))f.unidad=g("f_unidad").value;if(g("f_cat"))f.cat=g("f_cat").value;if(g("f_forma"))f.forma=g("f_forma").value;if(g("f_color"))f.color=g("f_color").value;}
function updatePreview(){var f=S._f;if(!f)return;var prev=document.getElementById("f_prev");if(!prev)return;prev.src=f.img||artFor(f.nombre,f.cat,f.desc,{shape:f.forma,color:f.color});}
function bind(){
  bindSuper();bindMiComercio();bindDocs();bindEco();bindEdicion();bindProsp();pintarQRsPagina();
  app.querySelectorAll("[data-view]").forEach(function(b){b.onclick=function(){S.view=b.getAttribute("data-view");S.screen="shop";S.editId=null;S.adding=false;S._f=null;if(S.view==="admin"&&S.user){cargarPedidos().then(render);return;}render();};});
  var home=app.querySelector('[data-act="home"]');if(home)home.onclick=function(){S.view="tienda";S.screen="shop";render();};
  app.querySelectorAll("[data-cat]").forEach(function(b){b.onclick=function(){S.cat=b.getAttribute("data-cat");render();};});
  app.querySelectorAll("[data-open]").forEach(function(c){c.onclick=function(e){if(e.target.closest&&e.target.closest("[data-sw]"))return;var id=c.getAttribute("data-open");changeQty(id,1);var p=find(id);if(p)toast("Añadido: "+p.nombre+" ("+fmtQty(p,S.cart[id])+")");};});
  app.querySelectorAll("[data-add]").forEach(function(b){b.onclick=function(e){e.stopPropagation();var id=b.getAttribute("data-add");S.cart[id]=(S.cart[id]||0)+1;toast("Añadido al carrito");render();};});
  app.querySelectorAll("[data-back]").forEach(function(b){b.onclick=function(){var to=b.getAttribute("data-back");if(to==="admin"){S.editId=null;S.adding=false;S._f=null;S.view="admin";S.screen="shop";render();}else{S.screen=to;render();}};});
  var q=document.getElementById("q");if(q)q.oninput=function(){S.search=q.value;var pos=q.selectionStart;render();var nq=document.getElementById("q");if(nq){nq.focus();try{nq.setSelectionRange(pos,pos);}catch(e){}}};
  var p=find(S.detailId);
  app.querySelectorAll("[data-q]").forEach(function(b){b.onclick=function(){var step=p?pasoQty(p):1;if(b.getAttribute("data-q")==="+")S._qty=+(S._qty+step).toFixed(2);else S._qty=Math.max(step,+(S._qty-step).toFixed(2));document.getElementById("qv").textContent=S._qty+" "+p.unidad;document.getElementById("sub").textContent=money(p.precio*S._qty);};});
  var aq=app.querySelector("[data-addq]");if(aq)aq.onclick=function(){var id=aq.getAttribute("data-addq");S.cart[id]=(S.cart[id]||0)+S._qty;toast("Añadido al carrito");S.screen="shop";render();};
  var cb=app.querySelector("[data-checkout]");if(cb)cb.onclick=function(){S.screen="checkout";render();};
  var cf=app.querySelector("[data-confirm]");
  if(cf){var telEl=document.getElementById("c_tel"),telErr=document.getElementById("c_tel_err");
    telEl.addEventListener("input",function(){var p=telEl.selectionStart,a=telEl.value,b=a.replace(/[^\d+\s()\-]/g,"");if(a!==b){telEl.value=b;try{telEl.setSelectionRange(p-1,p-1);}catch(e){}}telEl.classList.remove("fi-bad");telErr.textContent="";});
    telEl.addEventListener("blur",function(){var v=telEl.value.trim();if(!v)return;var r=normTel(v);if(r.ok){telEl.value=r.pretty;telEl.classList.remove("fi-bad");telErr.textContent="";}else{telEl.classList.add("fi-bad");telErr.textContent="Teléfono no válido. Usa 9 cifras (600 123 456) o formato internacional (+34 600 123 456).";}});
    var chk=function(){var ok=["c_nombre","c_dir"].every(function(id){return document.getElementById(id).value.trim();})&&normTel(telEl.value).ok&&document.getElementById("c_ok").checked&&cf.getAttribute("data-min")!=="1";
      cf.disabled=!ok;var h=document.getElementById("c_hint");if(h)h.style.visibility=ok?"hidden":"visible";};
    ["c_nombre","c_tel","c_dir"].forEach(function(id){document.getElementById(id).addEventListener("input",chk);});
    document.getElementById("c_ok").addEventListener("change",chk);chk();}
  if(cf)cf.onclick=async function(){var n=document.getElementById("c_nombre").value.trim(),tel=(normTel(document.getElementById("c_tel").value).pretty||""),dir=document.getElementById("c_dir").value.trim(),pago=document.getElementById("c_pago").value,notas=(document.getElementById("c_notas")||{value:""}).value.trim();if(!n||!tel||!dir){toast("Completa nombre, dirección y un teléfono válido");return;}if(!document.getElementById("c_ok").checked){toast("Debes aceptar las condiciones para hacer el pedido");return;}var txt0=cf.textContent;cf.disabled=true;cf.textContent="Enviando…";var items=cartItems();var total=cartTotal();var envio=envioDe(total);var ok=await enviarPedido({nombre:n,tel:tel,dir:dir,pago:pago,notas:notas},items,total,envio);if(ok){S.cart={};S.screen="shop";render();showConfirm(n,dir,tel,ok);}else{cf.disabled=false;cf.textContent=txt0;}};
  app.querySelectorAll("[data-rmcart]").forEach(function(b){b.onclick=function(){var id=b.getAttribute("data-rmcart"),p=find(id);
    var ids=["c_nombre","c_tel","c_dir","c_pago","c_notas"],v={};ids.forEach(function(k){var el=document.getElementById(k);if(el)v[k]=el.value;});var okc=document.getElementById("c_ok");var okv=okc&&okc.checked;
    delete S.cart[id];toast("Eliminado: "+(p?p.nombre:"producto"));
    if(!cartItems().length){S.screen="shop";render();return;}
    render();ids.forEach(function(k){var el=document.getElementById(k);if(el&&v[k]!=null){el.value=v[k];el.dispatchEvent(new Event("input"));}});var oc=document.getElementById("c_ok");if(oc){oc.checked=okv;oc.dispatchEvent(new Event("change"));}};});
  // login
  var lg=app.querySelector("[data-login]");if(lg)lg.onclick=async function(){var em=document.getElementById("l_email").value.trim();var pw=document.getElementById("l_pass").value;var msg=document.getElementById("l_msg");if(!configurado){msg.textContent="Configura Supabase primero.";return;}lg.disabled=true;lg.textContent="Entrando…";var r=await sb.auth.signInWithPassword({email:em,password:pw});if(r.error){msg.textContent="No se pudo entrar: "+r.error.message;lg.disabled=false;lg.textContent="Entrar";return;}S.user=r.data.user;await cargarPermisos();if(S.esMiembro){await Promise.all([cargarPedidos(),cargarProductos(),S.esSuper?cargarComercios():null]);}render();};
  app.querySelectorAll("[data-atab]").forEach(function(b){b.onclick=function(){if(S.adminTab==="comercio")leerMiComercio();S.adminTab=b.getAttribute("data-atab");S.pedidoId=null;S.doc=null;S.eco=null;S.editPed=null;render();};});
  app.querySelectorAll("[data-ped]").forEach(function(c){
    c.onclick=function(e){if(c._swiped){c._swiped=false;return;}if(e.target.closest("[data-send]")||e.target.closest("a"))return;S.pedidoId=c.getAttribute("data-ped");render();window.scrollTo(0,0);};
    var x0=0,y0=0,dx=0,mode=null,wrap=c.parentNode;
    c.addEventListener("touchstart",function(e){var t=e.touches[0];x0=t.clientX;y0=t.clientY;dx=0;mode=null;},{passive:true});
    c.addEventListener("touchmove",function(e){var t=e.touches[0],mx=t.clientX-x0,my=t.clientY-y0;
      if(!mode){if(Math.abs(mx)>8&&Math.abs(mx)>Math.abs(my))mode="h";else if(Math.abs(my)>8)mode="v";}
      if(mode!=="h")return;e.preventDefault();dx=Math.min(0,mx);c.classList.add("drag");c.style.transform="translateX("+dx+"px)";},{passive:false});
    c.addEventListener("touchend",async function(){if(mode!=="h"){return;}c._swiped=true;setTimeout(function(){c._swiped=false;},400);
      c.classList.remove("drag");var w=c.offsetWidth;
      if(-dx>Math.max(90,w*0.3)){c.style.transform="translateX(-"+w+"px)";var id=c.getAttribute("data-ped");var o=(S.pedidos||[]).filter(function(x){return x.id===id;})[0];
        var ok=await marcarEnviado(id,!(o&&o.enviado_at));if(navigator.vibrate)try{navigator.vibrate(30);}catch(_){}render();if(!ok){}}
      else{c.style.transform="";}});
  });
  app.querySelectorAll("[data-send]").forEach(function(b){b.onclick=async function(e){e.stopPropagation();var id=b.getAttribute("data-send");var o=(S.pedidos||[]).filter(function(x){return x.id===id;})[0];b.disabled=true;await marcarEnviado(id,!(o&&o.enviado_at));render();};});
  var sn=app.querySelector("[data-savenota]");if(sn)sn.onclick=async function(){var id=sn.getAttribute("data-savenota"),v=document.getElementById("p_notas").value.trim();sn.disabled=true;sn.textContent="Guardando…";
    var r=await sb.from("pedidos").update({notas:v||null}).eq("id",id).eq("comercio_id",C.id).select("id,notas");
    if(r.error||!r.data||!r.data.length){toast("No se han guardado las notas"+(r.error?": "+r.error.message:""));sn.disabled=false;sn.textContent="Guardar notas";return;}
    (S.pedidos||[]).forEach(function(o){if(o.id===id)o.notas=r.data[0].notas;});sn.disabled=false;sn.textContent="Guardar notas";toast("Notas guardadas");};
  var rpb=app.querySelector("[data-repetir]");if(rpb)rpb.onclick=showRepetir;
  app.querySelectorAll("[data-pf]").forEach(function(b){b.onclick=function(){S.pedFiltro=b.getAttribute("data-pf");render();};});
  var pb=app.querySelector("[data-pback]");if(pb)pb.onclick=function(){S.pedidoId=null;S.editPed=null;render();};
  var ps=document.getElementById("psort");if(ps)ps.onchange=function(){S.pedSort=ps.value;render();};
  var aqs=document.getElementById("aq");if(aqs)aqs.oninput=function(){S.adminQ=aqs.value;var pos=aqs.selectionStart;render();var n=document.getElementById("aq");if(n){n.focus();try{n.setSelectionRange(pos,pos);}catch(e){}}};
  var rf=app.querySelector("[data-refresh]");if(rf)rf.onclick=async function(){rf.disabled=true;rf.textContent="Actualizando…";await cargarPedidos();render();};
  var lo=app.querySelector("[data-logout]");if(lo)lo.onclick=async function(){await sb.auth.signOut();S.user=null;S.esMiembro=false;S.esSuper=false;S.pedidos=[];S._mc=null;await cargarProductos();render();};
  // admin/form
  app.querySelectorAll("[data-tcat]").forEach(function(h){h.onclick=function(e){if(e.target.closest("[data-ecat]"))return;var id=h.getAttribute("data-tcat");S.openCats=S.openCats||{};var cerrando=!!S.openCats[id];S.openCats[id]=!S.openCats[id];render();
    if(cerrando){var nh=app.querySelector('[data-tcat="'+id+'"]');if(nh){var hh=(document.querySelector(".fi-header")||{offsetHeight:0}).offsetHeight;var top=nh.getBoundingClientRect().top;if(top<hh)window.scrollBy(0,top-hh-8);}}};});
  app.querySelectorAll("[data-ecat]").forEach(function(b){b.onclick=function(e){e.stopPropagation();showCatEditor(catInfo(b.getAttribute("data-ecat")));};});
  var nc=app.querySelector("[data-newcat]");if(nc)nc.onclick=function(){showCatEditor(null);};
  app.querySelectorAll("[data-newin]").forEach(function(b){b.onclick=function(){S._newCat=b.getAttribute("data-newin");S.adminTab="productos";S._fotos=[];S.adding=true;S.editId=null;S._f=null;render();window.scrollTo(0,0);};});
  var nw=app.querySelector("[data-new]");if(nw)nw.onclick=function(){if(!getCats().length){toast("Primero crea una categoría para tus productos");showCatEditor(null);return;}S._newCat=null;S.adminTab="productos";S._fotos=[];S.adding=true;S.editId=null;S._f=null;render();};
  app.querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){var id=b.getAttribute("data-edit");S.editId=id;S.adding=false;S._f=null;S._fotos=null;render();cargarFotos(id);};});
  app.querySelectorAll("[data-vis]").forEach(function(b){b.onclick=async function(){var id=b.getAttribute("data-vis");var p=find(id);if(!p)return;b.disabled=true;
    var nuevo=!(p.activo!==false);var r=await sb.from("productos").update({activo:nuevo}).eq("id",id).select("id");
    if(r.error||!r.data||!r.data.length){toast(r.error?"Error: "+r.error.message:"No se ha guardado: tu usuario no tiene permiso");b.disabled=false;return;}
    p.activo=nuevo;render();toast(nuevo?p.nombre+" vuelve a verse en Comprar":p.nombre+" oculto en Comprar");};});
  app.querySelectorAll("[data-del]").forEach(function(b){b.onclick=async function(){var id=b.getAttribute("data-del");b.disabled=true;var ok=await borrarProducto(id);await cargarProductos();render();if(ok)toast("Producto borrado");};});
  ["f_nombre","f_desc","f_cat","f_forma","f_color"].forEach(function(id){var el=document.getElementById(id);if(el){el.oninput=function(){syncForm();updatePreview();};el.onchange=function(){syncForm();updatePreview();};}});
  var up=app.querySelector("[data-upload]");if(up)up.onclick=function(){document.getElementById("f_file").click();};
  var file=document.getElementById("f_file");if(file)file.onchange=function(e){var fl=e.target.files[0];if(!fl)return;if(!/^image\//.test(fl.type)){toast("El archivo no es una imagen");return;}toast("Procesando foto…");
    reducirFoto(fl,900,0.82).then(function(url){syncForm();S._f.img=url;render();}).catch(function(){toast("No se pudo leer la foto. Prueba con otra (JPG o PNG).");});};
  app.querySelectorAll("[data-pick]").forEach(function(b){b.onclick=function(){syncForm();var g=S._gal||[];S._f.img=g[+b.getAttribute("data-pick")]||"";render();};});
  var ci=app.querySelector("[data-clearimg]");if(ci)ci.onclick=function(){syncForm();S._f.img="";render();};
  var sv=app.querySelector("[data-save]");if(sv)sv.onclick=async function(){syncForm();var f=S._f;var esNuevo=!S.editId;var prod={id:S.editId,nombre:(f.nombre||"").trim()||"Producto",desc:(f.desc||"").trim(),precio:parseFloat(f.precio)||0,unidad:f.unidad,cat:f.cat,forma:f.forma,color:f.color,img:f.img,fotos:fotosParaGuardar(f.img)};sv.disabled=true;sv.textContent="Guardando…";var ok=await guardarProducto(prod,esNuevo);if(ok){S.openCats=S.openCats||{};S.openCats[prod.cat]=true;S._newCat=null;await cargarProductos();S.editId=null;S.adding=false;S._f=null;render();toast(esNuevo?"Producto publicado":"Producto actualizado");}else{sv.disabled=false;sv.textContent="Guardar";}};
}
function showCatEditor(cat){
  var esNueva=!cat, st={nombre:cat?cat.nombre:"",emoji:cat?cat.emoji:"🧺",manual:!!cat};
  var nProd=cat?S.products.filter(function(p){return p.cat===cat.id;}).length:0;
  var m=document.createElement("div");m.className="fi-modal";
  function grid(){return EMOJI_LISTA.map(function(e){return '<button type="button" data-em="'+e+'" class="'+(e===st.emoji?"on":"")+'">'+e+'</button>';}).join("");}
  m.innerHTML='<div class="fi-modal-card fi-catmodal"><h2>'+(esNueva?"Nueva categoría":"Editar categoría")+'</h2>'+
    '<label class="fi-l">Nombre</label><input id="cat_nom" maxlength="30" placeholder="Ej. Huevos, Legumbres, Especias…" value="'+esc(st.nombre)+'">'+
    '<label class="fi-l">Icono</label><div class="fi-emojiprev"><span id="cat_em">'+st.emoji+'</span><small id="cat_emtxt">'+(st.manual?"Elegido por ti. Pulsa otro para cambiarlo.":"Se elige solo según el nombre. Puedes cambiarlo abajo.")+'</small></div>'+
    '<div class="fi-emojigrid" id="cat_grid">'+grid()+'</div>'+
    '<div class="acts">'+(esNueva?'<span></span>':'<button class="fi-del" id="cat_del">🗑 Borrar</button>')+'<div class="fi-btnrow"><button class="fi-edit" id="cat_cancel">Cancelar</button><button class="fi-newbtn" id="cat_save">'+(esNueva?"Crear categoría":"Guardar")+'</button></div></div></div>';
  document.body.appendChild(m);
  var inp=m.querySelector("#cat_nom"),em=m.querySelector("#cat_em"),gr=m.querySelector("#cat_grid"),txt=m.querySelector("#cat_emtxt");
  function pinta(){em.textContent=st.emoji;gr.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-em")===st.emoji);});}
  inp.oninput=function(){st.nombre=inp.value;if(!st.manual){st.emoji=emojiSugerido(st.nombre);pinta();}};
  gr.onclick=function(e){var b=e.target.closest("[data-em]");if(!b)return;st.emoji=b.getAttribute("data-em");st.manual=true;txt.textContent="Elegido por ti. Pulsa otro para cambiarlo.";pinta();};
  m.onclick=function(e){if(e.target===m)m.remove();};
  m.querySelector("#cat_cancel").onclick=function(){m.remove();};
  var del=m.querySelector("#cat_del");
  if(del)del.onclick=async function(){
    if(nProd){toast("Esta categoría tiene "+nProd+" producto"+(nProd===1?"":"s")+". Muévelos a otra categoría o bórralos antes.");return;}
    del.disabled=true;if(await borrarCategoria(cat.id)){await cargarCategorias();m.remove();render();toast("Categoría borrada");}else del.disabled=false;};
  m.querySelector("#cat_save").onclick=async function(){
    var nom=inp.value.trim();if(!nom){toast("Ponle un nombre a la categoría");inp.focus();return;}
    var dup=getCats().some(function(c){return norm(c.nombre)===norm(nom)&&(!cat||c.id!==cat.id);});if(dup){toast("Ya existe una categoría con ese nombre");return;}
    var b=this;b.disabled=true;var c={id:cat?cat.id:slugCat(nom),nombre:nom,emoji:st.emoji};
    if(await guardarCategoria(c,esNueva)){await cargarCategorias();S.openCats=S.openCats||{};S.openCats[c.id]=true;m.remove();render();toast(esNueva?"Categoría creada":"Categoría actualizada");}else b.disabled=false;};
  setTimeout(function(){inp.focus();},50);
}
function showConfirm(nombre,dir,tel,codigo){var m=document.createElement("div");m.className="fi-modal";m.innerHTML='<div class="fi-modal-card"><div class="fi-check">✓</div><h2>¡Pedido confirmado!</h2><p>Gracias, <b>'+esc(nombre)+'</b>. Te lo llevamos a <b>'+esc(dir)+'</b>.</p>'+
  (codigo&&codigo!==true?'<div class="fi-codbox"><small>Código de tu pedido</small><b>'+esc(codigo)+'</b><button class="fi-edit" data-copy="1">📋 Copiar</button><small>Guárdalo: con él podrás repetir este mismo pedido en el futuro desde «🔁 Repetir pedido».</small></div>':'')+
  '<p class="fi-muted">Te llamaremos al '+esc(tel)+' para confirmar la entrega.</p><button class="fi-bigbtn" data-cerrar="1">Seguir comprando</button></div>';
  m.onclick=function(e){if(e.target.closest&&e.target.closest("[data-copy]")){try{navigator.clipboard.writeText(codigo);toast("Código copiado");}catch(_){}return;}if(e.target===m||(e.target.closest&&e.target.closest("[data-cerrar]")))m.remove();};document.body.appendChild(m);}

/* ============ ARRANQUE ============ */
(async function(){
  await initAuth();
  await cargarComercio();
  if(!C){render();return;}
  await cargarPermisos();
  await Promise.all([cargarCategorias(),cargarProductos(),S.esSuper?cargarComercios():null]);
  if(S.user&&S.esMiembro)await cargarPedidos();
  if(location.hash==="#admin")S.view="admin";
  render();
})();
