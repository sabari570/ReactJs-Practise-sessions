// Here is where all the transformation of the data occurs
export const selectCatgoryMap = (state) => state.category.categoriesArray
    .reduce(
        (acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },
        {} // -> inital value of the accumulator
    );