import express from "express";
import axios from "axios"


const router = express.Router();

const fetchCoverImage = async (title) => {
    try {

        const apiURL = `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`

        const getResponse = await axios.get(apiURL);
        const coverIArray = await getResponse.data.docs.map(doc => doc.cover_i);
        const filteredCoverIArray = await coverIArray.filter(value => value !== undefined && value !== null);
        
        if (filteredCoverIArray.length > 0) {
            const imageURL = `https://covers.openlibrary.org/b/id/${filteredCoverIArray[0]}-M.jpg`
            console.log('GET Response:', imageURL);
            return imageURL
        }else{
            return "not found"
        }


    } catch (error) {
        console.error('Error:', error);
    }
}
router.get("/", async (req, res) => {

    const title = req.query.title
    const coverImageURL = await fetchCoverImage(title)

    res.json({
        cover: coverImageURL
    })
});

export default router;