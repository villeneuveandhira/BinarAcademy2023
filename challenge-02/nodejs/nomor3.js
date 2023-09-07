const getAngkaTerbesarKedua = (data) => {
    // validasi terhadap tipe data parameter
    if (data == null) {
        // tidak ada parameter
        return "Error: Bro where is the parameter?";
    } else if (!Array.isArray(data) || data.length < 2) {
        // parameter minimal 2 index elements
        return "ERROR: Parameter is not an array with at least two elements";
    }
    
    // cara pertama untuk,
    // menghapus duplikasi dan mengurutkan array secara descending
    const sorted = Array.from(new Set(data)).sort((a, b) => b - a);

    // memeriksa jika hasil sorting tidak ada hasil
    if (sorted.length < 2) {
        return "ERROR: There is no second largest number in this array";
    }

    return sorted[1];
}

const dataAngka = [9,4,7,7,4,3,2,2,8]

/* EXPECTED RESULT */
console.log(getAngkaTerbesarKedua(dataAngka))
// => 8
console.log(getAngkaTerbesarKedua(0))
// => "ERROR : (Kamu jelasin ini errornya apa dan kenapa)"
console.log(getAngkaTerbesarKedua())
// => "ERROR : (Kamu jelasin ini errornya apa dan kenapa)"