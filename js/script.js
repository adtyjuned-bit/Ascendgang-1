/* =========================================
   NAINSAN WEBSITE
   SCRIPT.JS

   Fungsi utama:
   1. Membuat particle
   2. Menjalankan loading
   3. Mengubah text loading
   4. Menampilkan Welcome Screen
   5. Menampilkan Sponsor Screen
   6. Menjalankan efek kilat
   7. Membuka Main Menu
========================================= */


/* =========================================
   1. MENGAMBIL ELEMENT HTML
========================================= */

const dust =
    document.getElementById("dust");

const fill =
    document.getElementById("fill");

const pct =
    document.getElementById("pct");

const status =
    document.getElementById("status");

const next =
    document.getElementById("next");

const sponsorScreen =
    document.getElementById("sponsorScreen");

const sponsorList =
    document.getElementById("sponsorList");

const lightning =
    document.getElementById("lightning");

const mainMenu =
    document.getElementById("mainMenu");


/* =========================================
   2. DATA SPONSOR
========================================= */


/*
   TAMBAHKAN SPONSOR DI SINI.

   Contoh:

   "Sponsor A",
   "Sponsor B",
   "Sponsor C"

   Tidak perlu mengubah HTML.
*/

const sponsors = [

    {
        image: "file_0000000068108211ab8f774a892c211c.png",
        name: "ASCEND SERVER DISCORD"
    },


];


/* =========================================
   3. SETTING LOADING
========================================= */

const loadingTexts = [

    "opening the door...",

    "remembering your name...",

    "finding the way...",

    "the world is listening...",

    "you are here."

];


const particleAmount = 42;


/* =========================================
   4. MEMBUAT PARTICLE
========================================= */

for (
    let i = 0;
    i < particleAmount;
    i++
) {

    const particle =
        document.createElement("i");

    particle.className =
        "dot";

    particle.style.left =
        (Math.random() * 100) + "%";

    particle.style.top =
        (60 + Math.random() * 45) + "%";

    particle.style.setProperty(
        "--duration",
        (7 + Math.random() * 8) + "s"
    );

    particle.style.setProperty(
        "--delay",
        (-Math.random() * 12) + "s"
    );

    particle.style.setProperty(
        "--x",
        ((Math.random() - 0.5) * 160) + "px"
    );

    dust.appendChild(particle);
}


/* =========================================
   5. NILAI LOADING
========================================= */

let progress = 0;


/* =========================================
   6. MENJALANKAN LOADING
========================================= */

const loadingTimer =
    setInterval(() => {

        progress +=
            Math.floor(Math.random() * 5) + 2;


        /* =====================================
           LOADING SELESAI
        ====================================== */

        if (progress >= 100) {

            progress = 100;

            clearInterval(
                loadingTimer
            );

            fill.style.width =
                "100%";

            pct.textContent =
                "100";

            status.textContent =
                loadingTexts[4];


            /*
               Tunggu 900ms
               lalu Welcome.
            */

            setTimeout(() => {

                showWelcome();

            }, 900);

            return;
        }


        /* =====================================
           UPDATE LOADING BAR
        ====================================== */

        fill.style.width =
            progress + "%";


        pct.textContent =
            String(progress)
                .padStart(2, "0");


        const textIndex =
            Math.min(
                3,
                Math.floor(progress / 25)
            );


        status.textContent =
            loadingTexts[textIndex];


    }, 170);


/* =========================================
   7. WELCOME SCREEN
========================================= */

function showWelcome() {

    /*
       Tampilkan Welcome.
    */

    next.classList.add("show");


    /*
       Tunggu 3 detik.
    */

    setTimeout(() => {

        showSponsors();

    }, 6000);

}


/* =========================================
   8. SPONSOR SCREEN
========================================= */

function showSponsors() {

    /*
       Kalau tidak ada sponsor,
       langsung ke lightning.
    */

    if (
        !sponsors ||
        sponsors.length === 0
    ) {

        startLightning();

        return;
    }


    /*
       Bersihkan daftar sponsor.
    */

    sponsorList.innerHTML = "";


    /*
       Buat setiap sponsor.
    */

    sponsors.forEach((sponsor) => {

    const sponsorElement =
        document.createElement("div");

    sponsorElement.className =
        "sponsor-item";


    const sponsorImage =
        document.createElement("img");

    sponsorImage.src =
        sponsor.image;

    sponsorImage.alt =
        sponsor.name;

    sponsorImage.className =
        "sponsor-image";


    const sponsorName =
        document.createElement("div");

    sponsorName.className =
        "sponsor-item-name";

    sponsorName.textContent =
        sponsor.name;


    sponsorElement.appendChild(
        sponsorImage
    );

    sponsorElement.appendChild(
        sponsorName
    );


    sponsorList.appendChild(
        sponsorElement
    );

});

    /*
       Tampilkan Sponsor Screen.
    */

    sponsorScreen.classList.add(
        "show"
    );


    /*
       Ambil semua sponsor.
    */

    const sponsorItems =
        document.querySelectorAll(
            ".sponsor-item"
        );


    /*
       Tampilkan sponsor satu per satu.
    */

    let currentSponsor = 0;


    function showNextSponsor() {

        /*
           Semua sponsor sudah selesai.
        */

        if (
            currentSponsor >=
            sponsorItems.length
        ) {

            setTimeout(() => {

                sponsorScreen.classList.add(
                    "hide"
                );


                setTimeout(() => {

                    startLightning();

                }, 1000);

            }, 800);

            return;
        }


        /*
           Tampilkan sponsor sekarang.
        */

        const current =
            sponsorItems[currentSponsor];


        current.classList.add(
            "active"
        );


        /*
           Setelah 2 detik,
           tampilkan sponsor berikutnya.
        */

        currentSponsor++;


        setTimeout(() => {

            current.classList.remove(
                "active"
            );

            current.style.opacity =
                "0";

            showNextSponsor();

        }, 2000);

    }


    /*
       Mulai sponsor setelah
       screen muncul.
    */

    setTimeout(() => {

        showNextSponsor();

    }, 700);

}


/* =========================================
   9. EFEK KILAT
========================================= */

function startLightning() {

    /*
       Hilangkan Welcome.
    */

    next.style.display =
        "none";


    /*
       Jalankan lightning.
    */

    lightning.classList.add(
        "active"
    );


    /*
       Setelah efek selesai,
       masuk Main Menu.
    */

    setTimeout(() => {

        showMainMenu();

    }, 450);

}


/* =========================================
   10. MAIN MENU
========================================= */

function showMainMenu() {

    mainMenu.classList.add(
        "show"
    );

}


/* =========================================
   11. MAIN MENU NAVIGATION
========================================= */

const menuButtons =
    document.querySelectorAll(
        ".menu-buttons button[data-page]"
    );


menuButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;

            window.location.href =
                page;

        }
    );

});
