import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function Hero3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <Sphere args={[1.2, 64, 64]} scale={2.2} position={[0,0,0]}>
        <MeshDistortMaterial color="#08fdd8" attach="material" distort={0.35} speed={2} roughness={0} />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}
