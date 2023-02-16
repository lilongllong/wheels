const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");
const { URL } = require("url");
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const rootPath = "/Users/tiannengyu/private/gitlab2/bigbox-mobapp-main/src/"
const exts = [".jpg", ".png"]
const max = 5200000; // 5MB
const maxNoTinyRatio = 0.7 //默认压缩后大小比例<0.7为未压缩图片

const getRandomIp = () => new Array(4).fill(0).map(() => parseInt(Math.random() * 255)).join(".");

const testNoTiny = (imgInfo) => imgInfo.output.ratio <= maxNoTinyRatio

const getImgList = (rootFolder) => {
    const imgList = [];
    function getFileList(folder) {
        const files = fs.readdirSync(folder)
        files.forEach(file => {
            const filePath = folder + file;
            const stats = fs.statSync(filePath)
            if (stats.size && stats.isFile() && exts.includes(path.extname(filePath))
            ) {
                imgList.push(filePath)
            }
            if (stats.isDirectory()) {
                getFileList(filePath + "/");
            }
        });
    }

    getFileList(rootFolder)

    return imgList;
}

async function fileUpload(imgPath) {
    return new Promise((resolve, reject) => {
        var req = https.request({
            method: "POST",
            hostname: "tinypng.com",
            path: "/web/shrink",
            headers: {
                rejectUnauthorized: false,
                "Postman-Token": Date.now(),
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
                "X-Forwarded-For": getRandomIp()
            }
        }, function (res) {
            res.on("data", buf => {
                let obj = JSON.parse(buf.toString());
                if (obj.error) {
                    reject(obj.error)
                } else {
                    resolve(obj)
                }
            });
        });
        req.write(fs.readFileSync(imgPath), "binary");
        req.on("error", e => { reject(e) });
        req.end();
    })
}

async function fileDownload(info) {
    return new Promise((resolve, reject) => {
        let options = new URL(info.output.url);
        let req = https.request(options, res => {
            let body = "";
            res.setEncoding("binary");
            res.on("data", function (data) {
                body += data;
            });

            res.on("end", function () {
                resolve(body)
            });
        });
        req.on("error", e => {
            reject(e)
        });
        req.end();
    })
}

async function fileUpdate(imgPath, body, info) {
    return new Promise((resolve, reject) => {
        fs.writeFile(imgPath, body, "binary", err => {
            if (err) {
                reject(err)
            }
            resolve(info)
        });
    })
}

const tinyImg = async (imgPath) => {
    const info = await fileUpload(imgPath)
    const imgData = await fileDownload(info)
    console.log(`[${imgPath}]压缩成功，原始大小${info.input.size / 1024}KB，压缩后大小${info.output.size / 1024}KB，优化比例${info.output.ratio}`);
    await fileUpdate(imgPath, imgData, info)
    return info
}

const tinyImgList = async (list) => {
    const successList = []
    const errorList = []
    await list.reduce(async (result, imgPath, imgIdx) => {
        await result
        console.log(`【${imgIdx + 1}/${list.length}】:开始压缩${imgPath}`)
        try {
            const imgInfo = await tinyImg(imgPath)
            successList.push(imgInfo)
        } catch (e) {
            console.log(e)
            console.log(`[${imgPath}]压缩失败`)
            errorList.push(imgPath)
        }
    }, Promise.resolve())
    const [inputSize, outputSize, noTinyCount] = successList.reduce(([input, output, count], item) => {
        return [input + item.input.size, output + item.output.size, count + (testNoTiny(item) ? 1 : 0)]
    }, [0, 0, 0])
    console.log(`完成压缩图片共[${successList.length}/${list.length}]张,推测项目中未压缩图片${noTinyCount}张,原图片总大小${inputSize / 1024}KB,压缩后图片总大小${outputSize / 1024}KB,共节约空间${(inputSize - outputSize) / 1024}KB`)


    if (errorList.length) {
        console.log(`失败个数:${errorList}, 列表: ${errorList}`)
    }
}

rl.question("图片压缩文件夹路径(例:/Users/tiannengyu/private/gitlab2/bigbox-mobapp-main/src/):", function (answer) {
    rl.close();
    const imgList = getImgList(answer)
    tinyImgList(imgList)
});
