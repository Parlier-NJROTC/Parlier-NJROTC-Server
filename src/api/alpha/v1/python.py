from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import smtplib
import os
import tempfile
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
from datetime import datetime
from colorama import init, Fore, Style

#pip3 install flask
#pip3 werkzeug.utils
#pip3 smtplib
#pip3 tempfile
#pip3 install flask_cors
#pip3 install requests
#pip3 install python-dotenv
#pip3 install colorama

#Python3 src/Photos/python.py
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = tempfile.mkdtemp()

load_dotenv()
init(autoreset=True)

class EmailBot:
    def __init__(self):
        self.sender_email = "njrotcparlier@gmail.com"
        self.password = os.getenv("Password")
        self.recipients = ["18000644@parlierusd.org"]
        self.subject = "Image Upload Submission"
        self.current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.attachments = []

    def setup_smtp(self):
        self.server = smtplib.SMTP('smtp.gmail.com', 587)
        self.server.starttls()
        self.server.login(self.sender_email, self.password)

    def generate_receipt_html(self):
        return f"""
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }}
        .receipt {{
            text-align: center;
        }}
    </style>
    <div class="receipt">
        <h1 style="margin-left: 345px;">Photos Submitted</h1>
        <p style="font-size: 16px;margin-left: 350px;">Date: {self.current_time}</p>
        <hr style="border-top: 1px solid #ccc; border-bottom: none; margin: 20px 0;">
        <p>{len(self.attachments)} images attached</p>
    """

    def send_email(self):
        try:
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = ', '.join(self.recipients)
            msg['Subject'] = self.subject

            body = f"""
            <html>
                <body>
                    {self.generate_receipt_html()}
                    <p>This email contains {len(self.attachments)} uploaded images</p>
                </body>
            </html>
            """
            msg.attach(MIMEText(body, 'html'))

            for attachment in self.attachments:
                with open(attachment, 'rb') as file:
                    part = MIMEBase('application', 'octet-stream')
                    part.set_payload(file.read())
                    encoders.encode_base64(part)
                    part.add_header('Content-Disposition', 
                                  f'attachment; filename="{os.path.basename(attachment)}"')
                    msg.attach(part)

            self.setup_smtp()
            self.server.send_message(msg)
            self.server.quit()

            print(f"{Fore.GREEN}Email sent successfully to {', '.join(self.recipients)}")
            return True

        except Exception as e:
            print(f"{Fore.RED}Email error: {str(e)}")
            return False

@app.route('/upload', methods=['POST'])
def handle_upload():
    if 'images' not in request.files:
        return jsonify({'message': 'No files uploaded'}), 400

    files = request.files.getlist('images')
    email_bot = EmailBot()
    temp_files = []

    try:
        for file in files:
            if file.filename == '':
                continue
            filename = secure_filename(file.filename)
            temp_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(temp_path)
            email_bot.attachments.append(temp_path)
            temp_files.append(temp_path)

        if email_bot.send_email():
            for temp_file in temp_files:
                if os.path.exists(temp_file):
                    os.remove(temp_file)
            return jsonify({'message': f'Successfully sent {len(files)} images!'})
        
        return jsonify({'message': 'Failed to send email'}), 500

    except Exception as e:
        for temp_file in temp_files:
            if os.path.exists(temp_file):
                os.remove(temp_file)
        return jsonify({'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)