const dataPenjualanPakAldi = [
    {
        namaProduct : 'Sepatu Futsal Nike Vapor Academy 8',
        hargaSatuan : 760000,
        kategori : "Sepatu Sport",
        totalTerjual : 90,
    },
    {
        namaProduct : 'Sepatu Warrior Tristan Black Brown High - Original',
        hargaSatuan : 960000,
        kategori : "Sepatu Sneaker",
        totalTerjual : 37,
    },{
        namaProduct : 'Sepatu Warrior Tristan Maroon High - Original',
        hargaSatuan : 360000,
        kategori : "Sepatu Sneaker",
        totalTerjual : 90,
    },{
        namaProduct : 'Sepatu Warrior Rainbow Tosca Corduroy - [BNIB] Original',
        hargaSatuan : 120000,
        kategori : "Sepatu Sneaker",
        totalTerjual : 90,
    },
]

const hitungTotalPenjualan = (dataPenjualan) => {
    // validasi terhadap tipe data parameter
    if (!Array.isArray(dataPenjualan)) {
        // memastikan parameter adalah array
        return "ERROR: Parameter harus berupa array";
    }

    // untuk menghitung total penjualan
    let total = 0;
    for (const penjualan of dataPenjualan) {
        // memastikan totalTerjual ada dan bertipe number
        if (typeof penjualan.totalTerjual === 'number') {
            total += penjualan.totalTerjual;
        }
    }

    return total;
}

/* EXPECTED RESULT */
console.log(hitungTotalPenjualan(dataPenjualanPakAldi))
// => 307