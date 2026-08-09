/* =========================================
   NAINSAN — ACTIVITIES.JS

   SECTION 03 — ACTIVITIES

   Fungsi:
   1. Animasi masuk
   2. Reveal saat terlihat
   3. Current activity state
   4. Hover interaction
   5. Reduced motion support

   Catatan:
   Tidak mengubah WORLD.JS.
========================================= */


/* =========================================
   01. CORE
========================================= */

(function () {

    "use strict";


    const page =
        document.querySelector(
            ".activities-page"
        );


    if (!page) {

        return;

    }


    /* =====================================
       02. ELEMENT
    ===================================== */

    const revealItems =
        page.querySelectorAll(
            "[data-reveal]"
        );


    const activityItems =
        page.querySelectorAll(
            ".activity-item"
        );


    const feature =
        page.querySelector(
            ".activity-feature"
        );


    /* =====================================
       03. PAGE LOAD
    ===================================== */

    requestAnimationFrame(() => {

        page.classList.add(
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

                                entry.target.classList.add(
                                    "revealed"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -6% 0px"
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
       05. CURRENT FEATURE
    ===================================== */

    if (feature) {

        feature.classList.add(
            "current"
        );

    }


    /* =====================================
       06. ACTIVITY INTERACTION
    ===================================== */

    activityItems.forEach(
        (item) => {

            item.addEventListener(
                "mouseenter",
                () => {

                    item.classList.add(
                        "hovered"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    item.classList.remove(
                        "hovered"
                    );

                }
            );


            item.addEventListener(
                "focus",
                () => {

                    item.classList.add(
                        "hovered"
                    );

                }
            );


            item.addEventListener(
                "blur",
                () => {

                    item.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    /* =====================================
       07. REDUCED MOTION
    ===================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateMotion() {

        page.classList.toggle(
            "reduced-motion",
            reducedMotion.matches
        );

    }


    updateMotion();


    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            updateMotion
        );

    }


    /* =====================================
       08. INITIAL REVEAL FALLBACK
    ===================================== */

    setTimeout(
        () => {

            revealItems.forEach(
                (item) => {

                    if (
                        !item.classList.contains(
                            "revealed"
                        )
                    ) {

                        const rect =
                            item.getBoundingClientRect();


                        if (
                            rect.top <
                            window.innerHeight
                        ) {

                            item.classList.add(
                                "revealed"
                            );

                        }

                    }

                }
            );

        },
        350
    );


    /* =====================================
       09. CLEANUP
    ===================================== */

    window.addEventListener(
        "pagehide",
        () => {

            activityItems.forEach(
                (item) => {

                    item.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


})();
