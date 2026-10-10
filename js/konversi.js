// ================================
// 2. LOGIKA KONVERSI BILANGAN
// ================================
const inputDesimal = document.getElementById('input-desimal');
const inputBiner   = document.getElementById('input-biner');
const inputOktal   = document.getElementById('input-oktal');
const inputHexa    = document.getElementById('input-hexa');

const polaValid = {
    desimal: /^[0-9]*$/,
    biner:   /^[01]*$/,
    oktal:   /^[0-7]*$/,
    hexa:    /^[0-9A-Fa-f]*$/
};

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
            e.target.classList.add('error');
            setTimeout(() => e.target.classList.remove('error'), 300);
            e.target.value = nilai.slice(0, -1);
            return;
        }

        konversiAngka(nilai, item.basis);
    });
});