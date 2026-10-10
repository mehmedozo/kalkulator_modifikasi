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

// ================================
// 2. LOGIKA KONVERSI BILANGAN
// ================================
const inputDesimal = document.getElementById('input-desimal');
const inputBiner   = document.getElementById('input-biner');
const inputOktal   = document.getElementById('input-oktal');
const inputHexa    = document.getElementById('input-hexa');

// Pola yang boleh diketik pada masing-masing basis
const polaValid = {
    desimal: /^[0-9]*$/,
    biner:   /^[01]*$/,
    oktal:   /^[0-7]*$/,
    hexa:    /^[0-9A-Fa-f]*$/
};

// Fungsi mengubah angka dari satu basis ke basis lain
function konversiAngka(nilai, basis) {
    if (!nilai) {
        inputDesimal.value = '';
        inputBiner.value = '';
        inputOktal.value = '';
        inputHexa.value = '';
        return;
    }

    try {
        let nilaiDesimal;
        if (basis === 10) nilaiDesimal = BigInt(nilai);
        else if (basis === 16) nilaiDesimal = BigInt('0x' + nilai);
        else if (basis === 2)  nilaiDesimal = BigInt('0b' + nilai);
        else if (basis === 8)  nilaiDesimal = BigInt('0o' + nilai);

        if (basis !== 10) inputDesimal.value = nilaiDesimal.toString(10);
        if (basis !== 2)  inputBiner.value   = nilaiDesimal.toString(2);
        if (basis !== 8)  inputOktal.value   = nilaiDesimal.toString(8);
        if (basis !== 16) inputHexa.value    = nilaiDesimal.toString(16).toUpperCase();
    } catch (e) {
        // Diamkan saja kalau terjadi error
    }
}

// Pasang pengawas input pada setiap kolom
const daftarInput = [
    { elemen: inputDesimal, basis: 10, kunci: 'desimal' },
    { elemen: inputBiner,   basis: 2,  kunci: 'biner' },
    { elemen: inputOktal,   basis: 8,  kunci: 'oktal' },
    { elemen: inputHexa,    basis: 16, kunci: 'hexa' }
];

daftarInput.forEach(item => {
    item.elemen.addEventListener('input', (e) => {
        const nilai = e.target.value.trim();

        if (!polaValid[item.kunci].test(nilai)) {
            // Tandai input salah, lalu hapus karakter terakhir
            e.target.classList.add('error');
            setTimeout(() => e.target.classList.remove('error'), 300);
            e.target.value = nilai.slice(0, -1);
            return;
        }

        konversiAngka(nilai, item.basis);
    });
});

// ================================
// 3. LOGIKA KALKULATOR SAINTIFIK
// ================================
const layarSaintifik = document.getElementById('layar-saintifik');
const semuaTombolSaintifik = document.querySelectorAll('.papan-tombol .tombol');

let ekspresi = ''; // teks rumus yang sedang diketik

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

// Mengubah simbol matematika menjadi format JavaScript
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

// Melengkapi tanda kurung yang belum ditutup
function lengkapiKurung(teks) {
    const buka  = (teks.match(/\(/g) || []).length;
    const tutup = (teks.match(/\)/g) || []).length;
    return teks + ')'.repeat(Math.max(0, buka - tutup));
}

// Menghitung isi ekspresi
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