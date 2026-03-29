import multer from 'multer'


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null,'./public/uplods')
    },
    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        callback(null, file.fieldname + '-' + uniqueSuffix)
    },
})


const upload = multer({storage:storage})

export default upload