//   Normalize date into YYYY-MM-DD
//  
//   Accepted formats:
//   YYYY-MM-DD
//   DD/MM/YYYY
//   DD-MM-YYYY
//   YYYY/MM/DD
 

const normalizeDate = (value) => {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;

    }

    if (typeof value !== "string") {

        return null;

    }

    value = value.trim();

    // Already ISO
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {

        return value;

    }

    // YYYY/MM/DD
    if (/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {

        return value.replace(/\//g, "-");

    }

    // DD/MM/YYYY or DD-MM-YYYY
    if (/^\d{2}[\/-]\d{2}[\/-]\d{4}$/.test(value)) {

        const separator = value.includes("/")
            ? "/"
            : "-";

        const [

            day,

            month,

            year

        ] = value.split(separator);

        return `${year}-${month}-${day}`;

    }

    return null;

};

module.exports = {

    normalizeDate

};