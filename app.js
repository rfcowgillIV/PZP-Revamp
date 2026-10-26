// Problem: I has JavaScript in my code
// Solution: I am going to put JavaScript
//
// UPDATE (2026): Problem solved! The smooth-scroll code that used to live in an
// inline <script> block at the bottom of index.html now lives here. Keeping
// JavaScript in its own file means the site can later turn on a
// Content-Security-Policy that blocks inline scripts (a strong defense against
// cross-site scripting), and it's easier to read.
//
// The five copy-pasted click handlers became one loop. Same moves, less code -
// we cut the track down to the radio edit.

$(function () {
    // navbar link  ->  section it should glide to
    const scrollTargets = {
        '#homebutton': '#my-jumbotron',
        '#aboutbutton': '#about',
        '#crewbutton': '#crew',
        '#schedulebutton': '#schedule',
    };

    function glideTo(targetSelector, event) {
        const $target = $(targetSelector);
        if (!$target.length) return; // section missing? let the browser do its normal jump
        event.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top }, 2000);
    }

    Object.keys(scrollTargets).forEach(function (linkSelector) {
        $(linkSelector).on('click', function (event) {
            glideTo(scrollTargets[linkSelector], event);
        });
    });

    // Anything else tagged class="schedule" also scrolls to the schedule.
    // (BUG FIX: the old code bound #schedulebutton twice - once by id and once by
    // class - so it started two animations on every click.)
    $('.schedule').not('#schedulebutton').on('click', function (event) {
        glideTo('#schedule', event);
    });
});
