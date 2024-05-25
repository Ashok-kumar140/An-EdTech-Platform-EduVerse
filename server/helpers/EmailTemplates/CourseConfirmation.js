exports.courseConfirmation = (name, courseName) => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
    
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
    
            .container a {
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            .logo {
                max-width: 200px;
                max-height: 100px;
                /* margin-bottom: 20px; */
                padding: 15px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
    
    
            .logobackground {
                background-color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 220px;
                border-radius: 5px;
                max-height: 68px;
                margin-bottom: 30px;
    
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://codeplay-edtech-project.vercel.app" class="logobackground"><img class="logo"
                    src="https://res.cloudinary.com/dzihaxgx8/image/upload/v1712943831/EdTech/mtvpc5zroyt7zahshlvf.png"
                    alt="CodePlay Logo"></a>
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>You have successfully registered for the course <span class="highlight">${courseName}. We
                        are excited to have you as a participant!</span>.
                </p>
                <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
                </p>
                <a class="cta" href="http://localhost:3000/dashboard">Go to Dashboard</a>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@eduverse.com">info@eduverse.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`

}