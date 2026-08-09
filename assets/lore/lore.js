/* =========================================
   NAINSAN — LORE.JS

   Fungsi:
   1. Animasi masuk Lore
   2. Reveal chapter saat discroll
   3. Progress indicator
   4. Efek interaksi ringan
   5. Tidak mengganggu WORLD.JS
========================================= */


/* =========================================
   01. CORE
========================================= */

(function () {

    "use strict";


    const lore =
        document.querySelector(".lore-page");


    if (!lore) {
        return;
    }


    /* =====================================
       02. DOM ELEMENT
    ===================================== */

    const chapters =
        lore.querySelectorAll(
            ".lore-chapter"
        );


    const progress =
        lore.querySelector(
            ".lore-progress"
        );


    const progressBar =
        lore.querySelector(
            ".lore-progress-bar"
        );


    const revealItems =
        lore.querySelectorAll(
            "[data-reveal]"
        );


    /* =====================================
       03. PAGE LOAD
    ===================================== */

    requestAnimationFrame(() => {

        lore.classList.add(
            "loaded"
        );

    });


    /* =====================================
       04. REVEAL SYSTEM
    ===================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "revealed"
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -8% 0px"
                }
            );


        revealItems.forEach(
            (item) => {

                revealObserver.observe(
                    item
                );

            }
        );

    }
    else {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================
       05. CHAPTER OBSERVER
    ===================================== */

    if (
        chapters.length &&
        "IntersectionObserver"
        in window
    ) {

        const chapterObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                chapters.forEach(
                                    (chapter) => {

                                        chapter.classList
                                            .remove(
                                                "current"
                                            );

                                    }
                                );


                                entry.target.classList
                                    .add(
                                        "current"
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        chapters.forEach(
            (chapter) => {

                chapterObserver.observe(
                    chapter
                );

            }
        );

    }


    /* =====================================
       06. SCROLL PROGRESS
    ===================================== */

    function updateProgress() {

        if (
            !progressBar
        ) {

            return;

        }


        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight
            - window.innerHeight;


        if (
            documentHeight <= 0
        ) {

            progressBar.style
                .transform =
                "scaleY(0)";

            return;

        }


        const percentage =
            Math.min(
                Math.max(
                    scrollTop /
                    documentHeight,
                    0
                ),
                1
            );


        progressBar.style.transform =
            `scaleY(${percentage})`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateProgress
    );


    updateProgress();


    /* =====================================
       07. OPTIONAL PROGRESS VISIBILITY
    ===================================== */

    if (progress) {

        function progressVisibility() {

            if (
                window.scrollY > 30
            ) {

                progress.classList.add(
                    "visible"
                );

            }
            else {

                progress.classList.remove(
                    "visible"
                );

            }

        }


        window.addEventListener(
            "scroll",
            progressVisibility,
            {
                passive: true
            }
        );


        progressVisibility();

    }


    /* =====================================
       08. CHAPTER HOVER
    ===================================== */

    chapters.forEach(
        (chapter) => {

            chapter.addEventListener(
                "mouseenter",
                () => {

                    chapter.classList.add(
                        "hovered"
                    );

                }
            );


            chapter.addEventListener(
                "mouseleave",
                () => {

                    chapter.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    /* =====================================
       09. REDUCED MOTION
    ===================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function handleReducedMotion() {

        if (
            reducedMotion.matches
        ) {

            lore.classList.add(
                "reduced-motion"
            );

        }
        else {

            lore.classList.remove(
                "reduced-motion"
            );

        }

    }


    handleReducedMotion();


    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );

    }


    /* =====================================
       10. CLEANUP SAFETY
    ===================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            window.removeEventListener(
                "scroll",
                updateProgress
            );

            window.removeEventListener(
                "resize",
                updateProgress
            );

        }
    );


})();
