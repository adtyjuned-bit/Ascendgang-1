/* =========================================
   NAINSAN — ARCHIVE.JS

   SECTION 05 — ARCHIVE

   Fungsi:
   01. CORE ELEMENT
   02. REVEAL ANIMATION
   03. RECORD INTERACTION
   04. RECORD DETAIL
   05. CLOSE DETAIL
   06. KEYBOARD SUPPORT
   07. REDUCED MOTION
   08. DETAIL STYLE
   09. INITIALIZE

   File:
   assets/archive/archive.js

   Catatan:
   File ini mengikuti langsung struktur
   archive.html + archive.css.

   Tidak mengubah CORE world.js.
========================================= */


/* =========================================
   01. CORE ELEMENT
========================================= */

const archivePage =
    document.querySelector(
        ".archive-page"
    );


const archiveItems =
    document.querySelectorAll(
        ".archive-item"
    );


const revealElements =
    document.querySelectorAll(
        "[data-reveal]"
    );


/* =========================================
   SAFETY CHECK
========================================= */

if (!archivePage) {

    console.warn(
        "Archive: .archive-page tidak ditemukan."
    );

}


/* =========================================
   02. REVEAL ANIMATION
========================================= */

function revealArchive() {

    if (!revealElements.length) {

        return;

    }


    /*
       Jika browser tidak mendukung
       IntersectionObserver, langsung
       tampilkan semua elemen.
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "revealed"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================
   03. RECORD INTERACTION
========================================= */

function setupArchiveRecords() {

    if (!archiveItems.length) {

        return;

    }


    archiveItems.forEach(
        (item, index) => {

            /*
               Accessibility
            */

            item.setAttribute(
                "tabindex",
                "0"
            );


            item.setAttribute(
                "role",
                "button"
            );


            /*
               Nomor record
            */

            item.dataset.record =
                String(index + 1);


            /*
               CLICK
            */

            item.addEventListener(
                "click",
                () => {

                    openArchiveRecord(
                        item
                    );

                }
            );


            /*
               KEYBOARD
            */

            item.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        event.preventDefault();

                        openArchiveRecord(
                            item
                        );

                    }


                    if (
                        event.key ===
                        " "
                    ) {

                        event.preventDefault();

                        openArchiveRecord(
                            item
                        );

                    }

                }
            );

        }
    );

}


/* =========================================
   04. OPEN RECORD
========================================= */

function openArchiveRecord(
    item
) {

    if (!item) {

        return;

    }


    /*
       Ambil data langsung dari HTML.

       Jadi HTML tetap menjadi
       sumber data utama.
    */

    const number =
        item.querySelector(
            ".archive-marker span"
        )?.textContent
        ?.trim() || "--";


    const type =
        item.querySelector(
            ".archive-date"
        )?.textContent
        ?.trim() || "ARCHIVE";


    const title =
        item.querySelector(
            ".archive-content h2"
        )?.textContent
        ?.trim() || "UNTITLED";


    const description =
        item.querySelector(
            ".archive-content p"
        )?.textContent
        ?.trim() || "";


    const tag =
        item.querySelector(
            ".archive-tag"
        )?.textContent
        ?.trim() || "RECORD";


    showArchiveDetail({

        number,

        type,

        title,

        description,

        tag

    });

}


/* =========================================
   05. CREATE DETAIL
========================================= */

