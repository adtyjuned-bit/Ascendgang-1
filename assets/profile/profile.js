/* =========================================
   NAINSAN — PROFILE.JS

   PROFILE SECTION ONLY

   Fungsi:
   1. Entry animation helper
   2. Status interaction
   3. Prevent accidental propagation
========================================= */


/* =========================================
   01. PROFILE ROOT
========================================= */

const profilePage =
    document.querySelector(
        ".profile-page"
    );


/*
   Safety check.

   Karena file ini dipanggil
   oleh World Core, kita pastikan
   elemen Profile memang tersedia.
*/

if (profilePage) {


    /* =====================================
       02. PROFILE STATUS
    ===================================== */

    const profileStatus =
        profilePage.querySelector(
            ".profile-status"
        );


    if (profileStatus) {

        profileStatus.setAttribute(
            "title",
            "Nainsan is online"
        );

    }


    /* =====================================
       03. REDUCE MOTION
    ===================================== */

    /*
       Kalau user menggunakan
       accessibility setting
       prefers-reduced-motion,
       matikan animasi tambahan.
    */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) {

        profilePage
            .querySelectorAll(
                ".profile-header, .profile-section, .profile-footer"
            )
            .forEach(
                element => {

                    element.style.animation =
                        "none";

                    element.style.opacity =
                        "1";

                    element.style.transform =
                        "none";

                }
            );

    }


    /* =====================================
       04. READY STATE
    ===================================== */

    profilePage.classList.add(
        "profile-ready"
    );

}
