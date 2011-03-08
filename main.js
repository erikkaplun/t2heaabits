// * Iga küsimus käib ühe tähe kohta,  (letter)
// * igal küsimusel on kolm vastusevarianti,  (options)
// * üks vastusevariantidest on õige:  (answer)
//     0-esimene, 1=teine, 2=kolmas.
QUESTIONS = [
    {letter: 'a', color: 'lightgreen', options: ['aken', 'elevant', 'banaan'], answer: 0},
    {letter: 'b', color: 'blue', options: ['koer', 'banaan', 'elevant'], answer: 1},
    {letter: 'c', color: 'brown', options: ['aken', 'koer', 'coca-cola'], answer: 2},
    {letter: 'd', color: 'yellow', options: ['dolomiit', 'kass', 'hiir'], answer: 0},
    {letter: 'k', color: 'pink', options: ['dolomiit', 'kass', 'hiir'], answer: 1},
    {letter: 'x', color: 'purple', options: ['xanax', 'elevant', 'ratas'], answer: 0},
    {letter: 'r', color: '#f7a', options: ['koer', 'ratas', 'xanax'], answer: 1},
    {letter: 'h', color: '#17a29f', options: ['banaan', 'koer', 'hiir'], answer: 2}
];

FIRST_QUESTION_NR = 0;
LAST_QUESTION_NR = QUESTIONS.length - 1;

// Kui tahame disaini muuta, peame ainult siinse numbri ära muutma.
SLIDE_WIDTH = 400;

RIGHT = 1;
LEFT = -1;


// Need muutujad hoiavad järge, kumb slaid parajasti aktiivne ja kumb
// passiivne on.
activeSlide = null;
passiveSlide = null;

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
            alert("Valisite valiku: " + currentQuestion.options[index]);
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

    var allImgElements = slide.find(".options img");
    allImgElements.each(function(index, imgEl) {
        var imageUrl = "media/" + question.options[index] + ".jpeg";
        $(imgEl).attr("src", imageUrl);
    });
}

function move(direction) {
    // Jätame pasiivse slaidi varjatuks, aga paneme ta kohe
    // aknaraamist VASAKULE:
    passiveSlide.css("left", (-direction) * SLIDE_WIDTH);
    // Liigutame aktiivse täispikkuse võrra PAREMALE, nii et ta
    // kaob lõpuks ära
    activeSlide.animate({"left": direction * SLIDE_WIDTH});

    // Liigutame passiivse täispikkuse võrra PAREMALE, nii et ta
    // ilmub lõpuks täpselt raami keskele nähtavaks.
    passiveSlide.animate({"left": 0});

    // Vahetame aktiivse ja passiivse slaidi omavahel:
    var tmp = passiveSlide;
    passiveSlide = activeSlide;
    activeSlide = tmp;
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

    // Valmistame lavataguse slaidi ette järgmise küsimuse kuvamseks:
    loadQuestion(passiveSlide, nextQuestionNr);
    // Liigutame aktiivse slaidi lavalt ära ja lavataguse tema asemele.
    move(-direction);

    // Kui kõik on valmis, märgime ka üles, et nüüd oleme järgmise
    // slaidi juures:
    currentQuestionNr = nextQuestionNr;
}


$(function() {
    // Võta DOM'ist need DIV'id #slide-1 ja #slide-2
    activeSlide = $("#slide-1");
    passiveSlide = $("#slide-2");

    setUpEvents(activeSlide);
    setUpEvents(passiveSlide);

    // Täida aktiivne slaid sisuga ja tee ta nähtavaks.
    loadQuestion(activeSlide, currentQuestionNr);
    activeSlide.css("left", 0);

    // Seo Next ja Previous nupud vastavate toimingutega.
    $("#button-next").click(function() { changeSlide(RIGHT); });
    $("#button-prev").click(function() { changeSlide(LEFT); });
});
