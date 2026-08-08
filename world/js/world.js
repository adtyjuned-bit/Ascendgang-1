/* =========================================
   NAINSAN WORLD
   WORLD.JS
========================================= */


/* =========================================
   ELEMENT
========================================= */

const particles =
    document.getElementById("particles");

const sectionOverlay =
    document.getElementById("sectionOverlay");

const closeSection =
    document.getElementById("closeSection");

const sectionNumber =
    document.getElementById("sectionNumber");

const sectionTitle =
    document.getElementById("sectionTitle");

const sectionText =
    document.getElementById("sectionText");


/* =========================================
   PARTICLE SETTINGS
========================================= */


/*
   Jumlah particle.

   40 = normal
   70 = lebih ramai
   20 = lebih minimal
*/

const particleAmount = 40;


/* =========================================
   CREATE PARTICLES
========================================= */

for (
    let i = 0;
    i < particleAmount;
    i++
) {

    const particle =
        document.createElement("span");


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
        (Math.random() - .5) * 150 + "px"
    );


    particles.appendChild(particle);
}


/* =========================================
   WORLD SECTIONS
========================================= */


/*
   Semua informasi yang muncul
   ketika menu diklik.

   Nanti kita bisa ganti ini
   dengan halaman sebenarnya.
*/

const sections = {

    profile: {

        number: "01",

        title: "PROFILE",

        text:
            "Discover who I am, beyond the screen."

    },


    lore: {

        number: "02",

        title: "LORE",

        text:
            "Every world has a story. Mine is only beginning."

    },


    activities: {

        number: "03",

        title: "ACTIVITIES",

        text:
            "See what is happening inside my world."

    },


    gallery: {

        number: "04",

        title: "GALLERY",

        text:
            "A collection of memories, moments and creations."

    },


    archive: {

        number: "05",

        title: "ARCHIVE",

        text:
            "Old memories never truly disappear."

    },


    secret: {

        number: "??",

        title: "UNKNOWN",

        text:
            "You found something that was not supposed to be here."

    }

};


/* =========================================
   WORLD MENU
========================================= */


/*
   Ambil semua tombol World Menu.
*/

const worldButtons =
    document.querySelectorAll(
        ".world-menu button"
    );


/*
   Berikan event click
   ke setiap tombol.
*/

worldButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {


            /*
               Ambil nama section.

               Contoh:

               data-section="profile"

               hasil:

               profile
            */

            const section =
                button.dataset.section;


            /*
               Ambil data section
               dari object di atas.
            */

            const data =
                sections[section];


            /*
               Kalau datanya tidak ditemukan,
               hentikan fungsi.
            */

            if (!data) {

                return;

            }


            /*
               Masukkan nomor.
            */

            sectionNumber.textContent =
                data.number;


            /*
               Masukkan judul.
            */

            sectionTitle.textContent =
                data.title;


            /*
               Masukkan deskripsi.
            */

            sectionText.textContent =
                data.text;


            /*
               Tampilkan overlay.
            */

            sectionOverlay.classList.add(
                "show"
            );

        }
    );

});


/* =========================================
   CLOSE SECTION
========================================= */

closeSection.addEventListener(
    "click",
    () => {

        sectionOverlay.classList.remove(
            "show"
        );

    }
);


/* =========================================
   ESC KEY
========================================= */


/*
   Kalau user menekan tombol ESC,
   overlay ditutup.
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            sectionOverlay.classList.remove(
                "show"
            );

        }

    }
);
