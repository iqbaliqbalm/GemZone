document.addEventListener('DOMContentLoaded', () => {
    // Variabel Utama
    const diamondButtons = document.querySelectorAll('.diamond-btn');
    const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
    const ringkasanOrder = document.getElementById('ringkasan-order');
    
    // Inisialisasi default karena ini adalah halaman spesifik Free Fire
    let selectedGameName = "Free Fire"; 
    let selectedNominal = null;
    let selectedPrice = null;

    // --- FUNGSI PEMILIHAN DIAMOND ---
    diamondButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // Hapus kelas 'active' dari semua tombol
            diamondButtons.forEach(btn => btn.classList.remove('active'));

            // Tambahkan kelas 'active' pada tombol yang diklik
            button.classList.add('active');

            // Simpan nominal dan harga
            selectedNominal = button.getAttribute('data-nominal');
            selectedPrice = button.getAttribute('data-harga');
            
            updateOrderSummary();
        });
    });
    
    // --- FUNGSI UPDATE RINGKASAN ---
    function updateOrderSummary() {
        if (selectedNominal) {
            const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(selectedPrice);
            ringkasanOrder.innerHTML = `
                **DETAIL ORDER:** <br>
                Game: ${selectedGameName} <br>
                Nominal: ${selectedNominal} <br>
                Total Harga: ${priceFormatted}
            `;
        } else {
            ringkasanOrder.textContent = "Detail Order: Belum dipilih.";
        }
    }

    // --- FUNGSI ORDER VIA WHATSAPP (KUNCI SISTEM MANUAL) ---
    whatsappOrderBtn.addEventListener('click', () => {
        const gameId = document.getElementById('game-id').value;
        const zoneId = document.getElementById('zone-id').value || 'Tidak Ada';
        const waNumber = document.getElementById('whatsapp-number').value;
        const paymentMethod = document.getElementById('payment-method').value;

        // Validasi Minimal
        if (!selectedNominal || !gameId || !waNumber || !paymentMethod) {
            alert('Harap lengkapi semua data (Nominal, ID, WhatsApp, dan Pembayaran) sebelum checkout.');
            return;
        }

        // --- KONFIGURASI WHATSAPP ANDA ---
        const yourWaNumber = "6289654042981"; // GANTI DENGAN NOMOR WHATSAPP ANDA!

        // Format pesan
        const message = `
*ORDER MASUK GEMZONE (MANUAL)*

Halo Admin, saya ada orderan masuk:

====================
*DETAIL PELANGGAN:*
Nomor WA: ${waNumber}
Game: ${selectedGameName}
ID Game: ${gameId} (Zone ID: ${zoneId})

*DETAIL ORDER:*
Nominal: ${selectedNominal}
Total Bayar: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(selectedPrice)}
Metode Pembayaran: ${paymentMethod}
====================

Mohon segera balas pesan ini untuk memberikan instruksi pembayaran. Terima kasih.
        `.trim();

        // Encoding pesan untuk URL
        const encodedMessage = encodeURIComponent(message);
        
        // Buat link WhatsApp
        const waLink = `https://wa.me/${yourWaNumber}?text=${encodedMessage}`;
        
        // Arahkan browser ke link WhatsApp
        window.open(waLink, '_blank');
        
        // Opsional: Memberi tahu pelanggan
        alert('Order Anda telah dikirim via WhatsApp! Mohon tunggu balasan dari Admin untuk instruksi pembayaran.');
    });
});