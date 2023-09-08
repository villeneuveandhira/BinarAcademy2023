const checkTypeNumber = (givenNumber) => {
    // validasi terhadap tipe data parameter yang diterima
    if (typeof givenNumber === 'undefined' || givenNumber === null) {
        // *no parameter
        return "Error: Bro where is the parameter?";
    } else if (typeof givenNumber !== 'number' || isNaN(givenNumber)) {
        // *invalid data type
        return "Error: Invalid data type";
    }

    // memeriksa masukan apakah angka genap / ganjil
    if(givenNumber %2 === 0) {
        return "GENAP";
    } else {
        return "GANJIL";
    }
}

/* EXPECTED */
console.log(checkTypeNumber(10)) // => "GENAP"
console.log(checkTypeNumber(3)) // => "GANJIL"
console.log(checkTypeNumber("3")) // => "Error: Invalid data type"
console.log(checkTypeNumber({})) // => "Error: Invalid data type"
console.log(checkTypeNumber([])) // => "Error: Invalid data type"
console.log(checkTypeNumber()) // => "Error: Bro where is the parameter?"
