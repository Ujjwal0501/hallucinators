# E-Toll Fine

# Abstract
In today's fast paced world, every second matters to process any kind of data. One of the issues with the smart city projects is the slow paced tolling system at the tall plaza.
To tackle this issue, we, team "Hallucinators", present to you the Electronic toll collection system named "E-Toll Fine". E-Toll Fine aims to eliminate the delay on toll roads, HOV lanes, toll bridges, and toll tunnels by collecting tolls without cash and with a minimum amount of time to wait for. With cashless tolling, cars without transponders are either excluded or pay by plate – a bill may be mailed to the address where the car's license plate number is registered, or drivers may have a certain amount of time to pay with a credit card by phone.

# Innovation
According to our research, this kind of tolling system has been already created and most probably functioning in Delhi, India.
But the problem with there is that it employs Radio Frequency Identification (RFID) technology for making toll payments directly from the prepaid or savings account linked to it. It is affixed on the windscreen of the vehicle and enables to drive through toll plazas without stopping for transactions. "The tag is needed TO BE PURCHASED from official Tag issuers or participating Banks" and if it is linked to a prepaid account, then recharging or top-up can be as per requirement.

Our system provides this service on a total FREE basis. Basically we used an Azure API for for Optical Character Recognition for the toll cameras to capture the Lincense plate Number. This number is then searched in the dataset where the user information is defined for the particular number plate. Once obtained the information, payment gateway is being created which redirects them to the bank payment website.
Since it is a prototype, it's a bit slow with the process. But with training, the accuracy and the speed can be increased. The user is being provided with a timelimit for the payment. If delayed for the first two times, fine is charged and if further delayed, his/her Lincense Registration will be canceled.


# Technical Part
* NODE.JS
* AZURE API FOR OPTICAL CHARACHTER RECOGNISATION
* MySql

# Installation

* Clone the repository 
* Change working directory to the newly cloned directory
* To install nodejs dependencies, run the following command: `npn install`
* To install required python dependencies, run: `pip install` or `pip3 install`
* To run the server, type `nodemon` in terminal
* You can search the website in web browser on localhost:3000
* For Toll Client interface, use localhost:3000/photo
* For Toll payment interface, use localhost:3000/
