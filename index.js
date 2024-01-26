let express = require("express")
let logger = require("morgan")
let passwordFuctions = require('./functions/passwordHashAndCompare')
// const cors = require('cors');
let cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken')
let vacciensData = require('./vaccineData/vaccinesData.json')
let app = express()

let doctorRoute = require("./routers/doctorRoute")
let userRoute = require("./routers/userRoute")
let loginRoute = require("./routers/loginRoute")
let medicalRecordRoute = require('./routers/medicalRecordRoute')
let registerRoute = require("./routers/registerRoute")
let errorHandler = require('./middlewares/errorHandler');
const { hash } = require("bcrypt");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
// app.use(cors());

app.use(logger("short"))

app.use((req, res, next) => {
	console.log("URL: "+req.url)
	next()
})

app.get('/', (req, res) => {
	let date = new Date();
	date.setDate(date.getDate() + +vacciensData.vaccines[2].data)
	let data = {
		"dateN":new Date(),
		"date": date,
		"days": +vacciensData.vaccines[2].data
	} 
	res.json(data)
})

app.post('/', async (req, res) => {
	console.log('1')
	dddd = await passwordFuctions.hashPassword('123')
	console.log(dddd)
	console.log(await passwordFuctions.comparePassword('124', dddd))
	// let textHash = bcrypt.hash('123', 5)
	// console.log('hash: '+textHash)
// bcrypt.compare('123', textHash).then(data => console.log(data)).catch(err => console.log(err))
	// console.log(req.body.text)
	// bcrypt.genSalt(5).then(salt => {
	// 	console.log(typeof salt)
	// 	return bcrypt.hash(req.body.text, salt)})
	// 	.then(hash => console.log(hash))
	// 	.catch(err => console.log(err))
})

app.use("/user", userRoute)
app.use('/doctor', doctorRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/child_medical_record', medicalRecordRoute);
app.get('/current', (req, res) => {
	console.log(JSON.parse(Buffer.from(req.cookies.token.split('.')[1], 'base64').toString()))
	res.json({message: "good"})
})

app.use(errorHandler)

app.listen (3000, () => {
})
	console.log("Express app stared on port 3000")

//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
//app.listen(port, () => console.log('Server listening on port ' + port));








/* app.get("/", (req, res) => {
	res.send({"name": "/"})
})



app.post("/singup",urlencodedParser, (req, res) => {
	console.log(req.body)
	medical_record = {
		"id_record": validations.idGenerated(req.body),
		"fullname":req.body.fullname,
		"birthdayChild":req.body.birthdayChild,
		"birthCertafictId":req.body.birthCertafictId,
		"addressChild":req.body.addressChild,
		"emailChild":req.body.emailChild,
		"phoneNumberChild":req.body.phoneNumberChild,
		"_idClinic":req.body._idClinic
		} 
	//userDAO.addUser(user)
	res.send(medical_record)
})

app.post("/update", urlencodedParser,async (req, res) => {
	console.log(typeof user)
	
	console.log(user)
	await userDAO.userUpadetEmail(user)
	res.send("good")
})

app.get("/hello/:who", (req, res) => {
	res.send({"name": req.params.who})
})

app.get ("/getAll", async (req, res) => {
	const results = await userDAO.getAllUsers()
	results.forEach(element => {
		console.log(typeof JSON.stringify(element))
	});
	resultsInJson = JSON.stringify(results)
	res.send(
		results)
})

app.use((req, res) => {
	res.statusCode = 404
	res.end("404!")
}) */