function showArchiveDetail(
    data
) {

    /*
       Jangan izinkan popup
       bertumpuk.
    */

    const existing =
        document.querySelector(
            ".archive-detail-overlay"
        );


    if (existing) {

        existing.remove();

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "archive-detail-overlay";


    overlay.innerHTML = `

        <div
            class="archive-detail"
            role="dialog"
            aria-modal="true"
            aria-label="Archive Record"
        >

            <button
                class="archive-detail-close"
                type="button"
                aria-label="Close record"
            >
                ×
            </button>


            <span class="archive-detail-index">
                RECORD ${data.number}
            </span>


            <span class="archive-detail-type">
                ${data.type}
            </span>


            <h2>
                ${data.title}
            </h2>


            <div class="archive-detail-line"></div>


            <p>
                ${data.description}
            </p>


            <div class="archive-detail-footer">

                <span>
                    CLASSIFICATION
                </span>

                <strong>
                    ${data.tag}
                </strong>

            </div>

        </div>

    `;


    /*
       Masukkan ke dalam Archive.
    */

    archivePage.appendChild(
        overlay
    );


    /*
       Simpan kondisi overflow
       sebelum popup dibuka.
    */

    const previousOverflow =
        document.body.style.overflow;


    document.body.dataset.archiveOverflow =
        previousOverflow;


    document.body.style.overflow =
        "hidden";


    /*
       Trigger animation.
    */

    requestAnimationFrame(
        () => {

            overlay.classList.add(
                "show"
            );

        }
    );


    /*
       CLOSE BUTTON
    */

    const closeButton =
        overlay.querySelector(
            ".archive-detail-close"
        );


    closeButton.addEventListener(
        "click",
        () => {

            closeArchiveDetail(
                overlay
            );

        }
    );


    /*
       CLICK OUTSIDE
    */

    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                closeArchiveDetail(
                    overlay
                );

            }

        }
    );


    /*
       Focus close button.
    */

    setTimeout(
        () => {

            if (closeButton) {

                closeButton.focus();

            }

        },
        50
    );

}


/* =========================================
   06. CLOSE DETAIL
========================================= */

function closeArchiveDetail(
    overlay
) {

    if (!overlay) {

        return;

    }


    overlay.classList.remove(
        "show"
    );


    /*
       Kembalikan overflow
       ke kondisi sebelumnya.
    */

    const previousOverflow =
        document.body.dataset
            .archiveOverflow;


    document.body.style.overflow =
        previousOverflow || "";


    delete document.body.dataset
        .archiveOverflow;


    /*
       Tunggu animasi selesai
       baru hapus element.
    */

    setTimeout(
        () => {

            if (
                overlay &&
                overlay.parentNode
            ) {

                overlay.remove();

            }

        },
        350
    );

}


/* =========================================
   07. KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           ESC
        */

        if (
            event.key ===
            "Escape"
        ) {

            const detail =
                document.querySelector(
                    ".archive-detail-overlay"
                );


            if (detail) {

                closeArchiveDetail(
                    detail
                );

            }

        }

    }
);


/* =========================================
   08. REDUCED MOTION
========================================= */

function setupReducedMotion() {

    if (!archivePage) {

        return;

    }


    const mediaQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateMotion() {

        archivePage.classList.toggle(
            "reduced-motion",
            mediaQuery.matches
        );

    }


    updateMotion();


    if (
        mediaQuery.addEventListener
    ) {

        mediaQuery.addEventListener(
            "change",
            updateMotion
        );

    }
    else if (
        mediaQuery.addListener
    ) {

        mediaQuery.addListener(
            updateMotion
        );

    }

}


/* =========================================
   09. DETAIL POPUP STYLE
========================================= */

/*
   Karena lu minta Part 5.3 langsung
   gabung, style popup detail dibuat
   dari JavaScript.

   Jadi TIDAK perlu menambah CSS
   ke archive.css.
*/


const archiveDetailStyle =
    document.createElement(
        "style"
    );


archiveDetailStyle.id =
    "archive-detail-runtime-style";


