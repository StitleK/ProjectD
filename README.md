DW"# ProjectD" 

1. ดาวน์โหลดโปรแกรม Arduino IDE ,Visual Studio Code, BlynkIOT (web or app)
2. Arduino IDE : ติดตั้งบอร์ด ESP32 (V 1.0.6), ESP8266 ผ่านboard manager
3. ดาวน์โหลด Library ArduinoWebsockets, TridentTD_Linenotify (V. 3.0.2), Arduino-LiquidCrystal-I2C, Blynk
4. อัพโค้ดลงบอร์ด ESP32 และ ESP8266
5. Blynk : ใช้แอพลิเคชั่น BlynkIOT เพื่อconnect ESP8266 เข้ากับตัว Blynk
6. สร้าง VirtualPin เพื่อให้สั่งการปิด-เปิดผ่าน blynk ได้
7. สร้าง HTTPs REST API จากทางเว็ปของทาง Blynk (ในโค้ดใส่มาให้แล้วตรง Visual Studio Code)
8. สร้างไลน์แชทบอท จากเว็ปของไลน์โดยตรง แล้วใส่โค้ดเพื่อเริ่มการทำงานของแชทบอทลง Visual Studio Code
9. อัพลง Heroku เพื่อให้แชทบอทของเราออนไลน์ตลอดเวลา หรือ ใช้ Ngrok เพื่อรันการทำงานของบอทค้างไว้
10. เริ่มใช้งานได้ :)

* ส่วนของโค้ดบางส่วนที่ต้องใส่เองจะทำการใส่ "xxx" ไว้ *
