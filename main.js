// * Iga küsimus käib ühe tähe kohta,  (letter)
// * igal küsimusel on kolm vastusevarianti,  (options)
// * üks vastusevariantidest on õige:  (answer)
//     0-esimene, 1=teine, 2=kolmas.
QUESTIONS = [
    {letter: 'a', color: 'lightgreen', bgColor: "darkgreen",
     options: ['aken', 'elevant', 'banaan'], answer: 0},

    {letter: 'b', color: 'blue', bgColor: "lightblue",
     options: ['koer', 'banaan', 'elevant'], answer: 1},

    {letter: 'c', color: 'brown', bgColor: "yellow",
     options: ['aken', 'koer', 'coca-cola'], answer: 2},

    {letter: 'd', color: 'yellow', bgColor: "black",
     options: ['dolomiit', 'kass', 'hiir'], answer: 0},

    {letter: 'k', color: 'pink', bgColor: "darkblue",
     options: ['dolomiit', 'kass', 'hiir'], answer: 1},

    {letter: 'x', color: 'purple', bgColor: "pink",
     options: ['xanax', 'elevant', 'ratas'], answer: 0},

    {letter: 'r', color: '#f7a', bgColor: "maroon",
     options: ['koer', 'ratas', 'xanax'], answer: 1},

    {letter: 'h', color: '#dfe', bgColor: "#b93",
     options: ['banaan', 'koer', 'hiir'], answer: 2}
];

FIRST_QUESTION_NR = 0;
LAST_QUESTION_NR = QUESTIONS.length - 1;

// Kui tahame disaini muuta, peame ainult siinse numbri ära muutma.
SLIDE_WIDTH = 400;

RIGHT = 1;
LEFT = -1;


// See muutuja viitab slaidile (DOM element), mis parasjagu aktiivne on:
currentSlide = null;


// See muutuja hoiab järge, millise küsimuse juures me parajasti
// oleme.
currentQuestionNr = 0;


$(function() {
    // createSlide loob slaidi, mis on täidetud etteantud numbriga
    // küsimusega ja paneb selle #window sisse.
    currentSlide = createSlide(FIRST_QUESTION_NR);
    // Liigutame äsjaloodud slaidi paika, st täpselt aknasse:
    currentSlide.css("left", 0);

    // Seo Next ja Previous nupud vastavate toimingutega.
    $("#button-next").click(function() { changeSlide(RIGHT); });
    $("#button-prev").click(function() { changeSlide(LEFT); });
});


function createSlide(questionNr) {

    // Kloonime uue slaidi võttes näidiseks #empty-slide'i:
    var slide = $("#empty-slide").clone();

    // ID'd me otseselt ei vaja, kuna hoiame nagunii aktiivset slaidi
    // globaalses muutujas currentSlide, aga kuna #empty-slide on meil
    // ka alati DOM'is ja kahe DOM elemendi ID'd ei tohiks olla samad,
    // siis muudabe kloonitud DOM elemendi ID ära:
    slide.attr("id", "current-slide");

    // Lisame äsjakloonitud tühja slaidi #window sisse:
    slide.appendTo("#window");

    // Kutsume välja protseduuri, mis paneb slaidile vajalikud
    // event'id külge:
    setUpEvents(slide);

    // Kutsume välja protseduuri, mis võtab QUESTIONS'ist vastava
    // numbriga küsimuse ja täidab slaidi selle küsimuse andmetega:
    loadQuestion(slide, questionNr);

    // Tagastame äsjaloodud slaidi kellele iganes seda protseduuri
    // välja kutsus:
    return slide;
}


function changeSlide(direction) {
    // nextQuestionNr on vaid lokaalne muutuja ning me kasutame seda
    // aint allpool createSlide'i välja kutsudes.

    // Arvutame nextQuestionNr'i. See arvutamine on tegelikult väga
    // lihtne, sest see on kas - 1 või + 1.
    var nextQuestionNr = currentQuestionNr + direction;

    // Vaatame, et nextQuestionNr sisaldaks ainult korrektseid väärtusi.

    // Kui me olime esimese küsimuse peal ja üritasime tagasi minna,
    // siis lähme hoopis viimase küsimuse peale.
    if (nextQuestionNr < FIRST_QUESTION_NR)
        nextQuestionNr = LAST_QUESTION_NR;
    // ...ja vastupidi ka:
    else if (nextQuestionNr > LAST_QUESTION_NR)
        nextQuestionNr = FIRST_QUESTION_NR;

    // Loome uue slaidi, mis sisaldab küsimust, mida me kohe kuvama hakkame.
    var newSlide = createSlide(nextQuestionNr);

    // Kirjeldame sammud, mida teha PEALE animeerimist:
    var PEALE_ANIMEERIMIST_TEE_SEDA = function() {
        // need read ei käivitu kohe vaid alles peale animeerimist,
        // sest me anname selle eeskirja ilma teda välja kutsumata
        // animate'ile üle.

        currentSlide.remove();
        currentSlide = newSlide;
    };

    // Liigutame aktiivse slaidi lavalt ära ja lavataguse tema
    // asemele.  Kaasa anname selle eeskirja, mille me just
    // defineerisime ILMA seda eeskirja välja kutsumata.
    move(currentSlide, newSlide, -direction, PEALE_ANIMEERIMIST_TEE_SEDA);
    // Kui me eeskirja välja oleks kutsunud, siis me oleks move'ile
    // edasi andnud mitte eeskirja enda, vaid väärtuse, mille me
    // oleksime saanud eeskirja väljakutsumisest.

    // Kui kõik on valmis, märgime ka üles, et nüüd oleme järgmise
    // slaidi juures:
    currentQuestionNr = nextQuestionNr;
    // See on vajalik sellesama protseduuri esimesel real, et järgmine
    // kord teaksime, millise küsimuse juures me oleme.
}


