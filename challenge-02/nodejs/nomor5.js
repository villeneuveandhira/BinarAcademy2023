// data:
const dataPenjualanNovel = [
    {
        idProduct: 'BOOK002421',
        namaProduk: 'Pulang - Pergi',
        penulis: 'Tere Liye',
        hargaBeli: 60000,
        hargaJual: 86000,
        totalTerjual: 150,
        sisaStok: 17,
    },
    {
        idProduct: 'BOOK002351',
        namaProduk: 'Selamat Tinggal',
        penulis: 'Tere Liye',
        hargaBeli: 75000,
        hargaJual: 103000,
        totalTerjual: 171,
        sisaStok: 20,
    },
    {
        idProduct: 'BOOK002941',
        namaProduk: 'Garis Waktu',
        penulis: 'Fiersa Besari',
        hargaBeli: 67000,
        hargaJual: 99000,
        totalTerjual: 213,
        sisaStok: 5,
    },
    {
        idProduct: 'BOOK002871',
        namaProduk: 'Laskar Pelangi',
        penulis: 'Andrea Hirata',
        hargaBeli: 55000,
        hargaJual: 68000,
        totalTerjual: 20,
        sisaStok: 56,
    },
];

const getInfoPenjualan = (dataPenjualan) => {
    // validasi terhadap tipe data parameter
    if (!Array.isArray(dataPenjualan)) {
        return "ERROR: Parameter harus berupa array";
    }

    // menghitung total modal dan total penjualan
    let totalModal = 0;
    let totalKeuntungan = 0;
    
    for (const penjualan of dataPenjualan) {
        // memastikan properti hargaBeli, hargaJual, dan totalTerjual ada dan bertipe number
        if (
            typeof penjualan.hargaBeli === 'number' &&
            typeof penjualan.hargaJual === 'number' &&
            typeof penjualan.totalTerjual === 'number'
        ) {
            // menghitung total modal dan total keuntungan
            totalModal += penjualan.hargaBeli * (penjualan.totalTerjual + penjualan.sisaStok);
            totalKeuntungan += (penjualan.hargaJual - penjualan.hargaBeli) * penjualan.totalTerjual;
        }
    }

    // menghitung persentase keuntungan
    const persentaseKeuntungan = ((totalKeuntungan / totalModal) * 100).toFixed(2) + "%";

    // format totalModal dan totalKeuntungan menjadi format Rupiah
    const formattedTotalModal = 'Rp. ' + totalModal.toLocaleString();
    const formattedKeuntungan = 'Rp. ' + totalKeuntungan.toLocaleString();

    // mencari produk buku terlaris
    const produkBukuTerlaris = dataPenjualan.reduce((prevData, currentData) => {
        return currentData.totalTerjual > prevData.totalTerjual ? currentData : prevData;
    }, dataPenjualan[0]);

    // mencari penulis paling laris
    const totalPenjualanPenulis = [];

    // looping data penjualan novel
    dataPenjualan.forEach((item) => {
        // init
        const { penulis, totalTerjual } = item;
        const existingItem = totalPenjualanPenulis.find((element) => element.penulis === penulis);

        // untuk setiap buku yang sama penulisnya akan dijumlahkan
        if (existingItem) {
            // dijumlahkan buku total terjualnya
            existingItem.totalTerjual += totalTerjual;
        } else {
            // disimpan di variabel total penjualan penulis
            totalPenjualanPenulis.push({ penulis, totalTerjual });
        }
    });

    // mencari penulis terlaris
    const penulisTerlaris = totalPenjualanPenulis.reduce((prev, current) => {
        return prev.totalTerjual > current.totalTerjual ? prev : current;
    });

    // output
    return {
        totalKeuntungan: formattedKeuntungan,
        totalModal: formattedTotalModal,
        persentaseKeuntungan: persentaseKeuntungan,
        produkBukuTerlaris: produkBukuTerlaris.namaProduk,
        penulisTerlaris: penulisTerlaris.penulis,
    };
}

/* EXPECTED RESULT */
console.log(getInfoPenjualan(dataPenjualanNovel));
// => OBJECT dengan format seperti yang disebutkan diatas