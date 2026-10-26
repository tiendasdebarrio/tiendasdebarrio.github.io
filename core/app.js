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
  var row={comercio_id:C.id,acepta_condiciones:new Date().toISOString(),cliente:datos.nombre,telefono:datos.tel,direccion:datos.dir,pago:datos.pago,notas:datos.notas||null,total:total+envio,items:items.map(function(p){return {nombre:p.nombre,qty:p.qty,unidad:p.unidad,precio:p.precio};})};
  if(!configurado)return true; // demo
  var r=await sb.from("pedidos").insert(row);
  if(r.error){console.error(r.error);toast("Error al enviar el pedido");return false;}
  // Aviso por email vía Edge Function (si está desplegada)
  try{ await sb.functions.invoke("nuevo-pedido",{body:row}); }catch(e){ /* opcional */ }
  return true;
}

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
  return '<div class="fi-hero"><h1>'+esc((C&&C.portada_titulo)||"Bienvenido a "+(C?C.nombre:"nuestra tienda"))+'</h1><p>'+esc((C&&C.portada_sub)||"Pide online y recibe en casa.")+'</p></div><div class="fi-sticky"><div class="fi-search"><input id="q" placeholder="🔍 Buscar producto…" value="'+esc(S.search)+'"></div><div class="fi-cats">'+cats+'</div></div>'+(list.length?'':'<p class="fi-empty">'+(S.products.some(function(p){return p.activo!==false;})?'No hay productos en esta categoría todavía.':'Esta tienda todavía no tiene productos publicados.')+'</p>')+'<div class="fi-grid">'+cards+'</div>';
}
function detail(){var p=find(S.detailId);if(!p){S.screen="shop";return shop();}var step=pasoQty(p);if(S._qty==null)S._qty=1;return '<div class="fi-view"><button class="fi-back" data-back="shop">← Volver</button><div class="fi-detail-img"><img loading="lazy" src="'+imgFor(p)+'" data-pid="'+p.id+'" onerror="__fbImg(this)" alt="'+esc(p.nombre)+'"></div><h2 class="fi-t">'+esc(p.nombre)+'</h2><p class="fi-desc-big">'+esc(p.desc)+'</p><div class="fi-price-big">'+money(p.precio)+' <small>/ '+p.unidad+'</small></div><div class="fi-qty"><button data-q="-">−</button><span id="qv">'+S._qty+' '+p.unidad+'</span><button data-q="+">+</button></div><div class="fi-subtotal">Subtotal: <b id="sub">'+money(p.precio*S._qty)+'</b></div><button class="fi-bigbtn" data-addq="'+p.id+'">Añadir al carrito</button></div>';}
function checkout(){var items=cartItems();var total=cartTotal();var envio=envioDe(total);var minimo=Number((C&&C.pedido_minimo)||0);var rows=items.map(function(p){return '<div class="fi-order-row"><img loading="lazy" src="'+imgFor(p)+'" data-pid="'+p.id+'" onerror="__fbImg(this)" alt=""><div class="fi-or-info"><b>'+esc(p.nombre)+'</b><small>'+p.qty+' '+p.unidad+' × '+money(p.precio)+'</small></div><span>'+money(p.precio*p.qty)+'</span><button class="fi-or-del" data-rmcart="'+p.id+'" title="Eliminar del pedido" aria-label="Eliminar '+esc(p.nombre)+' del pedido">🗑</button></div>';}).join("");return '<div class="fi-view"><button class="fi-back" data-back="shop">← Seguir comprando</button><h2 class="fi-t">Tu pedido</h2>'+rows+'<div class="fi-totals"><div><span>Subtotal</span><span>'+money(total)+'</span></div><div><span>Envío '+(envio===0&&Number(C&&C.envio)>0?"(gratis desde "+fmtEur(C.envio_gratis)+")":"")+'</span><span>'+money(envio)+'</span></div><div class="fi-grand"><span>Total</span><span>'+money(total+envio)+'</span></div></div><h3>Datos de entrega</h3><input id="c_nombre" placeholder="Nombre y apellidos"><input id="c_tel" type="tel" inputmode="tel" autocomplete="tel" maxlength="22" placeholder="Teléfono (ej. +34 600 123 456)"><small id="c_tel_err" class="fi-err"></small><input id="c_dir" placeholder="Dirección de entrega" autocomplete="street-address"><textarea id="c_notas" maxlength="500" rows="3" placeholder="Notas para la tienda (opcional): horario de entrega preferente, piso, portero, sustituciones…"></textarea><select id="c_pago"><option value="tarjeta">Pago con tarjeta (al recibir)</option><option value="efectivo">Efectivo al recibir</option></select><p class="fi-legalinfo">Precios con IVA incluido. En productos perecederos (fruta, verdura y similares) no se aplica el derecho de desistimiento (art. 103.d del TRLGDCU); en productos no perecederos dispones de 14 días si están sin abrir. Si algún producto llega en mal estado, te lo cambiamos o reembolsamos.</p>'+(minimo>0&&total<minimo?'<p class="fi-err" style="display:block">Pedido mínimo: '+fmtEur(minimo)+'. Te faltan '+fmtEur(minimo-total)+'.</p>':'')+'<label class="fi-legalchk"><input type="checkbox" id="c_ok"><span>He leído y acepto las <a href="#" data-legal="condiciones">Condiciones generales de contratación</a> y la <a href="#" data-legal="privacidad">Política de privacidad</a>.</span></label><button class="fi-bigbtn" data-confirm="1" data-min="'+(minimo>0&&total<minimo?1:0)+'" disabled>Confirmar pedido · '+money(total+envio)+'</button><p class="fi-hint" id="c_hint">Completa nombre, un teléfono válido y dirección, y acepta las condiciones para continuar.</p></div>';}
function sinAcceso(){return '<div class="fi-view"><h2 class="fi-t">Sin acceso a esta tienda</h2><p class="fi-desc-big">La cuenta <b>'+esc(S.user.email)+'</b> no pertenece a <b>'+esc(C.nombre)+'</b>. Entra con la cuenta de esta tienda.</p><button class="fi-bigbtn" data-logout="1">Salir</button></div>';}
function login(){return '<div class="fi-view"><h2 class="fi-t">Acceso tienda</h2><p class="fi-desc-big">Introduce tu email y contraseña para gestionar productos y ver pedidos.</p><input id="l_email" type="email" placeholder="Email"><input id="l_pass" type="password" placeholder="Contraseña"><button class="fi-bigbtn" data-login="1">Entrar</button><p class="fi-hint" id="l_msg"></p></div>';}
function admin(){
  var tab=S.adminTab||"pedidos", np=S.products.length, no=(S.pedidos||[]).filter(function(o){return !o.enviado_at;}).length;
  var head=superBar()+'<div class="fi-admin-head"><div><h2>Mi tienda</h2><p>'+esc(C.nombre)+' · '+esc((S.user&&S.user.email)||"")+'</p></div><div><button class="fi-edit" data-logout="1">Salir</button></div></div>'+
    '<div class="fi-tabs"><button data-atab="pedidos" class="'+(tab==="pedidos"?"on":"")+'">Pedidos <span>'+no+'</span></button>'+
    '<button data-atab="productos" class="'+(tab==="productos"?"on":"")+'">Productos <span>'+np+'</span></button>'+
    '<button data-atab="comercio" class="'+(tab==="comercio"?"on":"")+'">Mi comercio</button>'+
    (S.esSuper?'<button data-atab="comercios" class="'+(tab==="comercios"?"on":"")+'">Comercios <span>'+(S.comercios||[]).length+'</span></button>':'')+'</div>';
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
        '<div class="fi-pedido'+(env?' sent':'')+'" data-ped="'+o.id+'"><div class="fi-ped-top"><b>'+esc(o.cliente)+'</b><b>'+money(o.total)+'</b></div>'+
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
  }else if(tab==="comercios"&&S.esSuper){body=comerciosHTML();
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
  var filas=its.map(function(it){return '<tr><td>'+esc(it.nombre)+'</td><td class="fi-qtycell"><b>'+String(it.qty).replace(".",",")+' '+(it.unidad==="kg"?"kg":"ud")+'</b></td></tr>';}).join("");
  return '<button class="fi-back" data-pback="1">← Volver a pedidos</button>'+
    '<div class="fi-pedido" style="cursor:default"><div class="fi-ped-top"><b>'+esc(o.cliente)+'</b><b>'+money(o.total)+'</b></div>'+
    '<small>'+fmtFecha(o.creado)+' · Pago: '+esc(o.pago||"")+'</small><br><small>📞 <a href="tel:'+esc(String(o.telefono||"").replace(/[^\d+]/g,""))+'">'+esc(o.telefono)+'</a> · '+enlaceMapa(o.direccion)+'</small>'+
    '<div class="fi-ped-foot">'+badgeEnvio(o)+'<button class="fi-sendbtn'+(o.enviado_at?' on':'')+'" data-send="'+o.id+'">'+(o.enviado_at?'Marcar pendiente':'Marcar enviado')+'</button></div></div>'+
    '<div class="fi-notabox"><label class="fi-l" for="p_notas">📝 Notas del pedido</label><textarea id="p_notas" maxlength="1000" rows="3" placeholder="Sin notas. Puedes añadir horario de entrega, avisos, etc.">'+esc(o.notas||'')+'</textarea><button class="fi-edit" data-savenota="'+o.id+'">Guardar notas</button></div>'+'<div class="fi-tablewrap"><table class="fi-ptable fi-vtable"><thead><tr><th>Producto</th><th class="fi-qtycell">Cantidad</th></tr></thead><tbody>'+filas+'</tbody></table></div>';
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
  var u=await sb.from("comercio_usuarios").select("comercio_id,email");S.cuUsers={};(u.data||[]).forEach(function(x){(S.cuUsers[x.comercio_id]=S.cuUsers[x.comercio_id]||[]).push(x.email);});}
