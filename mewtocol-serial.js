//This lib could treat as node version serialport assistance.
//Form panasonic mewtocol plc communication.
//In many cases, the plc connection is serialport.
//You could download this file and simple add your code at the end of program.

const { SerialPort } = require('serialport');
//Default serialport configuration
const defaultport = "COM2";
const defaultBaudRate = 9600;
const port = new SerialPort({ path: defaultport, baudRate:defaultBaudRate, autoOpen: false });
port.open(function (err) {
  if (err) {
    console.log('Port open fail: ' + err.message + "\n");
    return;
    }
  console.log(defaultport + ' open sucesses.' + "\r");
  });
port.on('error', err => {
  console.log('There is an error: ' + err.message + "\n");
});
//ReadMessage
port.on('data', data => {
  console.log('Data received: ' + data + "\n");
});


//Listing system avaliable ports.
function listports() {
  const ports = SerialPort.list();
  console.log(ports.map(port => port.path + ":" + port.friendlyName).join("\n"));
}

//Check PLC Version
function PlcVer(){
    try {
      port.write("%EE#RT**"+ "\r");
      console.log("Get ver msg has sent." + "\n")
    }catch (err) {
      console.log('Message send fail: ' + err.message+'\n');
    }
}

//Read single contact data
//Please note that the format of the contact num is "X0001", "R0010"
//The relay number only accept X,Y,R,T
//Example ReadOne('X0001')
function ReadOne(ContactNum){
    try {
      port.write("%EE#RCS"+ContactNum+"**\r");
      console.log("Read one relay msg has sent." + "\n")
    }catch (err) {
      console.log('Message send fail: ' + err.message+'\n');
    }
}

//Write single contact data
//Please note that the format of the contact num is "Y0001", "R0010"
//The relay number only accept Y,R,T,C
//Example RelayON('Y0001')
function RelayON(ContactNum) {
  try {
    port.write("%EE#WCS"+ContactNum+"1**\r");
    console.log("Single Relay on msg has sent." + "\n")
  }catch (err) {
    console.log('Message send fail: ' + err.message+'\n');
  }
}

//Write single contact data
//Please note that the format of the contact num is "Y0001", "R0010"
//The relay number only accept Y,R,T,C
//Example RelayOff('Y0001')
function RelayOff(ContactNum){
  try {
    port.write("%EE#WCS"+ContactNum+"1**\r");
    console.log("Single Relay off msg has sent." + "\n")
  }catch (err) {
    console.log('Message send fail: ' + err.message+'\n');
  }
}

//Read multiple contacts, read a range of the contact once
//Example ReadMulti('X0001','X0010')
function ReadMulti(Start,End){
  try {
    port.write("%EE#RCP"+Start.toString()+End.toString()+"**\r");
    console.log("Read Multi has sent." + "\n")
  }catch (err) {
    console.log('Message send fail: ' + err.message+'\n');
  }
}


//Write multiple contact, write a range of contact once
function WriteMultiON(Start,End){
  try {
    port.write("%EE#WCP"+Start.toString()+End.toString()+"1**\r");
    console.log("Write Multi ON msg has sent." + "\n")
  }catch (err) {
    console.log('Message send fail: ' + err.message+'\n');
  }
}

//Write multiple contact, off command
function WriteMultiOFF(Start,End){
  try {
    port.write("%EE#WCP"+Start.toString()+End.toString()+"0**\r");
    console.log("Write Multi OFF msg has sent." + "\n")
  }catch (err) {
    console.log('Message send fail: ' + err.message+'\n');
  }
}

//Read register value
//Attention the register only available DT
//Example ReadDT(0001, 00100)
function ReadDT(Start,End){
  try {
    port.write("%EE#RDD"+Start.toString()+End.toString()+"**\r");
    console.log("Write Multi OFF msg has sent." + "\n")
  }catch (err) {
    console.log('Message send fail: ' + err.message+'\n');
  }
}

//Export functions, if you would like to using outside function.
module.exports = {
	PlcVer,
	ReadOne,
	RelayON,
	RelayOff,
	ReadMulti,
	WriteMultiON,
	WriteMultiOFF,
	ReadDT
}

//If you would like to use directly, using following examples.
//ReadDT('0001','0010')