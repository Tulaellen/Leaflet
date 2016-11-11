var animate = [
    function section0(on) {
    },
    function section1(on) {
    },



    function section4(on) {
        $('#a').addClass('a');
        $('#b').addClass('b');
        $('#c').addClass('c');
        $('#d').addClass('d');
        $('#e').addClass('e');
        $('.image').addClass('imageTest');
        $('#logo1').addClass('logo1');
        $('#logo2').addClass('logo2');
        $('#logo3').addClass('logo3');
        $('#contact').addClass('contact');



    }
];


$(document).ready(function load() {
    setupFullPage();
});

function setupFullPage() {

    $('#fullpage').fullpage({
        css3: true,
        scrollingSpeed: 1000,
        autoScrolling: true,
        fitToSection: false,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: false,
        verticalCentered: false,
        resize: false,
        sectionsColor: ['rgba(27, 188, 155, 0)', 'rgba(75, 191, 195, 0)', 'rgba(123, 170, 190, 0)', 'rgba(245, 245, 245, 0)', 'rgba(204, 221, 255, 0)'],
        paddingTop: '0',
        paddingBottom: '0',
        responsiveWidth: 0,
        responsiveHeight: 0,

        sectionSelector: '.fullpage-section',
        slideSelector: '.slide',

        //events
        onLeave: function (index, nextIndex, direction) {
            animate[nextIndex](true);
        },
        afterLoad: function (anchorLink, index) {
        }
    });
}