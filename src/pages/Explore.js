import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function Explore({ categories }) {
    console.log(categories);
    // const [categories, setCategories] = useState([]);
    // const [currentCategory, setCurrentCategory] = useState(null);

    const { menu, category, subcategory } = useParams();

    // console.log(menu, category, subcategory)

    useEffect(() => {
        if (categories.length > 0) {
            const currentCategory = categories.find(c => c.CatName === menu);
            const currentSubcategory = currentCategory.CategoriesArray.find(c => c.CatName === category);
            console.log(currentSubcategory);
        }
    }, [categories]);

    return (
        <div>Explore</div>
    )
}

export default Explore