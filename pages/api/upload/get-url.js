import crypto from 'crypto'
const aws = require('aws-sdk')

export default function handler(req, res) {
    const { name, type } = req.query
    const uuid = crypto.randomUUID()
    const extension = name.split('.').pop()
    const fileName = `${uuid}.${extension || 'mp4'}`

    const credentials = {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION,
        signatureVersion: 'v4',
    }

    // console.log(credentials)

    const s3 = new aws.S3(credentials);

    const signingParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: type,
        ACL: 'public-read',
    };

    // console.log(signingParams)

    s3.getSignedUrl('putObject', signingParams, (err, data) => {
        if (err) {
            console.log(err);

            return res.status(400).json({
                error: err.message,
            })
        }

        return res.status(200).json({
            url: data,
            preview: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`,
            name: fileName,
        })
    });
}