function superBar(){if(!S.esSuper||!(S.comercios||[]).length)return "";
  return '<div class="fi-view-inner fi-superbar">🛡️ Superadministrador · gestionando<select id="sw_com">'+S.comercios.map(function(c){return '<option value="'+esc(c.slug)+'"'+(c.slug===C.slug?' selected':'')+'>'+esc(c.nombre)+'</option>';}).join("")+'</select></div>';}
function inicial(n){return esc(String(n||"?").trim().charAt(0).toUpperCase());}
function comerciosHTML(){var l=(S.comercios||[]).map(function(c){var us=(S.cuUsers||{})[c.id]||[];
  return '<div class="fi-card2"><div class="fi-com"><div class="lg" style="background:'+esc(c.color||"#2f7d22")+'">'+(c.logo?'<img src="'+esc(c.logo)+'" alt="">':inicial(c.nombre))+'</div><div class="inf"><b>'+esc(c.nombre)+'</b><span class="fi-tag '+(c.activo?'on">Activa':'off">Desactivada')+'</span>'+
    '<small><a href="'+esc(urlComercio(c))+'" target="_blank" rel="noopener">'+esc(urlComercio(c))+'</a></small>'+
    '<div class="users">Accesos: '+(us.length?us.map(function(e){return '<span>'+esc(e)+'<button data-cupass="'+esc(c.id)+'|'+esc(e)+'" title="Cambiar contraseña">🔑</button><button data-cudel="'+esc(c.id)+'|'+esc(e)+'" title="Quitar acceso">✕</button></span>';}).join(""):'<i>ninguno</i>')+'</div></div></div>'+
    '<div class="fi-comacts"><a class="fi-edit" href="?c='+encodeURIComponent(c.slug)+'#admin">⚙️ Gestionar</a><button class="fi-edit" data-cuadd="'+esc(c.id)+'">+ Acceso</button><button class="fi-edit" data-dlindex="'+esc(c.slug)+'">⬇ index.html</button><button class="fi-edit" data-dlqr="'+esc(c.slug)+'">⬇ QR</button><button class="fi-edit" data-dlcartel="'+esc(c.slug)+'">⬇ Cartel</button><button class="fi-edit" data-curl="'+esc(c.id)+'">🔗 Dirección</button><button class="'+(c.activo?'fi-del':'fi-edit')+'" data-cuact="'+esc(c.id)+'">'+(c.activo?'Desactivar':'Activar')+'</button></div></div>';}).join("");
  return '<div class="fi-tabbar"><span>'+(S.comercios||[]).length+' comercios en la plataforma</span><button class="fi-newbtn" data-newcom="1">+ Nuevo comercio</button></div>'+l;}
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