archiveDetailStyle.textContent = `

/* =========================================
   ARCHIVE DETAIL OVERLAY
========================================= */

.archive-detail-overlay {

    position: fixed;

    inset: 0;

    z-index: 500;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background:
        rgba(3, 3, 3, .88);

    opacity: 0;

    visibility: hidden;

    transition:
        opacity .35s ease,
        visibility .35s ease;

}


.archive-detail-overlay.show {

    opacity: 1;

    visibility: visible;

}


/* =========================================
   DETAIL CARD
========================================= */

.archive-detail {

    position: relative;

    width:
        min(430px, 100%);

    padding:
        38px
        34px
        32px;

    background:

        linear-gradient(
            145deg,
            rgba(20, 13, 12, .98),
            rgba(7, 7, 7, .99)
        );

    border:
        1px solid
        rgba(155, 56, 51, .30);

    box-shadow:
        0 30px 80px
        rgba(0,0,0,.75);

    transform:
        translateY(18px)
        scale(.97);

    opacity: 0;

    transition:
        transform .4s ease,
        opacity .4s ease;

}


.archive-detail-overlay.show
.archive-detail {

    transform:
        translateY(0)
        scale(1);

    opacity: 1;

}


/* =========================================
   CLOSE
========================================= */

.archive-detail-close {

    position: absolute;

    top: 12px;

    right: 14px;

    width: 32px;

    height: 32px;

    border: none;

    background: transparent;

    color:
        rgba(238,232,223,.45);

    font-size: 26px;

    font-weight: 200;

    line-height: 1;

    cursor: pointer;

    transition:
        color .25s ease,
        transform .25s ease;

}


.archive-detail-close:hover {

    color: #fff;

    transform:
        rotate(90deg);

}


/* =========================================
   INDEX
========================================= */

.archive-detail-index {

    display: block;

    margin-bottom: 7px;

    font-size: 6px;

    letter-spacing: 3px;

    color:
        rgba(155,56,51,.75);

}


/* =========================================
   TYPE
========================================= */

.archive-detail-type {

    display: block;

    margin-bottom: 13px;

    font-size: 5px;

    letter-spacing: 3px;

    color:
        rgba(141,129,123,.42);

}


/* =========================================
   TITLE
========================================= */

.archive-detail h2 {

    margin: 0;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size:
        clamp(30px, 7vw, 43px);

    font-weight: 400;

    line-height: .95;

    color:
        #eee8df;

}


/* =========================================
   LINE
========================================= */

.archive-detail-line {

    width: 100%;

    height: 1px;

    margin: 23px 0;

    background:
        rgba(220,200,190,.10);

}


/* =========================================
   DESCRIPTION
========================================= */

.archive-detail p {

    margin: 0;

    font-size: 8px;

    line-height: 1.9;

    letter-spacing: .4px;

    color:
        rgba(141,129,123,.72);

}


/* =========================================
   FOOTER
========================================= */

.archive-detail-footer {

    display: flex;

    align-items: center;

    justify-content:
        space-between;

    gap: 15px;

    margin-top: 27px;

    padding-top: 14px;

    border-top:
        1px solid
        rgba(220,200,190,.08);

}


.archive-detail-footer span {

    font-size: 5px;

    letter-spacing: 2.5px;

    color:
        rgba(141,129,123,.35);

}


.archive-detail-footer strong {

    font-size: 6px;

    font-weight: 400;

    letter-spacing: 2px;

    color:
        rgba(155,56,51,.78);

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 600px) {

    .archive-detail-overlay {

        padding: 15px;

    }


    .archive-detail {

        padding:
            34px
            25px
            27px;

    }


    .archive-detail h2 {

        font-size: 31px;

    }


    .archive-detail p {

        font-size: 7px;

        line-height: 1.8;

    }

}


/* =========================================
   SMALL PHONE
========================================= */

@media (max-width: 380px) {

    .archive-detail {

        padding:
            31px
            21px
            24px;

    }


    .archive-detail h2 {

        font-size: 28px;

    }

}

`;


document.head.appendChild(
    archiveDetailStyle
);


/* =========================================
   10. INITIALIZE
========================================= */

function initializeArchive() {

    if (!archivePage) {

        return;

    }


    setupReducedMotion();

    revealArchive();

    setupArchiveRecords();

}


/* =========================================
   START
========================================= */

initializeArchive();
