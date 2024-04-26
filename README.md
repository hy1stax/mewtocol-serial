# Install

This is a lib for panasonic mewtocol protocol via serial communication.
A altanatives for serial assistance in nodejs.

# Usage
The lib is a serials functions.<br>
Before you go, please modify your serial communication parameters in global variances.<br>

The avaliable function as below:<br>
Get plc version:<br>
-PlcVer()<br>
Read contact status:<br>
-ReadOne('X0001')<br>
-ReadMulti('Y0000','Y001A')<br>
Change the relay status:<br>
RelayON('R0001')<br>

Every function has comment in the source code. You could refer and enjoy.
