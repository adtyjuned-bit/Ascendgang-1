/* =========================================
   NAINSAN WEBSITE
   SCRIPT.JS

   Fungsi utama:
   1. Membuat particle
   2. Menjalankan loading
   3. Mengubah text loading
   4. Menampilkan Welcome Screen
   5. Menjalankan efek kilat
   6. Membuka Main Menu
========================================= */


/* =========================================
   1. MENGAMBIL ELEMENT HTML
========================================= */


/*
   Mengambil element berdasarkan ID.

   Contoh:

   HTML:
   <div id="dust"></div>

   JavaScript:
   document.getElementById("dust")
*/

const dust = document.getElementById("dust");

const fill = document.getElementById("fill");

const pct = document.getElementById("pct");

const status = document.getElementById("status");

const next = document.getElementById("next");

const lightning = document.getElementById("lightning");

const mainMenu = document.getElementById("mainMenu");


/* =========================================
   2. SETTING LOADING
========================================= */


/*
   Semua tulisan yang muncul
   ketika loading berjalan.

   Kamu bisa bebas mengubahnya.
*/

const loadingTexts = [

    "opening the door...",

    "remembering your name...",

    "finding the way...",

    "the world is listening...",

    "you are here."

];


/*
   Jumlah particle.

   42 = normal

   Kalau mau lebih banyak:
   42 → 70

   Kalau mau lebih sedikit:
   42 → 20
*/

const particleAmount = 42;


/* =========================================
   3. MEMBUAT PARTICLE
========================================= */


/*
   Loop sebanyak particleAmount.

   Kalau particleAmount = 42,
   maka akan dibuat 42 particle.
*/

for (let i = 0; i < particleAmount; i++) {


    /*
       Membuat element <i> baru.
    */

    const particle =
        document.createElement("i");


    /*
       Memberikan class "dot".

       CSS .dot yang menentukan
       bentuk dan animasinya.
    */

    particle.className = "dot";


    /*
       Posisi horizontal random.

       Contoh:
       10%
       50%
       92%
    */

    particle.style.left =
        (Math.random() * 100) + "%";


    /*
       Posisi vertikal random.
    */

    particle.style.top =
        (60 + Math.random() * 45) + "%";


    /*
       Kecepatan particle.

       Semakin besar angka,
       semakin lambat particle.
    */

    particle.style.setProperty(
        "--duration",
        (7 + Math.random() * 8) + "s"
    );


    /*
       Membuat setiap particle
       mulai dari waktu berbeda.
    */

    particle.style.setProperty(
        "--delay",
        (-Math.random() * 12) + "s"
    );


    /*
       Arah pergerakan particle.
    */

    particle.style.setProperty(
        "--x",
        ((Math.random() - 0.5) * 160) + "px"
    );


    /*
       Masukkan particle ke
       dalam <div id="dust">
    */

    dust.appendChild(particle);
}


/* =========================================
   4. NILAI LOADING
========================================= */


/*
   Nilai awal loading.

   0 = belum mulai.
*/

let progress = 0;


/* =========================================
   5. MENJALANKAN LOADING
========================================= */


/*
   setInterval menjalankan kode
   berulang kali.

   170 = setiap 170 milidetik.
*/

const loadingTimer = setInterval(() => {


    /*
       Menambah progress.

       Angkanya random antara
       +2 sampai +6.

       Jadi loading tidak terasa
       terlalu kaku.
    */

    progress +=
        Math.floor(Math.random() * 5) + 2;


    /* =====================================
       CEK APAKAH SUDAH 100%
    ====================================== */

    if (progress >= 100) {


        /*
           Pastikan tidak lebih dari 100.
        */

        progress = 100;


        /*
           Hentikan timer loading.
        */

        clearInterval(loadingTimer);


        /*
           Isi progress bar sampai penuh.
        */

        fill.style.width = "100%";


        /*
           Tampilkan angka 100.
        */

        pct.textContent = "100";


        /*
           Text terakhir.
        */

        status.textContent =
            loadingTexts[4];


        /*
           Tunggu 900ms.

           Setelah itu Welcome Screen
           akan muncul.
        */

        setTimeout(() => {

            showWelcome();

        }, 900);


        return;
    }


    /* =====================================
       UPDATE PROGRESS BAR
    ====================================== */


    /*
       Mengubah panjang progress bar.
    */

    fill.style.width =
        progress + "%";


    /*
       Mengubah angka progress.

       5  → 05
       25 → 25
       80 → 80
    */

    pct.textContent =
        String(progress).padStart(2, "0");


    /* =====================================
       MENGUBAH TEXT LOADING
    ====================================== */


    /*
       Menentukan text berdasarkan
       persentase loading.
    */

    const textIndex =
        Math.min(
            3,
            Math.floor(progress / 25)
        );


    /*
       Masukkan text ke HTML.
    */

    status.textContent =
        loadingTexts[textIndex];


}, 170);


/* =========================================
   6. WELCOME SCREEN
========================================= */


/*
   Fungsi ini dipanggil ketika
   loading sudah selesai.
*/

function showWelcome() {


    /*
       Menampilkan Welcome Screen.

       CSS .next.show akan
       menjalankan animasinya.
    */

    next.classList.add("show");


    /*
       Tunggu 3 detik.

       Setelah Welcome tampil,
       kita masuk ke efek kilat.
    */

    setTimeout(() => {

        startLightning();

    }, 3000);
}


/* =========================================
   7. EFEK KILAT
========================================= */


/*
   Fungsi untuk memulai
   transisi dari Welcome
   menuju Main Menu.
*/

function startLightning() {


    /*
       Menambahkan class "active".

       CSS akan menjalankan
       animasi flash.
    */

    lightning.classList.add("active");


    /*
       Tunggu sampai efek kilat
       selesai.
    */

    setTimeout(() => {


        /*
           Sembunyikan Welcome Screen.
        */

        next.style.display = "none";


        /*
           Tampilkan Main Menu.
        */

        showMainMenu();


    }, 450);
}


/* =========================================
   8. MAIN MENU
========================================= */


/*
   Fungsi untuk membuka
   Main Menu.
*/

function showMainMenu() {


    /*
       Tambahkan class "show".

       CSS .main-menu.show
       akan menjalankan animasi.
    */

    mainMenu.classList.add("show");
}


/* =========================================
   9. BUTTON MAIN MENU
========================================= */


/*
   Mengambil semua tombol
   di dalam .menu-buttons
*/

const menuButtons =
    document.querySelectorAll(
        ".menu-buttons button"
    );


/*
   Loop setiap tombol.
*/

menuButtons.forEach((button) => {


    /*
       Ketika tombol diklik...
    */

    button.addEventListener("click", () => {


        /*
           Ambil data dari:

           data-menu="world"

           data-menu="about"

           dll.
        */

        const menuName =
            button.dataset.menu;


        /*
           Untuk sementara kita
           tampilkan di console.

           Nanti bagian ini akan
           kita sambungkan ke halaman
           masing-masing.
        */

        console.log(
            "Menu dipilih:",
            menuName
        );


    });

});
