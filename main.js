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

// Kui tahame disaini muuta, peame ainult siinse numbri ära muutma.
SLIDE_WIDTH = 400;


$(function() {

    var activeSlide = $('#slide-1');
    var passiveSlide = $('#slide-2');

    // tee aktiivne slaid nähtavaks:
    activeSlide.css("left", 0);


    // See muutuja hoiab järge, millise küsimuse juures me parajasti
    // oleme.
    var currentQuestionNr = 0;


    // See protseduur/funktsioon valmistab "lavataguse" slaidi ette
    // mingi etteantud küsimuse kuvamiseks.
    function preparePassiveSlide(questionNr) {
        var question = QUESTIONS[questionNr];

        // Leiame selle span'i, mille sees alguses on LETTER HERE:
        var spanElement = passiveSlide.find("span");

        // Määrame selle elemendi sisuks question.letter'i sisu:
        spanElement.text(question.letter);
    }

    RIGHT = 1;
    LEFT = -1;
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

        swapActiveAndPassive();
    }


    function swapActiveAndPassive() {
        // Vahetame aktiivse ja passiivse slaidi omavahel:
        var tmp = passiveSlide;
        passiveSlide = activeSlide;
        activeSlide = tmp;
    }

    // See funktsioon liigub ühe slaidi võrra edasi.
    function nextSlide() {
        var nextQuestionNr = currentQuestionNr + 1;

        // Valmistame lavataguse slaidi ette järgmise küsimuse kuvamseks:
        preparePassiveSlide(nextQuestionNr);
        // Liigutame aktiivse slaidi lavalt ära ja lavataguse tema asemele.
        move(LEFT);

        // Kui kõik on valmis, märgime ka üles, et nüüd oleme järgmise
        // slaidi juures:
        currentQuestionNr = nextQuestionNr;
    }

    function prevSlide() {
        var nextQuestionNr = currentQuestionNr - 1;

        // Valmistame lavataguse slaidi ette järgmise küsimuse kuvamseks:
        preparePassiveSlide(nextQuestionNr);
        // Liigutame aktiivse slaidi lavalt ära ja lavataguse tema asemele.
        move(RIGHT);

        // Kui kõik on valmis, märgime ka üles, et nüüd oleme järgmise
        // slaidi juures:
        currentQuestionNr = nextQuestionNr;
    }

    $('#button-next').click(nextSlide);
    $('#button-prev').click(prevSlide);
});
