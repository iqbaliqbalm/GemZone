document.addEventListener('DOMContentLoaded', () => {
    const gameItems = document.querySelectorAll('.game-item');

    // Tugas utama: Ketika item game diklik, arahkan ke halaman top-up spesifik
    gameItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Mencegah navigasi default jika ini adalah anchor <a>
            event.preventDefault(); 
            
            // Ambil nama file tujuan dari atribut href (misal: 'topup-mlbb.html')
            const targetPage = item.getAttribute('href'); 
            
            // Lakukan navigasi
            window.location.href = targetPage;
        });
    });
});