import os 
import datetime
import logging
import boto3
from dotenv import load_dotenv
from botocore.exceptions import ClientError
from botocore.config import Config

load_dotenv()

def create_presigned_post(bucket_name, object_name,
                          fields={}, conditions=[], expiration=3600):
    # Generate a presigned S3 POST URL
    my_config = Config(
    region_name = 'ap-south-1',
    signature_version = 's3v4',
    )
    s3_client = boto3.client('s3',
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key = os.getenv('AWS_SECRET_KEY'),
    config = my_config
    )
    print(object_name, "from create_presigned_post")
    try:
        response = s3_client.generate_presigned_post(bucket_name,
                                                     object_name,
                                                     Fields=fields,
                                                     Conditions=conditions,
                                                     ExpiresIn=expiration)
        print(response, "utils")
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL and required fields
    return response

def create_presigned_url(bucket_name, object_name, expiration=3600):
    """Generate a presigned URL to share an S3 object
    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
        print(response, "creating presigned url")
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response