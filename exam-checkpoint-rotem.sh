aws s3 --profile roteml cp s3://exam-checkpoint-rotem/rotem.txt /home/ubuntu/bucket.txt
if [ -e "/home/ubuntu/bucket.txt" ]; then
        if diff /home/ubuntu/rotem.txt /home/ubuntu/bucket.txt > /dev/null; then
                echo "identical files"
        else
                echo "not identical files"
                aws s3 --profile roteml cp "/home/ubuntu/rotem.txt" s3://exam-checkpoint-rotem/
        fi
else
        echo "no files in bucket"
        aws s3 --profile roteml cp "/home/ubuntu/rotem.txt" s3://exam-checkpoint-rotem/
fi