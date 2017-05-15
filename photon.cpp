int btn_state = 0;
int pushButton = D1;

void setup()
{
  Serial.begin(9600);
  pinMode(pushButton, INPUT_PULLUP);
  Particle.variable("btn_push", &btn_state, INT);
}

void loop()
{
  int pushButtonState;

  pushButtonState = digitalRead(pushButton);

  if(pushButtonState == LOW)
  { // Si se pulsa el boton
    digitalWrite(led, HIGH);

    if  (btn_state == 0) {
        btn_state = 1;
        Particle.publish("btn_push", String(btn_state));
    } else if (btn_state == 1){
        btn_state = 0;
        Particle.publish("btn_push", String(btn_state));
    }
  }
}
