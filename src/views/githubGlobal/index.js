import ThreeGlobe from 'three-globe'
import { WebGLRenderer, Scene } from 'three'
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  // AxesHelper,
  // DirectionalLightHelper,
  // CameraHelper,
  PointLight
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import countries from './files/globe-data-min.json'
var renderer, camera, scene, controls
var Globe

// 初始化声明核心的threeJs 控件
function init() {
  // 初始化渲染器
  renderer = new WebGLRenderer({ antialias: true })
  // 设置像素比
  renderer.setPixelRatio(window.devicePixelRatio)
  // 设置渲染画布大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // 将当前画布挂载到body子对象上
  document.body.appendChild(renderer.domElement)

  // 初始化场景以及光线
  scene = new Scene()
  scene.add(new AmbientLight(0xbbbbbb, 0.3))
  // 设置画布背景颜色
  scene.background = new Color(0x040d21)

  // 初始化相机 以及光线
  camera = new PerspectiveCamera()
  camera.aspect = 800 / 600
  camera.updateProjectionMatrix()

  var dLight = new DirectionalLight(0xffffff, 0.8)
  dLight.position.set(-800, 2000, 400)
  camera.add(dLight)

  var dLight1 = new DirectionalLight(0x7982f6, 1)
  dLight1.position.set(-200, 500, 200)
  camera.add(dLight1)

  var dLight2 = new PointLight(0x8566cc, 0.5)
  dLight2.position.set(-200, 500, 200)
  camera.add(dLight2)

  camera.position.z = 400
  camera.position.x = 0
  camera.position.y = 0

  scene.add(camera)
  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000)

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(dLight.shadow.camera);
  // scene.add(helperCamera);

  // 初始化控制器  轨道控制
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dynamicDampingFactor = 0.01
  controls.enablePan = true
  controls.minDistance = 200
  controls.maxDistance = 300
  controls.rotateSpeed = 0.8
  controls.zoomSpeed = 1
  controls.autoRotate = true
  controls.minPolarAngle = Math.PI / 3.5
  controls.maxPolarAngle = Math.PI - Math.PI / 3
}
// 地球初始化
function initGlobe() {
  // 初始化地球
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true
  })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ['KGZ', 'KOR', 'THA', 'RUS', 'UZB', 'IDN', 'KAZ', 'MYS'].includes(
          e.properties.ISO_A3
        )
      ) {
        return 'rgba(255,255,255, 1)'
      } else return 'rgba(255,255,255, 0.7)'
    })
  Globe.rotateY(-Math.PI * (5 / 9))
  Globe.rotateZ(-Math.PI / 6)
  const globeMaterial = Globe.globeMaterial()
  globeMaterial.color = new Color(0x3a228a)
  globeMaterial.emissive = new Color(0x220038)
  globeMaterial.emissiveIntensity = 0.1
  globeMaterial.shininess = 0.7

  globeMaterial.wireframe = true
  // 场景添加地球
  scene.add(Globe)
}
// 窗口重置大小的时候
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
// 动画效果
function animate() {
  if (!camera) return
  camera.position.x += 5
  camera.position.y += 5
  camera.lookAt(scene.position)
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
// 初始化渲染 先初始化画布场景 再初始化地球 再添加当window resize 控制渲染 最后添加动画
export function initRender() {
  init()
  initGlobe()
  onWindowResize()
  animate()
}
// 销毁地球以及画布释放内存 ,canvas 创建后不主动清空会一直存在
export function destroyCanvas() {
  cancelAnimationFrame(animate)
  scene.traverse((child) => {
    if (child.material) {
      child.material.dispose()
    }
    if (child.geometry) {
      child.geometry.dispose()
    }
    child = null
  })
  // 场景中的参数释放清理或者置空等
  scene.clear()
  scene = null
  camera = null
  controls = null
  renderer.forceContextLoss()
  renderer.dispose()
  renderer = null
  document.body.removeChild(document.getElementsByTagName('canvas')[0])
  // renderer.domElement = null
}
