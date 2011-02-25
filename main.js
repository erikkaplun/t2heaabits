// * Iga küsimus käib ühe tähe kohta,  (letter)
// * igal küsimusel on kolm vastusevarianti,  (options)
// * üks vastusevariantidest on õige:  (answer)
//     0-esimene, 1=teine, 2=kolmas.
QUESTIONS = [
    {letter: 'a', options: ['aken', 'elevant', 'banaan'], answer: 0},
    {letter: 'b', options: ['koer', 'banaan', 'elevant'], answer: 1},
    {letter: 'c', options: ['aken', 'koer', 'coca-cola'], answer: 2},
    {letter: 'd', options: ['dolomiit', 'kass', 'hiir'], answer: 0},
    {letter: 'k', options: ['dolomiit', 'kass', 'hiir'], answer: 1},
    {letter: 'x', options: ['xanax', 'elevant', 'ratas'], answer: 0},
    {letter: 'r', options: ['koer', 'ratas', 'xanax'], answer: 1},
    {letter: 'h', options: ['banaan', 'koer', 'hiir'], answer: 2}
];

FIRST_QUESTION_NR = 0;
LAST_QUESTION_NR = QUESTIONS.length - 1;

// Kui tahame disaini muuta, peame ainult siinse numbri ära muutma.
SLIDE_WIDTH = 400;

RIGHT = 1;
LEFT = -1;


$(function() {

    var activeSlide = $('#slide-1');
    var passiveSlide = $('#slide-2');

    // See muutuja hoiab järge, millise küsimuse juures me parajasti
    // oleme.
    var currentQuestionNr = 0;


    // See protseduur/funktsioon valmistab "lavataguse" slaidi ette
    // mingi etteantud küsimuse kuvamiseks.
    function prepareSlide(slide, questionNr) {
        var question = QUESTIONS[questionNr];

        // Leiame selle span'i, mille sees alguses on LETTER HERE:
        var spanElement = slide.find("span");

        // Määrame selle elemendi sisuks question.letter'i sisu:
        spanElement.text(question.letter);
    }


    prepareSlide(activeSlide, currentQuestionNr);

    // tee aktiivne slaid nähtavaks:
    activeSlide.css("left", 0);


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
        prepareSlide(passiveSlide, nextQuestionNr);
        // Liigutame aktiivse slaidi lavalt ära ja lavataguse tema asemele.
        move(-direction);

        // Kui kõik on valmis, märgime ka üles, et nüüd oleme järgmise
        // slaidi juures:
        currentQuestionNr = nextQuestionNr;
    }

    $('#button-next').click(function() { changeSlide(RIGHT); });
    $('#button-prev').click(function() { changeSlide(LEFT); });
});
