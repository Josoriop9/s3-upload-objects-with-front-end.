const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const fs = require('fs') 

require('dotenv').config()

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const client = new S3Client({ region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      }, 
    });  

async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream,
}
 const command = new PutObjectCommand(uploadParams)
 return await client.send(command)
}

module.exports = {
    uploadFile
}