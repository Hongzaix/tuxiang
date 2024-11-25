const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/compress', upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    const outputFilePath = path.join('compressed', `${Date.now()}-compressed.jpg`);

    sharp(filePath)
        .resize({ width: 500 }) // 调整大小
        .jpeg({ quality: 70 }) // 设置压缩质量
        .toFile(outputFilePath, (err, info) => {
            if (err) {
                return res.status(500).send('压缩失败');
            }
            res.download(outputFilePath, 'compressed.jpg', (err) => {
                if (err) {
                    console.error('下载失败:', err);
                }
            });
        });
});

app.listen(3000, () => {
    console.log('服务器已启动，访问 http://localhost:3000');
}); 