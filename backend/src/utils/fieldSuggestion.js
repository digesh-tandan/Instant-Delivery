// Levenshtein Distance

const levenshteinDistance = (

    source,

    target

) => {

    const matrix = [];

    const sourceLength = source.length;

    const targetLength = target.length;

    for (

        let i = 0;

        i <= targetLength;

        i++

    ) {

        matrix[i] = [i];

    }

    for (

        let j = 0;

        j <= sourceLength;

        j++

    ) {

        matrix[0][j] = j;

    }

    for (

        let i = 1;

        i <= targetLength;

        i++

    ) {

        for (

            let j = 1;

            j <= sourceLength;

            j++

        ) {

            if (

                target.charAt(i - 1) ===

                source.charAt(j - 1)

            ) {

                matrix[i][j] =

                    matrix[i - 1][j - 1];

            }

            else {

                matrix[i][j] = Math.min(

                    matrix[i - 1][j - 1] + 1,

                    matrix[i][j - 1] + 1,

                    matrix[i - 1][j] + 1

                );

            }

        }

    }

    return matrix[targetLength][sourceLength];

};

// Suggest Field

const getFieldSuggestion = (

    field,

    allowedFields

) => {

    let closestField = null;

    let minimumDistance = Infinity;

    for (

        const allowedField of allowedFields

    ) {

        const distance = levenshteinDistance(

            field,

            allowedField

        );

        if (

            distance < minimumDistance

        ) {

            minimumDistance = distance;

            closestField = allowedField;

        }

    }

    return minimumDistance <= 3

        ? closestField

        : null;

};

module.exports = {

    getFieldSuggestion

};