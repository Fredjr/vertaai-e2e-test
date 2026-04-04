import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const s3 = new S3Client({ region: 'us-east-1' });
const secrets = new SecretsManagerClient({ region: 'us-east-1' });

/**
 * Upload a user avatar to S3.
 * Uses s3_write (PutObjectCommand) and secret_read (GetSecretValueCommand).
 */
export async function uploadUserAvatar(userId: string, file: Buffer) {
  // Read the bucket name from secrets
  const secret = await secrets.send(new GetSecretValueCommand({
    SecretId: 'prod/s3/bucket-config',
  }));
  const config = JSON.parse(secret.SecretString || '{}');

  await s3.send(new PutObjectCommand({
    Bucket: config.bucketName,
    Key: `avatars/${userId}.png`,
    Body: file,
    ContentType: 'image/png',
  }));

  return { success: true, key: `avatars/${userId}.png` };
}
