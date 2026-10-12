async function muatPartial(url, target) {
    const respon = await fetch(url);
    if (!respon.ok) throw new Error(`Gagal memuat ${url}`);
    target.innerHTML = await respon.text();
}

async function muatSemuaPartial() {
    const daftar = document.querySelectorAll('[data-include]');
    await Promise.all(
        Array.from(daftar).map(async (elemen) => {
            await muatPartial(elemen.dataset.include, elemen);
            // Ganti wrapper <div> dengan isi aslinya
            elemen.replaceWith(...elemen.childNodes);
        })
    );
}
//fungsi muat script 

function muatScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`Gagal memuat ${src}`));
        document.body.appendChild(s);
    });
}

//ini adalah komentar fungsi mulai

async function mulai() {
    try {
        await muatSemuaPartial();
        // Muat script fitur secara berurutan setelah partial siap
        await muatScript('js/tabs.js');
        await muatScript('js/konversi.js');
        await muatScript('js/saintifik.js');
    } catch (err) {
        console.error(err);
        document.body.innerHTML =
            `<p style="color:red;padding:20px;">${err.message}<br>
            Pastikan Anda menjalankan lewat local server (bukan file://).</p>`;
    }
}

document.addEventListener('DOMContentLoaded', mulai);