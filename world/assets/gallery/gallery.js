/* =========================================
   NAINSAN — GALLERY.JS

   SECTION 04 — GALLERY

   Fungsi:
   1. Page entrance
   2. Reveal animation
   3. Gallery item interaction
   4. Feature interaction
   5. Reduced motion support

   Catatan:
   File ini dipanggil otomatis oleh WORLD.JS.
   Tidak mengubah CORE WORLD SYSTEM.
========================================= */


(function () {

    "use strict";


    /* =========================================
       01. CORE
    ========================================= */

    const page =
        document.querySelector(
            ".gallery-page"
        );


    if (!page) {

        return;

    }


    /* =========================================
       02. ELEMENT
    ========================================= */

    const revealItems =
        page.querySelectorAll(
            "[data-reveal]"
        );


    const galleryItems =
        page.querySelectorAll(
            ".gallery-item"
        );


    const feature =
        page.querySelector(
            ".gallery-feature"
        );


    /* =========================================
       03. PAGE ENTRANCE
    ========================================= */

    requestAnimationFrame(() => {

        page.classList.add(
            "loaded"
        );

    });


    /* =========================================
       04. REVEAL SYSTEM
    ========================================= */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
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


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -5% 0px"
                }
            );


        revealItems.forEach(
            (item) => {

                observer.observe(
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


    /* =========================================
       05. FEATURE INTERACTION
    ========================================= */

    if (feature) {

        feature.addEventListener(
            "mouseenter",
            () => {

                feature.classList.add(
                    "focused"
                );

            }
        );


        feature.addEventListener(
            "mouseleave",
            () => {

                feature.classList.remove(
                    "focused"
                );

            }
        );

    }


    /* =========================================
       06. GALLERY ITEM INTERACTION
    ========================================= */

    galleryItems.forEach(
        (item, index) => {


            item.dataset.index =
                String(index + 2);


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
                "focusin",
                () => {

                    item.classList.add(
                        "hovered"
                    );

                }
            );


            item.addEventListener(
                "focusout",
                () => {

                    item.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    /* =========================================
       07. PARALLAX MICRO EFFECT
       
       Hanya aktif pada device yang
       mendukung hover.
    ========================================= */

    const canHover =
        window.matchMedia(
            "(hover: hover)"
        );


    if (
        canHover.matches
    ) {

        galleryItems.forEach(
            (item) => {

                const image =
                    item.querySelector(
                        ".gallery-image"
                    );


                if (!image) {

                    return;

                }


                item.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            item.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            0.5;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            0.5;


                        image.style.transform =
                            `
                            translate(
                                ${x * 2}px,
                                ${y * 2}px
                            )
                            translateY(-2px)
                            `;

                    }
                );


                item.addEventListener(
                    "mouseleave",
                    () => {

                        image.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =========================================
       08. REDUCED MOTION
    ========================================= */

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


    /* =========================================
       09. FALLBACK REVEAL
    ========================================= */

    setTimeout(
        () => {

            revealItems.forEach(
                (item) => {

                    if (
                        item.classList.contains(
                            "revealed"
                        )
                    ) {

                        return;

                    }


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
            );

        },
        400
    );


    /* =========================================
       10. CLEANUP
    ========================================= */

    window.addEventListener(
        "pagehide",
        () => {

            galleryItems.forEach(
                (item) => {

                    item.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


})();
