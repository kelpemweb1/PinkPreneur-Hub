// ==========================================================================
// 1. LOGIKA SYSTEM TOGGLE DARK MODE
// ==========================================================================
const toggleBtn = document.getElementById('dark-mode-toggle');
const currentTheme = localStorage.getItem('theme');

// Cek tema yang tersimpan di local storage pengguna
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

// Event listener untuk tombol switch tema
if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
            toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    });
}

// ==========================================================================
// 2. INTEGRASI LIVE SUBMIT FORM KE GOOGLE SHEETS (pinkpreneurhub)
// ==========================================================================
const scriptURL = 'https://script.google.com/macros/s/AKfycbx8ZBaUsyFwegKqUevKEeIzrbno2vIKbXGZL8pN6l1EXHpeOOb3yEP-wU6kqW0l-ytfWw/exec';
const form = document.getElementById('submit-to-google-sheet');
const btnSubmit = document.getElementById('btn-text');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Mengubah teks & menonaktifkan tombol agar tidak klik ganda (Double Submit)
        if (btnSubmit) {
            btnSubmit.innerHTML = 'Mengirim... <i class="fa-solid fa-spinner fa-spin"></i>';
            btnSubmit.disabled = true;
        }

        // Proses pengiriman data menggunakan Fetch API ke Google Apps Script
        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form)
        })
        .then(response => {
            // Notifikasi sukses
            alert('Terima kasih! Pesan teknis UMKM Anda telah diterima oleh Tim Mahasiswa UNAMA. Data berhasil diinput ke Google Sheets.');
            
            // Mengembalikan tombol ke keadaan semula
            if (btnSubmit) {
                btnSubmit.innerHTML = 'Kirim Sekarang <i class="fa-solid fa-paper-plane"></i>';
                btnSubmit.disabled = false;
            }
            form.reset(); // Mengosongkan form input kembali setelah berhasil
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Gagal mengirim pesan ke server. Silakan periksa koneksi internet Anda atau konfigurasi Apps Script.');
            
            // Mengembalikan tombol ke keadaan semula jika gagal
            if (btnSubmit) {
                btnSubmit.innerHTML = 'Kirim Sekarang <i class="fa-solid fa-paper-plane"></i>';
                btnSubmit.disabled = false;
            }
        });
    });
}

// ==========================================================================
// 3. LOGIKA FILTER DINAMIS GALERI PORTFOLIO
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class 'active' dari semua tombol filter terlebih dahulu
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan class 'active' ke tombol yang baru saja diklik
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Menyaring item portofolio berdasarkan kategori data
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    // Delay tipis agar transisi opacity halus saat elemen muncul kembali
                    setTimeout(() => { 
                        item.style.opacity = '1'; 
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    // Menunggu animasi opacity selesai sebelum menghilangkan display
                    setTimeout(() => { 
                        item.style.display = 'none'; 
                    }, 200);
                }
            });
        });
    });
}