/* =========================================
   NAINSAN — WORLD.JS

   STRUKTUR:

   01. CORE ELEMENT
   02. PARTICLES
   03. MENU ENGINE
   04. SWIPE
   05. KEYBOARD
   06. POPUP ENGINE
   07. CLOSE ENGINE
   08. INITIALIZE

   BAGIAN PALING BAWAH:
   MENU CONFIG

   Kalau mau menambah section,
   cukup edit bagian CONFIG.
========================================= */


/* =========================================
   01. CORE ELEMENT
========================================= */

const particles =
    document.getElementById("particles");

const lockList =
    document.getElementById("lockList");

const lockWindow =
    document.querySelector(".lock-window");

const lockIndicator =
    document.getElementById("lockIndicator");

const sectionOverlay =
    document.getElementById("sectionOverlay");

const sectionPopup =
    document.getElementById("sectionPopup");

const sectionBody =
    document.getElementById("sectionBody");

const sectionLoader =
    document.getElementById("sectionLoader");

const closeSection =
    document.getElementById("closeSection");


/* =========================================
   02. PARTICLES CORE
========================================= */

const particleAmount = 45;


for (
    let i = 0;
    i < particleAmount;
    i++
) {

    const particle =
        document.createElement("i");


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    particle.style.setProperty(
        "--duration",
        8 + Math.random() * 10 + "s"
    );


    particle.style.setProperty(
        "--delay",
        -Math.random() * 10 + "s"
    );


    particle.style.setProperty(
        "--x",
        (Math.random() - .5) * 180 + "px"
    );


    particles.appendChild(
        particle
    );

}


/* =========================================
   03. MENU ENGINE
========================================= */

let activeIndex = 0;

let lockItems = [];


