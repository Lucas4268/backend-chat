const { response } = require("express");
const formidable = require("formidable");
const cloudinary = require('cloudinary').v2

cloudinary.config( process.env.CLOUDINARY_URL || '' );

const saveFile = async( file ) => {
  let secure_url = ''
  console.log({file})

  try {
    const res = await cloudinary.uploader.upload( file.filepath, {folder: 'chatapp', transformation:{quality: 30}} );
    secure_url = res.secure_url
  } catch (error) {
    console.log({error})
  }
  return secure_url;
};

const parseFiles = async(req) => {
  return new Promise((resolve, reject) => {

    const form = new formidable.IncomingForm();
    form.parse( req, async( err, fields, files ) => {
      if ( err ) {
        console.log({err})
        return reject( err );
      }

      const filePath = await saveFile( files.file );
      console.log({filePath})
      resolve( filePath );
    })
  })
};

const uploadImage = async( req, res = response ) => {
  const imageUrl = await parseFiles( req );
  console.log({imageUrl})
  

  return res.status(200).json({ img: imageUrl });
} 

module.exports = uploadImage