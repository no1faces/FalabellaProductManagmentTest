# Falabella Product Managment (FPM)
 FPM is a web application for create, update and delete products for Falabella web page catalog. 

 # Requierements
 Before start using FPM you need to have installed on your computer:
 * https://nodejs.org/en
 * https://go.dev/doc/install

 # Directory Structure
 On the root directory you will find:
 * ``` /goback ```  -> Folder that get the API REST application.
 * ``` /next-frontend ```  -> Folder that get the Frontend application.
 
# API Installation
 Clone the repositorie on your local machine, then inside the terminal navigate to the root directory, once there, go to ```/goback``` folder and execute:
 ```
 go get
 go run main.go
 ```
 Your golang API must be running at ```http://localhost:8080```

# Frontend Installation
 Open another terminal and navigate to the root directory of the proyect, once there, go to ```/next-frontend``` folder and execute:
 ```
 npm install
 npm run dev
 ```
 Your Nextjs frontend application must be running at ```http://localhost:3000``` open it on your browser to check it out.