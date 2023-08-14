#define BLYNK_TEMPLATE_ID "TMPL6gfwz6OeP"
#define BLYNK_TEMPLATE_NAME "Test Relay"

#define BLYNK_FIRMWARE_VERSION        "0.1.0"

#define BLYNK_PRINT Serial
//#define BLYNK_DEBUG

#define APP_DEBUG

#include "BlynkEdgent.h"

#define relay_pin D2

BLYNK_WRITE(V1)
{
  int relayStatus = param.asInt();
  digitalWrite(relay_pin, relayStatus);
}

void setup()
{
  Serial.begin(115200);
  delay(100);

  digitalWrite(relay_pin, LOW);
  pinMode(relay_pin, OUTPUT);

  BlynkEdgent.begin();
}

void loop() {
  BlynkEdgent.run();
}
