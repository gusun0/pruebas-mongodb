const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ModelImagen = require('./model_imagen');
const fileUpload = require('express-fileupload');

const app = express();
// Middleware
app.use(bodyParser.json());

app.use(fileUpload({
	limits: {fileSize: 50 * 1024 * 1024}
}));

app.get('/', (req,res) => {

	let data = {
		producto_nombre:  'Polos'
	}

	new ModelImagen(data).save( (err,result) => {
		console.log(err);
		console.log(result);
	
	});

	res.json({
		message: 'Hola Mundo'
	});	
});

app.post('/upload/:id', (req,res) => {
	
	let variable = req.params.id;
	let body = req.body.producto;
	let imagen = req.files.imagen;

	let data = {
		producto_nombre: req.body.nombre

	}


	let modelImagen = new ModelImagen(data);
	
	modelImagen.imagen.data = req.files.imagen.data;
	modelImagen.imagen.contentType = req.files.imagen.mimetype;

	modelImagen.save((err,response) => {
		if(err){
	res.json({
		err: err,
		body: body
	});	

	}

	res.json({
		result: true
	});	
	
	});



});


app.get('/imagen/:id',(req,res) => {

   ModelImagen.findById(req.params.id).exec((err,doc) => {
	   if(err){
		   res.json({
			   err: err,
		   });
	   }

	   console.log('imagen',doc);

	   res.set('Content-Type',doc.imagen.contentType);

	   return res.send(doc.imagen.data);


   
   });

});

app.get('/productos', (req,res) => {
	res.json({
		data: {
			nombre: 'mike'
		}
	
	});
});

mongoose.connect('mongodb+srv://gusun0:linux@test-cluster1.h89rf.mongodb.net/imagenes?retryWrites=true&w=majority',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	console.log('MongoDB OK!');
});




app.listen(3000, () => {
	console.log('Server ok!');
});
