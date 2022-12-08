<template>
  <canvas ref="webgl"></canvas>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import vertexShader from '~/assets/shaders/vertex.glsl'
import fragmentShader from '~/assets/shaders/fragment.glsl'
const webgl = ref<HTMLCanvasElement>(null!)
class Galaxy {
  private sizes: { width: number, height: number } = { width: window.innerWidth, height: window.innerHeight }
  private parameters: { count: number, size: number, radius: number, branches: number, spin: number, randomness: number, randomnessPower: number, insideColor: THREE.Color, outsideColor: THREE.Color } = {
    count: 200000,
    size: 0.005,
    radius: 5,
    branches: 6,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: new THREE.Color('#ff6030'),
    outsideColor: new THREE.Color('#1b3984')
  }
  private scene: THREE.Scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
  private renderer: THREE.WebGLRenderer
  private clock: THREE.Clock = new THREE.Clock()
  private geometry: THREE.BufferGeometry | null = null
  private material: THREE.ShaderMaterial | null = null
  private points: THREE.Points | null = null
  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.camera.position.z = 5
    this.camera.position.y = 1
    this.scene.add(this.camera)
    this.generateGalaxy()
    this.setResize()
    this.raf()
  }
  private generateGalaxy() {
    if (this.points !== null) {
      this.geometry?.dispose()
      this.material?.dispose()
      this.scene.remove(this.points)
    }
    this.geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.parameters.count * 3)
    const randomness = new Float32Array(this.parameters.count * 3)
    const colors = new Float32Array(this.parameters.count * 3)
    const scales = new Float32Array(this.parameters.count * 1)
    const insideColor = new THREE.Color(this.parameters.insideColor)
    const outsideColor = new THREE.Color(this.parameters.outsideColor)
    for (let i = 0;i < this.parameters.count;i++) {
      const i3 = i * 3

      // Position
      const radius = Math.random() * this.parameters.radius

      const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

      const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
      const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
      const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

      positions[i3] = Math.cos(branchAngle) * radius
      positions[i3 + 1] = 0
      // positions[i3 + 1] = Math.cos(branchAngle) / radius
      positions[i3 + 2] = Math.sin(branchAngle) * radius

      randomness[i3] = randomX
      randomness[i3 + 1] = randomY
      randomness[i3 + 2] = randomZ

      // Color
      const mixedColor = insideColor.clone()
      mixedColor.lerp(outsideColor, radius / this.parameters.radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      // Scale
      scales[i] = Math.random()
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms:
      {
        uTime: { value: 0 },
        uSize: { value: 30 * this.renderer.getPixelRatio() }
      },
      vertexShader,
      fragmentShader
    })
    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
  }
  private resizeHandler() {
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
  private setResize() {
    window.addEventListener('resize', this.resizeHandler.bind(this))
  }
  private raf() {
    const elapsedTime = this.clock.getElapsedTime()
    if(this.material !== null) {
      this.material.uniforms.uTime.value = elapsedTime
    }
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.raf.bind(this))
  }
}
onMounted(async () => {
  new Galaxy(webgl.value)
})
onUnmounted(() => { })
</script>
<style scoped lang="scss">

</style>