function move(fromSlide, toSlide, direction, afterAnimate) {
    // Selle protseduuri viimane argument on eeskiri, mille me saime
    // changeSlide'ilt. Tekib küsimus, et miks me ei võiks seda
    // eeskirja hoopis siin samas luua ja animate'ile anda, ja miks
    // peame ta changeSlide'is looma ja siis sedasi keeruliselt üle
    // andma. Asi on selles, et see loogika kuulub changeSlide'i
    // pädevusse. Sellise lihtsa programmi puhul iseenesest vahet
    // pole, aga üldiselt on oluline, et iga koodi osa kirjeldaks just
    // seda, milles ta pädev on. Ja just nimelt "KIRJELDAKS" mitte
    // "TEEKS", sest changeSlide ise EI TEE neid samme, mis selles
    // eeskirjas on, vaid ta delegeerib need sammud edasi õigel hetkel
    // täitmiseks. Umbes nagu ärikonsultant ei soorita ise samme oma
    // kliendi ettevõtte parandamiseks vaid annab kliendile juhtnöörid
    // ja klient täidab neid juhtnööre kokkulepitud hetkel.

    // Jätame pasiivse slaidi varjatuks, aga paneme ta kohe
    // aknaraamist VASAKULE:
    toSlide.css("left", (-direction) * SLIDE_WIDTH);
    // Liigutame aktiivse täispikkuse võrra PAREMALE, nii et ta
    // kaob lõpuks ära
    fromSlide.animate({"left": direction * SLIDE_WIDTH},
                      {complete: afterAnimate});

    // Liigutame passiivse täispikkuse võrra PAREMALE, nii et ta
    // ilmub lõpuks täpselt raami keskele nähtavaks.
    toSlide.animate({"left": 0});

    // Iseenesest võiks ka kogu move'i sisu INLINE'ida changeSlide'i
    // sisse ehk asendada see koht changeSlide'is, kus move'i välja
    // kutsutakse, move'i enda sisuga.

    // Samuti oleks ehk parem 'move' nimetada ümber 'doAnimation'-iks
    // vms.
}


// Setup slide tegeleb sellega, et slaidid oleks enne mängu
// pihtahakkamist sobivas olekus.
function setUpEvents(slide) {
    // Võtame DOM'ist vajaminevad elemendid:
    var allOptionElements = slide.find(".options").children();

    // Paneme etteantud slaidi vastusevariantidele külge
    // click-eventi handlerid:
    allOptionElements.each(function(index, optionEl) {
        $(optionEl).click(function() {
            var currentQuestion = QUESTIONS[currentQuestionNr];
            if (currentQuestion.answer == index) {
                alert("Jah!! Võtame järgmise!");
                allOptionElements.animate({width: "50px", height: "50px"});
                $(optionEl).animate({width: "200px", height: "200px"});
            } else {
                var randomValue = Math.random();
                if (randomValue < 0.5) {
                    alert("Ei... proovi veel!");
                } else {
                    alert("Vale vastus...");
                }
            }
        });
    });
}


// See protseduur/funktsioon täidab etteantud slaidi etteantud
// küsimusega.
function loadQuestion(slide, questionNr) {
    var question = QUESTIONS[questionNr];

    // Leiame selle span'i, mille sees alguses on LETTER HERE:
    var questionEl = slide.find(".question");

    // Määrame selle elemendi sisuks question.letter'i sisu:
    questionEl.text(question.letter);
    questionEl.css("color", question.color);
    slide.css("background-color", question.bgColor);

    var allImgElements = slide.find(".options img");
    allImgElements.each(function(index, imgEl) {
        var imageUrl = "media/" + question.options[index] + ".jpeg";
        $(imgEl).attr("src", imageUrl);
    });
}
