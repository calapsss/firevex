import { string } from "zod";
import { S3, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";


export async function handleAvatarUpload(imageData: string, user_id: string) {
    const appVersion = process.env.NEXT_PUBLIC_APP_VERSION!;
    
    //Read the base64 image data into buffer
    const buffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const region = process.env.NEXT_PUBLIC_AWS_REGION!;
    const accessKeyId = process.env.NEXT_PUBLIC_AWS_IAM_USER_ACCESS_KEY!;
    const secretAccessKey = process.env.NEXT_PUBLIC_AWS_IAM_USER_SECRET_KEY!;
    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_USERS_PROFILE!;

    
    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
        throw new Error('AWS configuration is missing');
    }


    const s3client = new S3({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });

    const params = {
        Bucket: bucketName,
        Key: `${appVersion}/avatars/${user_id}/${Date.now()}.png`,
        Body: buffer,
        ContentType: 'image/png',
        Metadata: {
            user_id: user_id
        }
    };

    try {
        const data = await s3client.send(new PutObjectCommand(params));
        
        
        // Get the URL of the uploaded object
        const cloudfrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;
        const url = `${cloudfrontDomain}${params.Key}`;
        return url;
    } catch (err) {
        
        return err;
    }
}
