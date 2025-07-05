const socket = new WebSocket('ws://192.168.1.210:3000')
let l1 = 16, l2 = 16, l3 = 8, zOffset = 27
let j1 = 104.36, j2 = -28.72, j3 = -75.64
let p1 = 0, p2 = 0, p3 = 0
let t1 = 0, t2 = 0, t3 = 0
let increment = 1, step = 0, index = 0

const positions = [
    { x: 0, y: 18, z: 38, pan: 0, rotation: 0, tilt: 0 },
    { x: 0, y: 28, z: 28, pan: 0, rotation: 0, tilt: 0 },
    { x: 0, y: 8, z: 58, pan: 0, rotation: 0, tilt: 0 },
]

new p5(sketch, 'arm')

function degToRad(deg) {
    return deg * (Math.PI / 180)
}
  
function radToDeg(rad) {
    return rad / (Math.PI / 180)
}

function mapPulse(angle, minAngle, maxAngle, minPulse, maxPulse) {
    return Math.round((angle - minAngle) * (maxPulse - minPulse) / (maxAngle - minAngle) + minPulse)
}

function calculateAngles() {
    p1 = j1
    p2 = j2
    p3 = j3
    const ay = positions[index].y - l3 * Math.cos(degToRad(positions[index].tilt))
    const az = positions[index].z - zOffset - l3 * Math.sin(degToRad(positions[index].tilt))
    t2 = -Math.acos((Math.pow(ay, 2) + Math.pow(az, 2) - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2))
    t1 = radToDeg(Math.atan2(az, ay) - Math.atan2((l2 * Math.sin(t2)), (l1 + l2 * Math.cos(t2))))
    t2 = radToDeg(t2)
    t3 = positions[index].tilt - t2 - t1
    console.log(`Angles: ${t1}, ${t2}, ${t3}`)
    if (isNaN(t1)) t1 = j1
    if (isNaN(t2)) t2 = j2
    if (isNaN(t3)) t3 = j3
}
