/* =========================================
   NAINSAN — UNKNOWN.JS

   SECTION 06 — UNKNOWN

   Fungsi:

   01. CORE ELEMENT
   02. REVEAL SYSTEM
   03. SYSTEM MESSAGE
   04. INVESTIGATE
   05. CLOSE REVEAL
   06. KEYBOARD
   07. PAGE REVEAL
   08. INITIALIZE

   File ini hanya bekerja untuk:
   assets/unknown/

   Tidak mengubah CORE world.js.
========================================= */


/* =========================================
   01. CORE ELEMENT
========================================= */

const unknownPage =
    document.querySelector(
        ".unknown-page"
    );


const unknownButton =
    document.getElementById(
        "unknownButton"
    );


const unknownReveal =
    document.getElementById(
        "unknownReveal"
    );


const unknownClose =
    document.getElementById(
        "unknownClose"
    );


const unknownMessage =
    document.getElementById(
        "unknownMessage"
    );


/* =========================================
   SAFETY CHECK
========================================= */

if (!unknownPage) {

    console.warn(
        "Unknown: unknownPage tidak ditemukan."
    );

}


/* =========================================
   02. REVEAL SYSTEM
========================================= */

function openUnknownReveal() {

    if (!unknownReveal) {

        return;

    }


    unknownReveal.classList.add(
        "show"
    );


    /*
       Fokus ke tombol close
       setelah panel muncul.
    */

    setTimeout(
        () => {

            if (unknownClose) {

                unknownClose.focus();

            }

        },
        350
    );


    /*
       Ubah pesan sistem
       ketika investigasi dilakukan.
    */

    updateUnknownMessage(
        "SIGNAL RESPONSE DETECTED."
    );

}


/* =========================================
   CLOSE REVEAL
========================================= */

function closeUnknownReveal() {

    if (!unknownReveal) {

        return;

    }


    unknownReveal.classList.remove(
        "show"
    );


    /*
       Kembalikan pesan sistem
       setelah panel ditutup.
    */

    setTimeout(
        () => {

            updateUnknownMessage(
                "SIGNAL DETECTED."
            );

        },
        350
    );

}


/* =========================================
   03. SYSTEM MESSAGE
========================================= */

function updateUnknownMessage(
    message
) {

    if (!unknownMessage) {

        return;

    }


    unknownMessage.textContent =
        message;

}


/* =========================================
   04. INVESTIGATE
========================================= */

if (unknownButton) {

    unknownButton.addEventListener(
        "click",
        () => {

            openUnknownReveal();

        }
    );

}


/* =========================================
   05. CLOSE
========================================= */

if (unknownClose) {

    unknownClose.addEventListener(
        "click",
        () => {

            closeUnknownReveal();

        }
    );

}


/* =========================================
   CLICK OUTSIDE REVEAL
========================================= */

if (unknownReveal) {

    unknownReveal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                unknownReveal
            ) {

                closeUnknownReveal();

            }

        }
    );

}


/* =========================================
   06. KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {


        /*
           Escape:
           tutup reveal.
        */

        if (
            event.key ===
            "Escape"
        ) {

            if (
                unknownReveal &&
                unknownReveal.classList.contains(
                    "show"
                )
            ) {

                closeUnknownReveal();

            }

        }


        /*
           Enter / Space:
           investigasi ketika
           tombol sedang fokus.
        */

        if (
            (
                event.key ===
                "Enter"
            ||
                event.key ===
                " "
            )
            &&
            document.activeElement ===
            unknownButton
        ) {

            event.preventDefault();

            openUnknownReveal();

        }

    }
);


/* =========================================
   07. PAGE REVEAL
========================================= */

function revealUnknownPage() {

    if (!unknownPage) {

        return;

    }


    const revealElements =
        unknownPage.querySelectorAll(
            "[data-reveal]"
        );


    revealElements.forEach(
        (element, index) => {

            setTimeout(
                () => {

                    element.classList.add(
                        "revealed"
                    );

                },
                100 +
                (index * 100)
            );

        }
    );

}


/* =========================================
   SYSTEM SIGNAL LOOP
========================================= */

function startSignalLoop() {

    if (!unknownMessage) {

        return;

    }


    const messages = [

        "SIGNAL DETECTED.",

        "SOURCE UNKNOWN.",

        "TRACE INCOMPLETE.",

        "SIGNAL STILL ACTIVE."

    ];


    let messageIndex = 0;


    setInterval(
        () => {

            /*
               Jangan mengganggu ketika
               reveal sedang terbuka.
            */

            if (
                unknownReveal &&
                unknownReveal.classList.contains(
                    "show"
                )
            ) {

                return;

            }


            messageIndex =
                (
                    messageIndex + 1
                )
                %
                messages.length;


            unknownMessage.style.opacity =
                "0";


            setTimeout(
                () => {

                    unknownMessage.textContent =
                        messages[
                            messageIndex
                        ];

                    unknownMessage.style.opacity =
                        "1";

                },
                180
            );

        },
        4200
    );

}


/* =========================================
   08. INITIALIZE
========================================= */

function initUnknown() {

    revealUnknownPage();

    startSignalLoop();

}


/* =========================================
   START
========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initUnknown
    );

}
else {

    initUnknown();

      }
