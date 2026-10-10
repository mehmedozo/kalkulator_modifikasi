// ================================
// 1. LOGIKA PINDAH TAB
// ================================
const semuaTombolTab = document.querySelectorAll('.tombol-tab');
const semuaIsiTab = document.querySelectorAll('.isi-tab');

semuaTombolTab.forEach(tombol => {
    tombol.addEventListener('click', () => {
        semuaTombolTab.forEach(t => t.classList.remove('aktif'));
        semuaIsiTab.forEach(i => i.classList.remove('aktif'));
        tombol.classList.add('aktif');
        document.getElementById(tombol.dataset.target).classList.add('aktif');
    });
});