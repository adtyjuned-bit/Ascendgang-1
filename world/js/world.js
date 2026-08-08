/* =========================================
   NAINSAN — WORLD.JS

   Fungsi:
   1. Membuat particle
   2. Mengatur combination lock menu
   3. Swipe atas / bawah
   4. Klik menu
   5. Mengubah item aktif
   6. Menggerakkan lock-list
   7. Mengubah indicator
   8. Membuka section overlay
   9. Menutup section overlay
========================================= */


/* =========================================
   1. AMBIL ELEMENT HTML
========================================= */

const particles =
    document.getElementById("particles");

const lockList =
    document.getElementById("lockList");

const lockWindow =
    document.querySelector(".lock-window");

const lockItems =
    document.querySelectorAll(".lock-item");

const indicators =
    document.querySelectorAll(
        ".lock-indicator span"
    );

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
   2. PARTICLE SETTINGS
========================================= */

const particleAmount = 45;


/* =========================================
   3. MEMBUAT PARTICLE
========================================= */

for (let i = 0; i < particleAmount; i++) {

    const particle =
        document.createElement("i");

    particle.className = "particle";

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
        (Math.random() - 0.5) * 180 + "px"
    );

    particles.appendChild(particle);
}


/* =========================================
   4. DATA MENU
========================================= */

/*
   Isi informasi setiap menu.

   Nanti kalau mau mengubah isi overlay,
   cukup edit bagian ini.
*/

const sectionData = {

    profile: {

        number: "01",

        title: "PROFILE",

        text:
            "Discover who I am."

    },

    lore: {

        number: "02",

        title: "LORE",

        text:
            "Enter the story."

    },

    activities: {

        number: "03",

        title: "ACTIVITIES",

        text:
            "What is happening?"

    },

    gallery: {

        number: "04",

        title: "GALLERY",

        text:
            "Memories from the world."

    },

    archive: {

        number: "05",

        title: "ARCHIVE",

        text:
            "Lost memories."

    },

    secret: {

        number: "??",

        title: "UNKNOWN",

        text:
            "Something is waiting."

    }

};


/* =========================================
   5. LOCK SETTINGS
========================================= */

/*
   Nomor item yang sedang aktif.

   0 = PROFILE
   1 = LORE
   2 = ACTIVITIES
   dst.
*/

let activeIndex = 0;


/*
   Tinggi setiap item.

   CSS:

   desktop:
   75px

   mobile:
   65px

   Kita akan mendeteksi ukuran
   layar secara otomatis.
*/

function getItemHeight() {

    if (window.innerWidth <= 800) {

        return 65;

    }

    return 75;
}


/*
   Jarak antar item.

   Karena CSS .lock-item tidak
   menggunakan margin, gap dianggap 0.
*/

function getItemGap() {

    return 0;
}


/* =========================================
   6. UPDATE LOCK POSITION
========================================= */

function updateLock() {

    const itemHeight =
        getItemHeight();

    const gap =
        getItemGap();

    /*
       Item aktif harus berada
       di tengah lock-window.

       Kita ambil tinggi window.
    */

    const windowHeight =
        lockWindow.clientHeight;


    /*
       Posisi tengah window.
    */

    const center =
        windowHeight / 2;


    /*
       Posisi tengah item.
    */

    const itemCenter =
        itemHeight / 2;


    /*
       Jarak list dari atas.
    */

    const offset =
        center
        - itemCenter
        - (activeIndex * (itemHeight + gap));


    /*
       Geser seluruh list.
    */

    lockList.style.transform =
        `translateY(${offset}px)`;


    /*
       Update class active.
    */

    lockItems.forEach(
        (item, index) => {

            item.classList.toggle(
                "active",
                index === activeIndex
            );

        }
    );


    /*
       Update indicator.
    */

    updateIndicator();

}


/* =========================================
   7. UPDATE INDICATOR
========================================= */