/* ============ EVENTOS ============ */
function syncForm(){var f=S._f;if(!f)return;var g=function(id){return document.getElementById(id);};if(g("f_nombre"))f.nombre=g("f_nombre").value;if(g("f_desc"))f.desc=g("f_desc").value;if(g("f_precio"))f.precio=g("f_precio").value;if(g("f_unidad"))f.unidad=g("f_unidad").value;if(g("f_cat"))f.cat=g("f_cat").value;if(g("f_forma"))f.forma=g("f_forma").value;if(g("f_color"))f.color=g("f_color").value;}
function updatePreview(){var f=S._f;if(!f)return;var prev=document.getElementById("f_prev");if(!prev)return;prev.src=f.img||artFor(f.nombre,f.cat,f.desc,{shape:f.forma,color:f.color});}
function bind(){
  bindSuper();bindMiComercio();pintarQRsPagina();
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
  if(cf)cf.onclick=async function(){var n=document.getElementById("c_nombre").value.trim(),tel=(normTel(document.getElementById("c_tel").value).pretty||""),dir=document.getElementById("c_dir").value.trim(),pago=document.getElementById("c_pago").value,notas=(document.getElementById("c_notas")||{value:""}).value.trim();if(!n||!tel||!dir){toast("Completa nombre, dirección y un teléfono válido");return;}if(!document.getElementById("c_ok").checked){toast("Debes aceptar las condiciones para hacer el pedido");return;}var txt0=cf.textContent;cf.disabled=true;cf.textContent="Enviando…";var items=cartItems();var total=cartTotal();var envio=envioDe(total);var ok=await enviarPedido({nombre:n,tel:tel,dir:dir,pago:pago,notas:notas},items,total,envio);if(ok){S.cart={};S.screen="shop";render();showConfirm(n,dir,tel);}else{cf.disabled=false;cf.textContent=txt0;}};
  app.querySelectorAll("[data-rmcart]").forEach(function(b){b.onclick=function(){var id=b.getAttribute("data-rmcart"),p=find(id);
    var ids=["c_nombre","c_tel","c_dir","c_pago","c_notas"],v={};ids.forEach(function(k){var el=document.getElementById(k);if(el)v[k]=el.value;});var okc=document.getElementById("c_ok");var okv=okc&&okc.checked;
    delete S.cart[id];toast("Eliminado: "+(p?p.nombre:"producto"));
    if(!cartItems().length){S.screen="shop";render();return;}
    render();ids.forEach(function(k){var el=document.getElementById(k);if(el&&v[k]!=null){el.value=v[k];el.dispatchEvent(new Event("input"));}});var oc=document.getElementById("c_ok");if(oc){oc.checked=okv;oc.dispatchEvent(new Event("change"));}};});
  // login
  var lg=app.querySelector("[data-login]");if(lg)lg.onclick=async function(){var em=document.getElementById("l_email").value.trim();var pw=document.getElementById("l_pass").value;var msg=document.getElementById("l_msg");if(!configurado){msg.textContent="Configura Supabase primero.";return;}lg.disabled=true;lg.textContent="Entrando…";var r=await sb.auth.signInWithPassword({email:em,password:pw});if(r.error){msg.textContent="No se pudo entrar: "+r.error.message;lg.disabled=false;lg.textContent="Entrar";return;}S.user=r.data.user;await cargarPermisos();if(S.esMiembro){await Promise.all([cargarPedidos(),cargarProductos(),S.esSuper?cargarComercios():null]);}render();};
  app.querySelectorAll("[data-atab]").forEach(function(b){b.onclick=function(){if(S.adminTab==="comercio")leerMiComercio();S.adminTab=b.getAttribute("data-atab");S.pedidoId=null;render();};});
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
  app.querySelectorAll("[data-pf]").forEach(function(b){b.onclick=function(){S.pedFiltro=b.getAttribute("data-pf");render();};});
  var pb=app.querySelector("[data-pback]");if(pb)pb.onclick=function(){S.pedidoId=null;render();};
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
function showConfirm(nombre,dir,tel){var m=document.createElement("div");m.className="fi-modal";m.innerHTML='<div class="fi-modal-card"><div class="fi-check">✓</div><h2>¡Pedido confirmado!</h2><p>Gracias, <b>'+esc(nombre)+'</b>. Te lo llevamos a <b>'+esc(dir)+'</b>.</p><p class="fi-muted">Te llamaremos al '+esc(tel)+' para confirmar la entrega.</p><button class="fi-bigbtn">Seguir comprando</button></div>';m.onclick=function(e){if(e.target===m||e.target.tagName==="BUTTON")m.remove();};document.body.appendChild(m);}

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
