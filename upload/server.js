/**
 * https://juejin.im/post/5dff8a26e51d4558105420ed
 */

const CONFIG = require('./config'),
	bodyParser = require('body-parser'),
	multiparty = require('multiparty'),
	fs = require('fs'),
	path = require('path'),
	ejs = require('ejs');
const fsPromises = fs.promises

/*-CREATE SERVER-*/
const express = require('express'),
	app = express();

app.use(express.static(path.resolve(__dirname,'./upload1')))
app.engine('html', ejs.__express) // 使用EJS模板，不用配置该项。html模板需要配置
app.set('view engine','html')     // 调用render函数时能自动为我们加上’.html’ 后缀,若没设置，在render时需要手动补充完整文件名(detail.html)
app.set('views', path.join(__dirname, './upload1'));

app.listen(CONFIG.PORT, () => {
	console.log(`SERVICE IS OK ===> ${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
	const {
		ALLOW_ORIGIN,
		CREDENTIALS,
		HEADERS,
		ALLOW_METHODS
	} = CONFIG.CROS;
	res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
	res.header("Access-Control-Allow-Credentials", CREDENTIALS);
	res.header("Access-Control-Allow-Headers", HEADERS);
	res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
	req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});
app.use(bodyParser.urlencoded({
	extended: false,
	limit: '1024mb'
}));
app.use(bodyParser.json());

/*-API-*/
const upload_dir = path.resolve(__dirname,"img");

app.post('/single', (req, res) => {
	new multiparty.Form().parse(req, function (err, fields, file) {
		if (err) {
			res.send({
				code: 1,
				codeText: err
			});
			return;
		}
		const [chunk] = file.chunk,
            [filename] = fields.filename;

        if (!fs.existsSync(upload_dir)) {
            // 不存在目录就创建一个
            fs.mkdirSync(upload_dir);
        }

        const chunk_dir = `${upload_dir}/${filename}`;

		let readStream = fs.createReadStream(chunk.path),
			writeStream = fs.createWriteStream(chunk_dir);
        readStream.pipe(writeStream);
		readStream.on('end', function () {
			fs.unlinkSync(chunk.path);
        });
		res.json({
			code: 0,
			codeText: '',
			path: `http://127.0.0.1:${CONFIG.PORT}/img/${filename}`
		});
	});
});

app.post('/single2', (req, res) => {
	let {
		chunk,
		filename
	} = req.body;

	if (!fs.existsSync(upload_dir)) {
		// 不存在目录就创建一个
		fs.mkdirSync(upload_dir);
	}

	let chunk_dir = `${upload_dir}/${filename}`;
	chunk = decodeURIComponent(chunk).replace(/^data:image\/\w+;base64,/, "");
	chunk = Buffer.from(chunk, 'base64');
	fs.writeFileSync(chunk_dir, chunk);
	res.send({
		code: 0,
		codeText: '',
		path: `http://127.0.0.1:${CONFIG.PORT}/img/${filename}`
	});
});

app.post('/chunk', (req, res) => {
	new multiparty.Form().parse(req, function (err, fields, file) {
		if (err) {
			res.send({
				code: 1,
				codeText: err
			});
			return;
		}
		let [chunk] = file.chunk,
            [filename] = fields.filename;
		let filepath = filename.substring(0, filename.indexOf('-')),
			chunk_dir = `${upload_dir}/${filepath}`;
		
		// 递归创建文件夹
		const dirList = [upload_dir,chunk_dir];
		dirList.forEach((item) => {
			if (!fs.existsSync(item)) {
				fs.mkdirSync(path.resolve(__dirname,item));
			}
		})
		// if (!fs.existsSync(chunk_dir)) {
		// 	// 不存在目录就创建一个
		// 	fs.mkdirSync(chunk_dir);
		// }
		chunk_dir = `${upload_dir}/${filepath}/${filename}`;
		let readStream = fs.createReadStream(chunk.path),
            writeStream = fs.createWriteStream(chunk_dir);
        readStream.pipe(writeStream);
		readStream.on('end', function () {
			fs.unlinkSync(chunk.path);
		});
		res.send({
			code: 0,
			codeText: ''
		});
	});
});

app.post('/merge', (req, res) => {
	let {
		filename
	} = req.body;
	let dotIn = filename.lastIndexOf('.'),
		filepath = `${upload_dir}/${filename.substring(0,dotIn)}`,
		filenamePath = `${upload_dir}/${filename}`;
	fs.writeFileSync(filenamePath, '');
	let pathList = fs.readdirSync(filepath);
	pathList.sort((a, b) => a.localeCompare(b)).forEach(item => {
		fs.appendFileSync(filenamePath, fs.readFileSync(`${filepath}/${item}`));
		fs.unlinkSync(`${filepath}/${item}`);
	});
	fs.rmdirSync(filepath);
	res.send({
		code: 0,
		codeText: '',
		path: `http://127.0.0.1:${CONFIG.PORT}/img/${filename}`
	});
});

app.post('/verify', async (req, res) => {
	let {
        fileName,
        fileHash
	} = req.body;

    let chunk_dir = `${upload_dir}/${fileName}`;

	let flag = false;
	let uploadedList = [];
    try{
		const stat = await fsPromises.stat(chunk_dir)
        if(stat.isFile()){
            flag = true;
        }
    }catch {
		flag = false;
	}
	const resultPath = path.resolve(upload_dir,fileHash)
	uploadedList = fs.existsSync(resultPath) ? fs.readdirSync(resultPath) : [];

    res.send({
        code: flag ? 0 : -1,
		shouldUpload: flag ? true : false,
		uploadedList,
    })
});

app.use(express.static('./'));
app.use((req, res) => {
	res.status(404);
	res.send('NOT FOUND!');
});