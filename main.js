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


// Need muutujad hoiavad järge, kumb slaid parajasti aktiivne ja kumb
// passiivne on.
currentSlide = null;


// See muutuja hoiab järge, millise küsimuse juures me parajasti
// oleme.
currentQuestionNr = 0;


// Setup slide tegeleb sellega, et slaidid oleks enne mängu
// pihtahakkamist sobivas olekus.
function setUpEvents(slide) {
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

function move(fromSlide, toSlide, direction, EESKIRI) {
    // Jätame pasiivse slaidi varjatuks, aga paneme ta kohe
    // aknaraamist VASAKULE:
    toSlide.css("left", (-direction) * SLIDE_WIDTH);
    // Liigutame aktiivse täispikkuse võrra PAREMALE, nii et ta
    // kaob lõpuks ära
    fromSlide.animate({"left": direction * SLIDE_WIDTH},
                      {complete: EESKIRI});

    // Liigutame passiivse täispikkuse võrra PAREMALE, nii et ta
    // ilmub lõpuks täpselt raami keskele nähtavaks.
    toSlide.animate({"left": 0});
}


function createSlide(questionNr) {
    var slide = $("#empty-slide").clone();
    slide.attr("id", "current-slide");
    slide.appendTo("#window");
    setUpEvents(slide);
    loadQuestion(slide, questionNr);
    return slide;
}


function changeSlide(direction) {
    var nextQuestionNr = currentQuestionNr + direction;

    // Kui me olime esimese küsimuse peal ja üritasime tagasi minna,
    // siis lähme hoopis viimase küsimuse peale.
    if (nextQuestionNr < FIRST_QUESTION_NR)
        nextQuestionNr = LAST_QUESTION_NR;
    // ...ja vastupidi ka:
    else if (nextQuestionNr > LAST_QUESTION_NR)
        nextQuestionNr = FIRST_QUESTION_NR;

    var newSlide = createSlide(nextQuestionNr);

    var PEALE_ANIMEERIMIST_TEE_SEDA = function() {
        currentSlide.remove();
        currentSlide = newSlide;
    };

    // Liigutame aktiivse slaidi lavalt ära ja lavataguse tema asemele.
    move(currentSlide, newSlide, -direction, PEALE_ANIMEERIMIST_TEE_SEDA);

    // Kui kõik on valmis, märgime ka üles, et nüüd oleme järgmise
    // slaidi juures:
    currentQuestionNr = nextQuestionNr;
}


$(function() {
    currentSlide = createSlide(FIRST_QUESTION_NR);
    currentSlide.css("left", 0);

    // Seo Next ja Previous nupud vastavate toimingutega.
    $("#button-next").click(function() { changeSlide(RIGHT); });
    $("#button-prev").click(function() { changeSlide(LEFT); });
});
