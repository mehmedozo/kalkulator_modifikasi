// ================================
// 3. LOGIKA KALKULATOR SAINTIFIK
// ================================
const layarSaintifik = document.getElementById('layar-saintifik');
const semuaTombolSaintifik = document.querySelectorAll('.papan-tombol .tombol');

let ekspresi = '';

semuaTombolSaintifik.forEach(tombol => {
    tombol.addEventListener('click', () => {
        const aksi = tombol.dataset.aksi;
        const nilai = tombol.dataset.nilai;

        if (aksi === 'hapus-semua') {
            ekspresi = '';
            layarSaintifik.value = '';
        }
        else if (aksi === 'hapus-satu') {
            ekspresi = ekspresi.slice(0, -1);
            layarSaintifik.value = ekspresi;
        }
        else if (aksi === 'hitung') {
            hitungEkspresi();
        }
        else {
            ekspresi += nilai;
            layarSaintifik.value = ekspresi;
        }
    });
});

function ubahKeFormatJS(teks) {
    return teks
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');
}

function lengkapiKurung(teks) {
    const buka  = (teks.match(/\(/g) || []).length;
    const tutup = (teks.match(/\)/g) || []).length;
    return teks + ')'.repeat(Math.max(0, buka - tutup));
}

function hitungEkspresi() {
    if (!ekspresi) return;

    try {
        let rumusJS = ubahKeFormatJS(ekspresi);
        rumusJS = lengkapiKurung(rumusJS);

        let hasil = new Function('return ' + rumusJS)();
        hasil = Math.round(hasil * 1e10) / 1e10;

        layarSaintifik.value = hasil;
        ekspresi = hasil.toString();
    } catch (e) {
        layarSaintifik.value = 'Error';
        setTimeout(() => layarSaintifik.value = ekspresi, 1500);
    }
}