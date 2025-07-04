const socket = new WebSocket('ws://192.168.1.210:3000')
let x = 0, y = 8, z = 58, tilt = 0, pan = 0, rotation = 0
let px, py, pz, pTilt, pPan, pRotation
let j1 = 90, j2 = 0, j3 = 0
let l1 = 16, l2 = 16, l3 = 8, zOffset = 27

new p5(sketch, 'arm')

function degToRad(deg) {
    return deg * (Math.PI / 180)
}
  
function radToDeg(rad) {
    return rad / (Math.PI / 180)
}
  
function calculateAngles() {
    const pj1 = j1
    const pj2 = j2
    const pj3 = j3
    const ay = y - l3 * Math.cos(degToRad(tilt))
    const az = z - zOffset - l3 * Math.sin(degToRad(tilt))
    j2 = -Math.acos((Math.pow(ay, 2) + Math.pow(az, 2) - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2))
    j1 = radToDeg(Math.atan2(az, ay) - Math.atan2((l2 * Math.sin(j2)), (l1 + l2 * Math.cos(j2))))
    j2 = radToDeg(j2)
    j3 = tilt - j2 - j1
    if (isNaN(j1)) j1 = pj1
    if (isNaN(j2)) j2 = pj2
    if (isNaN(j3)) j3 = pj3
    console.log(x, y, z, pan, rotation, tilt)
    const p1 = mapPulse(j1 - 90, 90, -90, 850, 1960)
    const p2 = mapPulse(j2, 90, -90, 650, 1860)
    const p3 = mapPulse(j3, 90, -90, 760, 2040)
    const p4 = mapPulse(pan, -90, 90, 580, 1840)
    const p5 = mapPulse(rotation, -90, 90, 1000, 2240)
    if (socket.readyState === socket.OPEN) socket.send(`${p1},${p2},${p3},${p4},${p5}`)
}

function mapPulse(angle, minAngle, maxAngle, minPulse, maxPulse) {
    return Math.round((angle - minAngle) * (maxPulse - minPulse) / (maxAngle - minAngle) + minPulse)
}

setTimeout(() => {
    calculateAngles()
    // socket.send("1410,1250,1410,1190,1630")
    // console.log("sent")
}, 5000)