function buildMenu() {

    lockList.innerHTML = "";

    lockIndicator.innerHTML = "";


    /*
       Membuat menu dari CONFIG
    */

    WORLD_MENU.forEach(
        (menu, index) => {


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "lock-item";


            if (menu.secret) {

                button.classList.add(
                    "secret"
                );

            }


            if (index === activeIndex) {

                button.classList.add(
                    "active"
                );

            }


            button.dataset.section =
                menu.id;


            button.innerHTML = `

                <span class="number">
                    ${menu.number}
                </span>

                <span class="menu-info">

                    <span class="menu-name">
                        ${menu.name}
                    </span>

                    <span class="menu-description">
                        ${menu.description}
                    </span>

                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    if (
                        index !==
                        activeIndex
                    ) {

                        activeIndex =
                            index;

                        updateLock();

                        return;

                    }


                    openSection(
                        menu.id
                    );

                }
            );


            lockList.appendChild(
                button
            );


            /*
               Indicator
            */

            const indicator =
                document.createElement(
                    "span"
                );


            if (
                index === activeIndex
            ) {

                indicator.classList.add(
                    "current"
                );

            }


            lockIndicator.appendChild(
                indicator
            );

        }
    );


    lockItems =
        document.querySelectorAll(
            ".lock-item"
        );


    updateLock();

}


/* =========================================
   GET ITEM HEIGHT
========================================= */

function getItemHeight() {

    if (!lockItems.length) {

        return 68;

    }


    return lockItems[0]
        .offsetHeight;

}


/* =========================================
   UPDATE LOCK
========================================= */

function updateLock() {

    if (!lockItems.length) {

        return;

    }


    const itemHeight =
        getItemHeight();


    const windowHeight =
        lockWindow.clientHeight;


    const center =
        windowHeight / 2;


    const itemCenter =
        itemHeight / 2;


    const offset =
        center
        - itemCenter
        - (
            activeIndex *
            itemHeight
        );


    lockList.style.transform =
        `translateY(${offset}px)`;


    lockItems.forEach(
        (item, index) => {

            item.classList.toggle(
                "active",
                index === activeIndex
            );

        }
    );


    updateIndicator();

}


/* =========================================
   UPDATE INDICATOR
========================================= */

function updateIndicator() {

    const indicators =
        lockIndicator.querySelectorAll(
            "span"
        );


    indicators.forEach(
        (indicator, index) => {

            indicator.classList.toggle(
                "current",
                index === activeIndex
            );

        }
    );

}


/* =========================================
   MOVE LOCK
========================================= */

function moveLock(direction) {

    const newIndex =
        activeIndex + direction;


    if (newIndex < 0) {

        return;

    }


    if (
        newIndex >=
        lockItems.length
    ) {

        return;

    }


    activeIndex =
        newIndex;


    updateLock();

}


/* =========================================
   04. SWIPE SYSTEM
========================================= */

let touchStartY = 0;

let touchEndY = 0;


const swipeThreshold = 35;


lockWindow.addEventListener(
    "touchstart",
    (event) => {

        touchStartY =
            event.changedTouches[0]
                .screenY;

    },
    {
        passive: true
    }
);


lockWindow.addEventListener(
    "touchend",
    (event) => {

        touchEndY =
            event.changedTouches[0]
                .screenY;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const distance =
        touchStartY - touchEndY;


    if (
        distance >
        swipeThreshold
    ) {

        moveLock(1);

        return;

    }


    if (
        distance <
        -swipeThreshold
    ) {

        moveLock(-1);

    }

}


/* =========================================
   05. KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    (event) => {


        if (
            event.key ===
            "ArrowDown"
        ) {

            moveLock(1);

        }


        if (
            event.key ===
            "ArrowUp"
        ) {

            moveLock(-1);

        }


        if (
            event.key ===
            "Enter"
        ) {

            if (
                WORLD_MENU[activeIndex]
            ) {

                openSection(
                    WORLD_MENU[
                        activeIndex
                    ].id
                );

            }

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeOverlay();

        }

    }
);


/* =========================================
   06. POPUP ENGINE
========================================= */

async function openSection(
    sectionName
) {

    const section =
        WORLD_MENU.find(
            menu =>
                menu.id ===
                sectionName
        );


    if (!section) {

        return;

    }


    /*
       Tampilkan popup
    */

    sectionOverlay.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";


    /*
       Tampilkan loader
    */

    sectionLoader.style.display =
        "flex";


    sectionBody.innerHTML =
        "";


    /*
       Path HTML
    */

    const htmlPath =
        `assets/${section.folder}/${section.folder}.html`;


    try {

        const response =
            await fetch(
                htmlPath
            );


        if (!response.ok) {

            throw new Error(
                "HTML section tidak ditemukan."
            );

        }


        const html =
            await response.text();


        sectionBody.innerHTML =
            html;


        /*
           Load CSS section
        */

        loadSectionCSS(
            section.folder
        );


        /*
           Load JS section
        */

        loadSectionJS(
            section.folder
        );


    }
    catch (error) {

        sectionBody.innerHTML = `

            <div
                style="
                    padding:50px 30px;
                    text-align:center;
                "
            >

                <div
                    style="
                        font-size:8px;
                        letter-spacing:4px;
                        color:#9b3833;
                    "
                >
                    ERROR
                </div>

                <p
                    style="
                        margin-top:15px;
                        font-size:10px;
                        color:#756a65;
                    "
                >
                    Section belum tersedia.
                </p>

            </div>

        `;

        console.error(error);

    }


    sectionLoader.style.display =
        "none";

}


/* =========================================
   LOAD SECTION CSS
========================================= */

function loadSectionCSS(
    folder
) {

    const existing =
        document.getElementById(
            `section-css-${folder}`
        );


    if (existing) {

        return;

    }


    const link =
        document.createElement(
            "link"
        );


    link.id =
        `section-css-${folder}`;


    link.rel =
        "stylesheet";


    link.href =
        `assets/${folder}/${folder}.css`;


    document.head.appendChild(
        link
    );

}


/* =========================================
   LOAD SECTION JS
========================================= */

function loadSectionJS(
    folder
) {

    const existing =
        document.getElementById(
            `section-js-${folder}`
        );


    if (existing) {

        return;

    }


    const script =
        document.createElement(
            "script"
        );


    script.id =
        `section-js-${folder}`;


    script.src =
        `assets/${folder}/${folder}.js`;


    script.defer = true;


    document.body.appendChild(
        script
    );

}


/* =========================================
   07. CLOSE POPUP
========================================= */

function closeOverlay() {

    sectionOverlay.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =========================================
   CLOSE BUTTON
========================================= */

closeSection.addEventListener(
    "click",
    () => {

        closeOverlay();

    }
);


/* =========================================
   CLICK OUTSIDE
========================================= */

sectionOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            sectionOverlay
        ) {

            closeOverlay();

        }

    }
);


/* =========================================
   08. RESPONSIVE
========================================= */

window.addEventListener(
    "resize",
    () => {

        updateLock();

    }
);


/* =================================================
   =================================================
   CONFIG AREA
   =================================================

   MULAI DARI SINI.

   INI BAGIAN YANG NANTI PALING SERING LU EDIT.

   Core system di atas jangan disentuh.

   =================================================
================================================= */


/* =========================================
   WORLD MENU CONFIG
========================================= */

const WORLD_MENU = [

    /* =====================================
       PROFILE
    ====================================== */

    {

        id:
            "profile",

        folder:
            "profile",

        number:
            "01",

        name:
            "PROFILE",

        description:
            "Discover who I am.",

        secret:
            false

    },


    /* =====================================
       LORE
    ====================================== */

    {

        id:
            "lore",

        folder:
            "lore",

        number:
            "02",

        name:
            "LORE",

        description:
            "Enter the story.",

        secret:
            false

    },


    /* =====================================
       ACTIVITIES
    ====================================== */

    {

        id:
            "activities",

        folder:
            "activities",

        number:
            "03",

        name:
            "ACTIVITIES",

        description:
            "What is happening?",

        secret:
            false

    },


    /* =====================================
       GALLERY
    ====================================== */

    {

        id:
            "gallery",

        folder:
            "gallery",

        number:
            "04",

        name:
            "GALLERY",

        description:
            "Memories from the world.",

        secret:
            false

    },


    /* =====================================
       ARCHIVE
    ====================================== */

    {

        id:
            "archive",

        folder:
            "archive",

        number:
            "05",

        name:
            "ARCHIVE",

        description:
            "Lost memories.",

        secret:
            false

    },


    /* =====================================
       UNKNOWN
    ====================================== */

    {

        id:
            "secret",

        folder:
            "unknown",

        number:
            "??",

        name:
            "UNKNOWN",

        description:
            "Something is waiting.",

        secret:
            true

    }

];


/* =========================================
   INITIALIZE
========================================= */

buildMenu();
