// Leer datos del sensor MAX30102
function readSensorData () {
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    6,
    NumberFormat.UInt8LE,
    false
    )
    data = pins.i2cReadNumber(MAX30102_I2C_ADDRESS, NumberFormat.UInt16BE, false)
    return data
}
// Configuración inicial del MAX30102
function setupMAX30102 () {
    // Resetear el sensor
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    MAX30102_MODE_CONFIG,
    NumberFormat.UInt8LE,
    false
    )
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    64,
    NumberFormat.UInt8LE,
    false
    )
    basic.pause(100)
    // Configurar modo de SpO2
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    MAX30102_PARTICLE_CONFIG,
    NumberFormat.UInt8LE,
    false
    )
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    3,
    NumberFormat.UInt8LE,
    false
    )
    basic.pause(100)
    // Configurar LEDs
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    MAX30102_LED_CONFIG,
    NumberFormat.UInt8LE,
    false
    )
    // Intensidad del LED rojo
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    36,
    NumberFormat.UInt8LE,
    false
    )
    // Intensidad del LED IR
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    36,
    NumberFormat.UInt8LE,
    false
    )
}
let sensorData = 0
let temp = 0
let z = 0
let y = 0
let x = 0
let data = 0
let MAX30102_PARTICLE_CONFIG = 0
let MAX30102_LED_CONFIG = 0
let MAX30102_MODE_CONFIG = 0
let MAX30102_I2C_ADDRESS = 0
basic.showIcon(IconNames.Heart)
// Dirección I2C del MAX30102
// Cambia a 0x57 si esa es la dirección correcta
MAX30102_I2C_ADDRESS = 104
// Registro de configuración del MAX30102
MAX30102_MODE_CONFIG = 9
MAX30102_LED_CONFIG = 10
MAX30102_PARTICLE_CONFIG = 11
// Inicializar Bluetooth
bluetooth.startUartService()
// Configuración inicial del sensor
setupMAX30102()
basic.forever(function () {
    // Leer valores del acelerómetro
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    // Leer temperatura del sensor interno
    temp = input.temperature()
    // Leer datos del sensor MAX30102
    sensorData = readSensorData()
    // Enviar datos por Bluetooth
    bluetooth.uartWriteString("Aceleración X: " + x + " mg\n")
    bluetooth.uartWriteString("Aceleración Y: " + y + " mg\n")
    bluetooth.uartWriteString("Aceleración Z: " + z + " mg\n")
    bluetooth.uartWriteString("Temperatura: " + temp + " °C\n")
    bluetooth.uartWriteString("Datos del MAX30102: " + sensorData + "\n")
    // Mostrar datos en la pantalla de la micro:bit
    basic.showString("X:" + x)
    basic.pause(1000)
    basic.showString("T:" + temp)
    basic.pause(1000)
    basic.showString("S:" + sensorData)
    basic.pause(1000)
})