function updateIndicator() {

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
   8. PINDAH MENU
========================================= */

function moveLock(direction) {

    /*
       direction:

       +1 = turun ke item berikutnya

       -1 = naik ke item sebelumnya
    */

    const newIndex =
        activeIndex + direction;


    /*
       Jangan melewati item pertama.
    */

    if (newIndex < 0) {

        return;

    }


    /*
       Jangan melewati item terakhir.
    */

    if (newIndex >= lockItems.length) {

        return;

    }


    /*
       Simpan index baru.
    */

    activeIndex = newIndex;


    /*
       Jalankan animasi.
    */

    updateLock();

}


/* =========================================
   9. KLIK MENU
========================================= */

lockItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            () => {

                /*
                   Kalau item bukan item aktif,
                   klik pertama hanya memindahkan
                   item tersebut ke tengah.
                */

                if (index !== activeIndex) {

                    activeIndex = index;

                    updateLock();

                    return;

                }


                /*
                   Kalau sudah aktif,
                   buka section.
                */

                const section =
                    item.dataset.section;

                openSection(section);

            }
        );

    }
);


/* =========================================
   10. SWIPE SYSTEM
========================================= */

let touchStartY = 0;

let touchEndY = 0;


/*
   Minimal jarak swipe.

   Semakin besar:
   semakin susah swipe.

   35px cocok untuk HP.
*/

const swipeThreshold = 35;


/* =========================================
   TOUCH START
========================================= */

lockWindow.addEventListener(
    "touchstart",
    (event) => {

        touchStartY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


/* =========================================
   TOUCH END
========================================= */

lockWindow.addEventListener(
    "touchend",
    (event) => {

        touchEndY =
            event.changedTouches[0].screenY;

        handleSwipe();

    },
    {
        passive: true
    }
);


/* =========================================
   HANDLE SWIPE
========================================= */

function handleSwipe() {

    const distance =
        touchStartY - touchEndY;


    /*
       Swipe UP

       Jari bergerak:
       bawah → atas

       distance menjadi positif.
    */

    if (distance > swipeThreshold) {

        moveLock(1);

        return;

    }


    /*
       Swipe DOWN

       Jari bergerak:
       atas → bawah

       distance menjadi negatif.
    */

    if (distance < -swipeThreshold) {

        moveLock(-1);

        return;

    }

}


/* =========================================
   11. KEYBOARD
========================================= */

/*
   Kalau dibuka lewat PC,
   keyboard juga bisa digunakan.

   Arrow Down = turun

   Arrow Up = naik

   Enter = buka menu
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowDown") {

            moveLock(1);

        }


        if (event.key === "ArrowUp") {

            moveLock(-1);

        }


        if (event.key === "Enter") {

            const item =
                lockItems[activeIndex];

            if (item) {

                openSection(
                    item.dataset.section
                );

            }

        }


        if (event.key === "Escape") {

            closeOverlay();

        }

    }
);


/* =========================================
   12. OPEN SECTION
========================================= */

function openSection(sectionName) {

    const data =
        sectionData[sectionName];


    /*
       Kalau data tidak ditemukan,
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

    sectionOverlay.classList.add("show");


    /*
       Kunci scroll body ketika overlay
       sedang terbuka.
    */

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   13. CLOSE SECTION
========================================= */

function closeOverlay() {

    sectionOverlay.classList.remove(
        "show"
    );


    /*
       Kembalikan scroll body.
    */

    document.body.style.overflow =
        "";

}


/* =========================================
   14. TOMBOL CLOSE
========================================= */

closeSection.addEventListener(
    "click",
    () => {

        closeOverlay();

    }
);


/* =========================================
   15. KLIK BACKGROUND OVERLAY
========================================= */

sectionOverlay.addEventListener(
    "click",
    (event) => {

        /*
           Hanya menutup kalau yang
           diklik adalah background overlay.

           Kalau klik isi section,
           tidak ditutup.
        */

        if (
            event.target === sectionOverlay
        ) {

            closeOverlay();

        }

    }
);


/* =========================================
   16. RESPONSIVE
========================================= */

/*
   Ketika HP diputar atau ukuran
   browser berubah, posisi lock
   dihitung ulang.
*/

window.addEventListener(
    "resize",
    () => {

        updateLock();

    }
);


/* =========================================
   17. INITIALIZE
========================================= */

/*
   Jalankan pertama kali ketika
   halaman selesai dimuat.
*/

updateLock();
