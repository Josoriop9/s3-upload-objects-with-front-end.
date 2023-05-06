const { Router } = require("express")
const { uploadFile } = require('./s3')

const router = Router();

router.get("/", (req, res) => res.send('welcome to server'));

router.post('/upload', async (req, res) => {

    const result = await uploadFile(req.files["photo"])
 
    console.log(result)

    res.send('archivo subido')
})


module.exports = router