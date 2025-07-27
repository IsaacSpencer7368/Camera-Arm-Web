const socket = new WebSocket('ws://192.168.1.210:3000')
let x = 0, y = 4, z = 12, tilt = 0, pan = 0, rotation = 0
let px, py, pz, pTilt, pPan, pRotation
let j1 = -90, j2 = 0, j3 = 0
let l1 = 12, l2 = 12, l3 = 4, zOffset = 36

new p5(sketch1, 'sideSketch')

function degToRad(deg) {
    return deg * (Math.PI / 180);
}
  
function radToDeg(rad) {
    return rad / (Math.PI / 180);
}
  
function calculateAngles() {
    const p1 = j1
    const p2 = j2
    const p3 = j3
    const ay = y - l3 * Math.cos(degToRad(tilt))
    const az = z - zOffset - l3 * Math.sin(degToRad(tilt))
    j2 = Math.acos((Math.pow(ay, 2) + Math.pow(az, 2) - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2))
    j1 = radToDeg(Math.atan2(az, ay) - Math.atan2((l2 * Math.sin(j2)), (l1 + l2 * Math.cos(j2))))
    j2 = radToDeg(j2)
    j3 = tilt - j2 - j1
    if (isNaN(j1) || isNaN(j2) || isNaN(j3)) {
        j1 = p1
        j2 = p2
        j3 = p3
    }
    console.log(j1, j2, j3)
    const pwm1 = mapPulse(j1 + 90, 90, -90, 850, 1960)
    const pwm2 = mapPulse(j2, 90, -90, 650, 1860)
    const pwm3 = mapPulse(j3, 90, -90, 760, 2040)
    const pwm4 = mapPulse(pan, -90, 90, 580, 1840)
    const pwm5 = mapPulse(rotation, -90, 90, 1000, 2240)
    if (socket.readyState === socket.OPEN) socket.send(`${pwm1},${pwm2},${pwm3},${pwm4},${pwm5}`)
}

function mapPulse(angle, minAngle, maxAngle, minPulse, maxPulse) {
    return Math.round((angle - minAngle) * (maxPulse - minPulse) / (maxAngle - minAngle) + minPulse)
}
