// ===================================================
// PENTING: ISI URL WEBHOOK DISCORD KAMU DI BAWAH INI
// ===================================================
const DISCORD_WEBHOOK_URL = "PASTE_WEBHOOK_DISCORD_KAMU_DI_SINI";


// ===================================================
// LOGIK KIRIM FORM KE DISCORD (JANGAN DIUBAH KECUALI PERLU)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const teamName = document.getElementById('teamName').value.trim();
      const captainName = document.getElementById('captainName').value.trim();
      const discordUser = document.getElementById('discord').value.trim();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerText = "Mengirim...";

      const payload = {
        username: "Ascend Bot",
        embeds: [
          {
            title: "🏆 Pendaftaran Tim Baru!",
            color: 16711765, // Warna Pink (HEX: #FF0055)
            fields: [
              { name: "Nama Tim", value: teamName, inline: true },
              { name: "Nama Kapten", value: captainName, inline: true },
              { name: "Username Discord", value: discordUser, inline: false }
            ],
            footer: { text: "Ascend Championship" },
            timestamp: new Date().toISOString()
          }
        ]
      };

      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          alert('Pendaftaran berhasil dikirim ke Discord!');
          form.reset();
        } else {
          alert('Gagal mengirim. Cek apakah Webhook Discord di script.js sudah diisi dengan benar.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan jaringan.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Kirim Pendaftaran via Discord";
      });
    });
  }

  // Smooth scroll saat navigasi diklik
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

