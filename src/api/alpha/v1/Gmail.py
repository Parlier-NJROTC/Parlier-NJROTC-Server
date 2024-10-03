import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
import os
from datetime import datetime
from colorama import init, Fore, Style

#you NEED PYTHON AND INSTALL THIS FRIST BEFORE RUNNING python3 Gmail.py

#Steps on Running this Clown show

#pip3 install pause
#pip3 install requests
#pip3 install python-dotenv
#pip3 install colorama
#python3 src/api/alpha/v1/Gmail.py


load_dotenv()
init(autoreset=True)

current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#Temp Var
UserLastName = "Sanchez"
rank = "Seaman Recurit"

Full_title = rank + " " + UserLastName
os.system('clear') #Remove this Later this is for Looks in case I need to show it.
print(f"{Fore.RED}-Saul Sanchez{Fore.MAGENTA} I Love you StackoverFlow and the random people from {Style.BRIGHT}8+ year ago") #This is A Check to see if my Code is Running. 

class EmailBot:
    def __init__(self):
        self.image_path = None
        self.sender_email = "njrotcparlier@gmail.com" 
        self.password = os.getenv("Password")  #U Need 2-Step thing and make it a var in .env
        self.recipients = ["18000644@parlierusd.org"] #change the User to User's email or something idk
        self.subject = "This Is Your Test Ribbon Receipt"
        self.body_html2 = "<html>This was Sent by A <strong>Bot and this is a Test</strong></html>"
        self.selected_items = ["Distinguished Cadet", "Aptitude", "Exemplary Conduct", "Exemplary Personal Appearance", "Marksmanship Team", "(C.E.R.T.)"] #Temp
        self.user_last_name = "Sanchez" #Change Sanchez for the real var
        self.rank = "Seaman Recruit" #Change Seaman Recruit for the real var
        self.full_title = f"{self.rank} {self.user_last_name}"
        self.current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.receipt_html = self.generate_receipt_html()
        self.attachments = [] 
        #I hate this Send me Help, Why Can't we Just Use Gmail on the PreMade Slopp that companies made

    def setup_smtp(self):
        self.server = smtplib.SMTP('smtp.gmail.com', 587)
        self.server.starttls()
        self.server.login(self.sender_email, self.password)
        
    def generate_receipt_html(self):
        items_html = "\n".join([f"<tr><td><strong>{item} Ribbon</strong></td></tr>" for item in self.selected_items])
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
        
        .receipt-table {{
            width: 300px;
            margin: auto;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            
        }}
        
        .receipt-table th {{
            background-color: #f0f0f0;
        }}
        
        @media screen and (max-width: 600px) {{
            .receipt-table {{
                width: 90%;
            }}
        }}
    </style>
    <div class="receipt">
        <h1 style="margin-left: 350px;">Ribbon Receipt</h1>
        <p style="font-size: 16px;margin-left: 350px;">Date: <strong>{self.current_time}</strong></p>
        <hr style="border-top: 1px solid #ccc; border-bottom: none; margin: 20px 0;">
        <table class="receipt-table">
            <thead style="margin-left: 350px;">
                <h3 style="position:fixed;">Test</h3>
                <h2 style="margin-left: 280px;">Requested By: {self.full_title}</h2>
            </thead>
            <tbody>
                {items_html}
            </tbody>
        </table>
    </div>
    <hr style="border-top: 1px solid #ccc; border-bottom: none; margin: 20px 0;">
    """
    def send_email(self):
        try:
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = ', '.join(self.recipients)
            msg['Subject'] = self.subject
            
            msg.attach(MIMEText(f"<html><body>{self.receipt_html}</body></html>", 'html'))
            msg.attach(MIMEText(self.body_html2, 'html'))

            if self.image_path:
                with open(self.image_path, 'rb') as image_file:
                    part = MIMEBase('image', 'png') 
                    part.set_payload(image_file.read())
                    encoders.encode_base64(part)
                    part.add_header(
                        'Content-Disposition',
                        f'attachment; filename= {os.path.basename(self.image_path)}'
                    )
                    msg.attach(part)

            if self.attachments:
                for attachment in self.attachments:
                    with open(attachment, 'rb') as file:
                        part = MIMEBase('application', 'octet-stream')
                        part.set_payload(file.read())
                        encoders.encode_base64(part)
                        part.add_header('Content-Disposition', f'attachment; filename= {os.path.basename(attachment)}')
                        msg.attach(part)

            self.setup_smtp()
            self.server.send_message(msg)

            print(" ") #Spacer
            print(f"{Fore.GREEN}Email sent successfully to {', '.join(self.recipients)}{Style.RESET_ALL}")
            print(f"{Fore.BLUE}Current Time:{Fore.GREEN} {current_time}{Style.RESET_ALL}")
            print(" ") #Spacer
            print(f"{Fore.MAGENTA}{self.full_title} {Fore.GREEN}Requested {Fore.BLUE}{self.selected_items}")
        except Exception as e:
            print(f"{Fore.RED}An error occurred: {str(e)}{Style.RESET_ALL}")
            print(f"{Fore.MAGENTA}{self.full_title} {Fore.RED} Failed to Request {Fore.BLUE}{self.selected_items}")

            

if __name__ == "__main__":
    email_bot = EmailBot()
    email_bot.image_path = "download (5).jpg" #Change the Image 
    email_bot.send_email()
